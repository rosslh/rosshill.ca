<script context="module">

  export async function load({ session }) {
    return {
      props: {
        themeFromSession: session.theme || "system",
      },
    };
  }
</script>
<script lang="ts">
  import type { SiteTheme } from "$lib/types";

  export let themeFromSession: SiteTheme;

  import { cheekyMessagePrinted, theme as themeStore } from "$lib/stores";
  import { browser } from "$app/env";

  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  import "../assets/styles/global.scss";
  import "../assets/styles/normalize.min.css";

  const getCssVariable = (variableName: string) => {
    const style = getComputedStyle(document.querySelector(".app-wrapper"));
    return style.getPropertyValue(`--${variableName}`);
  };

  $: {
    if (browser && !$cheekyMessagePrinted) {
      $cheekyMessagePrinted = true;
      // eslint-disable-next-line no-console
      console.log(
        "%cLike the site? Check out the source code here: https://github.com/rosslh/rosshill.ca",
        `background-color: ${getCssVariable("panel-background")}; border-radius: 0.5rem; border: 1px solid ${getCssVariable("border")}; color: ${getCssVariable("foreground")}; display: inline-block; font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important; font-weight: 700; padding: 0.75rem;`,
      );
    }
  }

  $: selectedTheme = browser ? $themeStore : themeFromSession;
</script>

<div
  class="app-wrapper do-transition"
  data-theme={selectedTheme}
  data-testid="app-wrapper"
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
  <link rel="preload" href="/fonts/source-sans-pro-v18-latin-regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  <link rel="preload" href="/fonts/source-sans-pro-v18-latin-700.woff2" as="font" type="font/woff2" crossorigin="anonymous">
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
      font-weight: 400;
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;    
    }
    h1, h2, h3, h4 { font-weight: 700; }
  </style>
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0" />
  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#20232e">
  <meta name="msapplication-TileColor" content="#20232e">
  <meta name="theme-color" content="#20232e">
</svelte:head>
<style>
  div.two-column {
    display: grid;
    grid-template-columns: 3fr 8fr;
  }

  @media (max-width: 1000px) {
    div.two-column {
      grid-template-columns: 1fr;
    }
  }
</style>
