import { test, expect } from "@playwright/test";
import { getElement, expectToHaveText } from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Landing page has correct heading", async ({ page }) => {
  await expectToHaveText(page, "main-heading", "Hey, I’m Ross");
});

test("Dark mode toggle works", async ({ page }) => {
  const appWrapper = getElement(page, "app-wrapper");
  const themeButton = getElement(page, "theme-switcher");

  // Before clicking the button, the app wrapper should have no data-theme attribute
  expect(await appWrapper.getAttribute("data-theme")).toBe("light");

  await themeButton.click();

  // After clicking the button, the app wrapper should have a data-theme attribute
  expect(await appWrapper.getAttribute("data-theme")).toBe("dark");

  // user-theme in cookie should be set to dark
  expect(await page.evaluate(() => document.cookie)).toBe("theme=dark");
});

test.describe("prefers-color-scheme: dark", () => {
  test.use({ colorScheme: "dark" });

  test("Color scheme media query works", async ({ page }) => {
    // Check that the app wrapper has the data-theme attribute set to dark
    await page.waitForSelector("div.app-wrapper[data-theme=dark]");
    const appWrapper = getElement(page, "app-wrapper");
    expect(await appWrapper.getAttribute("data-theme")).toBe("dark");

    expect(await page.evaluate(() => document.cookie)).toBe("theme=dark");
  });
});

test.describe("prefers-color-scheme: light", () => {
  test.use({ colorScheme: "light" });

  test("Color scheme media query works", async ({ page }) => {
    // Check that the app wrapper has the data-theme attribute set to light
    await page.waitForSelector("div.app-wrapper[data-theme=light]");
    const appWrapper = getElement(page, "app-wrapper");
    expect(await appWrapper.getAttribute("data-theme")).toBe("light");

    expect(await page.evaluate(() => document.cookie)).toBe("theme=light");
  });
});

test("User stored theme works", async ({ page }) => {
  const appWrapper = getElement(page, "app-wrapper");

  // Set the user preference to dark mode
  await page.evaluate(() => {
    document.cookie = "theme=dark";
  });

  // Reload the page
  await page.reload();

  // Check that the app wrapper has the data-theme attribute set to dark
  expect(await appWrapper.getAttribute("data-theme")).toBe("dark");

  // Set the user preference to light mode
  await page.evaluate(() => {
    document.cookie = "theme=light";
  });

  // Reload the page
  await page.reload();

  // Check that the app wrapper has the data-theme attribute set to light
  expect(await appWrapper.getAttribute("data-theme")).toBe("light");
});
