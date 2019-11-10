<script>
  import { onMount } from "svelte";
  import Separator from "./Separator.svelte";
  import { path } from "./NameSvg.js";
  import { draw } from "svelte/transition";
  import { logoLoaded } from "../stores.js";

  let showTitle = false;
  let logoHasFill = $logoLoaded;

  onMount(() => {
    showTitle = true;
  });

  $: logoFillStyle = logoHasFill ? "fill: var(--heading);" : "";
</script>

<style>
  div.sidebar {
    grid-area: sidebar;
    border-right: 1px solid var(--sidebarBorder);
    background-color: var(--sidebarBackground);
  }

  @media (max-width: 1000px) {
    div.sidebar {
      border-right: none;
      padding: 1.5rem 1.5rem 0;
      background-color: var(--background);
    }
    div.sidebarContent {
      height: unset !important;
      padding: 2rem 0 3.5rem;
      position: initial !important;
    }
  }

  div.sidebarContent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  div.imgWrapper {
    overflow: hidden;
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
  }

  div.imgWrapper picture,
  div.imgWrapper img,
  div.imgWrapper source {
    max-width: 100%;
    max-height: 100%;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: -1rem;
    padding-bottom: 0;
    height: 6rem;
    max-width: 100%;
  }

  h1 > span {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  p.subtitle {
    margin-top: 1rem;
  }

  p.subtitle.role {
    font-size: 1.3rem;
  }

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

<div class="sidebar">
  <div class="sidebarContent">
    <div class="imgWrapper">
      <picture>
        <source srcset="headshot.webp" type="image/webp" />
        <source srcset="headshot.jpg" type="image/jpg" />
        <img src="headshot.jpg" alt="Ross Hill" />
      </picture>
    </div>
    <h1>
      <span>Ross Hill</span>
      <svg
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
                window.setTimeout(() => (logoHasFill = true), 1000);
                window.setTimeout(() => logoLoaded.set(true), 1500);
              }}
              in:draw={{ duration: 3000, delay: 0 }}
              d={path} />
          </g>
        {/if}
      </svg>
    </h1>
    <p class="subtitle role">Software Developer</p>
    <p class="subtitle email">ross@rosshill.ca</p>
    <p class="subtitle">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rosslh">
        GitHub
      </a>
      /
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/rosslh">
        LinkedIn
      </a>
      /
      <a href="/resume.pdf">Resume</a>
    </p>
  </div>
  <Separator intro />
</div>
