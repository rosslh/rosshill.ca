import { data as timeline } from "$data/posts.json";
import { formatPostTitle, slugify } from "$lib/functions";
import brandColors from "$data/brandColors.json";
import type { BrandColors, PostItemStub } from "$lib/types";
import { PostCategory } from "$lib/types";

const posts: PostItemStub[] = Object.values(timeline)
  .filter((post) => !post.isHidden)
  .map((post) => ({
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
    },
    eventType: Object.values(PostCategory)
      .find((cat) => cat === post.eventType) ?? PostCategory.Other,
    excerpt: post.excerpt,
    hasContent: Boolean(post.contents),
    repository: post.repository,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    thumbnail: {
      name: post.thumbnail ?? `timeline/${post.thumbnail}`,
      extension: post.thumbnailExt ?? "png",
    },
    title: formatPostTitle(post.title),
    website: post.website,
  }))
  .sort((a, b) => Number(new Date(b.date.start)) - Number(new Date(a.date.start)));

export function load(): { posts: PostItemStub[]; brandColors: BrandColors } {
  return {
    posts,
    brandColors,
  };
}
