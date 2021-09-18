<script>
  import { remsToPixels } from "$lib/functions";
</script>

<img
  class="travolta"
  src="/travolta.gif"
  alt="Vincent Vega from Pulp Fiction (played by John Travolta) looking around confused because the page wasn't found."
  width={remsToPixels(20)}
  height={remsToPixels(20)} />

<style>
  img.travolta {
    width: 20rem;
    height: 20rem;
    display: block;
    margin: 1.5rem auto 2rem;
  }
</style>