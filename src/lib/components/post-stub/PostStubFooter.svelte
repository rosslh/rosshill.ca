<script lang="ts">
  import type { PostItemStub } from "$lib/types";

  export let post: PostItemStub;

  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
</script>

<div class="footer">
  <div class="external-links transition-colors">
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
        Website
      </a>
    {/if}
  </div>
  <PostDate date={post.date} />
</div>

<style lang="scss">
  div.footer {
    font-size: var(--font-size-2xs);
    padding: var(--spacing-s) var(--spacing-s) 0
      calc(var(--spacing-3xl) - var(--spacing-2xs));
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-s);

    div.external-links {
      flex-shrink: 0;
      color: var(--color-subtitle);
    }
  }
</style>
