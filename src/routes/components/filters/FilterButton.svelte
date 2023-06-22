<script lang="ts">
  import { fade } from "svelte/transition";
  import cubicBezier from "bezier-easing";

  import type { PostCategory } from "$lib/types";

  export let active: boolean;
  export let onClick: () => void;
  export let classPrefix: PostCategory;

  import Circle from "~icons/fa-regular/circle";
  import CheckCircle from "~icons/fa-solid/check-circle";

  let isToggling = false;

  const handleClick = (): void => {
    isToggling = true;
    onClick();
    setTimeout(() => {
      isToggling = false;
    }, 300);
  };

  const ease = [0.25, 0.1, 0.25, 1.0] as const;
  const transitionOptions = {
    duration: 300,
    easing: cubicBezier(...ease),
  };
</script>

<button
  data-testid="event-filter-{classPrefix}"
  class="{classPrefix}-button"
  class:toggling={isToggling}
  class:do-transition={!isToggling}
  class:active
  on:click={handleClick}
>
  {#if active}
    <span class="symbol" transition:fade={transitionOptions}>
      <CheckCircle />
    </span>
  {:else}
    <span class="symbol" transition:fade={transitionOptions}>
      <Circle />
    </span>
  {/if}
  <span class="text">
    <slot />
  </span>
</button>

<style lang="scss">
  button {
    position: relative;
    background-color: var(--color-panel-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-m);
    height: 1.8rem;
    font-size: var(--font-size-xs);
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2xs) var(--spacing-s);
    margin: var(--spacing-2xs) var(--spacing-xs) var(--spacing-2xs) 0;

    &.toggling {
      transition: color 0.3s ease, background-color 0.3s ease,
      border-color 0.3s ease, opacity 0.3s ease;
    }

    &.job-button {
      color: var(--color-job);

      &.active {
        color: var(--color-background);
        background-color: var(--color-job);
        border-color: var(--color-job);
      }
    }

    &.project-button {
      color: var(--color-project);

      &.active {
        color: var(--color-background);
        background-color: var(--color-project);
        border-color: var(--color-project);
      }
    }

    &.other-button {
      color: var(--color-other);

      &.active {
        color: var(--color-background);
        background-color: var(--color-other);
        border-color: var(--color-other);
      }
    }

    .symbol {
      position: absolute;
      display: inline-flex;
      align-items: center;
      font-size: var(--font-size-3xs);
      left: var(--spacing-s);
    }

    .text {
      margin-left: var(--spacing-l);
    }
  }

  button > .symbol > :global(svg) {
    overflow: visible;
  }
</style>
