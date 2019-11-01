<script>
  export let post;
  export let left;
  export let firstPost;
  export let lastPost;

  $: typeString =
    { job: "Job", ec: "Extracurricular", project: "Project" }[post.eventType] ||
    "";
</script>

<style>
  @media (max-width: 1200px) {
    div.postSpacer,
    div.postWrapper {
      margin: 0 !important;
    }
  }

  div.postSpacer {
    border-left: 3px solid #555;
    height: 3rem;
    margin-left: 25%;
  }

  div.postWrapper {
    padding: 0;
    position: relative;
    display: flex;
  }

  div.timelineMarker {
    position: absolute;
    top: 50%;
    background-color: white;
    border: 3px solid #444;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
  }

  div.postWrapper.left {
    padding-left: 2rem;
  }
  div.postWrapper.right {
    padding-right: 2rem;
  }
  div.postWrapper.left div.timelineMarker {
    transform: translate(50%, -50%);
    position: absolute;
    left: calc(-1rem + 2px);
  }

  div.postWrapper.right div.timelineMarker {
    transform: translate(-50%, -50%);
    position: absolute;
    right: calc(-1rem + 2px);
  }

  div.post {
    z-index: 4;
    padding: 1rem 0;
    background-color: white;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    margin: 0.75rem 0;
  }

  div.postWrapper.left {
    border-left: 3px solid #555;
    margin-left: 25%;
  }

  div.postWrapper.right {
    border-right: 3px solid #555;
    justify-content: flex-end;
    margin-right: 25%;
  }

  div.post div.postHeading div.pictureFrame {
    border-radius: 50%;
    overflow: hidden;
    width: 1.7rem;
    height: 1.7rem;
    display: inline-block;
  }
  div.post div.postHeading div.pictureFrame img {
    height: 100%;
    width: 100%;
  }

  div.post div.postHeading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    min-height: 1.5rem;
  }

  div.post div.postHeading div.imageAndHeading {
    display: flex;
    align-items: center;
    height: 1.5rem;
  }

  div.post div.postHeading div.typeString {
    font-size: 0.7rem;
    padding-left: 0.5rem;
  }

  div.post div.postHeading div.typeString.job {
    color: var(--job);
  }

  div.post div.postHeading div.typeString.ec {
    color: var(--ec);
  }

  div.post div.postHeading div.typeString.project {
    color: var(--project);
  }

  div.post div.postHeading h3 {
    font-size: 1rem;
    line-height: 1.2rem;
    margin-left: 0.75rem;
    display: inline-block;
    padding: 0.5rem 0;
  }

  div.post div.postHeading h3 a {
    color: black;
  }

  div.post {
    padding: 0.7rem;
  }

  div.post p.postText {
    font-size: 0.85rem !important;
  }

  div.post p.postText,
  div.post p.readMore {
    padding: 0.5rem 0.75rem 0 calc(1.8rem + 0.75rem) !important;
  }
  div.post p.readMore {
    font-size: 0.7rem;
  }

  @media (max-width: 700px) {
    div.post p.postText,
    div.post p.readMore {
      padding-left: 0 !important;
      padding-right: 0;
    }
  }

  .arrowRight {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 16px solid white;
  }

  .arrowRightBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 18px solid #cdcdcd;
  }

  .arrowLeft {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 16px solid white;
  }

  .arrowLeftBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 18px solid #cdcdcd;
  }
</style>

{#if firstPost}
  <div aria-hidden="true" class="postSpacer" />
{/if}
<div
  id="timeline-item-{post.slug}"
  key={post.slug}
  class={`postWrapper ${left ? 'left' : 'right'} ${firstPost ? 'firstPost' : ''}`}>
  <div aria-hidden="true" class="timelineMarker" />
  {#if left}
    <div aria-hidden="true" class="arrowLeft" />
    <div aria-hidden="true" class="arrowLeftBorder" />
  {:else}
    <div aria-hidden="true" class="arrowRight" />
    <div aria-hidden="true" class="arrowRightBorder" />
  {/if}
  <div class="post">
    <div class="postHeading">
      <div class="imageAndHeading">
        <div class="pictureFrame">
          {#if post.thumbnail}
            <picture>
              <source srcset="{post.thumbnail}.webp" type="image/webp" />
              <source
                srcset="{post.thumbnail}.{post.thumbnailExt || 'png'}"
                type="image/png" />
              <img
                src="{post.thumbnail}.{post.thumbnailExt || 'png'}"
                alt={post.title} />
            </picture>
          {/if}
        </div>
        <h3>
          {#if post.body}
            <a rel="prefetch" href="timeline/{post.slug}">{post.title}</a>
          {:else}{post.title}{/if}
        </h3>
      </div>
      <div class="typeString {post.eventType}">{typeString}</div>
    </div>
    {#if post.blurb}
      <p class="postText">{post.blurb}</p>
    {/if}
    {#if post.body}
      <p class="readMore">
        <a rel="prefetch" href="timeline/{post.slug}">Read more...</a>
      </p>
    {/if}
  </div>
</div>
{#if lastPost}
  <div aria-hidden="true" class="postSpacer" />
{/if}
