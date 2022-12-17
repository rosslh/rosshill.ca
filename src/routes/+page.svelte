<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { BrandColors, PostItem } from "$lib/types";

  export let data: { posts: PostItem[], brandColors: BrandColors };
  const { posts, brandColors } = data;
  
  import PostStubs from "./_components/PostStubs.svelte";

  const meta = {
    title: "Website and Portfolio | Ross Hill",
    description: "I am a software developer based in Toronto. I specialize in web development and I'm always on the lookout for cool new technologies.",
    url: "https://rosshill.ca",
    siteName: "Ross Hill",
    image: {
      url: "https://rosshill.ca/siteImage.png",
      width: 1000,
      height: 523,
      alt: "Ross Hill: About Me, Projects, and Contact",
    },
  };
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    description: meta.description,
    images: [{
      ...meta.image,
    }],
    site_name: meta.siteName,
    title: meta.title,
    type: "website",
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
<div class="main-content">
  <div class="content-wrapper intro">
    <h2 data-testid="main-heading">
      Welcome to my corner of the web!
    </h2>
    <p>
      I am a software developer and I'm always on the lookout for cool new technologies.
      I like to spend my time reading, working on side projects, and exploring the great city of Toronto.
    </p>
  </div>
  <PostStubs {posts} {brandColors} />
</div>

<style lang="scss">
  div.intro {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;

    h2 {
      margin-top: 0;
    }

    p {
      margin: 1rem auto !important;
    }
  }

  @media (max-width: 800px) {
    div.intro {
      padding-top: 0;
    }
  }
</style>