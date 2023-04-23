// @ts-check
import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests/specs",
  timeout: 90 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 4 : 2,
  workers: 1,
  reporter: "list",

  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
    {
      name: "chromium-mobile",
      use: devices["Pixel 5"],
    },
  ],

  webServer: {
    command: "npm run preview",
    port: 3000,
  },
};

export default config;
