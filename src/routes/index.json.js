import slugify from "slugify";
import dateformat from "dateformat";

const timeline = require("../../../content/timeline.json"); // TODO: Why is this not ../../

const contents = timeline
  .filter(x => !x.attributes.WIP)
  .map(post => {
    return {
      title: post.attributes.title,
      body: post.body,
      slug: slugify(post.attributes.title).toLowerCase(),
      date: post.attributes.date,
      prettyDate: dateformat(post.attributes.date, "mmmm yyyy"),
      blurb: post.attributes.blurb,
      thumbnailExt: post.attributes.thumbnailExt,
      thumbnail: post.attributes.thumbnail
        ? `timeline/${post.attributes.thumbnail}`
        : null
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(contents));
}
