import { test } from "@playwright/test";
import { expectCount, expectTextContent } from "../commands.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/404");
});

test("Missing page shows 404 error", async ({ page }) => {
  await expectCount([page, "error"], 1);
  await expectCount([page, "confused-travolta"], 1);
  await expectTextContent([page, "404-heading"], "404: Page introuvable");
});
