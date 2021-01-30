<script>
  import { onMount } from "svelte";
  import { sineIn } from "svelte/easing";
  import svgPath from "./NameSvg.js";
  import { draw } from "svelte/transition";

  let showTitle = false;
  let logoHasFill = false;

  onMount(() => {
    showTitle = true;
  });

  $: pathClass = logoHasFill ? "logoHasFill" : "initial";

  const logoFillDelay = 1000;
</script>

<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="85.15999145507814 9.819995117187503 329.6800170898437
  130.360009765625"
>
  <title>Ross Hill</title>
  <g>
    {#if showTitle}
      <!-- TODO: You shouldn't need the setTimeout -->
      <path
        class={pathClass}
        on:introstart={() => {
          setTimeout(() => (logoHasFill = true), logoFillDelay);
        }}
        in:draw={{ duration: 3000, easing: sineIn }}
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

  svg path.logoHasFill {
    fill: var(--heading);
  }

  @media (max-width: 1000px) {
    svg path.initial {
      fill: var(--background);
    }
  }
</style>
