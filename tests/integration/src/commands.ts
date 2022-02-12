import { expect } from "@playwright/test";
import type { Page } from "playwright-core";
// import { errors } from "playwright-core";

export function getElement(page: Page, dataAttribute: string) {
  return page.locator(`[data-test="${dataAttribute}"]`);
}

export async function expectCount(page: Page, dataAttribute: string, expectedCount: number) {
  const element = getElement(page, dataAttribute);
  await expect(element).toHaveCount(expectedCount, { timeout: 4000 });
}

export async function expectToHaveText(page: Page, dataAttribute: string, text: string) {
  const element = getElement(page, dataAttribute);
  const elementText = await element.evaluate(element => element.textContent);
  expect(elementText).toContain(text);
}
