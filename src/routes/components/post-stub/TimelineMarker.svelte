<script lang="ts">
  import { PostCategory } from "$lib/types";

  export let left: boolean;
  export let eventType: PostCategory;

  const typeString = eventType[0]
    ? eventType[0].toUpperCase() + eventType.slice(1)
    : "";
</script>

<div
  aria-hidden="true"
  title={typeString ?? ""}
  class="timeline-marker do-transition {left ? 'left' : 'right'} {eventType ?? PostCategory.Other}"></div>

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

  div.timeline-marker {
    position: absolute;
    top: 50%;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;

    &.other {
      background-color: var(--color-other-marker);
    }

    &.job {
      background-color: var(--color-job-marker);
    }

    &.project {
      background-color: var(--color-project-marker);
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

  .tooltip {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;

    &.other {
      color: var(--color-other-marker);
    }

    &.job {
      color: var(--color-job-marker);
    }

    &.project {
      color: var(--color-project-marker);
    }

    &.left {
      right: calc(100% + 0.75rem);
    }

    &.right {
      left: calc(100% + 0.75rem);
    }
  }

  @media (max-width: $breakpoint-m-max) {
    .tooltip {
      display: none;
    }
  }
</style>
