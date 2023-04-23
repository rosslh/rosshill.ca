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
      margin-left: calc(-var(--spacing-m) + 3px) !important;
      margin-right: calc(100% - var(--spacing-m)) !important;
    }

    div.bottom-marker.right {
      margin-left: calc(100% - var(--spacing-m)) !important;
      margin-right: calc(-var(--spacing-m) + 3px) !important;
    }
  }

  div.post-spacer {
    height: 3rem !important;

    &.left {
      border-left: 3px solid var(--color-timeline);
      margin-left: 25%;
    }

    &.right {
      border-right: 3px solid var(--color-timeline);
      margin-right: 25%;
    }
  }

  div.bottom-marker {
    border-bottom: 3px solid var(--color-timeline);

    &.left {
      margin-right: calc(75% - var(--spacing-m));
      margin-left: calc(25% - var(--spacing-m) + 3px);
    }

    &.right {
      margin-right: calc(25% - var(--spacing-m) + 3px);
      margin-left: calc(75% - var(--spacing-m));
    }
  }
</style>