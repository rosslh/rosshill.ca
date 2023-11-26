<script lang="ts">
  import type { SiteTheme } from "$lib/types";

  export let data: { themeFromSession: SiteTheme };

  import { onMount } from "svelte";
  import LogRocket from "logrocket";

  import { themeStore } from "$lib/stores";
  import { browser } from "$app/environment";

  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";

  import "$lib/styles/global.scss";
  import "$lib/styles/normalize.css";

  let appWrapper: HTMLDivElement;
  const getCssVariable = (variableName: string): string => {
    const style = getComputedStyle(appWrapper);
    return style.getPropertyValue(`--${variableName}`);
  };

  onMount(() => {
    if (appWrapper) {
      // eslint-disable-next-line no-console
      console.log(
        "%cLike the site? Check out the source code here: https://github.com/rosslh/rosshill.ca",
        `
        background-color: ${getCssVariable("color-panel-background")};
        border: 1px solid ${getCssVariable("color-border")};
        border-radius: ${getCssVariable("border-radius-m")};
        color: ${getCssVariable("color-foreground")};
        display: inline-block;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
        font-weight: 700;
        padding: ${getCssVariable("spacing-s")};
        `,
      );
    }

    if (browser && import.meta.env.VITE_ENV === "production") {
      LogRocket.init("personal-rpsz0/rosshillca");
    }
  });

  $: selectedTheme = browser ? $themeStore : data.themeFromSession;
</script>

<div
  class="app-wrapper transition-colors"
  bind:this={appWrapper}
  data-theme={selectedTheme}
  data-testid="app-wrapper"
>
  <ThemeSwitcher {selectedTheme} />
  <div class="two-column">
    <Sidebar />
    <slot />
  </div>
</div>
<svelte:head>
  <link
    rel="preload"
    href="/fonts/ibm-plex-mono-v19-latin-regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/ibm-plex-mono-v19-latin-700.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/inter-v13-latin-regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/inter-v13-latin-600.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <style>
    @font-face {
      font-display: block;
      font-family: "Inter";
      font-weight: 100 400;
      size-adjust: 90%;
      src: url("/fonts/inter-v13-latin-regular.eot"); /* IE9 Compat Modes */
      src:
        url("/fonts/inter-v13-latin-regular.eot?#iefix")
          format("embedded-opentype"),
        /* IE6-IE8 */ url("/fonts/inter-v13-latin-regular.woff2")
          format("woff2"),
        /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url("/fonts/inter-v13-latin-regular.woff") format("woff"),
        /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+, iOS 5+ */
          url("/fonts/inter-v13-latin-regular.ttf") format("truetype"),
        /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
          url("/fonts/inter-v13-latin-regular.svg#Inter") format("svg"); /* Legacy iOS */
    }
    @font-face {
      font-display: block;
      font-family: "Inter";
      font-weight: 500 900;
      size-adjust: 90%;
      src: url("/fonts/inter-v13-latin-600.eot"); /* IE9 Compat Modes */
      src:
        url("/fonts/inter-v13-latin-600.eot?#iefix") format("embedded-opentype"),
        /* IE6-IE8 */ url("/fonts/inter-v13-latin-600.woff2") format("woff2"),
        /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url("/fonts/inter-v13-latin-600.woff") format("woff"),
        /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+, iOS 5+ */
          url("/fonts/inter-v13-latin-600.ttf") format("truetype"),
        /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
          url("/fonts/inter-v13-latin-600.svg#Inter") format("svg"); /* Legacy iOS */
    }
    @font-face {
      font-display: block;
      font-family: "IBM Plex Mono";
      font-weight: 100 400;
      size-adjust: 90%;
      src: url("/fonts/ibm-plex-mono-v19-latin-regular.eot"); /* IE9 Compat Modes */
      src:
        url("/fonts/ibm-plex-mono-v19-latin-regular.eot?#iefix")
          format("embedded-opentype"),
        /* IE6-IE8 */ url("/fonts/ibm-plex-mono-v19-latin-regular.woff2")
          format("woff2"),
        /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url("/fonts/ibm-plex-mono-v19-latin-regular.woff") format("woff"),
        /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+, iOS 5+ */
          url("/fonts/ibm-plex-mono-v19-latin-regular.ttf") format("truetype"),
        /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
          url("/fonts/ibm-plex-mono-v19-latin-regular.svg#IBMPlexMono")
          format("svg"); /* Legacy iOS */
    }
    @font-face {
      font-display: block;
      font-family: "IBM Plex Mono";
      font-weight: 500 900;
      size-adjust: 90%;
      src: url("/fonts/ibm-plex-mono-v19-latin-700.eot"); /* IE9 Compat Modes */
      src:
        url("/fonts/ibm-plex-mono-v19-latin-700.eot?#iefix")
          format("embedded-opentype"),
        /* IE6-IE8 */ url("/fonts/ibm-plex-mono-v19-latin-700.woff2")
          format("woff2"),
        /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
          url("/fonts/ibm-plex-mono-v19-latin-700.woff") format("woff"),
        /* Chrome 5+, Firefox 3.6+, IE 9+, Safari 5.1+, iOS 5+ */
          url("/fonts/ibm-plex-mono-v19-latin-700.ttf") format("truetype"),
        /* Chrome 4+, Firefox 3.5+, IE 9+, Safari 3.1+, iOS 4.2+, Android Browser 2.2+ */
          url("/fonts/ibm-plex-mono-v19-latin-700.svg#IBMPlexMono")
          format("svg"); /* Legacy iOS */
    }
  </style>
  <meta
    name="viewport"
    content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0"
  />
  <!-- Favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#20232e" />
  <meta name="msapplication-TileColor" content="#20232e" />
  <meta name="theme-color" content="#20232e" />
</svelte:head>

<style lang="scss">
  @import "src/lib/styles/media-queries";

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

  @media (max-width: $breakpoint-s-max) {
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

  @media (max-width: $breakpoint-m-max) {
    div.two-column {
      :global(> *:first-child) {
        width: 18rem;
      }
    }
  }

  @media (min-width: $breakpoint-xl-min) {
    div.two-column {
      :global(> *:first-child) {
        width: 30rem;
      }
    }
  }
</style>
