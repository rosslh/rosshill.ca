import slugify from "slugify";
import dateformat from "dateformat";
import timeline from "$lib/data.json";

const posts = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      slug: slugify(post.title).toLowerCase(),
      date: dateformat(post.date, "mmmm yyyy"),
      website: post.website,
      repository: post.repository,
      content: post.content,
      embed: post.embed,
      image: post.image,
      imageExt: post.imageExt,
      tags: post.tags
    };
  });

const lookup = new Map();
posts
  .filter(post => post.content)
  .forEach(post => {
    lookup.set(post.slug.toLowerCase(), JSON.stringify(post));
  });

export function get(req) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const slug = req.params.slug.toLowerCase();

  if (lookup.has(slug)) {
    return { body: lookup.get(slug) };
  } else {
    return {
      body: {
        message: "Not found"
      }
    };
  }
}
