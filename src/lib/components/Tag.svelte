<script lang="ts">
  export let tagId: string;
  export let active = false;
  export let background: string = "000";
  export let foreground: string = "FFF";
  export let onClick: (() => void) | null = null;
  export let lazyLoad = false;

  export let isPageBackgroundDark = false;
  export let needsOutlineOnLightBg = false;
  export let needsOutlineOnDarkBg = false;

  import { tagLabels } from "$lib/tags";
  import { remsToPixels } from "$lib/functions";

  $: tagString = tagLabels[tagId] ?? tagId;

  type IconPosition = {
    x?: string | 0;
    y?: string | 0;
    scale?: number;
  };
  const iconPositions: Record<string, IconPosition> = {
    django: { y: "0.1rem", x: "-0.05rem" },
    flask: { x: "0.05rem" },
    java: { y: "-0.05rem" },
    postgresql: { y: "0.05rem" },
    redux: { y: "-0.05rem" },
    vuedotjs: { y: "0.1rem" },
    rubyonrails: { scale: 1.25 },
  };

  const iconPosition: IconPosition = {
    x: 0,
    y: 0,
    scale: 1,
    ...iconPositions[tagId],
  };

  const getHexOpacity = (floatPercentage: number): string => Math.round(255 * floatPercentage).toString(16);
  $: dividerColor = active ? `#${foreground}${getHexOpacity(0.35)}` : "transparent";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
  class="tag do-transition"
  class:active
  data-testid="skill-{onClick ? 'filter' : 'tag'}-{tagId}"
  on:click={onClick}
  style={active ? `color: #${foreground};` : ""}
  this={onClick ? "button" : "div"}
>
  <span
    class="logo-wrapper do-transition"
    style="background-color: #{background};"
    class:hasOutline={isPageBackgroundDark ? needsOutlineOnDarkBg : needsOutlineOnLightBg}
  >
    <img
      src="/tags/{tagId}.svg"
      alt="{tagString} logo"
      loading={lazyLoad ? "lazy" : null}
      style:transform={`translate(${iconPosition.x}, ${iconPosition.y}) scale(${iconPosition.scale})`}
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
    margin: var(--spacing-2xs) var(--spacing-2xs) var(--spacing-2xs) 0;
    padding: 0 var(--spacing-3xs) 0 0;
    position: relative;

    background-color: var(--color-panel-background);
    color: var(--color-subtitle);
    border-radius: var(--border-radius-m);
    border: 1px solid var(--color-border);
    font-size: var(--font-size-2xs);
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

    border: 1px solid var(--color-border);
    border-top-left-radius: var(--border-radius-m);
    border-bottom-left-radius: var(--border-radius-m);

    &.do-transition {
      /* taken from global.scss .do-transition */
      transition: border-color 0.3s ease, width 0.3s ease, border-radius 0.3s ease;
    }

    > img {
      display: block;
      fill: var(--color-subtitle);
      height: 0.85rem;
      width: 0.85rem;
      margin-left: 0.35rem;
    }
  }

  .tag.active .logo-wrapper {
    border-bottom-right-radius: var(--border-radius-m);
    border-top-right-radius: var(--border-radius-m);
    /* 2px accounts for negative margin + border */
    width: calc(100% + 2px);

    &.hasOutline {
      border-color: var(--color-subtitle);
    }
  }

  .tag-string {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: calc(100% - 0.4rem);
    margin-left: var(--spacing-xl);
    padding: 0 var(--spacing-2xs);

    position: relative;
    transition: border-color 0.3s ease;
    z-index: 2;

    &.capitalize {
      text-transform: capitalize;
    }
  }
</style>
