import { data as timeline } from "$data/posts.json";
import { slugify } from "$lib/functions";
import brandColors from "$data/brandColors.json";
import type { PostItem } from "$lib/types";

const posts: PostItem[] = Object.values(timeline)
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
    thumbnail: post.thumbnail && {
      name: post.thumbnail ?? `timeline/${post.thumbnail}`,
      extension: post.thumbnailExt ?? "png",
    },
    title: post.title,
    website: post.website,
  }));

const lookup: Map<string, PostItem> = new Map();
posts
  .filter((post) => post.contents)
  .forEach((post) => lookup.set(post.slug, post));

export function get({ params }) {
  // the `slug` parameter is available because this file is called [slug].js
  const slug = params.slug.toLowerCase();

  if (lookup.has(slug)) {
    return {
      body: {
        post: lookup.get(slug),
        brandColors,
      },
    };
  }
  return {
    body: {
      message: "Not found",
      post: null,
      brandColors,
    },
  };
}
