import type { SiteTheme } from "$lib/types";

declare global {
  namespace App {
    interface Locals {
      theme: SiteTheme;
    }
  }
}
