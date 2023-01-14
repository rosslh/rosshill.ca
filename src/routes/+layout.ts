import { SiteTheme } from "$lib/types";

export async function load({ data }) {
  return {
    themeFromSession: data.theme ?? SiteTheme.System,
  };
}
