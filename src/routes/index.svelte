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
  export let posts = [];
</script>

<div class="mainContent">
  <Intro />
  <Separator />
  <Posts {posts} />
</div>
