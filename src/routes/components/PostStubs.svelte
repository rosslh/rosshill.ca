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
  import { onMount } from "svelte";

  export let posts: PostItemStub[] = [];
  export let brandColors: BrandColors;

  let initialPosts = [];
  let loadMoreTrigger;

  onMount(() => {
    initialPosts = posts.slice(0, 5);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const currentLength = initialPosts.length;
        const additionalPosts = posts.slice(currentLength, currentLength + 5);
        initialPosts = [...initialPosts, ...additionalPosts];
      }
    });
    observer.observe(loadMoreTrigger);
  });

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

  $: displayedPosts = posts
    .filter(
      (post: PostItemStub) => isCategoryOfPostSelected(post) && isTagOfPostSelected(post),
    )
    .map(getLabelVisibilityAndAlignment);

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
    {#each initialPosts as post, i (post.slug)}
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
          isLastPost={i === initialPosts.length - 1}
          left={Boolean(post.isLeftAligned)}
        />
      {/key}
    {/each}
    {#if !initialPosts.length}
      <ConfusedTravolta reason="there are no results"/>
    {/if}
    {#if initialPosts.length < posts.length}
      <div bind:this={loadMoreTrigger}>
      </div>
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
