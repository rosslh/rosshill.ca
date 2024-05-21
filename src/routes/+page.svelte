<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { PostItemStub, TagColors } from "$lib/types";
  import PostStubs from "$lib/components/PostStubs.svelte";
  import { truncateBySentence } from "$lib/functions";

  export let data: { posts: PostItemStub[]; tagColors: TagColors };
  const { posts, tagColors } = data;

  const intro = String(
    "Je suis Antoine Greuzard, développeur web avec 8 ans d'expérience, spécialisé en administration de bases de données et développement logiciel. Mon parcours m'a permis de me perfectionner dans des technologies clés telles qu'Angular, Django, React, JavaScript, Python, et PHP. Expert dans l'utilisation de solutions cloud comme AWS et Azure, je m'engage à développer des solutions numériques robustes et innovantes.\n" +
    "\n" +
    "Ma passion pour la technologie me pousse constamment à explorer et à intégrer de nouvelles pratiques, notamment dans les domaines de la cyber-sécurité et de l'intégration continue. Familiarisé avec les méthodologies Agile et Scrum, je vise à optimiser le processus de développement pour garantir efficacité et qualité.\n" +
    "\n" +
    "Je suis déterminé à contribuer à des projets qui non seulement répondent aux besoins spécifiques mais les surpassent, en mettant l'accent sur la création de solutions web exceptionnelles. Mon objectif est de collaborer étroitement avec les équipes pour transformer les visions en réalités numériques tangibles, en utilisant ma vaste palette de compétences techniques.\n" +
    "\n" +
    "Motivé par les nouveaux défis, je suis prêt à apporter mon expertise et mon enthousiasme à votre projet, pour travailler ensemble vers la réussite de vos objectifs numériques."
  );
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
      alt: "Antoine greuzard: Développeur web"
    }
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
