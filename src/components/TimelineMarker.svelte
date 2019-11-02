<script>
  export let left;
</script>

<style>
  div.timelineMarker {
    position: absolute;
    top: 50%;
    background-color: var(--background);
    border: 3px solid var(--timelineMarker);
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
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

<div aria-hidden="true" class="timelineMarker {left ? 'left' : 'right'}" />
