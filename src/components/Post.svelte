<script>
  export let post;
  export let left;
  export let firstPost;
</script>

<style>
  @media (max-width: 1200px) {
    div.firstPostSpacer,
    div.postWrapper {
      margin: 0 !important;
    }
  }

  div.firstPostSpacer {
    border-left: 3px solid #444;
    height: 3rem;
    margin-left: 30%;
  }

  div.postWrapper {
    padding: 0 1rem;
    position: relative;
    display: flex;
  }

  div.timelineMarker {
    position: absolute;
    top: 50%;
    background-color: #444;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
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
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 1rem;
    box-shadow: 1px 1px 1px 0px rgba(34, 34, 34, 0.05);
  }

  div.postWrapper.left {
    border-left: 3px solid #444;
    margin-left: 30%;
  }

  div.postWrapper.right {
    border-right: 3px solid #444;
    justify-content: flex-end;
    margin-right: 30%;
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
    height: 1.5rem;
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
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 20px solid white;
  }

  .arrowRightBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 23px solid transparent;
    border-bottom: 23px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 1.7rem;
    border-left: 23px solid #eee;
  }

  .arrowLeft {
    z-index: 6;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 20px solid white;
  }

  .arrowLeftBorder {
    z-index: 2;
    width: 0;
    height: 0;
    border-top: 23px solid transparent;
    border-bottom: 23px solid transparent;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 1.7rem;
    border-right: 23px solid #eee;
  }
</style>

{#if firstPost}
  <div class="firstPostSpacer" />
{/if}
<div
  key={post.slug}
  class={`postWrapper ${left ? 'left' : 'right'} ${firstPost ? 'firstPost' : ''}`}>
  <div class="timelineMarker" />
  {#if left}
    <div class="arrowLeft" />
    <div class="arrowLeftBorder" />
  {:else}
    <div class="arrowRight" />
    <div class="arrowRightBorder" />
  {/if}
  <div class="post">
    <div class="postHeading">
      <div class="pictureFrame">
        {#if post.thumbnail}
          <picture>
            <source srcset="{post.thumbnail}.webp" type="image/webp" />
            <source srcset="{post.thumbnail}.png" type="image/png" />
            <img src="{post.thumbnail}.png" alt={post.title} />
          </picture>
        {/if}
      </div>
      <h3>
        {#if post.body}
          <a rel="prefetch" href="timeline/{post.slug}">{post.title}</a>
        {:else}{post.title}{/if}
      </h3>
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
