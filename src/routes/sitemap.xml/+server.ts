import { data } from "$data/posts.json";
import { slugify } from "$lib/functions";
import {
  format, max, parse, startOfMonth,
} from "date-fns";
import xmlFormat from "xml-formatter";

export async function GET() {
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
  const parseDate = (date: string) => parse(date.slice(0, 10), "yyyy-MM-dd", new Date());

  const firstDayOfMonth = startOfMonth(new Date());

  const urls = data
    .filter(({
      contents,
      isHidden,
    }) => contents && !isHidden)
    .map((post) => ({
      loc: `https://antoinegreuzard.fr/item/${slugify(post.title)}`,
      lastmod: post.endDate ? formatDate(parseDate(post.endDate)) : formatDate(parseDate(post.date)),
      changefreq: "monthly",
      priority: 0.8,
    }));

  const mostRecentPostModified = data
    .filter((post) => post.contents && !post.isHidden && post.date)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((post) => parseDate(!post.date ? "" : post.endDate ?? post.date))
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? firstDayOfMonth;

  urls.unshift({
    loc: "https://antoinegreuzard.fr/",
    lastmod: formatDate(max([mostRecentPostModified, firstDayOfMonth])),
    changefreq: "monthly",
    priority: 1,
  });

  const urlTags = urls.map(
    (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
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
