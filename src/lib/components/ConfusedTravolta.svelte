<script lang="ts">
  export let reason: string;

  import { remsToPixels } from "$lib/functions";
</script>

<img
  data-testid="confused-travolta"
  class="travolta"
  src="/travolta.gif"
  alt="John Travolta looking confused{reason ? ` because ${reason}` : ''}."
  width={remsToPixels(20)}
  height={remsToPixels(20)} />

<style>
  img.travolta {
    width: 20rem;
    height: 20rem;
    display: block;
    margin: var(--spacing-xl) auto var(--spacing-2xl);
  }
</style>