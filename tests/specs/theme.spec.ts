import {
  test, expect, Page,
} from "@playwright/test";
import chroma from "chroma-js";
import { getLocator } from "../commands.js";

type SiteTheme = "light" | "dark" | "system";

async function getCssVariable(page: Page, variableName: string): Promise<string> {
  const locator = getLocator([page, "app-wrapper"]);
  return locator.evaluate(
    (elem, varName) => {
      const style = getComputedStyle(elem);
      return style.getPropertyValue(`--${varName}`);
    },
    variableName,
  );
}

async function getPreferredColorScheme(page: Page): Promise<"light" | "dark"> {
  return await page.evaluate(() => window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light";
}

async function expectTheme(page: Page, theme: SiteTheme): Promise<void> {
  await page.waitForSelector(`[data-testid="app-wrapper"][data-theme="${theme}"]`);
  expect(await getLocator([page, "app-wrapper"]).getAttribute("data-theme")).toBe(theme);
  expect(await page.evaluate(() => document.cookie)).toBe(`theme=${theme}`);

  const computedTheme = theme === "system" ? await getPreferredColorScheme(page) : theme;

  const background = (await getCssVariable(page, "color-background")).replace(/\s/g, "");
  const contrastWithWhite = chroma.contrast(background, "white");
  const contrastWithBlack = chroma.contrast(background, "black");
  
  if (computedTheme === "light") {
    expect(contrastWithBlack).toBeGreaterThan(contrastWithWhite);
  } else {
    expect(contrastWithWhite).toBeGreaterThan(contrastWithBlack);
  }
}

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const colorSchemes = ["light", "dark"] as const;
for (let i = 0; i < colorSchemes.length; i += 1) {
  const preferredColorScheme = colorSchemes[i];
  test.describe(`prefers-color-scheme: ${preferredColorScheme}`, () => {
    test.use({ colorScheme: preferredColorScheme });

    test("Color scheme media query works", async ({ page }) => {
      await expectTheme(page, "system");
    });

    test("Theme toggle works", async ({ page }) => {
      const themeOrder: SiteTheme[] = preferredColorScheme === "light"
        ? ["system", "dark", "light"]
        : ["system", "light", "dark"];

      await expectTheme(page, themeOrder[0]);
    
      const themeButton = getLocator([page, "theme-switcher"]);

      await themeButton.click();
      await expectTheme(page, themeOrder[1]);
    
      await themeButton.click();
      await expectTheme(page, themeOrder[2]);
    
      await themeButton.click();
      await expectTheme(page, themeOrder[0]);
    });
  });
}

test("User stored theme works", async ({ page }) => {
  // User stored system theme works
  await page.evaluate(() => {
    document.cookie = "theme=system";
  });
  await page.reload();
  await expectTheme(page, "system");

  // User stored light theme works
  await page.evaluate(() => {
    document.cookie = "theme=light";
  });
  await page.reload();
  await expectTheme(page, "light");

  // User stored dark theme works
  await page.evaluate(() => {
    document.cookie = "theme=dark";
  });
  await page.reload();
  await expectTheme(page, "dark");
});
