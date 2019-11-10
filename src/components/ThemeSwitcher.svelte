<script>
  import { onMount } from "svelte";

  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";
  import { theme as userTheme } from "../stores.js";

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

  let loading = typeof window === "undefined";
</script>

<style>
  div.themeSwitcherWrapper {
    padding: 1.5rem 5%;
    position: absolute;
    right: 0;
  }
  button {
    height: 1.8rem;
    border-radius: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--foreground);
    background-color: var(--postBackground);
    padding: 0 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    border: 1px solid var(--postBorder);
    transition: none !important;
  }
  button .icon {
    height: 1rem;
    width: 1rem;
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

{#if !loading}
  <div class="themeSwitcherWrapper">
    <button on:click={changeTheme}>
      {#if nextTheme === 'dark'}
        <span aria-hidden="true" class="icon">
          <IoIosMoon />
        </span>
        <span class="text">Dark mode</span>
      {:else}
        <span aria-hidden="true" class="icon">
          <IoIosSunny />
        </span>
        <span class="text">Light mode</span>
      {/if}
    </button>
  </div>
{/if}
