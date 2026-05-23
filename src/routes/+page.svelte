<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import Balancer from "svelte-wrap-balancer";
  import type { TagColors, PostItemStub } from "$lib/types";

  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";
  import { themeStore } from "$lib/stores";
  import Posts from "$lib/components/posts/Posts.svelte";

  interface Props {
    data: { posts: PostItemStub[]; tagColors: TagColors };
  }

  let { data }: Props = $props();

  const { posts } = data;

  const meta = {
    title: "Ross Hill - Projects and Experience",
    description:
      "I'm a full-stack engineer in Toronto turning messy product and technical problems into intuitive, reliable software and practical AI workflows.",
    url: "https://rosshill.ca",
    siteName: "Ross Hill",
    image: {
      url: "https://rosshill.ca/og.png",
      width: 1200,
      height: 630,
      alt: "Ross Hill - Projects and Experience",
    },
  };

  const workExperience = posts.filter((post) => post.eventType === "work");
  const projects = posts.filter((post) => post.eventType === "project");
  const other = posts.filter((post) => post.eventType === "other");
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    description: meta.description,
    images: [{ ...meta.image }],
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
        <Balancer>Welcome to my corner of the web</Balancer>
      {/key}
    </h2>
    <p>
      {#key $themeStore}
        <Balancer>
          I'm a full-stack engineer in Toronto with a builder's mindset. I turn
          messy product and technical problems into software that feels
          intuitive and reliable. I lead engineering work, help teams make
          practical technical decisions, and stay close to the craft. Recently,
          I've been exploring how AI tools can improve product and engineering
          workflows without compromising good software design.
        </Balancer>
      {/key}
    </p>
  </div>
  <Posts posts={projects} title="Projects" />
  <Posts posts={workExperience} title="Career" showDate />
  <Posts posts={other} title="University" showDate />
  <div class="content-wrapper">
    <CopyrightNotice />
  </div>
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  div.intro {
    margin-top: var(--spacing-3xl);
    padding-top: var(--spacing-3xl);

    h2 {
      margin-top: 0;
    }

    p {
      line-height: var(--line-height-loose);
      margin: var(--spacing-m) auto !important;
    }
  }

  @media (max-width: breakpoints.$breakpoint-m-max) {
    div.intro {
      padding-top: 0;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
  }
</style>
