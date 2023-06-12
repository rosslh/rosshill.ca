<script lang="ts">
  import { scale } from "svelte/transition";
  import { PostCategory } from "$lib/types";

  export let left: boolean;
  export let eventType: PostCategory;
  export let showTooltip: boolean;

  const typeString = eventType[0]
    ? eventType[0].toUpperCase() + eventType.slice(1)
    : "";
</script>

<div
  aria-hidden="true"
  class="timeline-marker do-transition {left ? 'left' : 'right'} {eventType ?? PostCategory.Other}"

>
  {#if showTooltip}
    <span
      transition:scale={{ duration: 200 }}
      class="tooltip {left ? 'left' : 'right'} {eventType ?? PostCategory.Other}"
    >
      {typeString}
    </span>
  {/if}
</div>

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
