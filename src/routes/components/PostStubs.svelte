<script lang="ts">
  import {onDestroy, onMount} from "svelte";
  import type {BrandColors, PostItemStub} from "$lib/types";
  import {SiteTheme} from "$lib/types";
  import {browser} from "$app/environment";
  import {showCategories, showTags, themeStore} from "$lib/stores";
  import {tagAncestors} from "$lib/constants";
  import {prefersColorSchemeDark} from "$lib/functions";
  import PostStub from "./post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";

  export let posts: PostItemStub[];
  export let brandColors: BrandColors;
  const getYearFromDate = (date: string): string => date.slice(0, 4);
  const getLabelVisibilityAndAlignment = (post: PostItemStub, i: number, postsArray: PostItemStub[]): PostItemStub => {
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
  const ancestorTagShown = (tag: string): boolean => Boolean(tagAncestors[tag] && tagAncestors[tag]?.some((ancestorTag: string) => $showTags.has(ancestorTag)));
  let postsWithLabels: PostItemStub[];
  let showAll = false;
  const initialPostCount = 5;
  let sentinel: HTMLElement;
  let observer: IntersectionObserver;

  onMount(() => {
    if (browser) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            showAll = true;
          }
        },
        { rootMargin: "200px" } // Vous pouvez ajuster cette marge pour charger les posts avant que l'utilisateur atteigne réellement le bas de la page
      );

      observer.observe(sentinel);
    }
  });

  onDestroy(() => {
    if (browser) {
      observer.disconnect();
    }
  });

  $: {
    postsWithLabels = posts
      .filter((post: PostItemStub) => {
        const postHasShownTag = typeof post.tags !== "undefined" && post.tags.some((tag) => $showTags.has(tag) || ancestorTagShown(tag));
        return (!$showCategories.size || $showCategories.has(post.eventType)) && (!$showTags.size || postHasShownTag);
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(getLabelVisibilityAndAlignment);
    if (!showAll) {
      postsWithLabels = postsWithLabels.slice(0, initialPostCount);
    }
  }
  $: isPageBackgroundDark = $themeStore === SiteTheme.Dark || ($themeStore === SiteTheme.System && prefersColorSchemeDark(browser));
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
    activeTags = tags;
  }
</script>


<div class="heading-wrapper content-wrapper ">
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
    {#each postsWithLabels as post, i (post.slug)}
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
          isFirstPost={i === 0}
          isLastPost={i === postsWithLabels.length - 1}
          left={Boolean(post.isLeftAligned)}
        />
      {/key}
      {#if i === initialPostCount - 1}
        <div bind:this={sentinel}></div>
      {/if}
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
    margin: 2rem auto 0;
    padding: 0 1rem;
  }

  @media (min-width: 700px) {
    div.content-wrapper.posts-wrapper {
      padding-right: 7%;
      padding-left: 7%;
    }
  }

  div.heading-wrapper {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
</style>
