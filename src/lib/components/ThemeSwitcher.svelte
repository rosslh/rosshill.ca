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
          : "light"
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

<div class="themeSwitcherWrapper">
  <button
    title="Use {nextTheme} theme"
    class="doTransition"
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

<style>
  div.themeSwitcherWrapper {
    padding: 1.5rem 5%;
    position: absolute;
    right: 0;
    z-index: 100;
  }
  button {
    width: 9rem;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--foreground);
    background-color: var(--postBackground);
    padding: 0;
    font-size: 0.9rem;
    border: 1px solid var(--postBorder);
  }
  button .icon {
    display: inline-flex;
    align-items: center;
    font-size: 0.8rem;
    margin-right: 0;
  }
</style>
