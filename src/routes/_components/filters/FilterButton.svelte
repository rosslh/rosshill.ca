<script lang="ts">
  import type { PostCategory } from "$lib/types";

  export let active: boolean;
  export let onClick: () => void;
  export let classPrefix: PostCategory;
  export let extraClasses = "";

  import Circle from "~icons/fa-regular/circle";
  import CheckCircle from "~icons/fa-solid/check-circle";

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
  data-testid="event-filter-{classPrefix}"
  class="{classPrefix}-button {isToggling ? 'toggling' : 'do-transition'} {extraClasses} {active ? 'active' : 'inactive'}"
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

<style lang="scss">
  button {
    background-color: var(--panel-background);
    border: 1px solid var(--border);
    border-radius: 0.9rem;
    height: 1.8rem;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    padding: 0 0.75rem;
    margin: 0.3rem 0.35rem 0.3rem 0;

    &.toggling {
      transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    }

    &.job-button {
      color: var(--job);

      &.active {
        color: var(--background);
        background-color: var(--job);
        border-color: var(--job);
      }
    }

    &.project-button {
      color: var(--project);

      &.active {
        color: var(--background);
        background-color: var(--project);
        border-color: var(--project);
      }
    }

    &.other-button {
      color: var(--other);

      &.active {
        color: var(--background);
        background-color: var(--other);
        border-color: var(--other);
      }
    }

    .symbol {
      position: static;
      display: inline-flex;
      align-items: center;
      margin-right: 0.3rem;
      font-size: 0.65rem;
      display: inline-flex;
      align-items: center;
    }

    .text {
      line-height: 1.2rem;
    }
  } 

  button > .symbol > :global(svg) {
    overflow: visible;
  }
</style>
