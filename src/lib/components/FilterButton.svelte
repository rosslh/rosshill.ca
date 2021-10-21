<script>
  import Circle from "~icons/fa-regular/circle";
  import CheckCircle from "~icons/fa-solid/check-circle";
  export let active;
  export let onClick;
  export let classPrefix;
  export let extraClasses = '';

  let isToggling = false;

  const handleClick = () => {
    isToggling = true;
    onClick();
    setTimeout(() => {
      isToggling = false;
    }, 300);
  };
</script>

<button
  class="{classPrefix}Button {isToggling ? 'toggling': 'doTransition'} {extraClasses ? extraClasses : ''} {active ? 'active' : 'inactive'}"
  on:click={handleClick}
>
  <span class="symbol">
    {#if active}
      <CheckCircle />
    {:else}
      <Circle />
    {/if}
  </span>
  <span class="text">
    <slot />
  </span>
</button>

<style>
  button {
    background-color: var(--postBackground);
    border: 1px solid var(--postBorder);
    border-radius: 0.9rem;
    height: 1.8rem;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    padding: 0 0.75rem;
    margin: 0.3rem 0.35rem 0.3rem 0;
  }

  button.toggling {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
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

  button.jobButton {
    color: var(--job);
  }

  button.jobButton.active {
    color: var(--background);
    background-color: var(--job);
    border-color: var(--job);
  }

  button.projectButton {
    color: var(--project);
  }

  button.projectButton.active {
    color: var(--background);
    background-color: var(--project);
    border-color: var(--project);
  }

  button.orgButton {
    color: var(--org);
  }

  button.orgButton.active {
    color: var(--background);
    background-color: var(--org);
    border-color: var(--org);
  }
</style>
