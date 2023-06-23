<script lang="ts">
  import type { BrandColors, PostItemStub } from "$lib/types";
  import { SiteTheme } from "$lib/types";
  import { browser } from "$app/environment";
  import { showCategories, showTags, themeStore } from "$lib/stores";
  import { tagAncestors } from "$lib/tags";
  import { prefersColorSchemeDark } from "$lib/functions";
  import PostStub from "./post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
  import { onDestroy, onMount } from "svelte";

  export let posts: PostItemStub[] = [];
  export let brandColors: BrandColors;

  const getYearFromDate = (date: string): string => date.slice(0, 4);

  const getLabelVisibilityAndAlignment = (
    post: PostItemStub,
    i: number,
    postsArray: PostItemStub[],
  ): PostItemStub => {
    const output = post;

    const prevItem = postsArray[i - 1];
    const prevLeftAligned = prevItem ? Boolean(prevItem.isLeftAligned) : false;
    const prevYear = prevItem ? getYearFromDate(prevItem.date.start) : null;

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

  $: isCategoryOfPostSelected = (post: PostItemStub): boolean => !$showCategories.size || $showCategories.has(post.eventType);

  $: isAncestorTagSelected = (tag: string): boolean => Boolean(
    tagAncestors[tag]
    && tagAncestors[tag]?.some((ancestorTag: string) => $showTags.has(ancestorTag)),
  );

  $: isTagOfPostSelected = (post: PostItemStub): boolean => {
    const postHasShownTag = typeof post.tags !== "undefined"
      && post.tags.some((tag) => $showTags.has(tag) || isAncestorTagSelected(tag));
    return !$showTags.size || postHasShownTag;
  };


  $: isPageBackgroundDark = $themeStore === SiteTheme.Dark
    || ($themeStore === SiteTheme.System && prefersColorSchemeDark(browser));

  let activeTags: Set<string>;

  $: {
    const tags = new Set<string>();
    $showTags.forEach((tag) => {
      tags.add(tag);
      Object.entries(tagAncestors)
        .forEach(([childTag, ancestorTags]) => {
          if (ancestorTags.includes(tag)) {
            tags.add(childTag);
          }
        });
    });
    activeTags = tags;
  }

  let loadMoreTrigger;
  let initialLoadComplete = false;
  let filteredPosts: PostItemStub[] = [];
  let displayedPosts: PostItemStub[] = [];

  $: {
    filteredPosts = posts
      .filter(
        (post: PostItemStub) => isCategoryOfPostSelected(post) && isTagOfPostSelected(post),
      )
      .map(getLabelVisibilityAndAlignment);
    displayedPosts = filteredPosts.slice(0, 5);
  }

  onMount(() => {
    initialLoadComplete = true; // Indicate that initial load is complete
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const currentLength = displayedPosts.length;
        const additionalPosts = filteredPosts.slice(currentLength, currentLength + 5);
        displayedPosts = [...displayedPosts, ...additionalPosts];
      }
    });
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }
  });

  onDestroy(() => {
    if (loadMoreTrigger) {
      loadMoreTrigger.remove();
    }
  });
</script>

<div class="heading-wrapper content-wrapper">
  <h2>Expérience</h2>
  <FilterControls
    bind:showCategories={$showCategories}
    bind:showTags={$showTags}
    {brandColors}
    {posts}
  />
</div>
<div class="content-wrapper posts-wrapper">
  <div class="posts">
    {#each displayedPosts as post, i (post.slug)}
      {#if post.showYearLabel}
        <YearLabel
          isFirstLabel={i === 0}
          isRightToLeft={Boolean(post.isLeftAligned)}
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
          isLastPost={i === displayedPosts.length - 1}
          left={Boolean(post.isLeftAligned)}
        />
      {/key}
    {/each}
    {#if !displayedPosts.length && initialLoadComplete}
      <ConfusedTravolta reason="there are no results"/>
    {/if}
    {#if displayedPosts.length < posts.length}
      <div bind:this={loadMoreTrigger}></div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

  div.content-wrapper.posts-wrapper {
    padding: 0;
  }

  div.posts {
    padding: 0 var(--spacing-m);
    margin: var(--spacing-2xl) auto 0;
  }

  @media (min-width: $breakpoint-s-min) {
    div.content-wrapper.posts-wrapper {
      padding-left: 7%;
      padding-right: 7%;
    }
  }

  div.heading-wrapper {
    margin-top: var(--spacing-3xl);
    margin-bottom: var(--spacing-xl);
  }
</style>
