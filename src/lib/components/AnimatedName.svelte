<script lang="ts">
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import svgPath from "./NameSvg";
  import { draw } from "svelte/transition";
  import { reduceMotion } from "$lib/constants";

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
      return "serverRendered";
    }
    let className = logoHasFill ? "logoHasFill" : "initial";
    if (doneFilling) {
      className += " doneFilling";
    }
    return className;
  };
</script>

<svg
  class={serverRendered ? "ssrFadeIn" : ""}
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

<style>
  svg {
    height: 60%;
    width: 60%;
    pointer-events: none;
    transition: fill 0.9s ease, stroke 0.9s ease;
  }

  svg path {
    stroke: var(--heading);
    stroke-width: 1px;
    transition: fill 0.9s ease, stroke 0.9s ease;
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
    stroke: var(--sidebarBackground);
  }

  svg path.doneFilling {
    transition: fill 0.5s ease, stroke 0.5s ease !important;
  }

  @media (max-width: 1000px) {
    svg path.initial {
      fill: var(--background);
    }
  }
</style>
