<script>
  import FaRegCircle from "svelte-icons/fa/FaRegCircle.svelte";
  import FaRegCheckCircle from "svelte-icons/fa/FaRegCheckCircle.svelte";
  export let active;
  export let callback;
  export let classPrefix;
  export let showCheckbox = false;
  export let small = false;

  let preventTransition = false;

  const handleClick = () => {
    preventTransition = true;
    callback();
    setTimeout(() => {
      preventTransition=false;
    }, 500);
  };
</script>

<button
  class="{classPrefix}Button {small ? 'small' : ''} {active ? 'active' : 'inactive'} {preventTransition ? '' : 'doTransition'}"
  on:click={handleClick}
>
  {#if showCheckbox}
    <span class="symbol">
      {#if active}
        <FaRegCheckCircle />
      {:else}
        <FaRegCircle />
      {/if}
    </span>
  {/if}
  <span class="text">
    <slot />
  </span>
</button>

<style>
  button {
    background-color: var(--postBackground);
    border: 1px solid var(--foreground);
    border-radius: 0.9rem;
    height: 1.8rem;
    cursor: pointer;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    padding: 0 1rem;
    margin: 0.3rem 0.35rem 0.3rem 0;
  }

  button.small {
    height: 1.5rem;
    padding: 0 0.25rem;
  }

  button .symbol {
    position: static;
    margin-right: 0.3rem;
    width: 0.8rem;
    display: inline-flex;
    align-items: center;
  }

  :global(button > .symbol > svg) {
    overflow: visible;
  }

  button .text {
    line-height: 1.2rem;
  }

  button.inactive {
    border-color: var(--postBorder) !important;
  }

  button.active {
    box-shadow: var(--boxShadow);
  }

  button.jobButton {
    color: var(--job);
    border-color: var(--job);
  }

  button.projectButton {
    color: var(--project);
    border-color: var(--project);
  }

  button.orgButton {
    color: var(--org);
    border-color: var(--org);
  }

  button.tagButton {
    border-color: var(--activeTagBorder);
  }

  button.tagButton.inactive {
    opacity: 0.85;
  }

  :global(button.tagButton .tag) {
    margin: 0 !important;
  }
</style>
