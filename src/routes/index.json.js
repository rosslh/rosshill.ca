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

const filterPosts = (posts, searchString) => {
  if (searchString) {
    posts = posts.filter(
      post =>
        post.title.toLowerCase().includes(searchString) ||
        post.content.toLowerCase().includes(searchString)
    );
  }
  return posts;
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const compare = (a, b, sort) => {
  switch (sort) {
    case "alpha": {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      else return 0;
    }
    case "revalpha": {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      else return 0;
    }
    case "old": {
      return new Date(a.date) - new Date(b.date);
    }
    default: {
      // new
      return new Date(b.date) - new Date(a.date);
    }
  }
};

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  const searchString = req.query.searchString.toLowerCase() || "";
  const sort = req.query.sort.toLowerCase() || "";

  const filtered = filterPosts(contents, searchString);

  let output;

  if (sort.toLowerCase() === "shuffle") output = shuffle(filtered);
  else output = filtered.sort((a, b) => compare(a, b, sort));

  res.end(JSON.stringify(output));
}
