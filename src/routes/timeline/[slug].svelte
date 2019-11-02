<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`timeline/${params.slug.toLowerCase()}.json`);
    const data = await res.json();

    return {
      post: data
    };
  }
</script>

<script>
  import Sidebar from "../../components/Sidebar.svelte";

  export let post;
</script>

<style>
  article.postFull {
    margin-bottom: 3rem;
  }

  a.backLink {
    display: block;
    margin: 1.5rem 0;
  }
  div.subtitle {
    font-size: 15px;
    margin-bottom: 1.2rem;
    color: var(--timeline);
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
    overflow: hidden;
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
    max-width: 90%;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="twoColumn">
  <Sidebar />
  <div class="contentWrapper mainContent">
    <a rel="prefetch" class="backLink" href="/#timeline-item-{post.slug}">
      &larr; Back to Home
    </a>
    <article class="postFull">
      <h1>{post.title}</h1>
      <div class="subtitle">
        Started {post.date}
        {#if post.repository}
          &ndash;
          <a target="_blank" rel="noopener noreferrer" href={post.repository}>
            GitHub
          </a>
        {/if}
        {#if post.website}
          &ndash;
          <a target="_blank" rel="noopener noreferrer" href={post.website}>
            Website
          </a>
        {/if}
      </div>
      {#if post.image}
        <div class="imageWrapper">
          <picture>
            <source srcset="timeline/{post.image}.webp" type="image/webp" />
            <source
              srcset="timeline/{post.image}.{post.imageExt || 'png'}"
              type="image/png" />
            <img
              src="timeline/{post.image}.{post.imageExt || 'png'}"
              alt={post.title} />
          </picture>
        </div>
      {/if}
      {#if post.embed}
        <div class="embedWrapper">
          {@html post.embed}
        </div>
      {/if}

      <div class="content">
        {@html post.content}
      </div>
    </article>
  </div>
</div>
