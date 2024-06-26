import { data } from "$data/posts.json";
import { slugify } from "$lib/functions";
import xmlFormat from "xml-formatter";

export async function GET() {
  const urls = data
    .filter(({ contents, isHidden }) => contents && !isHidden)
    .map((post) => ({
      loc: `https://rosshill.ca/item/${slugify(post.title)}`,
      changefreq: "monthly",
      priority: 0.8,
    }));

  urls.unshift({
    loc: "https://rosshill.ca/",
    changefreq: "monthly",
    priority: 1,
  });

  const urlTags = urls.map(
    (url) => `
      <url>
        <loc>${url.loc}</loc>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `,
  );

  const sitemapXml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${urlTags.join("\n")}
    </urlset>
  `;

  const minified = xmlFormat(sitemapXml, {
    collapseContent: true,
    indentation: "",
    lineSeparator: "",
  });

  return new Response(minified, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
