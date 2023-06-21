<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import Balancer from "svelte-wrap-balancer";
  import type { BrandColors, PostItemStub } from "$lib/types";
  import PostStubs from "./components/PostStubs.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";
  import { truncateBySentence } from "$lib/functions";

  export let data: { posts: PostItemStub[]; brandColors: BrandColors };
  const {
    posts,
    brandColors,
  } = data;
  const intro = "Je suis Antoine Greuzard, développeur web freelance et intégrateur web Wordpress. Création de site internet pour les agences web sur Wordpress. J'ai à mon actif plus de 100 projets terminés et une expérience de 7 ans dans le domaine du développement web.";
  const meta = {
    title: "Antoine Greuzard : Développeur Web Freelance",
    description: truncateBySentence(intro, 155),
    url: "https://antoinegreuzard.fr",
    siteName: "Antoine Greuzard",
    image: {
      url: "https://antoinegreuzard.fr/antoine-greuzard.jpg",
      width: 746,
      height: 1020,
      alt: "Antoine greuzard: A propos, Projets, et Contact",
    },
  };
</script>

<MetaTags
  canonical={meta.url}
  description={meta.description}
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
  title={meta.title}
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
      <Balancer>Je suis un Développeur web Freelance</Balancer>
    </h2>
    <p>
      <Balancer>
        {intro}
      </Balancer>
    </p>
  </div>
  <PostStubs {brandColors} {posts}/>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries.scss";

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
