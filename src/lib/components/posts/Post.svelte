<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import type { PostItemStub } from "$lib/types";
  import Balancer from "svelte-wrap-balancer";
  import PostDate from "../PostDate.svelte";
  import InternalLinkIcon from "~icons/ci/arrow-right-md";
  import ExternalLinkIcon from "~icons/ci/external-link";
  import RoleArrowIcon from "~icons/ci/arrow-right-sm";

  interface Props {
    post: PostItemStub;
    showDate?: boolean;
  }

  let { post, showDate }: Props = $props();

  const href = post.hasContent ? `/experience/${post.slug}` : post.website;
  const dataTestId = post.hasContent
    ? `post-stub-link-${post.slug}`
    : undefined;
</script>

<div class="post-card-wrapper">
  <svelte:element
    this={href ? "a" : "div"}
    class="post-card"
    {href}
    data-testid={dataTestId}
    data-sveltekit-preload-data={href ? "hover" : undefined}
    target={href && href === post.website ? "_blank" : undefined}
    rel={href && href === post.website ? "noopener" : undefined}
  >
    <img
      src={`/experience/${post.thumbnail.name}.${post.thumbnail.extension}`}
      alt=""
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
    {#if post.roles?.length || showDate}
      <div class="post-meta">
        {#if post.roles?.length}
          <div class="post-roles">
            {#each post.roles as role, index}
              {#if index > 0}<RoleArrowIcon
                  class="post-role-arrow"
                  aria-hidden="true"
                />{/if}<span class="post-role">{role}</span>
            {/each}
          </div>
        {/if}
        {#if showDate}
          <PostDate date={post.date} fontSize="var(--font-size-2xs)" />
        {/if}
      </div>
    {/if}
  </svelte:element>
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  .post-card-wrapper {
    min-width: 0;
    flex-shrink: 1;
    flex-grow: 0;
    width: 33.333%;
    text-decoration: none;
    overflow: hidden;

    .post-card {
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      gap: var(--spacing-s);
      max-width: 100%;
      padding: var(--spacing-xl);
      text-decoration: none;

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
        margin-top: var(--spacing-2xs);

        > div {
          display: flex;
          align-items: center;
          color: var(--highlight-color);
          font-size: var(--font-size-xs);
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

      .post-meta {
        color: var(--color-subtitle);
        font-size: var(--font-size-2xs);
        max-width: 15rem;

        .post-role {
          font-weight: 500;
        }

        :global(.post-role-arrow) {
          width: 1em;
          height: 1em;
          vertical-align: -0.15em;
          margin: 0 0.15em;
        }
      }
    }
  }

  @media (max-width: breakpoints.$breakpoint-l-max) {
    .post-card-wrapper {
      width: 50% !important;
    }
  }

  @media (max-width: breakpoints.$breakpoint-xs-max) {
    .post-card {
      padding: var(--spacing-l);
    }
  }

  @media (max-width: breakpoints.$breakpoint-2xs-max) {
    .post-card-wrapper {
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

      .post-meta {
        max-width: 100% !important;
      }
    }
  }
</style>
