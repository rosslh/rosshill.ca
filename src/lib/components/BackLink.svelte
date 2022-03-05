<script lang="ts">
  export let href = "/";

  import LeftArrow from "~icons/feather/corner-up-left";
</script>

<a sveltekit:prefetch data-test="back-link" class="back-link" {href}>
  <LeftArrow /> Back to Home
</a>

<style>
  a.back-link {
    display: inline-flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  a.back-link > :global(svg) {
    margin-right: 0.5rem;
  }
</style>