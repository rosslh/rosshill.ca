<script lang="ts">
  import { SiteTheme } from "$lib/types";

  export let selectedTheme: SiteTheme;

  import Select from "svelte-select";
  import { themeStore } from "$lib/stores";

  import LightThemeIcon from "~icons/ci/sun";
  import DarkThemeIcon from "~icons/ci/moon";
  import AutoThemeIcon from "~icons/lucide/settings-2";
  import CyberpunkThemeIcon from "~icons/ph/circle-half-bold";

  import { prefersColorSchemeDark } from "$lib/functions";
  import { browser } from "$app/environment";

  const themes: [SiteTheme, SiteTheme, SiteTheme, SiteTheme, SiteTheme] =
    prefersColorSchemeDark(browser)
      ? [
          SiteTheme.Auto,
          SiteTheme.Light,
          SiteTheme.Dark,
          SiteTheme.Black,
          SiteTheme.Cyberpunk,
        ]
      : [
          SiteTheme.Auto,
          SiteTheme.Dark,
          SiteTheme.Light,
          SiteTheme.Black,
          SiteTheme.Cyberpunk,
        ];

  $: changeTheme = (theme: SiteTheme): void => {
    $themeStore = theme;
  };

  const listOffsetPx = 8; // equivalent to spacing-xs
</script>

<div
  class="theme-switcher-wrapper theme-{selectedTheme}"
  data-testid="theme-switcher"
>
  <Select
    items={themes}
    value={selectedTheme || $themeStore}
    on:change={(event) => changeTheme(event.detail.value)}
    clearable={false}
    showChevron
    listAutoWidth={false}
    floatingConfig={{
      placement: "bottom-end",
    }}
    searchable={false}
    listOffset={listOffsetPx}
    --background="var(--color-panel-background)"
    --border-focused="1px solid var(--color-border)"
    --border-hover="1px solid var(--color-border)"
    --border-radius-s="var(--border-radius-s)"
    --border="1px solid var(--color-border)"
    --chevron-color="var(--color-subtitle)"
    --chevron-height="var(--spacing-2xl)"
    --chevron-width="var(--spacing-2xl)"
    --font-size="var(--font-size-xs)"
    --height="var(--spacing-2xl)"
    --internal-padding="0"
    --item-color="var(--color-subtitle)"
    --item-hover-bg="var(--color-panel-background)"
    --item-is-active-bg="var(--color-panel-background)"
    --item-is-active-color="var(--color-foreground)"
    --item-padding="0 var(--spacing-m)"
    --list-background="var(--color-background)"
    --list-border-radius="var(--border-radius-s)"
    --list-border="1px solid var(--color-border)"
    --padding="0"
    --selected-item-padding="0 0 0 var(--spacing-s)"
    --value-container-padding="0"
  >
    <div slot="selection" class="label-wrapper" let:selection>
      <span aria-hidden="true" class="icon">
        {#if selection.value === SiteTheme.Light}
          <LightThemeIcon />
        {:else if selection.value === SiteTheme.Dark}
          <DarkThemeIcon />
        {:else if selection.value === SiteTheme.Cyberpunk}
          <CyberpunkThemeIcon />
        {:else if selection.value === SiteTheme.Black}
          <DarkThemeIcon />
        {:else}
          <AutoThemeIcon />
        {/if}
      </span>
      <span class="description">
        <span class="item-name">{selection.value}</span>
        {#if selection.value === SiteTheme.Auto}
          <span class="item-auto-light">(light)</span>
          <span class="item-auto-dark">(dark)</span>
        {/if}
      </span>
    </div>
    <div slot="item" let:item>
      <span class="description">
        <span class="item-name">{item.value}</span>
        {#if item.value === SiteTheme.Auto}
          <span class="item-auto-light">(light)</span>
          <span class="item-auto-dark">(dark)</span>
        {/if}
      </span>
    </div>
  </Select>
</div>

<style lang="scss">
  @use "src/lib/styles/media-queries";

  @media (max-width: media-queries.$breakpoint-xs-max) {
    .icon,
    .item-auto-light,
    .item-auto-dark {
      display: none !important;
    }
  }

  div.theme-switcher-wrapper {
    margin: var(--spacing-xl) 5%;
    position: absolute;
    right: 0;
    z-index: 100;

    &.theme-cyberpunk {
      .icon {
        transform: rotate(90deg);
      }
    }
  }

  @media (max-width: media-queries.$breakpoint-xs-max) {
    div.theme-switcher-wrapper {
      margin: var(--spacing-m);
    }
  }

  @media (min-width: media-queries.$breakpoint-xs-min) {
    .theme-switcher-wrapper {
      margin: var(--spacing-xl) 7%;
    }
  }

  @media (min-width: media-queries.$breakpoint-l-min) {
    .theme-switcher-wrapper {
      margin: var(--spacing-xl) var(--spacing-4xl);
    }
  }

  :global(.theme-switcher-wrapper *) {
    cursor: pointer !important;
  }

  :global(.svelte-select) {
    position: relative;
    width: 100%;
    z-index: 100;
    caret-color: transparent;

    .label-wrapper {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-2xs) + var(--spacing-3xs));

      .icon {
        display: flex;
      }
    }
  }

  .description {
    .item-name {
      text-transform: capitalize;
    }

    .item-auto-dark {
      display: none;
    }

    @media (prefers-color-scheme: dark) {
      .item-auto-light {
        display: none;
      }
      .item-auto-dark {
        display: inline;
      }
    }
  }
</style>
