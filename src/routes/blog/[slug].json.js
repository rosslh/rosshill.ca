import slugify from "slugify";

const blog = require("../../../content/blog.json");

const posts = blog.map(post => {
  return {
    title: post.attributes.title,
    slug: slugify(post.attributes.title),
    date: post.attributes.date,
    website: post.attributes.website,
    website: post.attributes.repository,
    content: post.body,
    image: post.attributes.image
  };
});

const lookup = new Map();
posts.forEach(post => {
  lookup.set(post.slug.toLowerCase(), JSON.stringify(post));
});

export function get(req, res, next) {
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
        message: `Not found`
      })
    );
  }
}
