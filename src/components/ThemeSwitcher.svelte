<script>
  import UserModel from "../store.js";
  import IoIosMoon from "svelte-icons/io/IoIosMoon.svelte";
  import IoIosSunny from "svelte-icons/io/IoIosSunny.svelte";

  let userTheme = UserModel.UserTheme;
  $: changeTheme = () => {
    UserModel.ToggleUserTheme();
    userTheme = UserModel.UserTheme;
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
  <button on:click={changeTheme}>
    {#if userTheme === 'dark'}
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
</div>
