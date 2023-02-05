<script lang="ts">
  import type { BrandColors, PostItemStub } from "$lib/types";

  import Tag from "$lib/components/Tag.svelte";
  
  export let brandColors: BrandColors;
  export let post: PostItemStub;
  export let isPageBackgroundDark: boolean;
  export let activeTags: Set<string>;

  import { remsToPixels } from "$lib/functions";
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
        <a data-sveltekit-preload-data data-testid="post-stub-link-{post.slug}" href="item/{post.slug}">{post.title}</a>
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
    min-height: 1.5rem;
    align-items: center;

    div.picture-frame {
      border-radius: 50%;
      overflow: hidden;
      width: 2rem;
      height: 2rem;
      display: inline-block;
      flex-shrink: 0;

      * {
        height: 100%;
        width: 100%;
        display: block;
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
          color: var(--heading);
          text-decoration: underline !important;
        }
      }

      div.tags {
        display: flex;
        padding: 0.3rem 0;
        margin-left: 0.75rem;
        flex-wrap: wrap;
      }
    }
  }
</style>