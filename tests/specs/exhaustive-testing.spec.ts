import { expect, test } from "@playwright/test";
import fs from "fs";
import type { Page } from "playwright-core";
import { slugify } from "../../src/lib/functions.js";
import { expectToBeAtTop, expectCount, getLocator } from "../commands.js";

test.describe.configure({ mode: "parallel" });

const testPage = async (page: Page, baseURL: string | undefined, slug: string) => {
  const postStubLink = getLocator([page, `post-stub-link-${slug}`]);
  const backLink = getLocator([page, "back-link"]);

  await page.goto("/");

  await expectCount([page, "main-heading"], 1);

  await expectCount([page, "error"], 0);

  // Before clicking the link, the path should be /
  expect(page.url()).toBe(`${baseURL}/`);

  await postStubLink.click();

  await expectCount([page, "post-title"], 1);

  await expectCount([page, "error"], 0);

  // After clicking the link, the path should be /item/:slug
  expect(page.url()).toMatch(/^.*\/item\/[^/]+$/);
  
  await backLink.click();

  await expectCount([page, "main-heading"], 1);

  await expectCount([page, "error"], 0);

  // After clicking the back link, you should be back at the root with an anchor to the post
  expect(page.url()).toBe(`${baseURL}/#timeline-${slug}`);

  // Element is at top
  await expectToBeAtTop(page, `post-stub-${slug}`);
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

async function readJsonFile(file: string) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

readJsonFile("src/data/posts.json").then(({ data: timeline }) => {
  const postsWithContent = timeline.filter(({ contents, isHidden }) => contents && !isHidden);

  for (let i = 0; i < postsWithContent.length; i += 1) {
    const { title } = postsWithContent[i];
    const slug = slugify(title);
    test(`You can navigate to and from ${slug} page`, async ({ page, baseURL }) => {
      await testPage(page, baseURL, slug);
    });
  }
});
