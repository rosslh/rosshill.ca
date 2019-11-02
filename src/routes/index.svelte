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
  import Sidebar from "../components/Sidebar.svelte";
  import Intro from "../components/Intro.svelte";
  import Separator from "../components/Separator.svelte";
  import Posts from "../components/Posts.svelte";
  export let posts = [];
</script>

<svelte:head>
  <title>Ross Hill – Website and Portfolio</title>
</svelte:head>
<div class="twoColumn">
  <Sidebar />
  <div class="mainContent">
    <Intro />
    <Separator />
    <Posts {posts} />
  </div>
</div>
