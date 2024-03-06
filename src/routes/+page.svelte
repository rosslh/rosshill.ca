<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { PostItemStub, TagColors } from "$lib/types";
  import PostStubs from "$lib/components/PostStubs.svelte";
  import { truncateBySentence } from "$lib/functions";

  export let data: { posts: PostItemStub[]; tagColors: TagColors };
  const { posts, tagColors } = data;

  const intro =
    "Je suis Antoine Greuzard, développeur web avec 7 ans d'expérience, ayant évolué du freelance à des rôles en entreprise, où je mets en avant mes compétences techniques. Ma polyvalence couvre l'administration de bases de données, le développement logiciel, Angular, Django, React, et bien plus, avec une expertise particulière en cyber-sécurité et intégration continue. Maîtrisant JavaScript, Python, PHP, et expert en solutions cloud comme AWS et Azure, je crée des solutions numériques efficaces.\n" +
    "\n" +
    "Passionné d'innovation, je combine ma compétence en programmation avec Adobe Photoshop et Figma pour concevoir des interfaces captivantes. Mon savoir-faire en SEO et Google Analytics optimise la visibilité en ligne des projets. Je suis aussi un leader expérimenté en gestion d'équipe, appliquant Agile et Scrum pour maximiser l'efficacité.\n" +
    "\n" +
    "Déterminé à contribuer à des projets innovants, je cherche à relever de nouveaux défis et à collaborer pour créer des solutions web exceptionnelles. Discutons de la réalisation de vos objectifs numériques ensemble.";
  const introLines = intro.split("\n").filter((line) => line.trim() !== "");
  const meta = {
    title: "Antoine Greuzard : Développeur Web",
    description: truncateBySentence(intro, 155),
    url: "https://antoinegreuzard.fr",
    siteName: "Antoine Greuzard",
    image: {
      url: "https://antoinegreuzard.fr/antoinegreuzard-profile.jpeg",
      width: 746,
      height: 1020,
      alt: "Antoine greuzard: Développeur web",
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
    <h1 data-testid="main-heading">Je suis un Développeur web</h1>
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
