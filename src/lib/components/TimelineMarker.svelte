<script lang="ts">
  export let left: boolean;
  export let eventType: string;

  const typeString =
    ({ job: "Job", org: "Organization", project: "Project" })[eventType] ||
    "";
</script>

<div
  aria-hidden="true"
  title={typeString}
  class="timeline-marker do-transition {left ? 'left' : 'right'} {eventType || "other"}" />

<style>
  div.timeline-marker {
    position: absolute;
    top: 50%;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
  }
  div.timeline-marker.org {
    background-color: var(--org-marker);
  }
  div.timeline-marker.job {
    background-color: var(--job-marker);
  }
  div.timeline-marker.project {
    background-color: var(--project-marker);
  }
  div.timeline-marker.other {
    background-color: var(--timeline);
  }

  div.timeline-marker.left {
    transform: translate(50%, -50%);
    position: absolute;
    left: calc(-1rem + 2px);
  }

  div.timeline-marker.right {
    transform: translate(-50%, -50%);
    position: absolute;
    right: calc(-1rem + 2px);
  }
</style>
