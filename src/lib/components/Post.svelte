<script lang="ts">
  export let post: PostItem;
  export let brandColors: BrandColors;
  export let left: boolean;
  export let isFirstPost: boolean;
  export let isLastPost: boolean;

  import type { BrandColors, PostItem } from "$lib/types";
  import IntersectionObserver from "./IntersectionObserver.svelte";
  import PostArrow from "./PostArrow.svelte";
  import TimelineMarker from "./TimelineMarker.svelte";
  import Tag from "./Tag.svelte";
  import FormattedDate from "./FormattedDate.svelte";
  import PostSpacer from "./PostSpacer.svelte";
  import { reduceMotion } from "$lib/constants";
  import { remsToPixels } from "$lib/functions";
  import InlineSeparator from "./InlineSeparator.svelte";

  let element: HTMLElement;
  let intersecting: boolean;

  $: hasIntersected = reduceMotion || hasIntersected || intersecting;

  // Graceful degradation for fading in posts
  const serverRendered = typeof window === "undefined";
  $: getFadeInClass = () => {
    if (serverRendered) {
      return "ssr-fade-in";
    }
    return hasIntersected ? "fade-in" : "fade-in invisible";
  };
</script>

{#if isFirstPost}
  <PostSpacer {left} />
{/if}
<IntersectionObserver
  {element}
  complete={hasIntersected}
  threshold={isFirstPost ? 0 : 0.25}
  bind:intersecting
>
  <div
    bind:this={element}
    id="timeline-{post.slug}"
    class="post-wrapper do-transition {left ? 'left' : 'right'}"
  >
    <TimelineMarker
      {left}
      eventType={post.eventType} />
    <div class={getFadeInClass()}>
      <PostArrow {left} />
      <div class="post do-transition">
        <div class="post-heading">
          <div class="picture-frame">
            {#if post.thumbnail}
              <picture class="fixed-size">
                <source srcset="/timeline/{post.thumbnail}.webp" type="image/webp" />
                <source
                  srcset="/timeline/{post.thumbnail}.{post.thumbnailExt || 'png'}"
                  type="image/{post.thumbnailExt || 'png'}"
                />
                <img
                  src="/timeline/{post.thumbnail}.{post.thumbnailExt || 'png'}"
                  loading="lazy"
                  alt=""
                  width={remsToPixels(1.7)}
                  height={remsToPixels(1.7)}
                />
              </picture>
            {/if}
          </div>
          <div class="heading-and-tags">
            <h3>
              {#if post.hasContent}
                <a rel="prefetch" href="item/{post.slug}">{post.title}</a>
              {:else}{post.title}{/if}
            </h3>
            <div class="tags">
              {#if post.tags && post.tags.length}
                {#each post.tags as tagId}
                  <Tag
                    {tagId}
                    background={brandColors[tagId].background}
                    foreground={brandColors[tagId].foreground}
                    lazyLoad />
                {/each}
              {/if}
            </div>
          </div>
        </div>
        {#if post.blurb}
          <p class="post-text">{@html post.blurb}</p>
        {/if}
        <div class="footer">
          <div class="external-links do-transition">
            {#if post.repository}
              <a target="_blank" rel="noopener noreferrer" href={post.repository}>
                GitHub
              </a>
            {/if}
            {#if post.repository && post.website}
              <InlineSeparator />
            {/if}
            {#if post.website}
              <a target="_blank" rel="noopener noreferrer" href={post.website}>
                Website
              </a>
            {/if}
          </div>
          <FormattedDate {post} />
        </div>
      </div>
    </div>
  </div>
</IntersectionObserver>
{#if isLastPost}
  <PostSpacer {left} showBottomMarker />
{/if}

<style>
  @media (max-width: 1200px) {
    div.post-wrapper {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  div.post-wrapper {
    padding: 0;
    position: relative;
    display: flex;
    border-color: var(--timeline) !important;
  }

  div.ssr-fade-in {
    opacity: 0;
    transform: scale(1);
    animation: fade-in-animation ease-in 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 3s;
  }

  @keyframes fade-in-animation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
  }

  div.fade-in {
    transition: opacity 0.5s ease-in, transform 0.5s ease;
    opacity: 1;
    transform: scale(1);
  }

  div.fade-in.invisible {
    opacity: 0;
    transform: scale(0.9);
  }

  div.post {
    z-index: 4;
    padding: 1rem 0.75rem;
    background-color: var(--panel-background);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    margin: 0.8rem 0;
    position: relative;
  }

  div.post-wrapper.left {
    padding-left: 2rem;
  }
  div.post-wrapper.right {
    padding-right: 2rem;
  }

  div.post-wrapper.left {
    border-left: 3px solid var(--timeline);
    margin-left: 25%;
  }

  div.post-wrapper.right {
    border-right: 3px solid var(--timeline);
    justify-content: flex-end;
    margin-right: 25%;
  }

  div.post div.post-heading div.picture-frame {
    border-radius: 50%;
    overflow: hidden;
    width: 1.7rem;
    height: 1.7rem;
    display: inline-block;
    flex-shrink: 0;
  }
  div.post div.post-heading div.picture-frame * {
    height: 100%;
    width: 100%;
    display: block;
  }

  :global(div.post > div.footer > div.date-string) {
    font-size: 0.8rem;
  }

  div.post div.post-heading {
    display: flex;
    min-height: 1.5rem;
    align-items: center;
  }

  div.post div.post-heading div.tags {
    display: flex;
    padding: 0.3rem 0;
    margin-left: 0.75rem;
    flex-wrap: wrap;
  }

  div.post div.post-heading div.heading-and-tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  div.post div.post-heading h3 {
    font-size: 0.95rem;
    line-height: 1.2rem;
    display: inline-block;
    margin: 0 0.5rem 0 1rem;
    padding: 0;
  }

  div.post div.post-heading h3 a {
    color: var(--heading);
    text-decoration: underline !important;
  }

  div.post p.post-text {
    font-size: 0.95rem !important;
  }

  div.post p.post-text,
  div.post div.footer {
    padding: 0.1rem 0.75rem 0 calc(1.8rem + 0.75rem) !important;
  }

  div.post div.footer {
    font-size: 0.8rem;
    padding-top: 0.75rem !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.post div.footer div.external-links {
    color: var(--subtitle);
  }

  @media (max-width: 700px) {
    div.post p.post-text,
    div.post div.footer {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
