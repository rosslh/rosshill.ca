<script lang="ts">
  export let left: boolean;
  export let showBottomBorder = false;
</script>

<div
  aria-hidden="true"
  class="post-spacer do-transition {left ? 'left' : 'right'}"
/>
{#if showBottomBorder}
  <div
    aria-hidden="true"
    class="bottom-marker do-transition {left ? 'left' : 'right'}"
  />
{/if}

<style lang="scss">
  @media (max-width: 1200px) {
    div.post-spacer {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    div.bottom-marker.left {
      margin-left: calc(-1rem + 3px) !important;
      margin-right: calc(100% - 1rem) !important;
    }

    div.bottom-marker.right {
      margin-left: calc(100% - 1rem) !important;
      margin-right: calc(-1rem + 3px) !important;
    }
  }

  div.post-spacer {
    height: 3rem !important;

    &.left {
      border-left: 3px solid var(--timeline);
      margin-left: 25%;
    }

    &.right {
      border-right: 3px solid var(--timeline);
      margin-right: 25%;
    }
  }

  div.bottom-marker {
    border-bottom: 3px solid var(--timeline);

    &.left {
      margin-right: calc(75% - 1rem);
      margin-left: calc(25% - 1rem + 3px);
    }

    &.right {
      margin-right: calc(25% - 1rem + 3px);
      margin-left: calc(75% - 1rem);
    }
  }
</style>