<script lang="ts">
  import { fade } from "svelte/transition";
  import cubicBezier from "bezier-easing";

  import type { PostCategory } from "$lib/types";

  import Circle from "~icons/fa-regular/circle";
  import CheckCircle from "~icons/fa-solid/check-circle";

  interface Props {
    active: boolean;
    onClick: () => void;
    classPrefix: PostCategory;
    children?: import("svelte").Snippet;
  }

  let { active, onClick, classPrefix, children }: Props = $props();

  let isToggling = $state(false);

  const handleClick = (): void => {
    isToggling = true;
    onClick();
    setTimeout(() => {
      isToggling = false;
    }, 300);
  };

  const transitionOptions = {
    duration: 300,
    easing: cubicBezier(0.25, 0.1, 0.25, 1),
  };
</script>

<button
  data-testid="event-filter-{classPrefix}"
  class="{classPrefix}-button"
  class:toggling={isToggling}
  class:transition-colors={!isToggling}
  class:active
  onclick={handleClick}
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
    {@render children?.()}
  </span>
</button>

<style lang="scss">
  button {
    position: relative;
    background-color: var(--color-panel-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-s);
    height: 1.8rem;
    font-size: var(--font-size-xs);
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2xs) var(--spacing-s);
    margin: var(--spacing-2xs) var(--spacing-xs) var(--spacing-2xs) 0;

    &.toggling {
      transition:
        color 0.3s ease,
        background-color 0.3s ease,
        border-color 0.3s ease,
        opacity 0.3s ease;
    }

    &.work-button {
      color: var(--color-work);

      &.active {
        color: var(--color-background);
        background-color: var(--color-work);
        border-color: var(--color-work);
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
      font-size: 0.7rem;
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
