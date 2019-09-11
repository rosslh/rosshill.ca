<script context="module">
  export async function preload() {
    const result = await this.fetch("index.json");
    const posts = await result.json();
    return {
      posts,
      visiblePosts: posts
    };
  }
</script>

<script>
  import { beforeUpdate, onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Posts from "../components/Posts.svelte";
  import PostControls from "../components/PostControls.svelte";

  let sort = "new";
  let searchString = "";
  export let posts = [];
  export let visiblePosts = [];

  let filterPosts = (posts, searchString) => {
    if (searchString) {
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchString) ||
          post.blurb.toLowerCase().includes(searchString) ||
          post.tags.some(x => x.includes(searchString))
      );
    }
    return posts;
  };

  let shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  let compare = (a, b, sort) => {
    switch (sort) {
      case "alpha": {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      case "revalpha": {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      }
      case "old": {
        return new Date(a.date) - new Date(b.date);
      }
      default: {
        // new
        return new Date(b.date) - new Date(a.date);
      }
    }
  };

  beforeUpdate(() => {
    const filtered = filterPosts(posts, searchString.toLowerCase());
    let sortedPosts;

    if (sort.toLowerCase() === "shuffle") {
      sortedPosts = shuffle(filtered);
    } else sortedPosts = filtered.sort((a, b) => compare(a, b, sort));

    visiblePosts = sortedPosts;
  });
</script>

<svelte:head>
  <title>Ross Hill – Website and Portfolio</title>
</svelte:head>
<Header />
<PostControls bind:sort bind:searchString />
<Posts posts={visiblePosts} />
