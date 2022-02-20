<script lang="ts">
  import { onMount } from "svelte";

  import Moon from "~icons/ion/ios-moon";
  import Sunny from "~icons/ion/ios-sunny";
  
  import { theme as userTheme } from "$lib/stores";

  onMount(() => {
    if (!$userTheme) {
      userTheme.set(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    } else {
      userTheme.set($userTheme); // to trigger side effect
    }
  });

  $: nextTheme = $userTheme === "dark" ? "light" : "dark";

  $: changeTheme = () => {
    userTheme.set(nextTheme);
  };

  const loading = typeof window === "undefined";
</script>

<div class="theme-switcher-wrapper">
  <button
    data-test="theme-switcher"
    title="Use {nextTheme} theme"
    class="do-transition"
    on:click={changeTheme}
  >
    {#if !loading}
      <span aria-hidden="true" class="icon">
        {#if nextTheme === "dark"}
          <Moon />
        {:else}
          <Sunny />
        {/if}
      </span>
    {/if}
  </button>
</div>

<style lang="scss">
  div.theme-switcher-wrapper {
    padding: 1.5rem 5%;
    position: absolute;
    right: 0;
    z-index: 100;

    button {
      height: 2.1rem;
      width: 2.1rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--foreground);
      background-color: var(--panel-background);
      padding: 0;
      font-size: 0.9rem;
      border: 1px solid var(--border);

      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 0.75rem;
        margin-right: 0;
      }
    }
  }

  @media (max-width: 699px) {
    .theme-switcher-wrapper button {
      transform: scale(0.8);
    }
  }

  @media (min-width: 700px) {
    .theme-switcher-wrapper {
      padding: 1.5rem 7%;
    }
  }
</style>
