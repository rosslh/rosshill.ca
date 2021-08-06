<script>
  export let left;
  export let showBottomMarker = false;
</script>

<div
  aria-hidden="true"
  class="postSpacer doTransition {left ? 'left' : 'right'}"
/>
{#if showBottomMarker}
  <div
    aria-hidden="true"
    class="bottomMarker doTransition {left ? 'left' : 'right'}"
  />
{/if}

<style>
  @media (max-width: 1200px) {
    div.postSpacer {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    div.bottomMarker.left {
      margin-left: calc(-1rem + 3px) !important;
      margin-right: calc(100% - 1rem) !important;
    }

    div.bottomMarker.right {
      margin-left: calc(100% - 1rem) !important;
      margin-right: calc(-1rem + 3px) !important;
    }
  }

  div.postSpacer {
    height: 3rem !important;
  }

  div.postSpacer.left {
    border-left: 3px solid var(--timeline);
    margin-left: 25%;
  }

  div.postSpacer.right {
    border-right: 3px solid var(--timeline);
    margin-right: 25%;
  }

  div.bottomMarker {
    border-bottom: 3px solid var(--timeline);
    margin-bottom: 2rem;
  }

  div.bottomMarker.left {
    margin-right: calc(75% - 1rem);
    margin-left: calc(25% - 1rem + 3px);
  }

  div.bottomMarker.right {
    margin-right: calc(25% - 1rem + 3px);
    margin-left: calc(75% - 1rem);
  }
</style>