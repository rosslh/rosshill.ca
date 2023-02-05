import { test, expect } from "@playwright/test";
import { getLocator, expectTextContent } from "../commands.js";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Sidebar information is displayed", async ({ page }) => {
  const sidebar = getLocator([page, "sidebar"]);

  const headshotImg = getLocator([sidebar, "headshot-img"]);
  expect(await headshotImg.getAttribute("src")).toMatch(/.+\.png/);

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
