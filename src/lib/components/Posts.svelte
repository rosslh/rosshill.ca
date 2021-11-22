<script lang="ts">
  export let posts: PostItem[];
  
  export let brandColors: BrandColors;

  import { showCategories, showTags } from "$lib/stores";
  import type { BrandColors, PostItem } from "$lib/types";
  import Post from "./Post.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./FilterControls.svelte";
  import { tagParents } from "$lib/constants";
  import ConfusedTravolta from "./ConfusedTravolta.svelte";

  const setLabelVisibilityAndAlignment = (post: PostItem, i: number, postsArray: PostItem[]) => {
    const prevLeftAligned = i === 0 ? false : postsArray[i - 1].isLeftAligned;
    const prevYear = i === 0 ? 0 : getYearFromDate(postsArray[i - 1].date);

    const year = getYearFromDate(post.date);

    if (year !== prevYear) {
      post.showYearLabel = true;
      post.isLeftAligned = !prevLeftAligned;
    } else {
      post.showYearLabel = false;
      post.isLeftAligned = prevLeftAligned;
    }
    
    return post;
  };

  $: categoryFilter = (post: PostItem) => {
    return !$showCategories.length || $showCategories.includes(post.eventType);
  };

  $: parentTagShown = (tag: string) => {
    return tagParents[tag] && tagParents[tag].some((parentTag: string) => $showTags.includes(parentTag));
  };

  $: tagFilter = (post: PostItem) => {
    const postHasShownTag = typeof post.tags !== "undefined" && post.tags.some(tag => $showTags.includes(tag) || parentTagShown(tag));
    return !$showTags.length || postHasShownTag;
  };

  $: postsWithLabels = posts
    .filter((post: PostItem) => categoryFilter(post) && tagFilter(post))
    .map(setLabelVisibilityAndAlignment);

  const getYearFromDate = (date: string) => Number(date.substring(0, 4));
</script>

<div class="headingWrapper contentWrapper ">
  <h2>Experience</h2>
  <FilterControls bind:showCategories={$showCategories} bind:showTags={$showTags} {posts} {brandColors} />
</div>
<div class="contentWrapper postsWrapper">
  <div class="posts">
    {#each postsWithLabels as post, i (post.slug)}
      {#if post.showYearLabel}
        <YearLabel
          isFirstLabel={i === 0}
          isRightToLeft={post.isLeftAligned}
          year={getYearFromDate(post.date)}
        />
      {/if}
      <!-- Only transition if index or alignment changes -->
      {#key `${i}|${post.isLeftAligned}`}
        <Post
          {post}
          {brandColors}
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
  div.contentWrapper.postsWrapper {
    padding: 0;
  }
  div.posts {
    padding: 0 1rem;
    margin: 2rem auto 0;
  }
  @media (min-width: 700px) {
    div.contentWrapper.postsWrapper {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  div.headingWrapper {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
</style>
