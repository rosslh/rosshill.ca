<script lang="ts">
  export let tagId: string;
  export let active = false;
  export let background: string;
  export let foreground: string;
  export let onClick: () => void = null;
  export let lazyLoad = false;

  import { Div, Button } from "svelte-elements";

  import { tagLabels } from "$lib/constants";
  import { remsToPixels } from "$lib/functions";

  $: tagString = tagLabels[tagId] || tagId;

  const imgOffset = tagId === "unity" ? 0.35 : 0.4;

  let isToggling = false;

  const handleClick = () => {
    isToggling = true;
    onClick();
    setTimeout(() => {
      isToggling = false;
    }, 300);
  };
</script>

<!-- TODO: use svelte:element once that's available -->
<svelte:component
  this={onClick ? Button : Div}
  on:click={handleClick}
  class="tag do-transition {active ? 'active' : ''}"
  style={active ? `color: #${foreground};` : ""}
>
  <span class="logo-wrapper {isToggling ? 'toggling' : 'do-transition'}" style="background-color: #{background};">
    <img
      src="/tags/{tagId}.svg"
      alt=""
      loading={lazyLoad ? "lazy" : null}
      style="margin-left: {imgOffset}rem;"
      height={remsToPixels(0.85)}
      width={remsToPixels(0.85)} />
  </span>
  <span
    class={`tag-string ${tagString === tagId ? "capitalize" : ""}`}
  >
    {tagString}
  </span>
</svelte:component>

<style>
  :global(.tag) {
    height: 1.5rem;
    margin: 0.3rem 0.25rem 0.3rem 0;
    padding: 0 0.2rem 0 0;
    position: relative;

    background-color: var(--panel-background);
    color: var(--subtitle);
    border-radius: 0.9rem;
    border: 1px solid var(--border);
    font-size: 0.8rem;    
  }

  .logo-wrapper {
    position: absolute;
    width: 1.6rem;
    /* 1px accounts for border */
    top: -1px;
    left: -1px;
    bottom: -1px;
    display: flex;
    align-items: center;

    border: 1px solid var(--border);
    border-top-left-radius: 0.9rem;
    border-bottom-left-radius: 0.9rem;
  }

  .logo-wrapper.toggling {
    transition: border-color 0.3s ease, width 0.3s ease, border-radius 0.3s ease;
  }

  .logo-wrapper.do-transition {
    /* taken from global.scss .do-transition */
    transition: border-color 0.5s ease, width 0.5s ease, border-radius 0.5s ease;
  }

  :global(.tag.active .logo-wrapper) {
    border-bottom-right-radius: 0.9rem;
    border-color: var(--foreground);
    border-top-right-radius: 0.9rem;
    /* 2px accounts for negative margin + border */
    width: calc(100% + 2px);
  }

  .tag-string {
    margin-left: 1.5rem;
    padding: 0 0.25rem;
    position: relative;
    z-index: 2;
  }

  .logo-wrapper > img {
    display: block;
    fill: var(--subtitle);
    height: 0.85rem;
    width: 0.85rem;
  }

  .capitalize {
    text-transform: capitalize;
  }
</style>
