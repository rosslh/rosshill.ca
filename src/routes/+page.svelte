<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { BrandColors, PostItem } from "$lib/types";

  export let data: { posts: PostItem[], brandColors: BrandColors };
  const { posts, brandColors } = data;
  
  import Intro from "$lib/components/Intro.svelte";
  import PostStubs from "$lib/components/timeline/PostStubs.svelte";

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

  const openToWork = !posts.some((p) => p.eventType === "job" && p.date.isOngoing);
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
  <Intro
    {openToWork}
  />
  <PostStubs {posts} {brandColors} />
</div>
