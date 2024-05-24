<script lang="ts">
  import type { TagColors, PostItemStub } from "$lib/types";

  import Tag from "$lib/components/Tag.svelte";

  export let tagColors: TagColors;
  export let post: PostItemStub;
  export let activeTags: Set<string>;

  import { remsToPixels } from "$lib/functions";
  import { capitalize } from "lodash-es";
</script>

<div class="post-heading">
  <div class="picture-frame">
    {#if post.thumbnail}
      <picture
        class="transition-colors"
        class:border={post.thumbnail.showBorder}
      >
        <source
          srcset="/timeline/{post.thumbnail.name}.webp"
          type="image/webp"
        />
        <source
          srcset="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
          type="image/{post.thumbnail.extension}"
        />
        <img
          src="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
          loading="lazy"
          alt={post.title}
          width={remsToPixels(1.7)}
          height={remsToPixels(1.7)}
        />
      </picture>
    {/if}
  </div>
  <div class="heading-and-tags">
    <h3>
      {#if post.hasContent}
        <a
          data-sveltekit-preload-data
          data-testid="post-stub-link-{post.slug}"
          href="item/{post.slug}"
        >
          {post.title}
        </a>
      {:else}{post.title}{/if}
    </h3>
    <div class="tags">
      {#each post.tags as tagId}
        <Tag
          {tagId}
          background={tagColors[tagId]?.bg}
          foreground={tagColors[tagId]?.fg}
          active={activeTags.has(tagId)}
          needsOutlineOnLightBg={tagColors[tagId]?.outlineOnLight}
          needsOutlineOnDarkBg={tagColors[tagId]?.outlineOnDark}
          lazyLoad
        />
      {/each}
    </div>
  </div>
  <div
    class="type"
    class:work={post.eventType === "work"}
    class:project={post.eventType === "project"}
    class:other={post.eventType === "other"}
  >
    {post.eventTypeLabel || capitalize(post.eventType)}
  </div>
</div>

<style lang="scss">
  div.post-heading {
    display: flex;
    min-height: 1.5rem;
    gap: var(--spacing-xs);

    .picture-frame {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      align-self: center;

      picture {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        &.border {
          border: 1px solid var(--color-border);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    div.heading-and-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      h3 {
        font-size: var(--font-size-s);
        display: inline-block;
        margin: 0 var(--spacing-2xs) 0 var(--spacing-2xs);
        padding: 0;

        a {
          color: var(--color-heading);
          text-decoration: underline !important;
        }
      }

      div.tags {
        display: flex;
        padding: var(--spacing-3xs) 0;
        margin-left: var(--spacing-2xs);
        flex-wrap: wrap;
      }
    }

    .type {
      margin-left: auto;
      margin-right: var(--spacing-xs);
      font-size: var(--font-size-2xs);

      &.work {
        color: var(--color-work-marker);
      }

      &.project {
        color: var(--color-project-marker);
      }

      &.other {
        color: var(--color-other-marker);
      }
    }
  }
</style>
