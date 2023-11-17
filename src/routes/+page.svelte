<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import Balancer from "svelte-wrap-balancer";
  import type { TagColors, PostItemStub } from "$lib/types";

  export let data: { posts: PostItemStub[]; tagColors: TagColors };
  const { posts, tagColors } = data;

  import PostStubs from "$lib/components/PostStubs.svelte";
  import { truncateBySentence } from "$lib/functions";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  const intro =
    "I develop software and I'm always on the lookout for cool new technologies. I like to spend my time reading, working on side projects, and exploring the great city of Toronto.";

  const meta = {
    title: "Ross Hill: Website and Portfolio",
    description: truncateBySentence(intro, 155),
    url: "https://rosshill.ca",
    siteName: "Ross Hill",
    image: {
      url: "https://rosshill.ca/site-image.png",
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
    images: [
      {
        ...meta.image,
      },
    ],
    siteName: meta.siteName,
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
  <PostStubs {posts} {tagColors} />
  <div class="content-wrapper">
    <CopyrightNotice />
  </div>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

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

  @media (max-width: $breakpoint-s-max) {
    div.intro {
      padding-top: 0;
    }
  }
</style>
