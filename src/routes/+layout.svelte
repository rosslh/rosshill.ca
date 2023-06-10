
<script lang="ts">
  import type { SiteTheme } from "$lib/types";
  
  export let data: { themeFromSession: SiteTheme };
  
  import { onMount } from "svelte";
  import { themeStore } from "$lib/stores";
  import { browser } from "$app/environment";

  import ThemeSwitcher from "./components/ThemeSwitcher.svelte";
  import Sidebar from "./components/sidebar/Sidebar.svelte";

  import "$lib/styles/global.scss";
  import "$lib/styles/normalize.min.css";

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
        background-color: ${getCssVariable(appWrapper, "color-panel-background")};
        border: 1px solid ${getCssVariable(appWrapper, "color-border")};
        border-radius: ${getCssVariable(appWrapper, "border-radius-m")};
        color: ${getCssVariable(appWrapper, "color-foreground")};
        display: inline-block;
        font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
        font-weight: 700;
        padding: ${getCssVariable(appWrapper, "spacing-s")};
        `,
      );
    }
  });

  $: selectedTheme = browser ? $themeStore : data.themeFromSession;
</script>

<div
  class="app-wrapper do-transition"
  bind:this={appWrapper}
  data-theme={selectedTheme}
  data-testid="app-wrapper"
>
  <ThemeSwitcher selectedTheme={selectedTheme} />
  <div class="two-column">
    <Sidebar />
    <slot />
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
<style lang="scss">
  div.two-column {
    display: flex;

    :global(> *:first-child) {
      margin-right: var(--spacing-m);
      width: 23rem;
      flex-shrink: 0;
    }

    :global(> *:last-child) {
      width: 100%;
    }

    :global(> *:not(:first-child):not(:last-child)) {
      display: none;
    }
  }

  @media (max-width: 800px) {
    div.two-column {
      flex-direction: column;

      :global(> *:first-child) {
        margin-right: 0;
        width: 100% !important;
        min-width: 0;
        max-width: 100%;
      }
    }
  }

  @media (max-width: 1200px) {
    div.two-column {
      :global(> *:first-child) {
        width: 18rem;
      }
    }
  }


  @media (min-width: 1800px) {
    div.two-column {
      :global(> *:first-child) {
        width: 30rem;
      }
    }
  }
</style>
