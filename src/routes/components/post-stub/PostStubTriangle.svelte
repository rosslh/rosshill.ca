<script lang="ts">
  export let left: boolean;

  $: positionString = left ? "left" : "right";
</script>

<div aria-hidden="true" class="arrow arrow-{positionString} do-transition" />
<div aria-hidden="true" class="arrow-border arrow-{positionString}-border do-transition" />

<style lang="scss">
  .arrow {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;

    &.arrow-left {
      transform: translate(-50%, -50%);
      left: -0.2rem;
      border-right: 16px solid var(--color-panel-background);
    }

    &.arrow-right {
      transform: translate(50%, -50%);
      right: -0.2rem;
      border-left: 16px solid var(--color-panel-background);
    }
  }

  .arrow-border {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18.5px solid transparent;
    border-bottom: 18.5px solid transparent;
    position: absolute;
    top: 50%;

    &.arrow-left-border {
      transform: translate(-50%, -50%);
      left: -0.2rem;
      border-right: 18.5px solid var(--color-border);
    }

    &.arrow-right-border {
      transform: translate(50%, -50%);
      right: -0.2rem;
      border-left: 18.5px solid var(--color-border);
    }
  }
</style>
