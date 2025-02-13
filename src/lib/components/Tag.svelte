<script lang="ts">
  import { tagLabels } from "$lib/tags";
  import { remsToPixels } from "$lib/functions";

  interface Props {
    tagId: string;
    background?: string;
    foreground?: string;
  }

  let { tagId, background = "000" }: Props = $props();

  const tagString = $derived(tagLabels[tagId] ?? tagId);

  type IconPosition = {
    x?: string | 0;
    y?: string | 0;
    scale?: number;
  };
  const iconPositions: Record<string, IconPosition> = {
    django: { y: "0.05rem", x: "-0.05rem" },
    flask: { x: "0.05rem" },
    java: { y: "-0.05rem" },
    redux: { y: "-0.05rem" },
    rubyonrails: { scale: 1.25 },
  };

  const iconPosition: IconPosition = {
    x: 0,
    y: 0,
    scale: 1,
    ...iconPositions[tagId],
  };
</script>

<div class="tag transition-colors" data-testid="skill-tag-{tagId}">
  <span
    class="logo-wrapper transition-colors"
    style="background-color: #{background};"
  >
    <img
      src="/tags/{tagId}.svg"
      alt="{tagString} logo"
      style:transform={`translate(${iconPosition.x}, ${iconPosition.y}) scale(${iconPosition.scale})`}
      height={remsToPixels(0.85)}
      width={remsToPixels(0.85)}
    />
  </span>
  <span class={`tag-string ${tagString === tagId ? "capitalize" : ""}`}>
    {tagString}
  </span>
</div>

<style lang="scss">
  .tag {
    display: inline-flex;
    align-items: center;

    height: 1.5rem;
    padding: 0 var(--spacing-3xs) 0 0;
    position: relative;

    background-color: var(--color-panel-background);
    color: var(--color-subtitle);
    border-radius: var(--border-radius-s);
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
    border-top-left-radius: var(--border-radius-s);
    border-bottom-left-radius: var(--border-radius-s);

    &.transition-colors {
      /* taken from global.scss .transition-colors */
      transition:
        border-color 0.3s ease,
        width 0.3s ease,
        border-radius 0.3s ease;
    }

    > img {
      display: block;
      fill: var(--color-subtitle);
      height: 0.85rem;
      width: 0.85rem;
      margin-left: 0.35rem;
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
