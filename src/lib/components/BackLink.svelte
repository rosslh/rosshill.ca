<script lang="ts">
  import LeftArrow from "~icons/ci/arrow-left-md";

  interface Props {
    href?: string;
  }

  let { href = "/" }: Props = $props();
</script>

<a data-sveltekit-preload-data data-testid="back-link" class="back-link" {href}>
  <LeftArrow /> Home page
</a>

<style>
  a.back-link {
    display: inline-flex;
    align-items: center;
    margin: var(--spacing-2xl) 0 var(--spacing-xl);
    font-size: var(--font-size-xs);
  }

  a.back-link > :global(svg) {
    margin-right: var(--spacing-2xs);
  }
</style>
