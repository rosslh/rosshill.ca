<script lang="ts">
  import { browser } from "$app/environment";
  import { prefersColorSchemeDark } from "$lib/functions";
  import { themeStore } from "$lib/stores";
  import { SiteTheme } from "$lib/types";
  import { onMount } from "svelte";

  import LightThemeIcon from "~icons/ci/sun";
  import DarkThemeIcon from "~icons/ci/moon";

  interface Props {
    selectedTheme: SiteTheme;
  }

  let { selectedTheme }: Props = $props();

  let systemTheme = $state(
    prefersColorSchemeDark(browser) ? SiteTheme.Dark : SiteTheme.Light,
  );

  const resolvedTheme = $derived(
    selectedTheme === SiteTheme.Auto ? systemTheme : selectedTheme,
  );
  const nextTheme = $derived(
    resolvedTheme === SiteTheme.Dark ? SiteTheme.Light : SiteTheme.Dark,
  );

  onMount(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemTheme = (): void => {
      systemTheme = colorScheme.matches ? SiteTheme.Dark : SiteTheme.Light;
    };

    updateSystemTheme();
    colorScheme.addEventListener("change", updateSystemTheme);

    return () => colorScheme.removeEventListener("change", updateSystemTheme);
  });
</script>

<div class="theme-switcher-wrapper" data-testid="theme-switcher">
  <button
    class="transition-colors"
    type="button"
    aria-label="Switch to {nextTheme} theme"
    title="Switch to {nextTheme} theme"
    onclick={() => {
      $themeStore = nextTheme;
    }}
  >
    <span aria-hidden="true" class="icon">
      {#if resolvedTheme === SiteTheme.Dark}
        <LightThemeIcon />
      {:else}
        <DarkThemeIcon />
      {/if}
    </span>
  </button>
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  div.theme-switcher-wrapper {
    margin: var(--spacing-xl) 5%;
    position: absolute;
    right: 0;
    z-index: 100;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--spacing-2xl);
      height: var(--spacing-2xl);
      padding: 0;
      color: var(--color-subtitle);
      background: var(--color-panel-background);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-s);
      cursor: pointer;

      &:hover,
      &:focus-visible {
        color: var(--color-foreground);
      }

      &:focus-visible {
        outline: 2px solid var(--color-focus-outline);
        outline-offset: 2px;
      }
    }

    .icon {
      display: flex;
    }
  }

  @media (max-width: breakpoints.$breakpoint-xs-max) {
    div.theme-switcher-wrapper {
      margin: var(--spacing-m);
    }
  }

  @media (min-width: breakpoints.$breakpoint-xs-min) {
    .theme-switcher-wrapper {
      margin: var(--spacing-xl) 7%;
    }
  }

  @media (min-width: breakpoints.$breakpoint-l-min) {
    .theme-switcher-wrapper {
      margin: var(--spacing-xl) var(--spacing-4xl);
    }
  }
</style>
