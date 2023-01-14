<script lang="ts">
  import type { BrandColors, PostItemStub, PostCategory } from "$lib/types";
  import { minTagNum, theme } from "$lib/stores";

  export let showCategories: Set<PostCategory>;
  export let showTags: Set<string>;
  export let posts: PostItemStub[];
  export let brandColors: BrandColors;

  import Times from "~icons/fa-solid/times";
  import { browser } from "$app/environment";
  
  import { tagAncestors } from "$lib/constants";
  import FilterButton from "./FilterButton.svelte";
  import Tag from "$lib/components/Tag.svelte";

  function toggleItemInSet<T>(set: Set<T>, item: T): Set<T> {
    if (set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
    return set;
  }

  const toggleCategory = (category: PostCategory) => {
    showCategories = toggleItemInSet(showCategories, category);
  };

  const toggleTag = (tag: string) => {
    showTags = toggleItemInSet(showTags, tag);
  };

  $: jobActive = showCategories.has("job");
  $: otherActive = showCategories.has("other");
  $: projectActive = showCategories.has("project");

  let tagsOrdered = [];

  $: {
    const tagCounts: { [tag: string]: number } = {};

    posts.forEach(({ tags }) => {
      // for each tag in post, add 1 to count
      tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
      });

      // get ancestors of each tag and remove duplicates
      const ancestorTags = [...new Set(tags.map((tag) => tagAncestors[tag] ?? []).flat())];

      ancestorTags
        .filter((ancestorTag) => !tags.includes(ancestorTag)) // remove ancestors if they are already in post tags
        .forEach((ancestorTag) => {
          tagCounts[ancestorTag] = (tagCounts[ancestorTag] ?? 0) + 1; // add 1 to count for each ancestor
        });
    });

    tagsOrdered = Object.entries(tagCounts)
      .filter((tag) => tag[1] >= $minTagNum)
      .sort((a, b) => { // order by tag count then alphanumerically
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        return a[0] < b[0] ? -1 : 1;
      })
      .map((tag) => tag[0]);
  }

  $: mediaQueryThemeIsDark = browser && window.matchMedia("(prefers-color-scheme: dark)").matches;
  $: isPageBackgroundDark = $theme === "dark" || ($theme === "system" && mediaQueryThemeIsDark);
</script>

<div class="category-buttons">
  <FilterButton
    active={jobActive}
    classPrefix="job"
    onClick={() => toggleCategory("job")}
  >
    Work
  </FilterButton>
  <FilterButton
    active={projectActive}
    classPrefix="project"
    onClick={() => toggleCategory("project")}
  >
    Projects
  </FilterButton>
  <FilterButton
    active={otherActive}
    classPrefix="other"
    onClick={() => toggleCategory("other")}
  >
    Other
  </FilterButton>
  {#if showCategories.size || showTags.size}
    <button
      data-testid="clear-filters"
      class="secondary-button do-transition"
      on:click={() => {
        showCategories.clear();
        showTags.clear();

        // Trigger reactive updates
        showCategories = showCategories;
        showTags = showTags;
      }}
    >
      <span class="symbol"><Times /></span> Clear filters
    </button>
  {/if}
</div>
<div class="tag-buttons">
  {#each tagsOrdered as tag}
    <Tag
      tagId={tag}
      active={showTags.has(tag)}
      background={brandColors[tag].bg}
      foreground={brandColors[tag].fg}

      isPageBackgroundDark={isPageBackgroundDark}
      needsOutlineOnLightBg={brandColors[tag].outlineOnLight}
      needsOutlineOnDarkBg={brandColors[tag].outlineOnDark}

      onClick={() => toggleTag(tag)} />
  {/each}
  {#if $minTagNum !== 0}
    <button
      data-testid="show-more-tags"
      class="secondary-button do-transition"
      on:click={() => {
        $minTagNum = 0;
      }}
    >
      Show more...
    </button>
  {/if}
</div>

<style>
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .tag-buttons {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .secondary-button {
    background: none;
    padding: 0 0 0.1rem;
    border: none;
    border-bottom: 1px solid var(--subtitle);
    border-radius: 0;
    color: var(--subtitle);
    font-size: 0.75rem;
    margin: 0.3rem 0.35rem;
    display: inline-flex;
    align-items: center;
  }

  .secondary-button .symbol {
    position: static;
    display: inline-flex;
    align-items: center;
    margin-right: 0.2rem;
    font-size: 0.6rem;
    display: inline-flex;
    align-items: center;
  }
</style>
