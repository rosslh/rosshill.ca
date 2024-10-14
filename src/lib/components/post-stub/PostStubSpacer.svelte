<script lang="ts">
  interface Props {
    left: boolean;
    showBottomBorder?: boolean;
  }

  let { left, showBottomBorder = false }: Props = $props();
</script>

<div
  aria-hidden="true"
  class="post-spacer transition-colors {left ? 'left' : 'right'}"
></div>
{#if showBottomBorder}
  <div
    aria-hidden="true"
    class="bottom-marker transition-colors {left ? 'left' : 'right'}"
  ></div>
{/if}

<style lang="scss">
  @import "src/lib/styles/media-queries";

  @media (max-width: $breakpoint-l-max) {
    div.post-spacer {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    div.bottom-marker.left {
      margin-left: calc((-1 * var(--spacing-m)) + 3px) !important;
      margin-right: calc(100% - var(--spacing-m)) !important;
    }

    div.bottom-marker.right {
      margin-left: calc(100% - var(--spacing-m)) !important;
      margin-right: calc((-1 * var(--spacing-m)) + 3px) !important;
    }
  }

  div.post-spacer {
    height: var(--spacing-3xl) !important;

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
