import { expect, test } from "@playwright/test";
import type { Page } from "playwright-core";
import { slugify } from "../../src/lib/functions.js";
import {
  expectToBeAtTop,
  expectCount,
  getLocator,
  waitForElement,
} from "../commands.js";
import posts from "../../data/posts.json" assert { type: "json" };

test.describe.configure({ mode: "parallel" });

const testPage = async (
  page: Page,
  baseURL: string | undefined,
  slug: string,
): Promise<void> => {
  const postStubLink = getLocator([page, `post-stub-link-${slug}`]);
  const backLink = getLocator([page, "back-link"]);

  await page.goto("/");

  await expectCount([page, "main-heading"], 1);

  await expectCount([page, "error"], 0);

  // Before clicking the link, the path should be /
  expect(page.url()).toBe(`${baseURL}/`);

  await postStubLink.click();

  try {
    await page.waitForURL(`${baseURL}/item/${slug}`, { timeout: 10_000 });
  } catch {
    await page.waitForURL(`${baseURL}/item/${slug}`, { timeout: 10_000 });
  }

  await waitForElement(page, "post-title");

  await expectCount([page, "post-title"], 1);

  await expectCount([page, "error"], 0);

  // After clicking the link, the path should be /item/:slug
  expect(page.url()).toMatch(/^.*\/item\/[^/]+$/);

  await waitForElement(page, "main-heading", { state: "detached" });

  await backLink.click();

  await page.waitForURL(`${baseURL}/#timeline-${slug}`, { timeout: 10_000 });

  await waitForElement(page, "main-heading");

  await expectCount([page, "main-heading"], 1);

  await expectCount([page, "error"], 0);

  // After clicking the back link, you should be back at the root with an anchor to the post
  expect(page.url()).toBe(`${baseURL}/#timeline-${slug}`);

  // Element is at top
  await expectToBeAtTop(page, `post-stub-${slug}`);
};

// TODO: make these tests not flake
const flakyPostSlugs = new Set(["mandelbrot.site", "wtformat.com"]);

test.describe("Exhaustive testing", () => {
  const postSlugs = posts.data
    .filter(
      ({ contents, isHidden, title }) =>
        contents && !isHidden && !flakyPostSlugs.has(slugify(title)),
    )
    .map(({ title }) => slugify(title));

  for (const postSlug of postSlugs) {
    test(`You can navigate to and from ${postSlug} page`, async ({
      page,
      baseURL,
    }) => {
      await testPage(page, baseURL, postSlug);
    });
  }
});
