<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import type { PostItemStub } from "$lib/types";
  import Balancer from "svelte-wrap-balancer";
  import PostDate from "../PostDate.svelte";

  interface Props {
    title: string;
    posts: PostItemStub[];
    showDate?: boolean;
  }

  let { title, posts, showDate }: Props = $props();

  import InternalLinkIcon from "~icons/ci/arrow-right-lg";
  import ExternalLinkIcon from "~icons/ci/external-link";
</script>

<div class="content-wrapper">
  <h2 class="title">{title}</h2>
  <div class="posts">
    {#each posts as post}
      {@const href = post.hasContent
        ? `/experience/${post.slug}`
        : post.website}
      {@const dataTestId = post.hasContent
        ? `post-stub-link-${post.slug}`
        : undefined}
      <svelte:element
        this={href ? "a" : "div"}
        class="post-card"
        {href}
        data-testid={dataTestId}
        data-sveltekit-preload-data={href ? "hover" : undefined}
        target={href === post.website ? "_blank" : undefined}
        rel={href === post.website ? "noopener noreferrer" : undefined}
      >
        <img
          src={`/experience/${post.thumbnail.name}.${post.thumbnail.extension}`}
          alt={post.title}
          class="post-thumbnail transition-colors"
          class:show-border={post.thumbnail.showBorder}
          width={remsToPixels(2.5)}
          height={remsToPixels(2.5)}
        />
        <div class="post-header">
          <h3 class="post-title">{post.title}</h3>
          <div class="post-link-icon">
            {#if post.hasContent}
              <InternalLinkIcon />
            {:else if href}
              <ExternalLinkIcon />
            {/if}
          </div>
        </div>
        <p class="post-excerpt balanced">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <Balancer>{@html post.excerpt}</Balancer>
        </p>
        <p class="post-excerpt unbalanced">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html post.excerpt}
        </p>
        {#if showDate}
          <PostDate date={post.date} />
        {/if}
      </svelte:element>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "src/lib/styles/media-queries";

  .title {
    margin: 0;
    margin-bottom: var(--spacing-m);
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
    margin: 0 calc(var(--spacing-l) * -1);

    .post-card {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
      min-width: 0;
      flex-shrink: 1;
      flex-grow: 0;
      padding: var(--spacing-2xl) var(--spacing-xl);
      width: 33.333%;
      text-decoration: none;
      overflow: hidden;

      .post-thumbnail {
        border-radius: var(--border-radius-s);

        &.show-border {
          border: 1px solid var(--color-border);
        }
      }

      .post-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);

        > div {
          display: flex;
          align-items: center;
          color: var(--color-subtitle);
          font-size: var(--font-size-2xs);
        }

        .post-title {
          font-size: var(--font-size-m);
          margin: 0;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .post-excerpt {
        font-size: var(--font-size-xs);
        color: var(--color-subtitle);
        max-width: 15rem;

        &.unbalanced {
          display: none;
        }
      }
    }
  }

  @media (max-width: media-queries.$breakpoint-l-max) {
    .post-card {
      width: 50% !important;
    }
  }

  @media (max-width: media-queries.$breakpoint-xs-max) {
    .posts {
      margin: 0 calc(var(--spacing-m) * -1);

      .post-card {
        padding: var(--spacing-2xl) var(--spacing-l);
      }
    }
  }

  @media (max-width: media-queries.$breakpoint-2xs-max) {
    .post-card {
      width: 100% !important;

      .post-excerpt {
        max-width: none !important;

        &.balanced {
          display: none;
        }

        &.unbalanced {
          display: block !important;
        }
      }
    }
  }
</style>
