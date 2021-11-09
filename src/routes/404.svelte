<script lang="ts">
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
  import BackLink from '$lib/components/BackLink.svelte';
</script>

<div class="contentWrapper mainContent">
  <BackLink />
  <h2>404: Page not found</h2>
  <ConfusedTravolta reason="the page wasn't found" />
</div>

