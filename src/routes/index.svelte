<script context="module">
  export async function load({ fetch }) {
    const result = await fetch("index.json");
    const { posts, icons } = await result.json();
    return {
      props: { posts, icons },
    };
  }
</script>

<script>
  import Intro from "$lib/components/Intro.svelte";
  import Posts from "$lib/components/Posts.svelte";

  export let posts = [];
  export let icons = {};
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/" />
</svelte:head>
<div class="mainContent">
  <Intro />
  <Posts {posts} {icons} />
</div>
