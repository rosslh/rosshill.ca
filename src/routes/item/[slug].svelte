<script lang="ts">
  export let post: PostItem;
  export let brandColors: BrandColors = {};
  
  import { onMount, tick } from "svelte";

  import type { BrandColors, PostItem } from "$lib/types";
  
  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import BackLink from "$lib/components/BackLink.svelte";

  let mainContent: HTMLElement;
  onMount(async () => {
    await tick();
    mainContent.scrollIntoView();
  });
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/item/{post.slug}" />
</svelte:head>
<div bind:this={mainContent} class="content-wrapper main-content" data-test="main-content">
  <BackLink href="/#timeline-{post.slug}" />
  <article class="post-full">
    <h2 data-test="post-title">{post.title}</h2>
    <div class="details">
      <div class="subtitle do-transition">
        <PostDate {post} />
        {#if post.repository}
          <InlineSeparator />
          <a target="_blank" rel="noopener noreferrer" href={post.repository}>
            GitHub
          </a>
        {/if}
        {#if post.website}
          <InlineSeparator />
          <a target="_blank" rel="noopener noreferrer" href={post.website}>
            Website
          </a>
        {/if}
      </div>
      {#if post.tags && post.tags.length}
        <div class="tags-wrapper">
          {#each post.tags as tagId}
            <Tag
              {tagId}
              background={brandColors[tagId].background}
              foreground={brandColors[tagId].foreground} />
          {/each}
        </div>
      {/if}
    </div>
    {#if post.image}
      <div class="image-wrapper do-transition">
        <picture>
          <source srcset="/timeline/{post.image}.webp" type="image/webp" />
          <source
            srcset="/timeline/{post.image}.{post.imageExt}"
            type="image/{post.imageExt}"
          />
          <img
            src="/timeline/{post.image}.{post.imageExt}"
            alt={post.title}
          />
        </picture>
      </div>
    {/if}
    {#if post.embed}
      <div class="embed-wrapper">
        <div class="do-transition">
          {@html post.embed}
        </div>
      </div>
    {/if}

    <div class="content">
      {@html post.contents}
    </div>
  </article>
</div>

<style lang="scss">
  article.post-full {
    margin-bottom: 3rem;

    h2 {
      margin-top: 1rem;
    }

    div.details {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1.2rem;
      margin-top: -0.75rem;

      div.subtitle {
        font-size: 15px;
        color: var(--subtitle);
        margin-top: 0.5rem;
        margin-right: 2rem;
      }

      div.tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin: 0.5rem 0 0;
      }
    }

    div.image-wrapper {
      max-width: 600px;
      max-height: 400px;
      margin: 1.5rem auto 2rem;
      width: 100%;
      overflow: hidden;
      border: 1px solid var(--border);
      padding: 0;
      border-radius: 4px;

      img {
        max-width: 100%;
        max-height: 100%;
        padding: 0;
        margin: 0;
        display: block;
      }
    }

    div.embed-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 1.5rem auto 2rem;

      > div {
        position: relative;
        padding-bottom: 56.25%;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 4px;
      }
    }
  }

  div.embed-wrapper :global(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0; 
  }
</style>
