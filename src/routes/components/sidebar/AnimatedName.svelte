<script lang="ts">
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import { draw } from "svelte/transition";
  import { browser } from "$app/environment";

  import { reduceMotion } from "$lib/reduceMotion";
  import svgPath from "./NameSvg";

  let showTitle = false;
  let logoHasFill = false;
  let doneFilling = false;

  onMount(() => {
    showTitle = true;
  });

  const logoFillDelay = reduceMotion ? 0 : 1000;

  // Graceful degradation for name animation
  $: getPathClass = (): string => {
    if (!browser) {
      return "server-rendered";
    }
    const classNames = [logoHasFill ? "logo-has-fill" : "initial"];
    if (doneFilling) {
      classNames.push("done-filling");
    }
    return classNames.join(" ");
  };
</script>

<div class="name-wrapper do-transition">
  <div class="name-background do-transition" />
  <svg
    class:ssr-fade-in={!browser}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 368.7 73.501"

  >
    <g>
      {#if showTitle || !browser}
        <path
          class={getPathClass()}
          on:introstart={!browser
            ? null
            : () => {
                setTimeout(() => {
                  logoHasFill = true;
                }, logoFillDelay);
                setTimeout(() => {
                  doneFilling = true;
                }, logoFillDelay + 900);
              }}
          in:draw={!browser ? undefined : { duration: 3000, easing: sineIn }}
          d={svgPath}
        />
      {/if}
    </g>
  </svg>
  <h1>Ross Hill</h1>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

  svg {
    height: 100%;
    overflow: visible;
    width: 100%;
    pointer-events: none;
    transition: fill 0.9s ease, stroke 0.9s ease;
    position: relative;
    z-index: 10;

    &.ssr-fade-in {
      opacity: 0;
      animation: fade-in-animation ease-in 0.3s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-delay: 3s;
    }

    path {
      stroke: var(--color-heading);
      stroke-width: 1px;
      transition: fill 0.9s ease, stroke 0.9s ease;

      &.initial {
        fill: var(--color-panel-background);
      }

      &.server-rendered {
        fill: var(--color-heading);
      }

      &.logo-has-fill {
        fill: var(--color-heading);
        stroke: var(--color-panel-background);
      }

      &.done-filling {
        transition: fill 0.3s ease, stroke 0.3s ease !important;
      }
    }
  }

  .name-background {
    position: absolute;
    z-index: 5;
    inset: 0;
    background-color: var(--color-panel-background);
  }

  @media (max-width: $breakpoint-s-max) {
    .name-background {
      background-color: var(--color-background);
    }
  }

  .name-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: var(--spacing-2xl) auto var(--spacing-s);
  }

  h1 {
    position: absolute;
    z-index: -1;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-3xs);
    white-space: nowrap;
  }

  @keyframes fade-in-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: $breakpoint-s-max) {
    svg path.initial {
      fill: var(--color-background);
    }
  }
</style>
