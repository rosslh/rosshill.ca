import { test, expect } from "@playwright/test";
import { parse } from "date-fns";
import {
  getLocator, expectTextContent, expectCount, waitForElement,
} from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Sidebar information is displayed", async ({ page }) => {
  const sidebar = getLocator([page, "sidebar"]);

  const jobTitle = getLocator([sidebar, "job-title"]);
  await expectTextContent(jobTitle, "Software Developer");

  const emailAddress = getLocator([sidebar, "email-address"]);
  await expectTextContent(emailAddress, "ross@rosshill.ca");
  expect(await emailAddress.getAttribute("href")).toMatch(/mailto:.+@.+/);

  const githubLink = getLocator([sidebar, "github-link"]);
  await expectTextContent(githubLink, "GitHub");
  expect(await githubLink.getAttribute("href")).toMatch(/https:\/\/github\.com\/.+/);

  const linkedinLink = getLocator([sidebar, "linkedin-link"]);
  await expectTextContent(linkedinLink, "LinkedIn");
  expect(await linkedinLink.getAttribute("href")).toMatch(/https:\/\/www\.linkedin\.com\/in\/.+/);

  const resumeLink = getLocator([sidebar, "resume-link"]);
  await expectTextContent(resumeLink, "Resume");
  expect(await resumeLink.getAttribute("href")).toMatch(/.+\.pdf/);
});

const occasions = {
  "Valentine's Day": ["2023-02-14"],
  "Black History Month": ["2023-02-01", "2023-02-15", "2023-02-28"],
  "International Women's Day": ["2023-03-08"],
  "Trans Day of Visibility": ["2023-03-31"],
  "Pride Month": ["2023-06-01", "2023-06-15", "2023-06-30"],
  "Canada Day": ["2023-07-01"],
  "National Day for Truth and Reconciliation": ["2023-09-29", "2023-09-30", "2023-10-01"],
  "Canadian Thanksgiving": ["2023-10-08", "2023-10-09", "2023-10-10"],
  "Halloween": ["2023-10-30", "2023-10-31", "2023-11-01"],
  "Remembrance Day": ["2023-11-10", "2023-11-11", "2023-11-12"],
  "Transgender Awareness Week": ["2023-11-13", "2023-11-16", "2023-11-19"],
  "American Thanksgiving": ["2023-11-23"],
  "Holidays 2023": ["2023-12-10", "2023-12-20", "2023-12-28"],
  "New Year's Eve": ["2023-12-30", "2023-12-31", "2024-01-01"],
};

for (let i = 0; i < Object.keys(occasions).length; i += 1) {
  const occasionName = Object.keys(occasions)[i];
  const occasionDates = Object.values(occasions)[i];

  for (let j = 0; j < occasionDates.length; j += 1) {
    const occasionDate = occasionDates[j];
    test(`Sidebar displays ${occasionName} on ${occasionDate}`, async ({ page }) => {
      const fakeNow = parse(occasionDate, "yyyy-MM-dd", new Date()).getTime();
      await page.addInitScript(`{
        // Extend Date constructor to default to fakeNow
        Date = class extends Date {
          constructor(...args) {
            if (args.length === 0) {
              super(${fakeNow});
            } else {
              super(...args);
            }
          }
        }
        // Override Date.now() to start from fakeNow
        const __DateNowOffset = ${fakeNow} - Date.now();
        const __DateNow = Date.now;
        Date.now = () => __DateNow() + __DateNowOffset;
      }`);

      page.reload();
      
      const sidebar = getLocator([page, "sidebar"]);

      await waitForElement(page, `occasion-image-${occasionName}`);
      const occasionImage = getLocator([sidebar, `occasion-image-${occasionName}`]);
      await expectCount(occasionImage, 1);
    });
  }
}
