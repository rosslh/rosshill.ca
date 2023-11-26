<script lang="ts">
  import { SiteTheme } from "$lib/types";

  export let selectedTheme: SiteTheme;

  import { themeStore } from "$lib/stores";

  import LightThemeIcon from "~icons/ion/ios-sunny";
  import DarkThemeIcon from "~icons/ion/ios-moon";
  import SystemThemeIcon from "~icons/lucide/settings-2";
  import CyberpunkThemeIcon from "~icons/ph/circle-half-bold";

  import { browser } from "$app/environment";
  import { prefersColorSchemeDark } from "$lib/functions";

  const themes: [SiteTheme, SiteTheme, SiteTheme, SiteTheme, SiteTheme] =
    prefersColorSchemeDark(browser)
      ? [
          SiteTheme.System,
          SiteTheme.Light,
          SiteTheme.Dark,
          SiteTheme.Black,
          SiteTheme.Cyberpunk,
        ]
      : [
          SiteTheme.System,
          SiteTheme.Dark,
          SiteTheme.Light,
          SiteTheme.Black,
          SiteTheme.Cyberpunk,
        ];

  let themeIndex = themes.indexOf(selectedTheme);

  $: changeTheme = (): void => {
    themeIndex = (themeIndex + 1) % themes.length;
    $themeStore = themes[themeIndex as 0 | 1 | 2 | 3 | 4];
  };
</script>

<div class="theme-switcher-wrapper theme-{selectedTheme}">
  <button
    data-testid="theme-switcher"
    title="Next theme"
    class="transition-colors"
    on:click={changeTheme}
  >
    <span aria-hidden="true" class="icon">
      {#if selectedTheme === SiteTheme.Light}
        <LightThemeIcon />
      {:else if selectedTheme === SiteTheme.Dark}
        <DarkThemeIcon />
      {:else if selectedTheme === SiteTheme.Cyberpunk}
        <CyberpunkThemeIcon />
      {:else if selectedTheme === SiteTheme.Black}
        <DarkThemeIcon />
      {:else}
        <SystemThemeIcon />
      {/if}
    </span>
    <span class="description">
      {selectedTheme}
      {#if selectedTheme !== SiteTheme.Cyberpunk}
        {" "}
        theme
      {/if}
    </span>
  </button>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.theme-switcher-wrapper {
    padding: var(--spacing-xl) 5%;
    position: absolute;
    right: 0;
    z-index: 100;

    button {
      width: 8.5rem;
      padding: var(--spacing-xs) 0;
      border-radius: var(--border-radius-m);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-foreground);
      background-color: var(--color-panel-background);
      font-size: var(--font-size-xs);
      border: 1px solid var(--color-border);

      .icon {
        display: inline-flex;
        align-items: center;
        font-size: var(--font-size-xs);
        margin-right: var(--spacing-2xs);
      }

      .description {
        text-transform: capitalize;
      }
    }

    &.theme-cyberpunk {
      .icon {
        transform: rotate(90deg);
      }
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    div.theme-switcher-wrapper {
      padding: var(--spacing-m);

      button {
        transform: scale(0.8);
        transform-origin: top right;
      }
    }
  }

  @media (min-width: $breakpoint-s-min) {
    .theme-switcher-wrapper {
      padding: var(--spacing-xl) 7%;
    }
  }

  @media (min-width: $breakpoint-l-min) {
    .theme-switcher-wrapper {
      padding: var(--spacing-xl) var(--spacing-4xl);
    }
  }
</style>
