import slugify from "slugify";
import dateformat from "dateformat";
import {data as timeline} from "$lib/data.json";

const contents = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      eventType: post.eventType,
      hasContent: !!post.contents,
      slug: slugify(post.title, { replacement: '-', lower: true, remove: /[:]/ }),
      date: post.date,
      prettyDate: dateformat(post.date, "mmmm yyyy"),
      blurb: post.blurb,
      repository: post.repository,
      website: post.website,
      thumbnailExt: post.thumbnailExt,
      tags: post.tags,
      thumbnail: post.thumbnail
        ? `timeline/${post.thumbnail}`
        : null
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function get(_req) {
  return { body: contents };
}
