<script>
  export let tagId;
  export let active;
  export let background;
  export let foreground;
  export let onClick;
  export let lazyLoad = false;

  import { Div, Button } from 'svelte-elements';

  import { tagLabels } from "$lib/constants.js";
  import { remsToPixels } from "$lib/functions";

  $: tagString = tagLabels[tagId] || tagId;

  const imgOffset = tagId === "unity" ? 0.35 : 0.4;
</script>

<!-- TODO: use svelte:element once that's available -->
<svelte:component
  this={onClick ? Button : Div}
  on:click={onClick}
  class="tag doTransition {active ? 'active' : ''}"
>
  <span class="logoWrapper" style="background-color: #{background};">
    <img
      src="/tags/{tagId}.svg"
      alt=""
      loading={lazyLoad ? "lazy" : null}
      role="img"
      style="margin-left: {imgOffset}rem;"
      height={remsToPixels(0.85)}
      width={remsToPixels(0.85)} />
  </span>
  <span
    class={`tagString ${tagString === tagId ? "capitalize" : ""}`}
    style={active ? `color: #${foreground};` : ""}
  >
    {tagString}
  </span>
</svelte:component>

<style>
  :global(.tag) {
    height: 1.5rem;
    margin: 0.3rem 0.25rem 0.3rem 0;
    padding: 0 0.15rem 0 0;
    position: relative;

    background-color: var(--postBackground);
    color: var(--subtitle);
    border-radius: 0.9rem;
    border: 1px solid var(--postBorder);
    font-size: 0.8rem;    
  }

  .logoWrapper {
    position: absolute;
    width: 1.6rem;
    /* 1px accounts for border */
    top: -1px;
    left: -1px;
    bottom: -1px;
    display: flex;
    align-items: center;
    transition: color 0.5s ease, background-color 0.5s ease, border-color 0.5s ease, /* taken from .doTransition */
      width 0.3s ease, border-radius 0.3s ease;

    border: 1px solid var(--postBorder);
    border-top-left-radius: 0.9rem;
    border-bottom-left-radius: 0.9rem;
  }

  :global(.tag.active .logoWrapper) {
    border-bottom-right-radius: 0.9rem;
    border-color: var(--foreground);
    border-top-right-radius: 0.9rem;
    /* 2px accounts for negative margin + border */
    width: calc(100% + 2px);
  }

  .tagString {
    margin-left: 1.5rem;
    padding: 0 0.25rem;
    position: relative;
    transition: color 0.3s ease;
    z-index: 2;
  }

  .logoWrapper > img {
    display: block;
    fill: var(--subtitle);
    height: 0.85rem;
    width: 0.85rem;
  }

  .capitalize {
    text-transform: capitalize;
  }
</style>
