<script lang="ts">
  import type { SiteTheme } from "$lib/types";
  import { onMount } from "svelte";
  import { themeStore } from "$lib/stores";
  import { browser } from "$app/environment";
  // import ThemeSwitcher from "./components/ThemeSwitcher.svelte";
  import Sidebar from "./components/sidebar/Sidebar.svelte";
  // import CopyrightNotice from "./components/CopyrightNotice.svelte";
  import "$lib/styles/global.scss";
  import "$lib/styles/normalize.min.css";

  export let data: { themeFromSession: SiteTheme};
  let appWrapper: HTMLDivElement;
  let ThemeSwitcher;
  let CopyrightNotice;

  onMount(async () => {
    const themeSwitcherModule = await import("./components/ThemeSwitcher.svelte");
    ThemeSwitcher = themeSwitcherModule.default;

    const copyrightNoticeModule = await import("./components/CopyrightNotice.svelte");
    CopyrightNotice = copyrightNoticeModule.default;
  });

$: selectedTheme = browser ? $themeStore : data.themeFromSession;
</script>

<div
  bind:this={appWrapper}
  class="app-wrapper do-transition"
  data-testid="app-wrapper"
  data-theme={selectedTheme}
>
  {#if ThemeSwitcher}
    <svelte:component this={ThemeSwitcher} bind:selectedTheme={selectedTheme} />
  {/if}
  <div class="two-column">
    <Sidebar />
    <div>
      <slot />
      {#if CopyrightNotice}
        <svelte:component this={CopyrightNotice} />
      {/if}
    </div>
  </div>
</div>
<svelte:head>
  <style>
    html {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
      font-weight: 400;
    }
    h1, h2, h3, h4 { font-weight: 700; }
  </style>
  <meta content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0" name="viewport" />
  <meta content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" name="robots"/>
  <meta content="#ffffff" name="theme-color"/>
  <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
  <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
  <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
  <meta content="#da532c" name="msapplication-TileColor">

  <link href="/site.manifest" rel="manifest"/>
</svelte:head>
<style>
  div.two-column {
    display: grid;
    grid-template-columns: 3fr 8fr;
  }

  @media (max-width: 800px) {
    div.two-column {
      grid-template-columns: 1fr;
    }
  }
</style>
