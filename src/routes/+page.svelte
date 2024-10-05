<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import Balancer from "svelte-wrap-balancer";
  import type { TagColors, PostItemStub } from "$lib/types";

  export let data: { posts: PostItemStub[]; tagColors: TagColors };
  const { posts, tagColors } = data;

  import PostStubs from "$lib/components/PostStubs.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";
  import { themeStore } from "$lib/stores";

  const meta = {
    title: "Ross Hill - Projects and Experience",
    description:
      "I'm a software engineer from Toronto with a passion for front-end development. Learn about my projects, professional experience, education, and more.",
    url: "https://rosshill.ca",
    siteName: "Ross Hill",
    image: {
      url: "https://rosshill.ca/site-image.png",
      width: 1000,
      height: 523,
      alt: "Ross Hill - Projects and Experience",
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
      {#key $themeStore}
        <Balancer>Welcome to my corner of the web!</Balancer>
      {/key}
    </h2>
    <p>
      {#key $themeStore}
        <Balancer>
          As a seasoned full-stack engineer with a passion for front-end, I
          specialize in building delightful user experiences that drive results.
          My expertise in TypeScript and a focus on code quality enable me to
          create seamless applications that are robust and maintainable.
        </Balancer>
      {/key}
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

  @media (max-width: $breakpoint-m-max) {
    div.intro {
      padding-top: 0;
    }
  }
</style>
