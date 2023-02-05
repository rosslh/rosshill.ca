import { expect } from "@playwright/test";
import type { Locator, Page } from "playwright-core";

type Container = Page | Locator;
type Target = Locator | [Container, string];

export function getLocator(target: Target): Locator {
  if (Array.isArray(target)) {
    const [container, testId] = target;
    return container.locator(`[data-testid="${testId}"]`);
  }
  return target;
}

export async function expectCount(target: Target, expectedCount: number) {
  const locator = getLocator(target);
  await expect(locator).toHaveCount(expectedCount, { timeout: 10000 });
}

export async function expectTextContent(target: Target, text?: string) {
  const locator = getLocator(target);
  const elementText = await locator.evaluate((el) => el.textContent);
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

export async function expectToBeAtTop(page: Page, selector: string) {
  const element = await getLocator([page, selector]).elementHandle();
  const boundingBox = element && await element.boundingBox();
  if (!boundingBox) {
    throw new Error(`Element ${selector} not found`);
  }
  const bufferPx = 5;
  const elementIsAtTop = Math.abs(boundingBox.y) < bufferPx;
  expect(elementIsAtTop || await isUserScrolledToBottom(page)).toEqual(true);
}
