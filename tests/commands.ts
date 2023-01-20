import { expect } from "@playwright/test";
import type { Page } from "playwright-core";

export function getElement(page: Page, dataAttribute: string) {
  return page.locator(`[data-testid="${dataAttribute}"]`);
}

export async function expectCount(page: Page, dataAttribute: string, expectedCount: number) {
  const element = getElement(page, dataAttribute);
  await expect(element).toHaveCount(expectedCount, { timeout: 10000 });
}

export async function expectToHaveText(page: Page, dataAttribute: string, text?: string) {
  const element = getElement(page, dataAttribute);
  const elementText = await element.evaluate((el) => el.textContent);
  if (text) {
    expect(elementText).toContain(text);
  } else {
    expect(elementText).toBeTruthy();
  }
}

async function isUserScrolledToBottom(page: Page) {
  const evaluated = await page.evaluate(() => {
    const documentHeightPx = document.body.scrollHeight;
    const currentScrollPx = window.scrollY + window.innerHeight;
    return { documentHeightPx, currentScrollPx };
  });
  const bufferPx = 5;
  return evaluated.currentScrollPx + bufferPx > evaluated.documentHeightPx;
}

export async function isElementAtTopOfViewport(page: Page, selector: string) {
  const element = await getElement(page, selector).elementHandle();
  const boundingBox = element && await element.boundingBox();
  if (!boundingBox) {
    return false;
  }
  const bufferPx = 5;
  const elementIsAtTop = Math.abs(boundingBox.y) < bufferPx;
  return elementIsAtTop || isUserScrolledToBottom(page);
}

export async function getCssCustomProperty(page: Page, dataAttribute: string, variableName: string) {
  const locator = getElement(page, dataAttribute);
  return locator.evaluate(
    (elem, varName) => {
      const style = getComputedStyle(elem);
      return style.getPropertyValue(`--${varName}`);
    },
    variableName,
  );
}
