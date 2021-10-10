<script>
  export let posts;
  import Post from "./Post.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./FilterControls.svelte";
  import { tagParents } from "$lib/constants";
  import ConfusedTravolta from "./ConfusedTravolta.svelte";

  const postsMap = (post, i, postsArray) => {
    const prevLeftAligned = i === 0 ? false : postsArray[i - 1].leftAligned;
    const prevYear = i === 0 ? 0 : getYearFromDate(postsArray[i - 1].date);

    const year = getYearFromDate(post.date);

    if (year !== prevYear) {
      post.showYearLabel = true;
      post.leftAligned = !prevLeftAligned;
    } else {
      post.showYearLabel = false;
      post.leftAligned = prevLeftAligned;
    }
    
    return post;
  };

  let showCategories = [];
  let showTags = [];

  $: categoryFilter = post => {
    return !showCategories.length || showCategories.includes(post.eventType);
  };

  $: parentTagShown = tag => { // TODO: why does this work without reactive declaration?
    return tagParents[tag] && tagParents[tag].some(parentTag => showTags.includes(parentTag));
  };

  $: tagFilter = post => {
    const postHasShownTag = typeof post.tags !== "undefined" && post.tags.some(tag => showTags.includes(tag) || parentTagShown(tag));
    return !showTags.length || postHasShownTag;
  };

  $: postsWithLabels = posts.filter(post => categoryFilter(post) && tagFilter(post)).map(postsMap);

  const getYearFromDate = date => Number(date.substring(0, 4));
</script>

<div class="headingWrapper contentWrapper ">
  <h2>Experience</h2>
  <FilterControls bind:showCategories bind:showTags {posts} />
</div>
<div class="contentWrapper postsWrapper">
  <div class="posts">
    {#each postsWithLabels as post, i (post.slug)}
      <YearLabel
        display={post.showYearLabel}
        firstLabel={i === 0}
        rightToLeft={post.leftAligned}
        year={getYearFromDate(post.date)}
      />
      {#key `${i}|${post.leftAligned}`}
        <Post
          {post}
          firstPost={i === 0}
          lastPost={i === postsWithLabels.length - 1}
          left={post.leftAligned}
        />
      {/key}
    {/each}
    {#if !postsWithLabels.length}
      <ConfusedTravolta />
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
    margin-top: 3.5rem;
    margin-bottom: 2rem;
  }
  div.headingWrapper h2 {
    margin-bottom: 1rem;
  }
</style>
