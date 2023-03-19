<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { BrandColors, PostItemStub } from "$lib/types";
  import { SiteTheme } from "$lib/types";

  export let posts: PostItemStub[];
  export let brandColors: BrandColors;

  import { browser } from "$app/environment";
  import { showCategories, showTags, themeStore } from "$lib/stores";
  import { tagAncestors } from "$lib/constants";
  import { prefersColorSchemeDark } from "$lib/functions";
  import PostStub from "./post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";

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

  let postsWithLabels: PostItemStub[] = [];
  let showAll = false;

  function handleScroll() {
    if (!showAll && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      window.requestAnimationFrame(() => {
        showAll = true;
      });
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  function updatePostsWithLabels() {
    postsWithLabels = posts
      .filter((post: PostItemStub) => {
        const postHasShownTag = typeof post.tags !== "undefined" && post.tags.some((tag) => $showTags.has(tag) || ancestorTagShown(tag));
        return (!$showCategories.size || $showCategories.has(post.eventType)) && (!$showTags.size || postHasShownTag);
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // trier les posts par date décroissante
      .map(getLabelVisibilityAndAlignment);

    if (!showAll) {
      postsWithLabels = postsWithLabels.slice(0, 5); // Afficher seulement les 4 derniers posts
    }
  }

  let isPageBackgroundDark: boolean;
  $: isPageBackgroundDark = $themeStore === SiteTheme.Dark || ($themeStore === SiteTheme.System && prefersColorSchemeDark(browser));

  let activeTags: Set<string>;

  function updateActiveTags() {
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

  $: {
    updatePostsWithLabels();
    updateActiveTags();
  }
</script>

<!-- The rest of your Svelte component code would be below -->

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
