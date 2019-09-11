<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await fetch(`projects/${params.slug.toLowerCase()}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return {
        post: data
      };
    } else {
      error(res.status, data.message);
    }
  }
</script>

<script>
  import CompactHeader from "../../components/CompactHeader.svelte";

  export let post;
</script>

<style>
  :global(article.postFull p) {
    margin: 1.5rem auto !important;
    max-width: 800px;
  }

  div.contentWrapper {
    margin-top: 6rem;
  }

  article.postFull {
    margin-bottom: 3rem;
  }

  a.backLink {
    display: block;
    margin: 1.5rem 0;
    color: #1d3557;
    text-decoration: none;
  }
  div.subtitle {
    font-size: 15px;
    margin-bottom: 1.2rem;
    color: #666;
  }

  div.imageWrapper {
    max-width: 600px;
    max-height: 400px;
    margin: 1.5rem auto 2rem;
    width: 90%;
    border: 1px solid #ddd;
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
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<CompactHeader />

<div class="contentWrapper">
  <a rel="prefetch" class="backLink" href="/">&larr; Back to Home</a>
  <article class="postFull">
    <h1>{post.title}</h1>
    <div class="subtitle">
      Project started {post.date} &ndash;
      <a target="_blank" rel="noopener noreferrer" href={post.repository}>
        GitHub
      </a>
      &ndash;
      <a target="_blank" rel="noopener noreferrer" href={post.website}>
        Website
      </a>
    </div>
    <div class="imageWrapper">
      <picture>
        <source srcset="projects/{post.image}.webp" type="image/webp" />
        <source srcset="projects/{post.image}.png" type="image/png" />
        <img src="projects/{post.image}.png" alt={post.title} />
      </picture>
    </div>
    <div class="content">
      {@html post.content}
    </div>
  </article>
</div>
