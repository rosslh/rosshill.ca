<script lang="ts">
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

  $: classList = [
    `${classPrefix}-button`,
    isToggling ? "toggling" : "do-transition",
    active ? "active" : "inactive",
  ];
</script>

<button
  data-testid="event-filter-{classPrefix}"
  class={classList.join(" ")}
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
      transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
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
      position: static;
      display: inline-flex;
      align-items: center;
      margin-right: var(--spacing-2xs);
      font-size: var(--font-size-3xs);
      display: inline-flex;
      align-items: center;
    }
  } 

  button > .symbol > :global(svg) {
    overflow: visible;
  }
</style>
