<script lang="ts">
  import type { BrandColors, PostItemStub } from "$lib/types";
  import Tag from "$lib/components/Tag.svelte";
  import { remsToPixels } from "$lib/functions";

  export let brandColors: BrandColors;
  export let post: PostItemStub;
  export let isPageBackgroundDark: boolean;
  export let activeTags: Set<string>;
</script>

<div class="post-heading">
  <div class="picture-frame">
    {#if post.thumbnail}
      <picture class="fixed-size">
        <source srcset="/timeline/{post.thumbnail.name}.webp" type="image/webp" />
        <source
          srcset="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
          type="image/{post.thumbnail.extension}"
        />
        <img
          src="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
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
          background={brandColors[tagId]?.bg}
          foreground={brandColors[tagId]?.fg}
          active={activeTags.has(tagId)}
          isPageBackgroundDark={isPageBackgroundDark}
          needsOutlineOnLightBg={brandColors[tagId]?.outlineOnLight}
          needsOutlineOnDarkBg={brandColors[tagId]?.outlineOnDark}
          lazyLoad />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  div.post-heading {
    display: flex;
    align-items: center;
    min-height: 1.5rem;

    div.picture-frame {
      display: inline-block;
      overflow: hidden;
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #ffffff;

      * {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    div.heading-and-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      h3 {
        font-size: 0.95rem;
        line-height: 1.2rem;
        display: inline-block;
        margin: 0 0.5rem 0 0.75rem;
        padding: 0;

        a {
          text-decoration: underline !important;
          color: var(--heading);
        }
      }

      div.tags {
        display: flex;
        flex-wrap: wrap;
        margin-left: 0.75rem;
        padding: 0.3rem 0;
      }
    }
  }
</style>
