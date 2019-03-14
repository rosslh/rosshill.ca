import slugify from "slugify";
import dateformat from "dateformat";
import generate from "string-to-color";
import { setLightness, setSaturation } from "unitransform";

const projects = require("../../../content/projects.json"); // TODO: Why is this not ../../

// const extractFirstPara = content => {
//   const xmldom = require("xmldom");
//   const { DOMParser, XMLSerializer } = xmldom;
//   const parser = new DOMParser();
//   const serializer = new XMLSerializer();
//   const doc = parser.parseFromString(content, "text/html");
//   return serializer.serializeToString(doc.getElementsByTagName("p")[0]);
// };

const contents = projects
  .filter(x => !x.attributes.WIP)
  .map(post => {
    return {
      title: post.attributes.title,
      tags: post.attributes.tags
        .map(x => ({
          text: x.toLowerCase(),
          color: setSaturation(setLightness(generate(x.toLowerCase()), 65), 80)
        }))
        .sort(),
      slug: slugify(post.attributes.title).toLowerCase(),
      date: post.attributes.date,
      prettyDate: dateformat(post.attributes.date, "mmmm yyyy"),
      website: post.attributes.website,
      repository: post.attributes.repository,
      blurb: post.attributes.blurb,
      image: post.attributes.image ? `projects/${post.attributes.image}` : null,
      thumbnail: post.attributes.thumbnail
        ? `projects/${post.attributes.thumbnail}`
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
