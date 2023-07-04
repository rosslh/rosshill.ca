<script lang="ts">
  import type { SiteTheme } from "$lib/types";
  import { themeStore } from "$lib/stores";
  import { browser } from "$app/environment";

  import ThemeSwitcher from "./components/ThemeSwitcher.svelte";
  import Sidebar from "./components/sidebar/Sidebar.svelte";

  import "$lib/styles/global.scss";
  import "$lib/styles/normalize.min.css";

  export let data: { themeFromSession: SiteTheme };

  let appWrapper: HTMLDivElement;

  $: selectedTheme = browser ? $themeStore : data.themeFromSession;
</script>

<div
  bind:this={appWrapper}
  class="app-wrapper do-transition"
  data-testid="app-wrapper"
  data-theme={selectedTheme}
>
  <ThemeSwitcher selectedTheme={selectedTheme}/>
  <div class="two-column">
    <Sidebar/>
    <slot/>
  </div>
</div>
<svelte:head>
  <style>
    html {
      font-family: sans-serif !important;
      font-weight: 400;
    }

    h1, h2, h3, h4 {
      font-weight: 700;
    }
  </style>
  <meta content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0" name="viewport"/>
  <meta content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" name="robots"/>
  <meta content="#20232e" name="theme-color"/>
  <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
  <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
  <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
  <meta content="#da532c" name="msapplication-TileColor">

  <link href="/site.manifest" rel="manifest"/>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "Antoine Greuzard",
      "jobTitle": "Développeur web",
      "url": "https://antoinegreuzard.fr/",
      "image": "https://antoinegreuzard.fr/headshot.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/antoine-greuzard/",
        "https://github.com/antoinegreuzard"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Antoine Greuzard"
      }
    }
  </script>

</svelte:head>

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

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
