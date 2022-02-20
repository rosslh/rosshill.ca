<script lang="ts">
  import BackLink from "$lib/components/BackLink.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
</script>

<div data-test="error" class="content-wrapper main-content">
  <BackLink />
  <h2 data-test="404-heading">404: Page not found</h2>
  <ConfusedTravolta reason="the page wasn't found" />
</div>

