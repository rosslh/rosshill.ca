<script lang="ts">
  export let tagId: string;
  export let active = false;
  export let background: string;
  export let foreground: string;
  export let onClick: () => void = null;
  export let lazyLoad = false;

  import { tagLabels } from "$lib/constants";
  import { remsToPixels } from "$lib/functions";

  $: tagString = tagLabels[tagId] ?? tagId;

  const iconOffsets = {
    django: { y: "0.05rem", x: "-0.05rem" },
    flask: { x: "0.05rem" },
    java: { y: "-0.05rem" },
    postgresql: { y: "0.05rem" },
    redux: { y: "-0.05rem" },
  };

  const iconOffset = { x: 0, y: 0, ...iconOffsets[tagId] };

  let isToggling = false;
  const handleClick = () => {
    isToggling = true;
    onClick();
    setTimeout(() => {
      isToggling = false;
    }, 300);
  };

  const getHexOpacity = (floatPercentage: number) => Math.round(255 * floatPercentage).toString(16);
  $: dividerColor = active ? `#${foreground}${getHexOpacity(0.35)}` : "transparent";
</script>

<svelte:element
  class="tag do-transition {active ? 'active' : ''}"
  data-testid="skill-{onClick ? 'filter' : 'tag'}-{tagId}"
  on:click={handleClick}
  style={active ? `color: #${foreground};` : ""}
  this={onClick ? "button" : "div"}
>
  <span class="logo-wrapper {isToggling ? 'toggling' : 'do-transition'}" style="background-color: #{background};">
    <img
      src="/tags/{tagId}.svg"
      alt=""
      loading={lazyLoad ? "lazy" : null}
      style="margin-left: {iconOffset.x}; margin-top: {iconOffset.y};"
      height={remsToPixels(0.85)}
      width={remsToPixels(0.85)} />
  </span>
  <span
    style={`border-left: 1px solid ${dividerColor};`}
    class={`tag-string ${tagString === tagId ? "capitalize" : ""}`}
  >
    {tagString}
  </span>
</svelte:element>

<style lang="scss">
  .tag {
    display: inline-flex;
    align-items: center;
    
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

    &.toggling {
      transition: border-color 0.3s ease, width 0.3s ease, border-radius 0.3s ease;
    }

    &.do-transition {
      /* taken from global.scss .do-transition */
      transition: border-color 0.5s ease, width 0.5s ease, border-radius 0.5s ease;
    }

    > img {
      display: block;
      fill: var(--subtitle);
      height: 0.85rem;
      width: 0.85rem;
      transform: translateX(0.41rem);
    }
  }

  :global(.tag.active .logo-wrapper) {
    border-bottom-right-radius: 0.9rem;
    border-color: var(--subtitle);
    border-top-right-radius: 0.9rem;
    /* 2px accounts for negative margin + border */
    width: calc(100% + 2px);
  }

  .tag-string {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: calc(100% - 0.4rem);
    margin-left: 1.5rem;
    padding: 0 0.25rem 0 0.2rem;

    position: relative;
    transition: border-color 0.3s ease;
    z-index: 2;

    &.capitalize {
      text-transform: capitalize;
    }
  }
</style>
