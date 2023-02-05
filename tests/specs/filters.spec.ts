import { expect, Locator, test } from "@playwright/test";
import { getLocator, expectCount } from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Event type filter works", async ({ page }) => {
  const jobFilter = getLocator([page, "event-filter-job"]);

  // Before clicking the filter, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat"], 1);

  await jobFilter.click();

  // After clicking the filter, the wtformat item should not exist
  await expectCount([page, "post-stub-wtformat"], 0);

  await jobFilter.click();

  // After clicking the filter again, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat"], 1);
});

test("Skill tag filter works", async ({ page }) => {
  const svelteFilter = getLocator([page, "skill-filter-svelte"]);
  const jsFilter = getLocator([page, "skill-filter-javascript"]);
  
  // Before clicking the filter, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat"], 1);

  await svelteFilter.click();

  // After clicking the filter, the wtformat item should not exist
  await expectCount([page, "post-stub-wtformat"], 0);

  // But the reqwise item should exist
  await expectCount([page, "post-stub-reqwise"], 1);

  await jsFilter.click();

  // After clicking the filter, the wtformat item should now exist
  await expectCount([page, "post-stub-wtformat"], 1);

  // And the reqwise item should exist
  await expectCount([page, "post-stub-reqwise"], 1);
});

test("Show more tags button works", async ({ page }) => {
  const showMoreTagsButton = getLocator([page, "show-more-tags"]);

  // Before clicking the button, the rust tag should not exist and javascript tag should exist
  await expectCount([page, "skill-filter-rust"], 0);
  await expectCount([page, "skill-filter-javascript"], 1);

  await showMoreTagsButton.click();

  // After clicking the button, both tags should exist
  await expectCount([page, "skill-filter-rust"], 1);
  await expectCount([page, "skill-filter-javascript"], 1);

  // And show more tags button should not exist
  await expectCount([page, "show-more-tags"], 0);
});

test("Clear filters button works", async ({ page }) => {
  const clearFilters = getLocator([page, "clear-filters"]);
  const jobFilter = getLocator([page, "event-filter-job"]);
  const jsFilter = getLocator([page, "skill-filter-javascript"]);

  const getAttribute = async (locator: Locator, attribute: string): Promise<string> => {
    const attr = await locator.getAttribute(attribute);
    if (!attr) throw new Error(`Element does not have attribute ${attribute}`);
    return attr;
  };

  // clearFilters does not exist
  await expectCount([page, "clear-filters"], 0);

  // jobFilter exists
  await expectCount([page, "event-filter-job"], 1);

  // jsFilter exists
  await expectCount([page, "skill-filter-javascript"], 1);

  // jobFilter does not have class active
  const jobFilterClasses = (await getAttribute(jobFilter, "class")).split(" ");
  expect(jobFilterClasses).not.toContain("active");

  // jsFilter does not have class active
  const jsFilterClasses = (await getAttribute(jsFilter, "class")).split(" ");
  expect(jsFilterClasses).not.toContain("active");

  await jobFilter.click();
  await jsFilter.click();

  // jobFilter has class active
  const jobFilterClassesAfterClick = (await getAttribute(jobFilter, "class")).split(" ");
  expect(jobFilterClassesAfterClick).toContain("active");

  // jsFilter has class active
  const jsFilterClassesAfterClick = (await getAttribute(jsFilter, "class")).split(" ");
  expect(jsFilterClassesAfterClick).toContain("active");

  // clearFilters exists
  await expectCount([page, "clear-filters"], 1);

  await clearFilters.click();

  // jobFilter does not have class active
  const jobFilterClassesAfterClear = (await getAttribute(jobFilter, "class")).split(" ");
  expect(jobFilterClassesAfterClear).not.toContain("active");

  // jsFilter does not have class active
  const jsFilterClassesAfterClear = (await getAttribute(jsFilter, "class")).split(" ");
  expect(jsFilterClassesAfterClear).not.toContain("active");
});

test("If no results, show confused travolta", async ({ page }) => {
  const otherFilter = getLocator([page, "event-filter-other"]);
  const typescriptFilter = getLocator([page, "skill-filter-typescript"]);

  await otherFilter.click();
  await typescriptFilter.click();

  await expectCount([page, "confused-travolta"], 1);
});
