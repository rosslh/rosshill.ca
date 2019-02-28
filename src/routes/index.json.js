import slugify from "slugify";
import dateformat from "dateformat";

const projects = require("../../../content/projects.json"); // TODO: Why is this not ../../

const extractFirstPara = content => {
  const xmldom = require("xmldom");
  const { DOMParser, XMLSerializer } = xmldom;
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(content, "text/html");
  return serializer.serializeToString(doc.getElementsByTagName("p")[0]);
};

const contents = projects
  .filter(x => !x.attributes.WIP)
  .map(post => {
    return {
      title: post.attributes.title,
      tags: post.attributes.tags.map(x => x.toLowerCase()).sort(),
      slug: slugify(post.attributes.title).toLowerCase(),
      date: post.attributes.date,
      prettyDate: dateformat(post.attributes.date, "mmmm yyyy"),
      website: post.attributes.website,
      repository: post.attributes.repository,
      content: extractFirstPara(post.body),
      image: post.attributes.image ? `projects/${post.attributes.image}` : null
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(contents));
}
