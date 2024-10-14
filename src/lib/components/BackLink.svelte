<script lang="ts">
  import LeftArrow from "~icons/feather/corner-up-left";

  interface Props {
    href?: string;
  }

  let { href = "/" }: Props = $props();
</script>

<a data-sveltekit-preload-data data-testid="back-link" class="back-link" {href}>
  <LeftArrow /> Back to Home
</a>

<style>
  a.back-link {
    display: inline-flex;
    align-items: center;
    margin: var(--spacing-2xl) 0 var(--spacing-xl);
  }

  a.back-link > :global(svg) {
    margin-right: var(--spacing-xs);
  }
</style>
