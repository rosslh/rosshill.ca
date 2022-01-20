<script lang="ts">
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import { draw } from "svelte/transition";
  
  import { reduceMotion } from "$lib/constants";
  import svgPath from "$lib/components/sidebar/NameSvg";

  let showTitle = false;
  let logoHasFill = false;
  let doneFilling = false;

  onMount(() => {
    showTitle = true;
  });

  const logoFillDelay = reduceMotion ? 0 : 1000;

  // Graceful degradation for name animation
  const serverRendered = typeof window === "undefined";
  $: getPathClass = () => {
    if (serverRendered) {
      return "server-rendered";
    }
    let className = logoHasFill ? "logo-has-fill" : "initial";
    if (doneFilling) {
      className += " done-filling";
    }
    return className;
  };
</script>

<svg
  class={serverRendered ? "ssr-fade-in" : ""}
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 368.7 73.501"
>
  <title>Ross Hill</title>
  <g>
    {#if showTitle || serverRendered}
      <path
        class={getPathClass()}
        on:introstart={serverRendered ? null : () => {
          setTimeout(() => (logoHasFill = true), logoFillDelay);
          setTimeout(() => (doneFilling = true), logoFillDelay + 900);
        }}
        in:draw={serverRendered ? null : { duration: 3000, easing: sineIn }}
        d={svgPath}
      />
    {/if}
  </g>
</svg>

<style lang="scss">
  svg {
    height: 60%;
    width: 60%;
    pointer-events: none;
    transition: fill 0.9s ease, stroke 0.9s ease;

    &.ssr-fade-in {
      opacity: 0;
      animation: fade-in-animation ease-in 0.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-delay: 3s;
    }

    path {
      stroke: var(--heading);
      stroke-width: 1px;
      transition: fill 0.9s ease, stroke 0.9s ease;

      &.initial {
        fill: var(--panel-background);
      }

      &.server-rendered {
        fill: var(--heading);
      }

      &.logo-has-fill {
        fill: var(--heading);
        stroke: var(--panel-background);
      }

      &.done-filling {
        transition: fill 0.5s ease, stroke 0.5s ease !important;
      }
    }
  }

  @keyframes fade-in-animation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
  }

  @media (max-width: 1000px) {
    svg path.initial {
      fill: var(--background);
    }
  }
</style>
