<script lang="ts">
  import BackLink from "$lib/components/BackLink.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";
</script>

<div data-testid="error" class="content-wrapper main-content">
  <BackLink />
  <h2 data-testid="404-heading">404: Page introuvable</h2>
  <ConfusedTravolta reason="la page n'a pas été trouvée" />
</div>
