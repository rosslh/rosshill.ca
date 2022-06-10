<script lang="ts">
  import type { PostItem, BrandColors } from "$lib/types";

  export let post: PostItem;
  export let brandColors: BrandColors;
  export let left: boolean;
  export let isFirstPost: boolean;
  export let isLastPost: boolean;

  import { browser } from "$app/env";
  import { prefetch } from "$app/navigation";
  
  import { reduceMotion } from "$lib/constants";
  import IntersectionObserver from "$lib/components/IntersectionObserver.svelte";
  import PostStubTriangle from "$lib/components/timeline/post-stub/PostStubTriangle.svelte";
  import TimelineMarker from "$lib/components/timeline/post-stub/TimelineMarker.svelte";
  import PostStubSpacer from "$lib/components/timeline/post-stub/PostStubSpacer.svelte";
  import PostStubHeading from "./PostStubHeading.svelte";
  import PostStubFooter from "./PostStubFooter.svelte";

  let element: HTMLElement;
  let intersecting: boolean;

  $: hasIntersected = reduceMotion || hasIntersected || intersecting;

  // Graceful degradation for fading in posts
  $: getFadeInClass = () => {
    if (!browser) {
      return "ssr-fade-in";
    }
    return hasIntersected ? "fade-in" : "fade-in invisible";
  };

  const preloadPage = async () => {
    await prefetch(`item/${post.slug}`);
  };
</script>

{#if isFirstPost}
  <PostStubSpacer {left} />
{/if}
<IntersectionObserver
  {element}
  complete={hasIntersected}
  threshold={isFirstPost ? 0 : 0.5}
  bind:intersecting
>
  <div
    bind:this={element}
    id="timeline-{post.slug}"
    data-testid="post-stub-{post.slug}"
    class="post-wrapper do-transition {left ? 'left' : 'right'}"
  >
    <TimelineMarker
      {left}
      eventType={post.eventType} />
    <div class="{getFadeInClass()} {left ? 'left' : 'right'}">
      <PostStubTriangle {left} />
      <div
        class="post do-transition"
        on:mouseenter|once={post.hasContent && preloadPage}
      >
        <PostStubHeading {post} {brandColors} />
        {#if post.excerpt}
          <p class="post-text">{@html post.excerpt}</p>
        {/if}
        <PostStubFooter {post} />
      </div>
    </div>
  </div>
</IntersectionObserver>
{#if isLastPost}
  <PostStubSpacer {left} showBottomMarker />
{/if}

<style lang="scss">
  @media (max-width: 1200px) {
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
    border-color: var(--timeline) !important;
    perspective: 500px;

    &.left {
      padding-left: 2rem;
      border-left: 3px solid var(--timeline);
      margin-left: 25%;
    }
    &.right {
      padding-right: 2rem;
      border-right: 3px solid var(--timeline);
      justify-content: flex-end;
      margin-right: 25%;
    }

    div.ssr-fade-in {
      opacity: 0;
      transform: scale(1);
      animation: fade-in-animation ease-in 0.5s;
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
      padding: 0.8rem;
      background-color: var(--panel-background);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      margin: 0.8rem 0;
      position: relative;

      p.post-text {
        padding: 0.1rem 0.75rem 0 calc(1.8rem + 1rem);
      }
    }
  }

  @media (max-width: 699px) {
    div.post p.post-text,
    div.post :global(div.footer) {
      padding-left: 0.2rem !important;
      padding-right: 0.2rem !important;
    }
  }
</style>
