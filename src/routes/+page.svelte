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
        <Balancer>Welcome to my corner of the web!</Balancer>
      {/key}
    </h2>
    <p>
      {#key $themeStore}
        <Balancer>
          As a seasoned full-stack engineer with a passion for front-end
          development, I deliver delightful and impactful user experiences. With
          expertise in TypeScript and a dedication to code quality, I build
          robust applications that drive results.
        </Balancer>
      {/key}
    </p>
  </div>
  <Posts posts={projects} title="Personal projects" />
  <Posts posts={workExperience} title="Development experience" showDate />
  <Posts posts={other} title="Education and extracurriculars" showDate />
  <div class="content-wrapper">
    <CopyrightNotice />
  </div>
</div>

<style lang="scss">
  @use "src/lib/styles/media-queries";

  div.intro {
    margin-top: var(--spacing-3xl);
    padding-top: var(--spacing-3xl);

    h2 {
      margin-top: 0;
    }

    p {
      margin: var(--spacing-m) auto !important;
    }
  }

  @media (max-width: media-queries.$breakpoint-m-max) {
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
