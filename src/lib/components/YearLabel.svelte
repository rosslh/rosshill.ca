<script lang="ts">
  import PostStubSpacer from "./post-stub/PostStubSpacer.svelte";

  interface Props {
    year: string;
    isRightToLeft: boolean;
    isFirstLabel: boolean;
  }

  let { year, isRightToLeft, isFirstLabel }: Props = $props();
</script>

<div class="label-wrapper transition-colors">
  <span
    class="year-label transition-colors"
    class:first-label={isFirstLabel}
    class:centered-label={!isFirstLabel}
  >
    {year}
  </span>
  {#if isFirstLabel}
    <div aria-hidden="true" class="first-label-line"></div>
    <PostStubSpacer left />
  {:else}
    <div
      aria-hidden="true"
      class="line"
      class:rtl={isRightToLeft}
      class:ltr={!isRightToLeft}
    >
      <div class="transition-colors"></div>
      <div class="transition-colors"></div>
      <div class="transition-colors"></div>
      <div class="transition-colors"></div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.label-wrapper {
    position: relative;
    color: var(--color-heading);

    div.line {
      display: flex;
      flex-wrap: wrap;
      margin: 0 25%;

      > div {
        width: 50%;
        height: 80px;
        border-color: var(--color-timeline);
      }

      &.ltr {
        > div:first-child {
          border-left: 3px solid var(--color-timeline);
          border-bottom: 3px solid var(--color-timeline);
          border-bottom-left-radius: 100%;
        }

        > div:last-child {
          border-right: 3px solid var(--color-timeline);
          border-top: 3px solid var(--color-timeline);
          border-top-right-radius: 100%;
        }
      }

      &.rtl {
        > div:nth-child(2) {
          border-right: 3px solid var(--color-timeline);
          border-bottom: 3px solid var(--color-timeline);
          border-bottom-right-radius: 100%;
        }

        > div:nth-child(3) {
          border-left: 3px solid var(--color-timeline);
          border-top: 3px solid var(--color-timeline);
          border-top-left-radius: 100%;
        }
      }
    }

    span.year-label {
      color: var(--color-heading);
      background-color: var(--color-panel-background);
      height: 2.2rem;
      border-radius: var(--border-radius-s);
      width: 4.5rem;
      border: 1px solid var(--color-border);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;

      &.centered-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  @media (max-width: $breakpoint-l-max) {
    div.line,
    span.year-label {
      margin: 0 !important;
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    .label-wrapper :global(.post-spacer) {
      display: none;
    }

    .first-label {
      transform: translate(1.25rem, 1.3rem);
    }

    .first-label-line {
      border-top: 3px solid var(--color-timeline);
      border-left: 3px solid var(--color-timeline);
      height: 2rem;
      width: 2rem;
      border-top-left-radius: 100%;
    }
  }
  @media (min-width: $breakpoint-xs-min) {
    .first-label {
      z-index: 4;
      margin-left: 25%;
      position: absolute;
      transform: translate(-50%, 0);
    }

    .first-label-line {
      display: none;
    }
  }
</style>
