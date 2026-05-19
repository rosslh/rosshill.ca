import { error, redirect } from "@sveltejs/kit";
import { data as postsObject } from "$data/posts.json";
import { formatPostTitle, normalizePostSeason, slugify } from "$lib/functions";
import tagColors from "$data/tagColors.json";
import type { TagColors, PostItemPage } from "$lib/types";

const posts: PostItemPage[] = Object.values(postsObject)
  .filter(({ contents, isHidden }) => contents && !isHidden)
  .map((post) => ({
    contents: post.contents,
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
      season: normalizePostSeason(post.season),
    },
    embed: post.embed,
    excerpt: post.excerpt,
    image: post.image
      ? { name: post.image, extension: post.imageExt ?? "png" }
      : undefined,
    repository: post.repository,
    roles: post.roles,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    title: formatPostTitle(post.title),
    website: post.website,
  }));

const lookup: Map<string, PostItemPage> = new Map(
  posts.filter((post) => post.contents).map((post) => [post.slug, post]),
);

const priorSlugRedirects: Map<string, string> = new Map(
  Object.values(postsObject).flatMap((post) => {
    const priorTitles = (post as { priorTitles?: string[] }).priorTitles ?? [];
    const currentSlug = slugify(post.title);
    return priorTitles.map(
      (priorTitle) => [slugify(priorTitle), currentSlug] as const,
    );
  }),
);

type LoadResponse = { post: PostItemPage; tagColors: TagColors };

export function load({ params }: { params: { slug: string } }): LoadResponse {
  const slug = params.slug.toLowerCase();
  const redirectSlug = priorSlugRedirects.get(slug);
  if (redirectSlug && redirectSlug !== slug) {
    redirect(308, `/experience/${redirectSlug}`);
  }
  const post = lookup.get(slug);
  if (post) {
    return { post, tagColors };
  }
  return error(404, "Not Found");
}
