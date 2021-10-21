<script>
  export let href = "/";

  import LeftArrow from '~icons/feather/corner-up-left';
</script>

<a rel="prefetch" class="backLink" {href}>
  <LeftArrow /> Back to Home
</a>

<style>
  a.backLink {
    display: inline-flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  :global(a.backLink > svg) {
    margin-right: 0.5rem;
  }
</style>