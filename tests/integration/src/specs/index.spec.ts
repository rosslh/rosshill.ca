import { test, expect } from "@playwright/test";
import { getElement, expectToHaveText /* , expectCount */ } from "../commands.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


test.describe.parallel("suite", () => {
  test("Landing page has correct heading", async ({ page }) => {
    await expectToHaveText(page, "main-heading", "Hey, I’m Ross");
  });

  test("Dark mode toggle works", async ({ page }) => {
    const body = getElement(page, "body");
    const themeButton = getElement(page, "theme-switcher");

    // Before clicking the button, the body should have no data-theme attribute
    expect(await body.getAttribute("data-theme")).toBe("light");

    await themeButton.click();

    // After clicking the button, the body should have a data-theme attribute
    expect(await body.getAttribute("data-theme")).toBe("dark");

    // user-theme in localStorage should be set to dark
    expect(await page.evaluate(() => localStorage.getItem("user-theme"))).toBe("dark");
  });
  
  test.describe("prefers-color-scheme: dark", () => {
    test.use({ colorScheme: "dark" });

    test("Color scheme media query works", async ({ page }) => {
      // Check that the body has the data-theme attribute set to dark
      const body = getElement(page, "body");
      expect(await body.getAttribute("data-theme")).toBe("dark");

      expect(await page.evaluate(() => localStorage.getItem("user-theme"))).toBe("dark");
    });
  });

  test.describe("prefers-color-scheme: light", () => {
    test.use({ colorScheme: "light" });

    test("Color scheme media query works", async ({ page }) => {
      // Check that the body has the data-theme attribute set to light
      const body = getElement(page, "body");
      expect(await body.getAttribute("data-theme")).toBe("light");

      expect(await page.evaluate(() => localStorage.getItem("user-theme"))).toBe("light");
    });
  });

  test("User stored theme works", async ({ page }) => {
    const body = getElement(page, "body");

    // Set the user preference to dark mode
    await page.evaluate(() => {
      localStorage.setItem("user-theme", "dark");
    });

    // Reload the page
    await page.reload();

    // Check that the body has the data-theme attribute set to dark
    expect(await body.getAttribute("data-theme")).toBe("dark");

    // Set the user preference to light mode
    await page.evaluate(() => {
      localStorage.setItem("user-theme", "light");
    });

    // Reload the page
    await page.reload();

    // Check that the body has the data-theme attribute set to light
    expect(await body.getAttribute("data-theme")).toBe("light");
  });
});
