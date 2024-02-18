<script lang="ts">
  import type { TagColors, PostItemStub } from "$lib/types";

  export let posts: PostItemStub[];
  export let tagColors: TagColors;

  import { showCategories, showTags } from "$lib/stores";
  import { tagAncestors } from "$lib/tags";
  import PostStub from "./post-stub/PostStub.svelte";
  import YearLabel from "./YearLabel.svelte";
  import FilterControls from "./filters/FilterControls.svelte";
  import ConfusedTravolta from "$lib/components/ConfusedTravolta.svelte";

  const getYearFromDate = (date: string): string => date.slice(0, 4);

  const getLabelVisibilityAndAlignment = (
    post: PostItemStub,
    index: number,
    postsArray: PostItemStub[],
  ): PostItemStub => {
    const output = post;

    const previousItem = postsArray[index - 1];
    const previousLeftAligned = previousItem
      ? Boolean(previousItem.isLeftAligned)
      : false;
    const previousYear = previousItem
      ? getYearFromDate(previousItem.date.start)
      : null;

    const year = getYearFromDate(output.date.start);

    if (year === previousYear) {
      output.showYearLabel = false;
      output.isLeftAligned = previousLeftAligned;
    } else {
      output.showYearLabel = true;
      output.isLeftAligned = !previousLeftAligned;
    }

    return output;
  };

  $: isCategoryOfPostSelected = (post: PostItemStub): boolean =>
    $showCategories.size === 0 || $showCategories.has(post.eventType);

  $: isAncestorTagSelected = (tag: string): boolean =>
    Boolean(
      tagAncestors[tag] &&
        tagAncestors[tag]?.some((ancestorTag: string) =>
          $showTags.has(ancestorTag),
        ),
    );

  $: isTagOfPostSelected = (post: PostItemStub): boolean => {
    const postHasShownTag = post.tags.some(
      (tag) => $showTags.has(tag) || isAncestorTagSelected(tag),
    );
    return $showTags.size === 0 || postHasShownTag;
  };

  $: displayedPosts = posts
    .filter(
      (post: PostItemStub) =>
        isCategoryOfPostSelected(post) && isTagOfPostSelected(post),
    )
    .map(getLabelVisibilityAndAlignment);

  let activeTags: Set<string>;

  $: {
    const tags = new Set<string>();
    for (const tag of $showTags) {
      tags.add(tag);
      for (const [childTag, ancestorTags] of Object.entries(tagAncestors)) {
        if (ancestorTags.includes(tag)) {
          tags.add(childTag);
        }
      }
    }
    activeTags = tags;
  }
</script>

<div class="heading-wrapper content-wrapper">
  <h2>Expérience</h2>
  <FilterControls
    bind:showCategories={$showCategories}
    bind:showTags={$showTags}
    {posts}
    {tagColors}
  />
</div>
<div class="content-wrapper posts-wrapper">
  <div class="posts" role="list">
    {#each displayedPosts as post, index (post.slug)}
      {#if post.showYearLabel}
        <YearLabel
          isFirstLabel={index === 0}
          isRightToLeft={Boolean(post.isLeftAligned)}
          year={getYearFromDate(post.date.start)}
        />
      {/if}
      {#key `${index}|${post.isLeftAligned}`}
        <PostStub
          {post}
          {tagColors}
          {activeTags}
          isLastPost={index === displayedPosts.length - 1}
          left={Boolean(post.isLeftAligned)}
          isPageBackgroundDark={true}
        />
      {/key}
    {/each}
    {#if displayedPosts.length === 0}
      <ConfusedTravolta reason="Pas de résultat" />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.content-wrapper.posts-wrapper {
    padding: 0;
  }

  div.posts {
    padding: 0 var(--spacing-m);
    margin: var(--spacing-2xl) auto 0;
  }

  @media (min-width: $breakpoint-s-min) {
    div.content-wrapper.posts-wrapper {
      padding: 0 7%;
    }
  }

  @media (min-width: $breakpoint-l-min) {
    div.content-wrapper.posts-wrapper {
      padding: 0 var(--spacing-4xl);
    }
  }

  div.heading-wrapper {
    margin-top: var(--spacing-3xl);
    margin-bottom: var(--spacing-xl);
  }
</style>
