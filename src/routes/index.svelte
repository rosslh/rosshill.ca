<script context="module">
  export async function preload() {
    const result = await this.fetch("index.json");
    const posts = await result.json();
    return {
      posts
    };
  }
</script>

<script>
  import Intro from "../components/Intro.svelte";
  import Separator from "../components/Separator.svelte";
  import Posts from "../components/Posts.svelte";

  import { onMount } from "svelte";
  onMount(async () => {
    gtag("config", "UA-93549235-3", { page_path: "/" });
  });

  export let posts = [];
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/" />
</svelte:head>
<div class="mainContent">
  <Intro />
  <Separator />
  <Posts {posts} />
</div>
