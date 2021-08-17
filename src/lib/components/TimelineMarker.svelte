<script>
  export let left;
  export let eventType;

  const typeString =
    ({ job: "Job", org: "Organization", project: "Project" })[eventType] ||
    "";
</script>

<div
  aria-hidden="true"
  title={typeString}
  class="timelineMarker doTransition {left ? 'left' : 'right'} {eventType || "other"}" />

<style>
  div.timelineMarker {
    position: absolute;
    top: 50%;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
  }
  div.timelineMarker.org {
    background-color: var(--org-marker);
  }
  div.timelineMarker.job {
    background-color: var(--job-marker);
  }
  div.timelineMarker.project {
    background-color: var(--project-marker);
  }
  div.timelineMarker.other {
    background-color: var(--other-marker);
  }

  div.timelineMarker.left {
    transform: translate(50%, -50%);
    position: absolute;
    left: calc(-1rem + 2px);
  }

  div.timelineMarker.right {
    transform: translate(-50%, -50%);
    position: absolute;
    right: calc(-1rem + 2px);
  }
</style>
