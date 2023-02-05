import {
  test, expect, Page, Locator,
} from "@playwright/test";
import chroma from "chroma-js";
import { getLocator, expectTextContent } from "../commands.js";

async function getCssVariable(container: Page | Locator, testId: string, variableName: string) {
  const locator = getLocator([container, testId]);
  return locator.evaluate(
    (elem, varName) => {
      const style = getComputedStyle(elem);
      return style.getPropertyValue(`--${varName}`);
    },
    variableName,
  );
}

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Landing page has correct heading", async ({ page }) => {
  await expectTextContent([page, "main-heading"]);
});

test.describe("prefers-color-scheme: dark", () => {
  test.use({ colorScheme: "dark" });

  test("Color scheme media query works", async ({ page }) => {
    // Check that the app wrapper has the data-theme attribute set to system
    await page.waitForSelector("div.app-wrapper[data-theme=system]");
    const appWrapper = getLocator([page, "app-wrapper"]);
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");

    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");

    // Check that background color is correct
    const background = (await getCssVariable(page, "app-wrapper", "background")).replace(/\s/g, "");
    const contrastWithWhite = chroma.contrast(background, "white");
    const contrastWithBlack = chroma.contrast(background, "black");
    expect(contrastWithWhite).toBeGreaterThan(contrastWithBlack);
  });

  test("Theme toggle works", async ({ page }) => {
    const appWrapper = getLocator([page, "app-wrapper"]);
    const themeButton = getLocator([page, "theme-switcher"]);
  
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");
  
    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("light");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=light");
  
    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("dark");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=dark");
  
    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");
  });
});

test.describe("prefers-color-scheme: light", () => {
  test.use({ colorScheme: "light" });

  test("Color scheme media query works", async ({ page }) => {
    // Check that the app wrapper has the data-theme attribute set to system
    await page.waitForSelector("div.app-wrapper[data-theme=system]");
    const appWrapper = getLocator([page, "app-wrapper"]);
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");

    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");

    // Check that background color is correct
    const background = (await getCssVariable(page, "app-wrapper", "background")).replace(/\s/g, "");
    const contrastWithWhite = chroma.contrast(background, "white");
    const contrastWithBlack = chroma.contrast(background, "black");
    expect(contrastWithBlack).toBeGreaterThan(contrastWithWhite);
  });

  test("Theme toggle works", async ({ page }) => {
    const appWrapper = getLocator([page, "app-wrapper"]);
    const themeButton = getLocator([page, "theme-switcher"]);
  
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");
  
    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("dark");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=dark");

    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("light");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=light");
  
    await themeButton.click();
    expect(await appWrapper.getAttribute("data-theme")).toBe("system");
    expect(await page.evaluate(() => document.cookie)).toBe("theme=system");
  });
});

test("User stored theme works", async ({ page }) => {
  const appWrapper = getLocator([page, "app-wrapper"]);

  // User stored system theme works
  await page.evaluate(() => {
    document.cookie = "theme=system";
  });
  await page.reload();
  expect(await appWrapper.getAttribute("data-theme")).toBe("system");

  // User stored light theme works
  await page.evaluate(() => {
    document.cookie = "theme=light";
  });
  await page.reload();
  expect(await appWrapper.getAttribute("data-theme")).toBe("light");

  // User stored dark theme works
  await page.evaluate(() => {
    document.cookie = "theme=dark";
  });
  await page.reload();
  expect(await appWrapper.getAttribute("data-theme")).toBe("dark");
});
