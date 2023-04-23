<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import Balancer from "svelte-wrap-balancer";
  import type { BrandColors, PostItemStub } from "$lib/types";

  export let data: { posts: PostItemStub[], brandColors: BrandColors };
  const { posts, brandColors } = data;
  
  import PostStubs from "./components/PostStubs.svelte";

  const intro = "I am a software developer and I'm always on the lookout for cool new technologies. I like to spend my time reading, working on side projects, and exploring the great city of Toronto.";

  const truncateBySentence = (text: string, maxLength: number): string => {
    const truncated = text
      .split(".")
      .filter((sentence) => sentence.trim())
      .map((sentence) => `${sentence.trim()}.`)
      .reduce(
        (acc, sentence) => {
          if (acc.length + sentence.length <= maxLength) {
            return `${acc} ${sentence}`;
          }
          return acc;
        },
        "",
      );
    
    const firstSentence = `${intro.split(".")[0]}.`;

    return truncated || firstSentence;
  };

  const meta = {
    title: "Website and Portfolio | Ross Hill",
    description: truncateBySentence(intro, 155),
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
      <Balancer>Welcome to my corner of the web!</Balancer>
    </h2>
    <p>
      <Balancer>{intro}</Balancer>
    </p>
  </div>
  <PostStubs {posts} {brandColors} />
</div>

<style lang="scss">
  div.intro {
    margin-top: var(--spacing-3xl);
    margin-bottom: var(--spacing-3xl);
    padding-top: var(--spacing-3xl);

    h2 {
      margin-top: 0;
    }

    p {
      margin: var(--spacing-m) auto !important;
    }
  }

  @media (max-width: 800px) {
    div.intro {
      padding-top: 0;
    }
  }
</style>