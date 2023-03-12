<script lang="ts">
    import type { SiteTheme } from "$lib/types";
    import { onMount } from "svelte";
    import { themeStore } from "$lib/stores";
    import { browser } from "$app/environment";
    import ThemeSwitcher from "./components/ThemeSwitcher.svelte";
    import Sidebar from "./components/sidebar/Sidebar.svelte";
    import CopyrightNotice from "./components/CopyrightNotice.svelte";
    import "$lib/styles/global.scss";
    import "$lib/styles/normalize.min.css";

    export let data: { themeFromSession: SiteTheme};
    const getCssVariable = (element: HTMLElement, variableName: string): string => {
      const style = getComputedStyle(element);
      return style.getPropertyValue(`--${variableName}`);
};

let appWrapper: HTMLDivElement;

onMount(() => {
      if (appWrapper) {
      // eslint-disable-next-line no-console
        console.log(
          "%cLike the site? Check out the source code here: https://github.com/rosslh/rosshill.ca",
          `
        background-color: ${getCssVariable(appWrapper, "panel-background")};
        border: 1px solid ${getCssVariable(appWrapper, "border")};
        border-radius: 0.5rem;
        color: ${getCssVariable(appWrapper, "foreground")};
        display: inline-block; font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
        font-weight: 700;
        padding: 0.75rem;
        `,
        );
      }
});

$: selectedTheme = browser ? $themeStore : data.themeFromSession;
</script>

<div
  bind:this={appWrapper}
  class="app-wrapper do-transition"
  data-testid="app-wrapper"
  data-theme={selectedTheme}
>
  <ThemeSwitcher selectedTheme={selectedTheme} />
  <div class="two-column">
    <Sidebar />
    <div>
      <slot />
      <CopyrightNotice />
    </div>
  </div>
</div>
<svelte:head>
  <link as="font" crossorigin="anonymous" href="/fonts/source-sans-pro-v18-latin-regular.woff2" rel="preload" type="font/woff2">
  <link as="font" crossorigin="anonymous" href="/fonts/source-sans-pro-v18-latin-700.woff2" rel="preload" type="font/woff2">
  <!-- Fonts set here to avoid Flash of Unstyled Text on Firefox -->
  <style>
    /* source-sans-pro-regular - latin */
    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 100 400;
      font-display: block;
      src: url('/fonts/source-sans-pro-v18-latin-regular.eot'); /* IE9 Compat Modes */
      src: local('Source Sans Pro'),
        url('/fonts/source-sans-pro-v18-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/source-sans-pro-v18-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/source-sans-pro-v18-latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/fonts/source-sans-pro-v18-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/source-sans-pro-v18-latin-regular.svg#SourceSansPro') format('svg'); /* Legacy iOS */
    }
    /* source-sans-pro-600 - latin */
    @font-face {
      font-family: 'Source Sans Pro';
      font-weight: 500 900;
      font-display: block;
      src: url('/fonts/source-sans-pro-v18-latin-700.eot'); /* IE9 Compat Modes */
      src: local('Source Sans Pro'),
        url('/fonts/source-sans-pro-v18-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/source-sans-pro-v18-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/source-sans-pro-v18-latin-700.woff') format('woff'), /* Modern Browsers */
        url('/fonts/source-sans-pro-v18-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/source-sans-pro-v18-latin-700.svg#SourceSansPro') format('svg'); /* Legacy iOS */
    }
    html {
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
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
