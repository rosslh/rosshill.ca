<script>
  import FaRegCircle from "svelte-icons/fa/FaRegCircle.svelte";
  import FaRegCheckCircle from "svelte-icons/fa/FaRegCheckCircle.svelte";
  export let active;
  export let callback;
  export let id;
</script>

<style>
  button {
    background-color: var(--postBackground);
    border: 1px solid var(--foreground);
    border-radius: 1.8rem;
    height: 1.8em;
    min-width: 4rem;
    cursor: pointer;
    font-size: 0.9rem;
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
    margin-right: 0.3rem;
    width: 0.8rem;
    display: inline-flex;
    align-items: center;
  }

  button .text {
    line-height: 1.2rem;
  }

  button.inactive {
    opacity: 0.8;
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

  button.orgButton {
    color: var(--org);
    border-color: var(--org);
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
