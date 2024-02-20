<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { PostItemStub, TagColors } from "$lib/types";
  import PostStubs from "$lib/components/PostStubs.svelte";
  import { truncateBySentence } from "$lib/functions";

  export let data: { posts: PostItemStub[]; tagColors: TagColors };
  const { posts, tagColors } = data;

  const intro =
    "Je suis Antoine Greuzard, un développeur web freelance passionné et spécialiste de l'intégration Wordpress. J'ai consacré 7 ans à transformer les visions en réalités numériques pour des agences web, avec plus de 100 projets réussis à mon actif.\n" +
    "\n" +
    "Tout au long de ma carrière, j'ai eu l'occasion de travailler sur des projets de toutes tailles et de toutes complexités, chacun avec ses propres défis et récompenses. Cette expérience m'a permis de développer une approche polyvalente et adaptable, capable de répondre aux exigences spécifiques de chaque client et de chaque projet.\n" +
    "\n" +
    "J'apprécie l'indépendance et la liberté qu'offre ce mode de travail, ainsi que l'occasion de nouer des relations plus personnelles avec mes clients. Je suis déterminé à fournir un service exceptionnel, à répondre à vos besoins de manière précise et efficace, et à transformer vos visions en réalités impressionnantes et fonctionnelles.\n" +
    "\n" +
    "Que vous ayez besoin d'une refonte de site web complète, d'une simple page d'accueil ou d'un e-commerce complexe, je suis prêt à vous aider à réaliser vos objectifs numériques. Chaque projet est une nouvelle aventure et je suis toujours enthousiaste à l'idée de commencer un nouveau voyage. Alors, êtes-vous prêt à travailler ensemble pour créer quelque chose de grand ? Je suis toujours disponible pour discuter de vos idées, de vos visions et de la manière dont nous pouvons les transformer en une présence en ligne puissante et réussie.";
  const introLines = intro.split("\n").filter((line) => line.trim() !== "");
  const meta = {
    title: "Antoine Greuzard : Développeur Web Freelance",
    description: truncateBySentence(intro, 155),
    url: "https://antoinegreuzard.fr",
    siteName: "Antoine Greuzard",
    image: {
      url: "https://antoinegreuzard.fr/antoinegreuzard-profile.jpeg",
      width: 746,
      height: 1020,
      alt: "Antoine greuzard: Développeur web freelance",
    },
  };
</script>

<MetaTags
  canonical={meta.url}
  description={meta.description}
  openGraph={{
    description: meta.description,
    images: [
      {
        ...meta.image,
      },
    ],
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
    <h1 data-testid="main-heading">Je suis un Développeur web Freelance</h1>
    {#each introLines as line}
      <p>{line}</p>
    {/each}
  </div>
  <PostStubs {posts} {tagColors} />
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.intro {
    margin-top: var(--spacing-3xl);
    margin-bottom: var(--spacing-3xl);
    padding-top: var(--spacing-3xl);

    h1 {
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
