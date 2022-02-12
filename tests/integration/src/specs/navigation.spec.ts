import { test, expect } from "@playwright/test";
import { getElement, expectCount } from "../commands.js";
import type { Page } from "playwright-core";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const elementIsAtTopOfViewport = async (page: Page, selector: string) => {
  const element = await getElement(page, selector).elementHandle();
  const boundingBox = await element.boundingBox();
  return boundingBox.y >= -1 && boundingBox.y <= 3;
};

test.describe.parallel("suite", () => {
  test("You can navigate to and from a post page", async ({ page, baseURL }) => {
    const postStubLink = getElement(page, "post-stub-link").first();
    const backLink = getElement(page, "back-link");

    // Before clicking the link, the path should be /
    expect(page.url()).toBe(`${baseURL}/`);

    await expectCount(page, "main-heading", 1);

    await expectCount(page, "error", 0);

    await postStubLink.click();

    // After clicking the link, the path should be /item/:slug
    expect(page.url()).toMatch(/^.*\/item\/[a-z0-9-]+$/);

    await expectCount(page, "post-title", 1);

    await expectCount(page, "error", 0);

    // Main content should be at top of page, even on mobile
    expect(await elementIsAtTopOfViewport(page, "main-content")).toBe(true);

    const slug = page.url().split("/").pop();

    await backLink.click();

    // After clicking the back link, you should be back at the root with an anchor to the post
    expect(page.url()).toBe(`${baseURL}/#timeline-${slug}`);

    await expectCount(page, "main-heading", 1);

    await expectCount(page, "error", 0);

    // Element is at top
    expect(await elementIsAtTopOfViewport(page, `post-stub-${slug}`)).toBe(true);
  });

  test("Anchor links work", async ({ page }) => {
    const slug = "reqwise";

    // Load page with anchor
    await page.goto(`/#timeline-${slug}`);
    
    // Element is at top
    expect(await elementIsAtTopOfViewport(page, `post-stub-${slug}`)).toBe(true);
  });
});
