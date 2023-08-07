import { data as timeline } from "$data/posts.json";
import { formatPostTitle, slugify } from "$lib/functions";
import tagColors from "$data/tagColors.json";
import type { TagColors, PostItemPage } from "$lib/types";

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
    excerpt: post.excerpt,
    image: post.image
      ? {
          name: post.image,
          extension: post.imageExt ?? "png",
        }
      : undefined,
    repository: post.repository,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    title: formatPostTitle(post.title),
    website: post.website,
  }));

const lookup: Map<string, PostItemPage> = new Map(
  posts.filter((post) => post.contents).map((post) => [post.slug, post]),
);

type LoadResponse =
  | {
      post: PostItemPage;
      tagColors: TagColors;
    }
  | {
      message: string;
    };

export function load({ params }: { params: { slug: string } }): LoadResponse {
  const slug = params.slug.toLowerCase();
  const post = lookup.get(slug);
  if (post) {
    return {
      post,
      tagColors,
    };
  }
  return {
    message: "Not found",
  };
}
