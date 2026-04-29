import { createRequire } from "node:module";
import { expect, test } from "@playwright/test";
import { slugify } from "../../src/lib/functions.js";

type PostWithPriorTitles = {
  title: string;
  contents?: string;
  isHidden?: boolean;
  priorTitles?: string[];
};

const require = createRequire(import.meta.url);
const posts = require("../../data/posts.json") as {
  data: PostWithPriorTitles[];
};

test.describe.configure({ mode: "parallel" });

const redirectCases = posts.data
  .filter(({ contents, isHidden }) => contents && !isHidden)
  .flatMap((post) =>
    (post.priorTitles ?? []).map((priorTitle) => ({
      priorSlug: slugify(priorTitle),
      currentSlug: slugify(post.title),
      title: post.title,
    })),
  );

test.describe("Prior-title redirects", () => {
  test("there is at least one priorTitles entry to test", () => {
    expect(redirectCases.length).toBeGreaterThan(0);
  });

  for (const { priorSlug, currentSlug, title } of redirectCases) {
    test(`/experience/${priorSlug} redirects to /experience/${currentSlug} (${title})`, async ({
      page,
      baseURL,
    }) => {
      const response = await page.goto(`/experience/${priorSlug}`);
      expect(response?.status()).toBe(200);
      expect(page.url()).toBe(`${baseURL}/experience/${currentSlug}`);
    });
  }
});

const legacySegments = ["item", "timeline", "projects", "blog"] as const;

const samplePost = posts.data.find(
  ({ contents, isHidden }) => contents && !isHidden,
);

test.describe("Legacy route segment redirects", () => {
  test("a sample post is available to test against", () => {
    expect(samplePost).toBeDefined();
  });

  for (const segment of legacySegments) {
    test(`/${segment}/:slug redirects to /experience/:slug`, async ({
      page,
      baseURL,
    }) => {
      const slug = slugify(samplePost!.title);
      const response = await page.goto(`/${segment}/${slug}`);
      expect(response?.status()).toBe(200);
      expect(page.url()).toBe(`${baseURL}/experience/${slug}`);
    });

    test(`/${segment}/:priorSlug chains through to the current slug`, async ({
      page,
      baseURL,
    }) => {
      const firstCase = redirectCases[0];
      expect(firstCase).toBeDefined();
      const response = await page.goto(`/${segment}/${firstCase.priorSlug}`);
      expect(response?.status()).toBe(200);
      expect(page.url()).toBe(`${baseURL}/experience/${firstCase.currentSlug}`);
    });
  }
});
