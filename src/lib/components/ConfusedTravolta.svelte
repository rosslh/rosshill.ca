<script lang="ts">
  export let reason: string;

  import { remsToPixels } from "$lib/functions";
</script>

<img
  alt="John Travolta est confu{reason ? ` car ${reason}` : ''}."
  class="travolta"
  data-testid="confused-travolta"
  height={remsToPixels(20)}
  src="/travolta.gif"
  width={remsToPixels(20)}
/>

<style>
  img.travolta {
    width: 20rem;
    height: 20rem;
    display: block;
    margin: var(--spacing-xl) auto var(--spacing-2xl);
  }
</style>
