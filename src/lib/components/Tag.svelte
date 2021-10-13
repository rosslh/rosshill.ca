<script>
  export let tagId;
  export let active;
  export let color;
  export let onClick;

  import { Div, Button } from 'svelte-elements';

  import { tagLabels } from "$lib/constants.js";
  import { remsToPixels } from "$lib/functions";

  $: tagString = tagLabels[tagId] || tagId;

  let preventTransition = false;
  const handleClick = () => {
    preventTransition = true;
    onClick();
    setTimeout(() => {
      preventTransition=false;
    }, 500);
  };
</script>

<!-- TODO: use svelte:element once that's available -->
<svelte:component
  this={onClick ? Button : Div}
  class="tag {preventTransition ? '' : 'doTransition'} {active ? 'active' : ''}"
  on:click={onClick ? handleClick : null}
>
  <span class="logoWrapper doTransition" style="background-color: #{color};">
    <img
      src="/tags/{tagId}.svg"
      alt=""
      loading="lazy"
      height={remsToPixels(0.85)}
      width={remsToPixels(0.85)} />
  </span>
  <span class={`tagString ${tagString === tagId ? "capitalize" : ""}`}>{tagString}</span>
</svelte:component>

<style>
  :global(.tag) {
    margin: 0.25rem 0.25rem 0.25rem 0;
    height: 1.3rem;
    padding: 0 0.25rem 0 0;
    display: flex;
    align-items: center;

    background-color: var(--postBackground);
    border: 1px solid var(--postBorder);
    border-radius: 0.9rem;
    overflow: hidden;
    opacity: 0.9;
    color: var(--subtitle);
    font-size: 0.8rem;

  }

  :global(.tag.active) {
    border-color: var(--foreground);
    opacity: 1;
  }

  .logoWrapper {
    padding: 0 0 0 0.2rem;
    margin-left: -0.1rem; /* intentionally overflows by 0.1rem */
    height: 1.5rem; /* intentionally overflows by 0.1rem */
    width: 1.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    border-right: 1px solid var(--postBorder);
  }

  .tagString {
    padding: 0 0.25rem;
  }

  .logoWrapper > img {
    fill: var(--subtitle);
    height: 0.85rem;
    width: 0.85rem;
    display: block;
  }

  .capitalize {
    text-transform: capitalize;
  }
</style>
