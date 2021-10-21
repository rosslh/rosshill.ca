<script>
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import svgPath from "./NameSvg.js";
  import { draw } from "svelte/transition";
  import { reduceMotion } from "$lib/constants";

  let showTitle = false;
  let logoHasFill = false;

  onMount(() => {
    showTitle = true;
  });

  const logoFillDelay = reduceMotion ? 0 : 1000;

  // Graceful degradation for name animation
  const serverRendered = typeof window === "undefined";
  $: getPathClass = () => {
    if (serverRendered) {
      return "serverRendered";
    }
    return logoHasFill ? "logoHasFill" : "initial";
  };
</script>

<svg
  class={serverRendered ? "ssrFadeIn" : ""}
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="85.15999145507814 9.819995117187503 329.6800170898437 130.360009765625"
>
  <title>Ross Hill</title>
  <g>
    {#if showTitle || serverRendered}
      <path
        class={getPathClass()}
        on:introstart={serverRendered ? null : () => {
          setTimeout(() => (logoHasFill = true), logoFillDelay);
        }}
        in:draw={serverRendered ? null : { duration: 3000, easing: sineIn }}
        d={svgPath}
      />
    {/if}
  </g>
</svg>

<style>
  svg {
    height: 100%;
    width: 100%;
    pointer-events: none;
    transition: fill 0.5s ease, stroke 0.5s ease;
  }

  svg path {
    stroke: var(--heading);
    stroke-width: 2;
    transition: fill 0.5s ease, stroke 0.5s ease;
  }

  svg path.initial {
    fill: var(--sidebarBackground);
  }

  svg path.serverRendered {
    fill: var(--heading);
  }

  svg.ssrFadeIn {
    opacity: 0;
    animation: fadeInAnimation ease-in 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 3s;
  }

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
  }

  svg path.logoHasFill {
    fill: var(--heading);
  }

  @media (max-width: 1000px) {
    svg path.initial {
      fill: var(--background);
    }
  }
</style>
