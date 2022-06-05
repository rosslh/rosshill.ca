<script lang="ts">
  import type { PostType } from "$lib/types";

  export let left: boolean;
  export let eventType: PostType;

  const typeString = ({ job: "Job", other: "Other", project: "Project" })[eventType];
</script>

<div
  aria-hidden="true"
  title={typeString ?? ""}
  class="timeline-marker do-transition {left ? 'left' : 'right'} {eventType ?? "other"}" />

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
