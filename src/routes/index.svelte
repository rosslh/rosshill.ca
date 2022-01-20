<script lang="ts" context="module">
  export async function load({ fetch }) {
    const result = await fetch("index.json");
    const { posts, brandColors } = await result.json();
    return {
      props: { posts, brandColors },
    };
  }
</script>

<script lang="ts">
  export let posts: PostItem[] = [];
  export let brandColors: BrandColors = {};

  import type { BrandColors, PostItem } from "$lib/types";
  
  import Intro from "$lib/components/Intro.svelte";
  import PostStubs from "$lib/components/timeline/PostStubs.svelte";
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/" />
</svelte:head>
<div class="main-content">
  <Intro />
  <PostStubs {posts} {brandColors} />
</div>
