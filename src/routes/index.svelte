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
