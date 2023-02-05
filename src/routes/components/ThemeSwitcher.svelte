<script lang="ts">
  import { SiteTheme } from "$lib/types";

  export let selectedTheme: SiteTheme;

  import { themeStore } from "$lib/stores";

  import LightThemeIcon from "~icons/ion/ios-sunny";
  import DarkThemeIcon from "~icons/ion/ios-moon";
  import SystemThemeIcon from "~icons/lucide/settings-2";
  import { browser } from "$app/environment";
  import { prefersColorSchemeDark } from "$lib/functions";

  const themes: [SiteTheme, SiteTheme, SiteTheme] = prefersColorSchemeDark(browser)
    ? [SiteTheme.System, SiteTheme.Light, SiteTheme.Dark]
    : [SiteTheme.System, SiteTheme.Dark, SiteTheme.Light];

  let themeIndex = themes.indexOf(selectedTheme);

  $: changeTheme = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    $themeStore = themes[themeIndex as 0 | 1 | 2];
  };
</script>

<div class="theme-switcher-wrapper">
  <button
    data-testid="theme-switcher"
    title="Next theme"
    class="do-transition"
    on:click={changeTheme}
  >
    <span aria-hidden="true" class="icon">
      {#if selectedTheme === SiteTheme.Light}
        <LightThemeIcon />
      {:else if selectedTheme === SiteTheme.Dark}
        <DarkThemeIcon />
      {:else}
        <SystemThemeIcon />
      {/if}
    </span>
    <span class="description">{selectedTheme} theme</span>
  </button>
</div>

<style lang="scss">
  div.theme-switcher-wrapper {
    padding: 1.5rem 5%;
    position: absolute;
    right: 0;
    z-index: 100;

    button {
      height: 1.8rem;
      width: 8.75rem;
      border-radius: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--foreground);
      background-color: var(--panel-background);
      font-size: 0.9rem;
      border: 1px solid var(--border);

      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 0.75rem;
        margin-right: 0.3rem;
      }

      .description {
        text-transform: capitalize;
      }
    }
  }

  @media (max-width: 699px) {
    div.theme-switcher-wrapper {
      padding: 1rem;

      button {
        transform: scale(0.8);
        transform-origin: top right;
      }
    }
  }

  @media (min-width: 700px) {
    .theme-switcher-wrapper {
      padding: 1.5rem 7%;
    }
  }
</style>
