import { slugify } from "$lib/functions";
import { data as timeline } from "$data/posts.json";
import brandColors from "$data/brandColors.json";
import type { Request } from "@sveltejs/kit";

const posts = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      slug: slugify(post.title),
      date: post.date,
      endDate: post.endDate,
      seasonal: post.seasonal,
      ongoing: post.ongoing,
      website: post.website,
      repository: post.repository,
      contents: post.contents,
      embed: post.embed,
      image: post.image,
      imageExt: post.imageExt || "png",
      tags: post.tags,
    };
  });

const lookup = new Map();
posts
  .filter(post => post.contents)
  .forEach(post => lookup.set(post.slug, post));

export function get(req: Request) {
  // the `slug` parameter is available because this file is called [slug].json.js
  const slug = req.params.slug.toLowerCase();

  if (lookup.has(slug)) {
    return {
      body: { post: lookup.get(slug), brandColors },
    };
  } else {
    return {
      body: { message: "Not found" },
    };
  }
}
