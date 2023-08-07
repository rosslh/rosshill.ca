<script lang="ts">
  import type { PostItemStub } from "$lib/types";
  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";

  export let post: PostItemStub;
</script>

<div class="footer">
  <div class="external-links do-transition">
    {#if post.repository}
      <a target="_blank" rel="noopener noreferrer" href={post.repository}>
        GitHub
      </a>
    {/if}
    {#if post.repository && post.website}
      <InlineSeparator />
    {/if}
    {#if post.website}
      <a target="_blank" rel="noopener noreferrer" href={post.website}>
        Site web
      </a>
    {/if}
  </div>
  <PostDate date={post.date} />
</div>

<style lang="scss">
  div.footer {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0.75rem 0 calc(1.8rem + 1rem);

    div.external-links {
      flex-shrink: 0;
      color: var(--subtitle);
    }
  }
</style>
