<script lang="ts">
  import type { TagColors, PostItemPage } from "$lib/types";

  import { MetaTags } from "svelte-meta-tags";
  import { onMount, tick } from "svelte";
  import { tagLabels } from "$lib/tags";

  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import BackLink from "$lib/components/BackLink.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  interface Props {
    data: { post: PostItemPage; tagColors: TagColors };
  }

  let { data }: Props = $props();

  const { post, tagColors } = data;

  let mainContent: HTMLDivElement | undefined = $state();
  onMount(async () => {
    await tick();
    mainContent?.scrollIntoView();
  });

  const capitalize = (text: string): string =>
    text.replaceAll(/\b\w/g, (m) => m.toUpperCase());

  const truncateBySentence = (text: string, maxLength: number): string => {
    const sentences: string[] = text
      .split(".")
      .filter((sentence) => sentence.trim())
      .map((sentence) => `${sentence.trim()}.`);

    if (!sentences[0]) {
      return text;
    }

    let truncated: string = sentences[0];

    for (let index = 1; index < sentences.length; index += 1) {
      const sentence = sentences[index];
      if (truncated.length + (sentence?.length ?? 0) > maxLength) {
        break;
      }
      truncated += ` ${sentence}`;
    }

    const firstSentence = `${text.split(".")[0]}.`;

    return truncated || firstSentence;
  };

  const meta = {
    title: post.title.length < 50 ? `${post.title} | Ross Hill` : post.title,
    description: truncateBySentence(post.excerpt, 155) ?? post.title,
    url: `https://rosshill.ca/experience/${post.slug}`,
    image: {
      url: post.image
        ? `https://rosshill.ca/experience/${post.image.name}.${post.image.extension}`
        : "https://rosshill.ca/site-image.png",
      alt: post.title,
    },
    siteName: "Ross Hill",
    author: "Ross Hill",
    tags: post.tags.map((tagId) => tagLabels[tagId] ?? capitalize(tagId)),
  };
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    article: { authors: [meta.author], tags: meta.tags },
    description: meta.description,
    images: [{ ...meta.image }],
    siteName: meta.siteName,
    title: meta.title,
    type: "article",
    url: meta.url,
  }}
  twitter={{
    cardType: "summary_large_image",
    title: meta.title,
    description: meta.description,
    image: meta.image.url,
    imageAlt: meta.image.alt,
  }}
/>
<div bind:this={mainContent} class="content-wrapper" data-testid="main-content">
  <BackLink href="/" />
  <article class="post-full">
    <h2 data-testid="post-title">{post.title}</h2>
    <div class="details">
      <div class="subtitle transition-colors">
        <PostDate date={post.date} />
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
      {#if post.tags.length}
        <div class="tags-wrapper">
          {#each post.tags as tagId}
            <Tag {tagId} background={tagColors[tagId]?.bg} />
          {/each}
        </div>
      {/if}
    </div>
    {#if post.image}
      <picture>
        <source srcset="/experience/{post.image.name}.webp" type="image/webp" />
        <source
          srcset="/experience/{post.image.name}.{post.image.extension}"
          type="image/{post.image.extension}"
        />
        <img
          class="transition-colors"
          src="/experience/{post.image.name}.{post.image.extension}"
          alt={post.title}
          width={600}
          height={400}
        />
      </picture>
    {/if}
    {#if post.embed}
      <div class="embed-wrapper">
        <div class="transition-colors">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html post.embed}
        </div>
      </div>
    {/if}

    <div class="content">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html post.contents}
    </div>
  </article>
  <CopyrightNotice />
</div>

<style lang="scss">
  article.post-full {
    margin-bottom: var(--spacing-3xl);

    h2 {
      margin-top: var(--spacing-m);
    }

    div.details {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: var(--spacing-l);
      margin-top: calc(var(--spacing-s) * -1);

      div.subtitle {
        font-size: var(--font-size-xs);
        color: var(--color-subtitle);
        margin-top: var(--spacing-xs);
        margin-right: var(--spacing-2xl);
      }

      div.tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin: var(--spacing-xs) 0 0;
        gap: var(--spacing-xs);
      }
    }

    img {
      max-width: 600px;
      max-width: min(600px, 100%);
      max-height: 400px;
      width: auto;
      height: auto;
      margin: var(--spacing-2xl) auto;
      display: block;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-l);
    }

    div.embed-wrapper {
      width: 100%;
      max-width: 600px;
      margin: var(--spacing-2xl) auto;

      > div {
        position: relative;
        padding-bottom: 56.25%;
        overflow: hidden;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-l);
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
