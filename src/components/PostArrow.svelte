<script>
  export let left;
</script>

{#if left}
  <div aria-hidden="true" class="arrowLeft" />
  <div aria-hidden="true" class="arrowLeftBorder" />
{:else}
  <div aria-hidden="true" class="arrowRight" />
  <div aria-hidden="true" class="arrowRightBorder" />
{/if}

<style>
  .arrowRight {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 16px solid var(--postBackground);
  }

  .arrowRightBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18.5px solid transparent;
    border-bottom: 18.5px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 18.5px solid var(--postBorder);
  }

  .arrowLeft {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 16px solid var(--postBackground);
  }

  .arrowLeftBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18.5px solid transparent;
    border-bottom: 18.5px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 18.5px solid var(--postBorder);
  }
</style>
