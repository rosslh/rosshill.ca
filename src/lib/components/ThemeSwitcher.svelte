<script lang="ts">
  import type { SiteTheme } from "$lib/types";

  export let selectedTheme: SiteTheme;

  import { theme } from "$lib/stores";

  import SystemTheme from "~icons/lucide/settings-2";
  import LightTheme from "~icons/ion/ios-sunny";
  import DarkTheme from "~icons/ion/ios-moon";

  $: changeTheme = () => {
    let nextTheme: SiteTheme;
    if (selectedTheme === "system") {
      nextTheme = "light";
    } else if (selectedTheme === "light") {
      nextTheme = "dark";
    } else {
      nextTheme = "system";
    }
    $theme = nextTheme;
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
      {#if selectedTheme === "light"}
        <LightTheme />
      {:else if selectedTheme === "dark"}
        <DarkTheme />
      {:else}
        <SystemTheme />
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
      padding: 1rem 1rem;

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
