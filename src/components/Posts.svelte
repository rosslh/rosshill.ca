<script>
  export let posts;
  import Post from "./Post.svelte";
  import YearLabel from "./YearLabel.svelte";

  let year = 0;
  let labelIndices = [];

  const addLabelForNewYear = (date, i) => {
    const yearFromDate = getYearFromDate(date);
    if (yearFromDate !== year) {
      year = yearFromDate;
      if (!labelIndices.includes(i)) labelIndices.push(i);
    }
    return "";
  };

  const getYearFromDate = date => {
    return Number(date.substring(0, 4));
  };
</script>

<style>
  div.contentWrapper {
    padding-top: 2rem !important;
  }

  div.contentWrapper.postsWrapper {
    padding: 0;
  }
  div.posts {
    padding: 0 1rem;
    margin: 1.5rem auto 0;
  }
  @media (min-width: 700px) {
    div.contentWrapper.postsWrapper {
      padding: 0 2rem !important;
    }
  }
</style>

<div class="contentWrapper ">
  <h2>Timeline</h2>
</div>
<div class="contentWrapper postsWrapper">
  <div class="posts">
    {#each posts as post, i}
      {addLabelForNewYear(post.date, i)}
      <YearLabel
        firstLabel={i === 0}
        display={labelIndices.includes(i)}
        direction={labelIndices.length % 2 !== 0}
        year={getYearFromDate(post.date)} />
      <Post
        {post}
        firstPost={i === 0}
        lastPost={i === posts.length - 1}
        left={labelIndices.length % 2 !== 0} />
    {/each}
  </div>
</div>
