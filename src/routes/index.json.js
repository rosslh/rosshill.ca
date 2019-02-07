import slugify from "slugify";
import dateformat from "dateformat";

const blog = require("../../../content/blog.json"); // TODO: Why is this not ../../

const extractFirstPara = content => {
  const xmldom = require("xmldom");
  const { DOMParser, XMLSerializer } = xmldom;
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const doc = parser.parseFromString(content, "text/html");
  return serializer.serializeToString(doc.getElementsByTagName("p")[0]);
};

const contents = blog.map(post => {
  return {
    title: post.attributes.title,
    slug: slugify(post.attributes.title),
    date: post.attributes.date,
    prettyDate: dateformat(post.attributes.date, "mmmm yyyy"),
    website: post.attributes.website,
    repository: post.attributes.repository,
    content: extractFirstPara(post.body),
    image: post.attributes.image ? `blog/${post.attributes.image}` : null
  };
});

const filterPosts = (posts, searchString) =>
  posts.filter(
    post =>
      post.title.toLowerCase().includes(searchString) ||
      post.content.toLowerCase().includes(searchString)
  );

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  const output = JSON.stringify(
    filterPosts(contents, req.query.searchString.toLowerCase())
  );
  res.end(output);
}
