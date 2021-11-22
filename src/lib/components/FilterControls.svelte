<script lang="ts">
  export let showCategories: string[];
  export let showTags: string[];
  export let posts: PostItem[];
  export let brandColors: BrandColors;

  import Times from '~icons/fa-solid/times';
  
  import type { BrandColors, PostItem } from "$lib/types";
  import FilterButton from "./FilterButton.svelte";
  import Tag from "./Tag.svelte";
  import { tagParents } from "$lib/constants";

  const toggleItemInList = (list: string[], item: string) => {
    if (list.includes(item)) {
      return list.filter((x) => x !== item);
    } else {
      return [...list, item];
    }
  };

  const toggleCategory = (category: string) => {
    showCategories = toggleItemInList(showCategories, category);
  };

  const toggleTag = (tag: string) => {
    showTags = toggleItemInList(showTags, tag);
  };

  $: jobActive = showCategories.includes("job");
  $: orgActive = showCategories.includes("org");
  $: projectActive = showCategories.includes("project");

  let tagsOrdered = [];
  let minTagNum = 2; // number of posts required for a tag to be shown

  $: {
    const tagCounts = {};

    posts.forEach(({ tags }) => {
      if (tags) {
        // for each tag in post, add 1 to count
        tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });

        // get parent tags of each tag and remove duplicates
        const parentTags = [...new Set(tags.map(tag => tagParents[tag] || []).flat())];

        parentTags
          .filter(parentTag => !tags.includes(parentTag)) // remove parent tags if they already in post tags
          .forEach(parentTag => {
            tagCounts[parentTag] = (tagCounts[parentTag] || 0) + 1; // add 1 to count for each parent tag
          });
      }
    });

    tagsOrdered = Object.entries(tagCounts)
      .filter(tag => tag[1] >= minTagNum)
      .sort((a, b) => { // order by tag count then alphanumerically
        if (a[1] < b[1]) {
          return 1;
        } else if (a[1] > b[1]) {
          return -1;
        }
        return a[0] < b[0] ? -1 : 1;
      })
      .map(tag => tag[0]);
  }
</script>

<div class="category-buttons">
  <FilterButton
    active={jobActive}
    classPrefix="job"
    onClick={() => toggleCategory("job")}
  >
    Work Experience
  </FilterButton>
  <FilterButton
    active={projectActive}
    classPrefix="project"
    onClick={() => toggleCategory("project")}
  >
    Projects
  </FilterButton>
  <FilterButton
    active={orgActive}
    classPrefix="org"
    onClick={() => toggleCategory("org")}
  >
    Organizations
  </FilterButton>
  {#if showCategories.length || showTags.length}
    <button
      class="secondary-button doTransition"
      on:click={() => {
        showCategories = [];
        showTags = [];
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
      active={showTags.includes(tag)}
      background={brandColors[tag].background}
      foreground={brandColors[tag].foreground}
      onClick={() => toggleTag(tag)} />
  {/each}
  {#if minTagNum !== 0}
    <button
      class="secondary-button doTransition"
      on:click={() => {
        minTagNum = 0;
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
