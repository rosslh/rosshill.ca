<script>
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import { path } from "./NameSvg.js";
  import { draw } from "svelte/transition";
  import { logoLoaded } from "../stores.js";

  let showTitle = false;
  let logoHasFill = $logoLoaded;

  onMount(() => {
    showTitle = true;
  });

  $: logoFillStyle = logoHasFill ? "fill: var(--heading);" : "";

  let pathAnimationDuration = 1400;
  let fillTransitionDuration = 500;
</script>

<style>
  svg.animating path {
    transition: fill 0.5s ease;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  svg path {
    fill: var(--sidebarBackground);
    stroke: var(--heading);
    stroke-width: 2;
  }

  @media (max-width: 1000px) {
    svg path {
      fill: var(--background);
    }
  }
</style>

<svg
  aria-hidden="true"
  class={$logoLoaded ? '' : 'animating'}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="85.15999145507814 9.819995117187503 329.6800170898437
  130.360009765625">
  <title>Ross Hill</title>
  {#if showTitle}
    <g>
      <!-- TODO: You shouldn't need these setTimeouts -->
      <path
        style={logoFillStyle}
        on:introstart={() => {
          window.setTimeout(() => (logoHasFill = true), pathAnimationDuration);
          window.setTimeout(() => logoLoaded.set(true), pathAnimationDuration + fillTransitionDuration);
        }}
        in:draw={{ duration: 3000, easing: sineIn }}
        d={path} />
    </g>
  {/if}
</svg>
