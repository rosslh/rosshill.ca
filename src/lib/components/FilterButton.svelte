<script>
  import Circle from "~icons/fa-regular/circle";
  import CheckCircle from "~icons/fa-regular/check-circle";
  export let active;
  export let onClick;
  export let classPrefix;
  export let showCheckbox = false;
  export let extraClasses = '';

  let preventTransition = false;

  const handleClick = () => {
    preventTransition = true;
    onClick();
    setTimeout(() => {
      preventTransition = false;
    }, 500);
  };
</script>

<button
  class="{classPrefix}Button {extraClasses ? extraClasses : ''} {active ? 'active' : 'inactive'} {preventTransition ? '' : 'doTransition'}"
  on:click={handleClick}
>
  {#if showCheckbox}
    <span class="symbol">
      {#if active}
        <CheckCircle />
      {:else}
        <Circle />
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
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    padding: 0 1rem;
    margin: 0.3rem 0.35rem 0.3rem 0;
  }

  button .symbol {
    position: static;
    display: inline-flex;
    align-items: center;
    margin-right: 0.3rem;
    font-size: 0.65rem;
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
