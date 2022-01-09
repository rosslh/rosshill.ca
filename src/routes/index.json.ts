import { slugify } from "$lib/functions";
import { data as timeline } from "$data/posts.json";
import brandColors from "$data/brandColors.json";

const contents = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      eventType: post.eventType,
      hasContent: Boolean(post.contents),
      slug: slugify(post.title),
      date: post.date,
      endDate: post.endDate,
      seasonal: post.seasonal,
      ongoing: post.ongoing,
      blurb: post.blurb,
      repository: post.repository,
      website: post.website,
      thumbnailExt: post.thumbnailExt || "png",
      tags: post.tags,
      thumbnail: post.thumbnail ?? `timeline/${post.thumbnail}`,
    };
  })
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

export function get() {
  return { body: { posts: contents, brandColors } };
}
