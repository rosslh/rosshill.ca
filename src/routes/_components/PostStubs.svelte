<script lang="ts">
  import type { BrandColors, PostItemStub } from "$lib/types";
  import { SiteTheme } from "$lib/types";
  import { browser } from "$app/environment";

  export let posts: PostItemStub[];
  export let brandColors: BrandColors;

  import { showCategories, showTags, theme } from "$lib/stores";
  import { tagAncestors } from "$lib/constants";
  import PostStub from "./post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";

  const getYearFromDate = (date: string) => date.slice(0, 4);

  const setLabelVisibilityAndAlignment = (post: PostItemStub, i: number, postsArray: PostItemStub[]) => {
    const output = post;
    const prevLeftAligned = i === 0 ? false : postsArray[i - 1].isLeftAligned;
    const prevYear = i === 0 ? 0 : getYearFromDate(postsArray[i - 1].date.start);

    const year = getYearFromDate(output.date.start);

    if (year !== prevYear) {
      output.showYearLabel = true;
      output.isLeftAligned = !prevLeftAligned;
    } else {
      output.showYearLabel = false;
      output.isLeftAligned = prevLeftAligned;
    }
    
    return output;
  };

  $: categoryFilter = (post: PostItemStub) => !$showCategories.size || $showCategories.has(post.eventType);

  $: ancestorTagShown = (tag: string) => tagAncestors[tag] && tagAncestors[tag].some((ancestorTag: string) => $showTags.has(ancestorTag));

  $: tagFilter = (post: PostItemStub) => {
    const postHasShownTag = typeof post.tags !== "undefined" && post.tags.some((tag) => $showTags.has(tag) || ancestorTagShown(tag));
    return !$showTags.size || postHasShownTag;
  };

  $: postsWithLabels = posts
    .filter((post: PostItemStub) => categoryFilter(post) && tagFilter(post))
    .map(setLabelVisibilityAndAlignment);

  $: mediaQueryThemeIsDark = browser && window.matchMedia("(prefers-color-scheme: dark)").matches;
  $: isPageBackgroundDark = $theme === SiteTheme.Dark || ($theme === SiteTheme.System && mediaQueryThemeIsDark);

  let activeTags: Set<string>;

  $: {
    const tags = new Set<string>();
    $showTags.forEach((tag) => {
      tags.add(tag);
      Object.entries(tagAncestors).forEach(([childTag, ancestorTags]) => {
        if (ancestorTags.includes(tag)) {
          tags.add(childTag);
        }
      });
    });
    activeTags = tags; // trigger reactivity
  }
</script>

<div class="heading-wrapper content-wrapper ">
  <h2>Experience</h2>
  <FilterControls
    bind:showCategories={$showCategories}
    bind:showTags={$showTags}
    {brandColors}
    {posts}
  />
</div>
<div class="content-wrapper posts-wrapper">
  <div class="posts">
    {#each postsWithLabels as post, i (post.slug)}
      {#if post.showYearLabel}
        <YearLabel
          isFirstLabel={i === 0}
          isRightToLeft={post.isLeftAligned}
          year={getYearFromDate(post.date.start)}
        />
      {/if}
      <!-- Only transition if index or alignment changes -->
      {#key `${i}|${post.isLeftAligned}`}
        <PostStub
          {post}
          {brandColors}
          {isPageBackgroundDark}
          {activeTags}
          isFirstPost={i === 0}
          isLastPost={i === postsWithLabels.length - 1}
          left={post.isLeftAligned}
        />
      {/key}
    {/each}
    {#if !postsWithLabels.length}
      <ConfusedTravolta reason="there are no results" />
    {/if}
  </div>
</div>

<style>
  div.content-wrapper.posts-wrapper {
    padding: 0;
  }
  div.posts {
    padding: 0 1rem;
    margin: 2rem auto 0;
  }
  @media (min-width: 700px) {
    div.content-wrapper.posts-wrapper {
      padding-left: 7%;
      padding-right: 7%;
    }
  }

  div.heading-wrapper {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
</style>
