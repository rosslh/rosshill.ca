import { expect, Locator, test } from "@playwright/test";
import { getLocator, expectCount } from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Event type filter works", async ({ page }) => {
  const workFilter = getLocator([page, "event-filter-work"]);

  // Before clicking the filter, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat.com"], 1);

  await workFilter.click();

  // After clicking the filter, the wtformat item should not exist
  await expectCount([page, "post-stub-wtformat.com"], 0);

  await workFilter.click();

  // After clicking the filter again, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat.com"], 1);
});

test("Skill tag filter works", async ({ page }) => {
  const djangoFilter = getLocator([page, "skill-filter-django"]);
  const jsFilter = getLocator([page, "skill-filter-javascript"]);

  // Before clicking the filter, the wtformat item should exist
  await expectCount([page, "post-stub-wtformat.com"], 1);

  await djangoFilter.click();

  // After clicking the filter, the wtformat item should not exist
  await expectCount([page, "post-stub-wtformat.com"], 0);

  // But the doctalk item should exist
  await expectCount([page, "post-stub-full-stack-developer-doctalk"], 1);

  await jsFilter.click();

  // After clicking the filter, the wtformat item should now exist
  await expectCount([page, "post-stub-wtformat.com"], 1);

  // And the doctalk item should exist
  await expectCount([page, "post-stub-full-stack-developer-doctalk"], 1);
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

const getAttribute = async (
  locator: Locator,
  attribute: string,
): Promise<string> => {
  const attributeValue = await locator.getAttribute(attribute);
  if (!attributeValue) {
    throw new Error(`Element does not have attribute ${attribute}`);
  }
  return attributeValue;
};

test("Clear filters button works", async ({ page }) => {
  const clearFilters = getLocator([page, "clear-filters"]);
  const workFilter = getLocator([page, "event-filter-work"]);
  const jsFilter = getLocator([page, "skill-filter-javascript"]);

  // clearFilters does not exist
  await expectCount([page, "clear-filters"], 0);

  // workFilter exists
  await expectCount([page, "event-filter-work"], 1);

  // jsFilter exists
  await expectCount([page, "skill-filter-javascript"], 1);

  // workFilter does not have class active
  const workFilterClasses = await getAttribute(workFilter, "class");
  expect(workFilterClasses.split(" ")).not.toContain("active");

  // jsFilter does not have class active
  const jsFilterClasses = await getAttribute(jsFilter, "class");
  expect(jsFilterClasses.split(" ")).not.toContain("active");

  await workFilter.click();
  await jsFilter.click();

  // workFilter has class active
  const workFilterClassesAfterClick = await getAttribute(workFilter, "class");
  expect(workFilterClassesAfterClick.split(" ")).toContain("active");

  // jsFilter has class active
  const jsFilterClassesAfterClick = await getAttribute(jsFilter, "class");
  expect(jsFilterClassesAfterClick.split(" ")).toContain("active");

  // clearFilters exists
  await expectCount([page, "clear-filters"], 1);

  await clearFilters.click();

  // workFilter does not have class active
  const workFilterClassesAfterClear = await getAttribute(workFilter, "class");
  expect(workFilterClassesAfterClear.split(" ")).not.toContain("active");

  // jsFilter does not have class active
  const jsFilterClassesAfterClear = await getAttribute(jsFilter, "class");
  expect(jsFilterClassesAfterClear.split(" ")).not.toContain("active");
});

test("If no results, show confused travolta", async ({ page }) => {
  const otherFilter = getLocator([page, "event-filter-other"]);
  const typescriptFilter = getLocator([page, "skill-filter-typescript"]);

  await otherFilter.click();
  await typescriptFilter.click();

  await expectCount([page, "confused-travolta"], 1);
});
