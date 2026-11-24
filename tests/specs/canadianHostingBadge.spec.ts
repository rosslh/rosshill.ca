import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

import { expectCount, getLocator } from "../commands.js";

test.describe.configure({ mode: "parallel" });

// A 1x1 transparent PNG stands in for the badge image.
const pixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

async function visit(page: Page, path = "/"): Promise<void> {
  await page.route("https://mapledeploy.ca/api/badge**", (route) =>
    route.fulfill({ status: 200, contentType: "image/png", body: pixel }),
  );
  await page.goto(path);
}

for (const path of ["/", "/experience/mapledeploy"]) {
  test(`Every visitor sees the badge below the copyright on ${path}`, async ({
    page,
  }) => {
    await visit(page, path);

    const badge = getLocator([page, "canadian-hosting-badge"]);
    const visibleLink = badge.locator("a:visible");
    await expectCount(visibleLink, 1);
    expect(await visibleLink.getAttribute("href")).toMatch(
      /^https:\/\/mapledeploy\.ca\/\?utm_source=badge&.+-small$/,
    );
    await expect(visibleLink.locator("img")).toHaveAttribute(
      "alt",
      "Hosted in Canada with MapleDeploy",
    );

    const copyright = page.getByText("Copyright © Ross Hill");
    const copyrightBox = await copyright.boundingBox();
    const badgeBox = await visibleLink.boundingBox();
    expect(copyrightBox).not.toBeNull();
    expect(badgeBox).not.toBeNull();
    if (copyrightBox && badgeBox) {
      expect(badgeBox.y).toBeGreaterThan(copyrightBox.y + copyrightBox.height);
    }
  });
}

for (const theme of ["light", "dark"]) {
  test(`The ${theme} theme shows the ${theme} badge`, async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "theme", value: theme, url: baseURL ?? "http://localhost:3000" },
    ]);
    await visit(page);

    const badge = getLocator([page, "canadian-hosting-badge"]);
    await expect(badge.locator(`a.${theme}`)).toBeVisible();
    await expect(badge.locator("a:visible")).toHaveCount(1);
  });
}

test("The badge needs no country lookup", async ({ page }) => {
  const lookups: string[] = [];
  page.on("request", (request) => {
    if (
      request.resourceType() === "fetch" ||
      request.resourceType() === "xhr"
    ) {
      const url = request.url();
      if (url.includes("mapledeploy.ca") || url.includes("ipapi.co")) {
        lookups.push(url);
      }
    }
  });

  await visit(page);
  await expect(getLocator([page, "canadian-hosting-badge"])).toBeVisible();
  expect(lookups).toEqual([]);
});
