<script context="module">
  export async function load({ page, fetch }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await fetch(`/item/${page.params.slug.toLowerCase()}.json`);
    const post = await res.json();

    return {
      props: {
        post
      }
    };
  }
</script>

<script>
  import OutboundLink from "$lib/components/OutboundLink.svelte";
  export let post;
</script>

<svelte:head>
  <link rel="canonical" href="https://rosshill.ca/item/{post.slug}" />
</svelte:head>
<div class="contentWrapper mainContent doTransition">
  <a rel="prefetch" class="backLink" href="/#timeline-item-{post.slug}">
    &larr; Back to Home
  </a>
  <article class="postFull">
    <h1>{post.title}</h1>
    <div class="subtitle doTransition">
      Started {post.date}
      {#if post.repository}
        &ndash;
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          href={post.repository}
        >
          GitHub
        </OutboundLink>
      {/if}
      {#if post.website}
        &ndash;
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          href={post.website}
        >
          Website
        </OutboundLink>
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

  a.backLink {
    display: inline-block;
    margin: 1.5rem 0;
  }
  div.subtitle {
    font-size: 15px;
    margin-bottom: 1.2rem;
    color: var(--subtitle);
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
    box-shadow: 0px 2px 2px 0px rgba(20, 20, 20, 0.1);
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
    box-shadow: 0px 2px 2px 0px rgba(20, 20, 20, 0.1);
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
