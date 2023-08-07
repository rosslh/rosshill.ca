<script lang="ts">
  import type { PostItemStub, TagColors } from "$lib/types";
  import { SiteTheme } from "$lib/types";
  import { browser } from "$app/environment";
  import { showCategories, showTags, themeStore } from "$lib/stores";
  import { tagAncestors } from "$lib/tags";
  import { prefersColorSchemeDark } from "$lib/functions";
  import PostStub from "$lib/components/post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "$lib/components/filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
  import { onDestroy, onMount } from "svelte";

  export let posts: PostItemStub[] = [];
  export let tagColors: TagColors;

  const getYearFromDate = (date: string): string => date.slice(0, 4);

  const getLabelVisibilityAndAlignment = (
    post: PostItemStub,
    index: number,
    postsArray: PostItemStub[],
  ): PostItemStub => {
    const output = post;

    const previousItem = postsArray[index - 1];
    const previousLeftAligned = previousItem
      ? Boolean(previousItem.isLeftAligned)
      : false;
    const previousYear = previousItem
      ? getYearFromDate(previousItem.date.start)
      : null;

    const year = getYearFromDate(output.date.start);

    if (year === previousYear) {
      output.showYearLabel = false;
      output.isLeftAligned = previousLeftAligned;
    } else {
      output.showYearLabel = true;
      output.isLeftAligned = !previousLeftAligned;
    }

    return output;
  };

  $: isCategoryOfPostSelected = (post: PostItemStub): boolean =>
    $showCategories.size === 0 || $showCategories.has(post.eventType);

  $: isAncestorTagSelected = (tag: string): boolean =>
    Boolean(
      tagAncestors[tag] &&
        tagAncestors[tag]?.some((ancestorTag: string) =>
          $showTags.has(ancestorTag),
        ),
    );

  $: isTagOfPostSelected = (post: PostItemStub): boolean => {
    const postHasShownTag =
      post.tags !== undefined &&
      post.tags.some((tag) => $showTags.has(tag) || isAncestorTagSelected(tag));
    return $showTags.size === 0 || postHasShownTag;
  };

  $: isPageBackgroundDark =
    $themeStore === SiteTheme.Dark ||
    ($themeStore === SiteTheme.System && prefersColorSchemeDark(browser));

  let activeTags: Set<string>;

  $: {
    const tags = new Set<string>();
    for (const tag of $showTags) {
      tags.add(tag);
      for (const [childTag, ancestorTags] of Object.entries(tagAncestors)) {
        if (ancestorTags.includes(tag)) {
          tags.add(childTag);
        }
      }
    }
    activeTags = tags;
  }

  let loadMoreTrigger: HTMLDivElement | null = null;
  let displayedPosts: PostItemStub[];
  let displayedPostsLength: number = 5;
  let initialDisplayedPostsLength: number = displayedPostsLength;

  const MAX_POSTS_LENGTH: number = 1000;
  const POSTS_INCREMENT: number = 10;

  $: {
    const filteredPosts = posts
      .filter(
        (post: PostItemStub) =>
          isCategoryOfPostSelected(post) && isTagOfPostSelected(post),
      )
      .map(getLabelVisibilityAndAlignment);

    displayedPosts = filteredPosts.slice(0, displayedPostsLength);
  }

  $: if ($showCategories.size || $showTags.size) {
    displayedPostsLength = MAX_POSTS_LENGTH;
  }

  let observer: IntersectionObserver | null = null;
  const options: {
    rootMargin: string;
    threshold: number;
  } = {
    rootMargin: "200px",
    threshold: 0,
  };

  function initialiseObserver() {
    if (observer === null) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            displayedPostsLength += POSTS_INCREMENT;
          }
        }
      }, options);
    }

    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }
  }

  onMount(() => {
    initialiseObserver();
  });

  $: {
    if (displayedPostsLength > initialDisplayedPostsLength) {
      initialiseObserver();
      initialDisplayedPostsLength = displayedPostsLength;
    }
  }

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div class="heading-wrapper content-wrapper">
  <h2>Expérience</h2>
  <FilterControls
    bind:showCategories={$showCategories}
    bind:showTags={$showTags}
    {posts}
    {tagColors}
  />
</div>
<div class="content-wrapper posts-wrapper">
  <div class="posts">
    {#each displayedPosts as post, index (post.slug)}
      {#if post.showYearLabel}
        <YearLabel
          isFirstLabel={index === 0}
          isRightToLeft={Boolean(post.isLeftAligned)}
          year={getYearFromDate(post.date.start)}
        />
      {/if}
      <!-- Only transition if index or alignment changes -->
      {#key `${index}|${post.isLeftAligned}`}
        <PostStub
          {post}
          {tagColors}
          {isPageBackgroundDark}
          {activeTags}
          isLastPost={index === displayedPosts.length - 1}
          left={Boolean(post.isLeftAligned)}
        />
      {/key}
    {/each}
    {#if displayedPosts.length === 0}
      <ConfusedTravolta reason="there are no results" />
    {/if}
    {#if displayedPosts.length < posts.length && $showCategories.size === 0 && $showTags.size === 0}
      <div bind:this={loadMoreTrigger}>
        <div class="load-more-trigger">
          <div class="load-more-trigger__text">Charger plus</div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.content-wrapper.posts-wrapper {
    padding: 0;
  }

  div.posts {
    padding: 0 var(--spacing-m);
    margin: var(--spacing-2xl) auto 0;
  }

  @media (min-width: $breakpoint-s-min) {
    div.content-wrapper.posts-wrapper {
      padding: 0 7%;
    }
  }

  @media (min-width: $breakpoint-l-min) {
    div.content-wrapper.posts-wrapper {
      padding: 0 var(--spacing-4xl);
    }
  }

  div.heading-wrapper {
    margin-top: var(--spacing-3xl);
    margin-bottom: var(--spacing-xl);
  }
</style>
