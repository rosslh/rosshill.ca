<script lang="ts">
  import { PostCategory } from "$lib/types";

  interface Props {
    left: boolean;
    eventType: PostCategory;
  }

  let { left, eventType }: Props = $props();
</script>

<div
  aria-hidden="true"
  class="timeline-marker transition-colors {left
    ? 'left'
    : 'right'} {eventType ?? PostCategory.Other}"
></div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.timeline-marker {
    position: absolute;
    top: 50%;
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 50%;
    background-color: var(--color-timeline-marker);

    &.left {
      transform: translate(50%, -50%);
      position: absolute;
      left: calc(-0.7rem - 1px);
    }

    &.right {
      transform: translate(-50%, -50%);
      position: absolute;
      right: calc(-0.7rem - 1px);
    }
  }
</style>
