<script>
import { remsToPixels } from "$lib/functions";
</script>

<div class="contentWrapper mainContent">
  <a rel="prefetch" class="backLink" href="/">
    &larr; Back to Home
  </a>
  <h2>404: Page not found</h2>

  <img
    class="travolta"
    src="/travolta.gif"
    alt="Vincent Vega from Pulp Fiction (played by John Travolta) looking around confused because the page wasn't found."
    width={remsToPixels(20)}
    height={remsToPixels(20)} />

</div>

<style>
  img.travolta {
    width: 20rem;
    height: 20rem;
    display: block;
    margin: 1rem auto 2rem;
  }
</style>