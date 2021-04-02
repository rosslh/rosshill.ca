<script>
  import IntersectionObserver from "./IntersectionObserver.svelte";
  import PostArrow from "./PostArrow.svelte";
  import TimelineMarker from "./TimelineMarker.svelte";
  import Tag from "./Tag.svelte";

  export let post;
  export let left;
  export let firstPost;
  export let lastPost;

  $: typeString =
    ({ job: "Job", org: "Organization", project: "Project" })[post.eventType] ||
    "";

  let element;
  let intersecting;

  $: hasIntersected = hasIntersected || intersecting;
</script>

{#if firstPost}
  <div
    aria-hidden="true"
    class="postSpacer doTransition {left ? 'left' : 'right'}"
  />
{/if}
<IntersectionObserver
  {element}
  complete={hasIntersected}
  threshold={firstPost ? 0 : 0.25}
  bind:intersecting
>
  <div
    bind:this={element}
    id="timeline-item-{post.slug}"
    class="postWrapper doTransition {left ? 'left' : 'right'}"
  >
    <TimelineMarker {left} />
    <div class="fadeIn {!hasIntersected && 'invisible'}">
      <PostArrow {left} />
      <div class="post doTransition">
        <div class="postHeading">
          <div class="pictureFrame">
            {#if post.thumbnail}
              <picture class="fixedSize">
                <source srcset="/{post.thumbnail}.webp" type="image/webp" />
                <source
                  srcset="/{post.thumbnail}.{post.thumbnailExt || 'png'}"
                  type="image/{post.thumbnailExt || 'png'}"
                />
                <img
                  src="/{post.thumbnail}.{post.thumbnailExt || 'png'}"
                  loading="lazy"
                  alt=""
                  width="1.7rem"
                  height="1.7rem"
                />
              </picture>
            {/if}
          </div>
          <div class="headingAndTags">
            <h3>
              {#if post.hasContent}
                <a rel="prefetch" href="item/{post.slug}">{post.title}</a>
              {:else}{post.title}{/if}
            </h3>
            <div class="tags">
              {#if post.tags && post.tags.length}
                {#each post.tags as tagId}
                  <Tag {tagId} />
                {/each}
              {/if}
            </div>
          </div>
        </div>
        {#if post.blurb}
          <p class="postText">{@html post.blurb}</p>
        {/if}
        <div class="footer">
          <div class="externalLinks doTransition">
            {#if post.repository}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.repository}
              >
                GitHub
              </a>
            {/if}
            {#if post.repository && post.website}
              <span class="smallSlash">/</span>
            {/if}
            {#if post.website}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.website}
              >
                Website
              </a>
            {/if}
          </div>
          <div class="typeString doTransition {post.eventType}">
            {typeString}
          </div>
        </div>
      </div>
    </div>
  </div>
</IntersectionObserver>
{#if lastPost}
  <div
    aria-hidden="true"
    class="postSpacer doTransition {left ? 'left' : 'right'}"
  />
{/if}

<style>
  @media (max-width: 1200px) {
    div.postSpacer,
    div.postWrapper {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  div.postSpacer {
    height: 3rem !important;
  }

  div.postSpacer.left {
    border-left: 3px solid var(--timeline);
    margin-left: 25%;
  }

  div.postSpacer.right {
    border-right: 3px solid var(--timeline);
    margin-right: 25%;
  }

  div.postWrapper {
    padding: 0;
    position: relative;
    display: flex;
    border-color: var(--timeline) !important;
  }

  div.fadeIn {
    transition: opacity 0.6s ease-in, transform 0.6s ease;
    opacity: 1;
    transform: scale(1);
  }

  div.fadeIn.invisible {
    opacity: 0;
    transform: scale(0.9);
  }

  div.post {
    z-index: 4;
    padding: 1rem 0.75rem;
    background-color: var(--postBackground);
    border: 1px solid var(--postBorder);
    border-radius: 0.3rem;
    margin: 0.75rem 0;
    position: relative;
  }

  div.postWrapper.left {
    padding-left: 2rem;
  }
  div.postWrapper.right {
    padding-right: 2rem;
  }

  div.postWrapper.left {
    border-left: 3px solid var(--timeline);
    margin-left: 25%;
  }

  div.postWrapper.right {
    border-right: 3px solid var(--timeline);
    justify-content: flex-end;
    margin-right: 25%;
  }

  div.post div.postHeading div.pictureFrame {
    border-radius: 50%;
    overflow: hidden;
    width: 1.7rem;
    height: 1.7rem;
    display: inline-block;
    flex-shrink: 0;
  }
  div.post div.postHeading div.pictureFrame * {
    height: 100%;
    width: 100%;
    display: block;
  }

  div.post div.postHeading {
    display: flex;
    min-height: 1.5rem;
    align-items: center;
  }

  div.post div.imageAndHeading {
    display: flex;
    align-items: center;
  }

  div.post div.postHeading div.tags {
    display: flex;
    padding: 0.3rem 0;
    margin-left: 0.75rem;
    flex-wrap: wrap;
  }

  div.post div.typeString {
    font-size: 0.75rem;
  }

  div.post div.typeString.job {
    color: var(--job);
  }

  div.post div.typeString.org {
    color: var(--org);
  }

  div.post div.typeString.project {
    color: var(--project);
  }

  div.post div.postHeading div.headingAndTags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  div.post div.postHeading h3 {
    font-size: 0.95rem;
    line-height: 1.2rem;
    display: inline-block;
    margin: 0 1rem;
    padding: 0;
  }

  div.post div.postHeading h3 a {
    color: var(--heading);
  }

  div.post p.postText {
    font-size: 0.95rem !important;
  }

  div.post p.postText,
  div.post div.footer {
    padding: 0.1rem 0.75rem 0 calc(1.8rem + 0.75rem) !important;
  }

  div.post div.footer {
    font-size: 0.8rem;
    padding-top: 0.5rem !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.post div.footer div.externalLinks {
    color: var(--subtitle);
  }
  @media (min-width: 701px) {
    div.post div.postHeading {
      padding-right: 4rem;
    }
    div.typeString {
      position: absolute;
      top: 1rem;
      right: 0.75rem;
    }
  }
  @media (max-width: 700px) {
    div.post div.postHeading {
      padding-right: 0;
    }
    div.post p.postText,
    div.post div.footer {
      padding-left: 0 !important;
      padding-right: 0;
    }
  }
</style>
