<script lang="ts">
  import type { PostItem } from "$lib/types";
  
  export let post: PostItem;

  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
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
        Website
      </a>
    {/if}
  </div>
  <PostDate date={post.date} />
</div>

<style lang="scss">
  div.footer {
    font-size: 0.8rem;
    padding: 0.75rem 0.75rem 0 calc(1.8rem + 1rem);
    display: flex;
    justify-content: space-between;
    align-items: center;

    div.external-links {
      color: var(--subtitle);
    }
  }
</style>