<script lang="ts">
  export let left: boolean;
</script>

{#if left}
  <div aria-hidden="true" class="arrow-left do-transition" />
  <div aria-hidden="true" class="arrow-left-border do-transition" />
{:else}
  <div aria-hidden="true" class="arrow-right do-transition" />
  <div aria-hidden="true" class="arrow-right-border do-transition" />
{/if}

<style>
  .arrow-right {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: -0.2rem;
    border-left: 16px solid var(--panel-background);
  }

  .arrow-right-border {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18.5px solid transparent;
    border-bottom: 18.5px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: -0.2rem;
    border-left: 18.5px solid var(--border);
  }

  .arrow-left {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: -0.2rem;
    border-right: 16px solid var(--panel-background);
  }

  .arrow-left-border {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18.5px solid transparent;
    border-bottom: 18.5px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: -0.2rem;
    border-right: 18.5px solid var(--border);
  }
</style>
