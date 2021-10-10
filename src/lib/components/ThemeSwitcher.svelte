<script>
  import { onMount } from "svelte";

  import Moon from "~icons/ion/ios-moon";
  import Sunny from "~icons/ion/ios-sunny";
  import { theme as userTheme } from "$lib/stores.js";

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
      <span class="text">
        {#if nextTheme === "dark"}Dark{:else}Light{/if}
        mode
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
    height: 1.8rem;
    border-radius: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--foreground);
    background-color: var(--postBackground);
    padding: 0 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    border: 1px solid var(--postBorder);
  }
  button .icon {
    display: inline-flex;
    align-items: center;
    font-size: 0.8rem;
    margin-right: 0.3rem;
  }

  @media (max-width: 700px) {
    span.text {
      display: none;
    }
    button {
      padding: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }

    button .icon {
      margin-right: 0;
    }
  }
</style>
