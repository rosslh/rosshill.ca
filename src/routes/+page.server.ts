import { data as timeline } from "$data/posts.json";
import { slugify } from "$lib/functions";
import brandColors from "$data/brandColors.json";
import type { PostItemStub, PostCategory } from "$lib/types";

const posts: PostItemStub[] = Object.values(timeline)
  .filter((post) => !post.isHidden)
  .map((post) => ({
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
    },
    eventType: (post.eventType ?? "other") as PostCategory,
    excerpt: post.excerpt,
    hasContent: Boolean(post.contents),
    repository: post.repository,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    thumbnail: post.thumbnail && {
      name: post.thumbnail ?? `timeline/${post.thumbnail}`,
      extension: post.thumbnailExt ?? "png",
    },
    title: post.title,
    website: post.website,
  }))
  .sort((a, b) => Number(new Date(b.date.start)) - Number(new Date(a.date.start)));

export function load() {
  return {
    posts,
    brandColors,
  };
}
