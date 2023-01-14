import { data as timeline } from "$data/posts.json";
import { slugify } from "$lib/functions";
import brandColors from "$data/brandColors.json";
import type { PostItemPage } from "$lib/types";

const posts: PostItemPage[] = Object.values(timeline)
  .filter(({ contents, isHidden }) => contents && !isHidden)
  .map((post) => ({
    contents: post.contents,
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
    },
    embed: post.embed,
    excerpt: post.excerpt,
    image: post.image && {
      name: post.image,
      extension: post.imageExt ?? "png",
    },
    repository: post.repository,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    title: post.title,
    website: post.website,
  }));

const lookup: Map<string, PostItemPage> = new Map(
  posts
    .filter((post) => post.contents)
    .map((post) => ([post.slug, post])),
);

export function load({ params }) {
  const slug = params.slug.toLowerCase();
  if (lookup.has(slug)) {
    return {
      post: lookup.get(slug),
      brandColors,
    };
  }
  return {
    message: "Not found",
    post: null,
    brandColors,
  };
}
