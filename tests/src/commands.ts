import { expect } from "@playwright/test";
import type { Page } from "playwright-core";
// import { errors } from "playwright-core";

export function getElement(page: Page, dataAttribute: string) {
  return page.locator(`[data-test="${dataAttribute}"]`);
}

export async function expectCount(page: Page, dataAttribute: string, expectedCount: number) {
  const element = getElement(page, dataAttribute);
  await expect(element).toHaveCount(expectedCount, { timeout: 10000 });
}

export async function expectToHaveText(page: Page, dataAttribute: string, text: string) {
  const element = getElement(page, dataAttribute);
  const elementText = await element.evaluate(element => element.textContent);
  expect(elementText).toContain(text);
}

async function userIsScrolledToBottom(page: Page) {
  const { documentHeightPx, currentScrollPx } = await page.evaluate(() => {
    const documentHeightPx = document.body.scrollHeight;
    const currentScrollPx = window.scrollY + window.innerHeight;
    return { documentHeightPx, currentScrollPx };
  });
  const bufferPx = 5;
  return currentScrollPx + bufferPx > documentHeightPx;
}

export async function elementIsAtTopOfViewport(page: Page, selector: string) {
  const element = await getElement(page, selector).elementHandle();
  const boundingBox = await element.boundingBox();
  const bufferPx = 5;
  const elementIsAtTop = Math.abs(boundingBox.y) < bufferPx;
  return elementIsAtTop || await userIsScrolledToBottom(page);
}
