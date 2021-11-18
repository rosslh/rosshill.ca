<script lang="ts" context="module">
  export async function load({ page, fetch }) {
    // the `slug` parameter is available because this file is called [slug].html
    const res = await fetch(`/item/${page.params.slug.toLowerCase()}.json`);
    const { post, brandColors } = await res.json();

    return {
      props: { post, brandColors }
    };
  }
</script>

<script lang="ts">
  export let post: PostItem;
  export let brandColors: BrandColors = {};
  
  import type { BrandColors, PostItem } from "src/global";
  import FormattedDate from "$lib/components/FormattedDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import BackLink from '$lib/components/BackLink.svelte';
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/item/{post.slug}" />
</svelte:head>
<div class="contentWrapper mainContent">
  <BackLink href="/#timeline-{post.slug}" />
  <article class="postFull">
    <h2>{post.title}</h2>
    <div class="details">
      <div class="subtitle doTransition">
        <FormattedDate {post} />
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
        <div class="tagsWrapper">
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
      <div class="imageWrapper doTransition">
        <picture>
          <source srcset="/timeline/{post.image}.webp" type="image/webp" />
          <source
            srcset="/timeline/{post.image}.{post.imageExt || 'png'}"
            type="image/{post.imageExt || 'png'}"
          />
          <img
            src="/timeline/{post.image}.{post.imageExt || 'png'}"
            alt={post.title}
          />
        </picture>
      </div>
    {/if}
    {#if post.embed}
      <div class="embedWrapper">
        <div class="doTransition">
          {@html post.embed}
        </div>
      </div>
    {/if}

    <div class="content">
      {@html post.contents}
    </div>
  </article>
</div>

<style>
  article.postFull {
    margin-bottom: 3rem;
  }

  :global(article.postFull .content p) {
    margin: 1.5rem auto !important;
  }

  div.subtitle {
    font-size: 15px;
    color: var(--subtitle);
    margin-top: 0.5rem;
    margin-right: 2rem;
  }

  div.details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1.2rem;
    margin-top: -0.75rem;
  }

  div.tagsWrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0 0;
  }

  div.imageWrapper {
    max-width: 600px;
    max-height: 400px;
    margin: 1.5rem auto 2rem;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--sidebarBorder);
    padding: 0;
    border-radius: 4px;
    box-shadow: var(--boxShadow);
  }

  div.imageWrapper img {
    max-width: 100%;
    max-height: 100%;
    padding: 0;
    margin: 0;
    display: block;
  }

  div.embedWrapper {
    width: 100%;
    max-width: 600px;
    margin: 1.5rem auto 2rem;
  }

  div.embedWrapper > div {
    position: relative;
    padding-bottom: 56.25%;
    overflow: hidden;
    border: 1px solid var(--sidebarBorder);
    border-radius: 4px;
    box-shadow: var(--boxShadow);
  }

  :global(div.embedWrapper iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0; 
  }
</style>
