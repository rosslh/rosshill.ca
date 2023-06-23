<script lang="ts">
  import type { BrandColors, PostItemStub } from "$lib/types";
  import { browser } from "$app/environment";
  import { preloadData } from "$app/navigation";
  import { reduceMotion } from "$lib/reduceMotion";

  import IntersectionObserver from "./IntersectionObserver.svelte";
  import PostStubTriangle from "./PostStubTriangle.svelte";
  import TimelineMarker from "./TimelineMarker.svelte";
  import PostStubSpacer from "./PostStubSpacer.svelte";
  import PostStubHeading from "./PostStubHeading.svelte";
  import PostStubFooter from "./PostStubFooter.svelte";

  export let post: PostItemStub;
  export let brandColors: BrandColors;
  export let left: boolean;
  export let isLastPost: boolean;
  export let isPageBackgroundDark: boolean;
  export let activeTags: Set<string>;

  let element: HTMLElement;
  let intersecting: boolean;

  let hasIntersected = false;
  $: {
    hasIntersected ||= reduceMotion || intersecting;
  }

  // Graceful degradation for fading in posts
  $: getFadeInClass = (): string => {
    if (!browser) {
      return "ssr-fade-in";
    }
    return hasIntersected ? "fade-in" : "fade-in invisible";
  };

  const preloadPage = async (): Promise<void> => {
    await preloadData(`item/${post.slug}`);
  };

  let showTooltip = false;

  interface PostEvent {
    eventType: string;
  }

</script>

<IntersectionObserver
  bind:intersecting
  complete={hasIntersected}
  {element}
  threshold={0.5}
>
  <div
    bind:this={element}
    class="post-wrapper do-transition {left ? 'left' : 'right'}"
    data-testid="post-stub-{post.slug}"
    id="timeline-{post.slug}"

    on:mouseenter={() => {
      showTooltip = true;
    }}
    on:mouseleave={() => {
      showTooltip = false;
    }}
  >
    <TimelineMarker
      eventType={post.eventType}
      {left}
      {showTooltip}/>
    <div class="{getFadeInClass()} {left ? 'left' : 'right'}">
      <PostStubTriangle {left}/>
      <div
        class="post do-transition"
        on:mouseenter|once={post.hasContent ? preloadPage : null}
      >
        <PostStubHeading
          {activeTags}
          {brandColors}
          {isPageBackgroundDark}
          {post}
        />
        {#if post.excerpt}
          <p class="post-text">{@html post.excerpt}</p>
        {/if}
        <PostStubFooter {post}/>
      </div>
    </div>
  </div>
</IntersectionObserver>
{#if isLastPost}
  <PostStubSpacer {left}/>
{/if}

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

  @media (max-width: $breakpoint-m-max) {
    div.post-wrapper {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  @keyframes fade-in-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  div.post-wrapper {
    padding: 0;
    position: relative;
    display: flex;
    border-color: var(--color-timeline) !important;
    perspective: 500px;

    &.left {
      padding-left: var(--spacing-2xl);
      border-left: 3px solid var(--color-timeline);
      margin-left: 25%;
    }

    &.right {
      padding-right: var(--spacing-2xl);
      border-right: 3px solid var(--color-timeline);
      justify-content: flex-end;
      margin-right: 25%;
    }

    div.ssr-fade-in {
      opacity: 0;
      transform: scale(1);
      animation: fade-in-animation ease-in 0.3s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-delay: 3s;
    }

    div.fade-in {
      transition: opacity 0.2s ease-in, transform 0.4s ease-out;
      opacity: 1;
      transform: rotateY(0deg);

      &.left {
        transform-origin: -2rem;
      }

      &.right {
        transform-origin: calc(100% + 2rem);
      }

      &.invisible {
        opacity: 0;

        &.left {
          transform: rotateY(60deg);
        }

        &.right {
          transform: rotateY(-60deg);
        }
      }
    }

    div.post {
      z-index: 4;
      padding: var(--spacing-s);
      background-color: var(--color-panel-background);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-m);
      margin: var(--spacing-s) 0;
      position: relative;

      p.post-text {
        padding: var(--spacing-2xs) var(--spacing-s) 0 calc(var(--spacing-3xl) - var(--spacing-2xs));
      }
    }
  }

  @media (max-width: $breakpoint-xs-max) {
    div.post p.post-text,
    div.post :global(div.footer) {
      padding-left: var(--spacing-2xs) !important;
      padding-right: var(--spacing-2xs) !important;
    }
  }
</style>
