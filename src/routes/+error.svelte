<script lang="ts">
  import { page } from "$app/stores";

  import BackLink from "$lib/components/BackLink.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";

  const original404ErrorMessage = "Not Found";
  const code = $page.error?.message === original404ErrorMessage ? 404 : 500;
  const message = $page.error?.message === original404ErrorMessage
    ? "Page not found"
    : "That's an error";
</script>

<div data-testid="error" class="content-wrapper main-content">
  <BackLink />
  <h2 data-testid="error-heading">{code}: {message}</h2>
  <ConfusedTravolta
    reason={code === 404 ? "the page wasn't found" : "something went wrong"}
  />
</div>
