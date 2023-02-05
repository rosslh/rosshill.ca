import type { SiteTheme } from "$lib/types";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      theme: SiteTheme
    }
    // interface PageData {}
    // interface Platform {}
  }
}
