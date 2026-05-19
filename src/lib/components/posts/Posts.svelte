<script lang="ts">
  import type { PostItemStub } from "$lib/types";
  import Post from "./Post.svelte";

  interface Props {
    title: string;
    posts: PostItemStub[];
    showDate?: boolean;
  }

  let { title, posts, showDate }: Props = $props();
</script>

<div class="content-wrapper">
  <h2 class="title">{title}</h2>
  <div class="posts">
    {#each posts as post}
      <Post {post} {showDate} />
    {/each}
  </div>
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  .title {
    margin: 0;
    margin-bottom: var(--spacing-m);
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--spacing-xs) * -1) calc(var(--spacing-l) * -1) 0;
    row-gap: var(--spacing-l);
  }

  @media (max-width: breakpoints.$breakpoint-xs-max) {
    .posts {
      margin: calc(var(--spacing-xs) * -1) calc(var(--spacing-m) * -1) 0;
    }
  }
</style>
