<script lang="ts">
  export let href = "/";

  import LeftArrow from "~icons/feather/corner-up-left";
</script>

<a class="back-link" data-sveltekit-preload-data data-testid="back-link" {href}>
  <LeftArrow />
  Retour au site
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
