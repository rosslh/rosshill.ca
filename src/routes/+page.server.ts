import { data as postsObject } from "$data/posts.json";
import { formatPostTitle, normalizePostSeason, slugify } from "$lib/functions";
import tagColors from "$data/tagColors.json";
import type { TagColors, PostItemStub } from "$lib/types";
import { PostCategory } from "$lib/types";

const thumbnails = import.meta.glob<string>("/assets/experience/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

function getThumbnail(name: string): string {
  const svg = thumbnails[`/assets/experience/${name}.svg`];
  if (!svg) {
    throw new Error(`Missing thumbnail: assets/experience/${name}.svg`);
  }
  return svg;
}

const posts: PostItemStub[] = Object.values(postsObject)
  .filter((post) => !post.isHidden)
  .map((post) => ({
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
      season: normalizePostSeason(post.season),
    },
    eventType:
      Object.values(PostCategory).find((cat) => cat === post.eventType) ??
      PostCategory.Other,
    eventTypeLabel: post.eventTypeLabel,
    excerpt: post.excerpt,
    hasContent: Boolean(post.contents),
    repository: post.repository,
    roles: post.roles,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    thumbnail: getThumbnail(post.thumbnail),
    title: formatPostTitle(post.title),
    website: post.website,
  }))
  .sort(
    (a, b) => Number(new Date(b.date.start)) - Number(new Date(a.date.start)),
  );

export function load(): { posts: PostItemStub[]; tagColors: TagColors } {
  return { posts, tagColors };
}
