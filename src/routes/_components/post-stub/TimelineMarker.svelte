<script lang="ts">
  import { PostCategory } from "$lib/types";

  export let left: boolean;
  export let eventType: PostCategory;

  const typeString = eventType[0].toUpperCase() + eventType.slice(1);
</script>

<div
  aria-hidden="true"
  title={typeString ?? ""}
  class="timeline-marker do-transition {left ? 'left' : 'right'} {eventType ?? PostCategory.Other}" />

<style lang="scss">
  div.timeline-marker {
    position: absolute;
    top: 50%;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;

    &.other {
      background-color: var(--other-marker);
    }

    &.job {
      background-color: var(--job-marker);
    }

    &.project {
      background-color: var(--project-marker);
    }

    &.left {
      transform: translate(50%, -50%);
      position: absolute;
      left: calc(-1rem + 2px);
    }

    &.right {
      transform: translate(-50%, -50%);
      position: absolute;
      right: calc(-1rem + 2px);
    }
  }
</style>
