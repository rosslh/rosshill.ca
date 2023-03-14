<script lang="ts">
    import { MetaTags } from "svelte-meta-tags";
    import Balancer from "svelte-wrap-balancer";
    import type { BrandColors, PostItemStub } from "$lib/types";
    import PostStubs from "./components/PostStubs.svelte";

    export let data: { posts: PostItemStub[], brandColors: BrandColors };
    const {
      posts,
      brandColors,
    } = data;
    const intro = "Je suis Antoine Greuzard, développeur web freelance et intégrateur web Wordpress. Création de site internet pour les agences web sur Wordpress. J'ai à mon actif plus de 100 projets terminés et une expérience de 7 ans dans le domaine du développement web.";
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
