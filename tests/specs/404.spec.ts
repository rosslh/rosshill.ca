import { test } from "@playwright/test";
import { expectCount, expectTextContent } from "../commands.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/a/path/that/does/not/exist");
});

test("Missing page shows 404 error", async ({ page }) => {
  await expectCount([page, "error"], 1);
  await expectCount([page, "confused-travolta"], 1);
  await expectTextContent([page, "error-heading"], "404: Page not found");
});
