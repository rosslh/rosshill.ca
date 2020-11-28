import slugify from "slugify";
import dateformat from "dateformat";

const timeline = require("../../../content/data.json");

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
      gif: post.gif,
      tags: post.tags
    };
  });

const lookup = new Map();
posts
  .filter(post => post.content)
  .forEach(post => {
    lookup.set(post.slug.toLowerCase(), JSON.stringify(post));
  });

export function get(req, res) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const slug = req.params.slug.toLowerCase();

  if (lookup.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: "Not found"
      })
    );
  }
}
