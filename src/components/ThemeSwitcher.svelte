<script>
  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";

  let loading = typeof window === "undefined";
  let userTheme =
    typeof window === "undefined"
      ? "light"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  let nextTheme = userTheme === "dark" ? "light" : "dark";

  $: changeTheme = () => {
    document.body.setAttribute("data-theme", nextTheme);
    [userTheme, nextTheme] = [nextTheme, userTheme];
  };
</script>

<style>
  button {
    height: 1.5rem;
    border-radius: 2rem;
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--foreground);
    background-color: var(--postBackground);
    border: none;
    padding: 0 1rem;
    cursor: pointer;
    font-size: 0.75rem;
    border: 1px solid var(--postBorder);
  }
  button .icon {
    height: 1rem;
    width: 1rem;
    margin-right: 0.3rem;
  }
</style>

<div>

  {#if !loading}
    <button on:click={changeTheme}>
      {#if nextTheme === 'dark'}
        <span class="icon">
          <IoIosMoon />
        </span>
        <span>Dark mode</span>
      {:else}
        <span class="icon">
          <IoIosSunny />
        </span>
        <span>Light mode</span>
      {/if}
    </button>
  {/if}
</div>
