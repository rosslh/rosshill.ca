<script>
  import FaRegCircle from "svelte-icons/fa/FaRegCircle.svelte";
  import FaRegCheckCircle from "svelte-icons/fa/FaRegCheckCircle.svelte";
  export let active;
  export let text;
  export let callback;
  export let id;
</script>

<style>
  button {
    outline: none;
    background-color: white;
    border: 1px solid black;
    border-radius: 1.8rem;
    height: 1.7em;
    min-width: 4rem;
    cursor: pointer;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    padding: 0 1rem;
    margin: 0.5rem 0.1rem;
  }
  button:first-child {
    margin-left: 0;
  }

  button .symbol {
    position: static;
    margin-right: 0.2rem;
    height: 0.8rem;
    width: 0.8rem;
  }

  button .text {
    line-height: 1.2rem;
  }

  button.inactive {
    opacity: 0.8;
    background-color: white !important;
  }

  button.active {
    box-shadow: 1px 1px 2px #22222220;
  }

  button.jobButton {
    color: var(--job);
    border-color: var(--job);
  }

  button.projectButton {
    color: var(--project);
    border-color: var(--project);
  }

  button.ecButton {
    color: var(--ec);
    border-color: var(--ec);
  }
  button.otherButton {
    color: var(--other);
    border-color: var(--other);
  }
</style>

<button class="{id}Button {active ? 'active' : 'inactive'}" on:click={callback}>
  <span class="symbol">
    {#if active}
      <FaRegCheckCircle />
    {:else}
      <FaRegCircle />
    {/if}
  </span>
  <span class="text">
    <slot />
  </span>
</button>
