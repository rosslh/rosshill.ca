import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import chroma from "chroma-js";
import { getLocator } from "../commands.js";

type SiteTheme = "light" | "dark" | "auto" | "cyberpunk" | "black" | "blue";

async function getCssVariable(
  page: Page,
  variableName: string,
): Promise<string> {
  const locator = getLocator([page, "app-wrapper"]);
  return locator.evaluate((element, variableName_) => {
    const style = getComputedStyle(element);
    return style.getPropertyValue(`--${variableName_}`);
  }, variableName);
}

async function getPreferredColorScheme(page: Page): Promise<"light" | "dark"> {
  return (await page.evaluate(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  ))
    ? "dark"
    : "light";
}

async function expectTheme(page: Page, theme: SiteTheme): Promise<void> {
  await page.waitForSelector(
    `[data-testid="app-wrapper"][data-theme="${theme}"]`,
  );
  expect(
    await getLocator([page, "app-wrapper"]).getAttribute("data-theme"),
  ).toBe(theme);
  expect(await page.evaluate(() => document.cookie)).toContain(
    `theme=${theme}`,
  );
  expect(
    await page.evaluate(() => document.documentElement.dataset.theme),
  ).toBe(theme);

  const computedTheme =
    theme === "auto" ? await getPreferredColorScheme(page) : theme;

  const background = (await getCssVariable(page, "color-background")).trim();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const html = getComputedStyle(document.documentElement);
        const body = getComputedStyle(document.body);
        const app = getComputedStyle(
          document.querySelector('[data-testid="app-wrapper"]')!,
        );

        return [
          html.backgroundColor === app.backgroundColor,
          body.backgroundColor === app.backgroundColor,
        ];
      }),
    )
    .toEqual([true, true]);

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
for (const preferredColorScheme of colorSchemes) {
  test.describe(`prefers-color-scheme: ${preferredColorScheme}`, () => {
    test.use({ colorScheme: preferredColorScheme });

    test("Color scheme media query works", async ({ page }) => {
      await expectTheme(page, "auto");
    });

    test("Theme toggle works", async ({ page }) => {
      const themeOrder: SiteTheme[] =
        preferredColorScheme === "light"
          ? ["auto", "dark", "light", "blue", "black", "cyberpunk"]
          : ["auto", "light", "dark", "blue", "black", "cyberpunk"];

      await expectTheme(page, themeOrder[0]);

      const themeSwitcher = getLocator([page, "theme-switcher"]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[1], { exact: true }).click();
      await expectTheme(page, themeOrder[1]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[2], { exact: true }).click();
      await expectTheme(page, themeOrder[2]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[3], { exact: true }).click();
      await expectTheme(page, themeOrder[3]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[4], { exact: true }).click();
      await expectTheme(page, themeOrder[4]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[5], { exact: true }).click();
      await expectTheme(page, themeOrder[5]);

      await themeSwitcher.click();
      await page.getByText(themeOrder[0], { exact: true }).click();
      await expectTheme(page, themeOrder[0]);
    });
  });
}

test("User stored theme works", async ({ page }) => {
  // User stored auto theme works
  await page.evaluate(() => {
    document.cookie = "theme=auto";
  });
  await page.reload();
  await expectTheme(page, "auto");

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

  // User stored black theme works
  await page.evaluate(() => {
    document.cookie = "theme=black";
  });
  await page.reload();
  await expectTheme(page, "black");

  // User stored cyberpunk theme works
  await page.evaluate(() => {
    document.cookie = "theme=cyberpunk";
  });
  await page.reload();
  await expectTheme(page, "cyberpunk");

  // User stored blue theme works
  await page.evaluate(() => {
    document.cookie = "theme=blue";
  });
  await page.reload();
  await expectTheme(page, "blue");
});
