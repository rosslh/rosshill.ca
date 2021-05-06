<script>
  export let left;
</script>

<div
  aria-hidden="true"
  class="timelineMarker doTransition {left ? 'left' : 'right'}" />

<style>
  div.timelineMarker {
    position: absolute;
    top: 50%;
    background-color: var(--background);
    border: 3px solid var(--timeline);
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
  }
  div.timelineMarker.left {
    transform: translate(50%, -50%);
    position: absolute;
    left: calc(-1rem + 1.5px);
  }

  div.timelineMarker.right {
    transform: translate(-50%, -50%);
    position: absolute;
    right: calc(-1rem + 1.5px);
  }
</style>
