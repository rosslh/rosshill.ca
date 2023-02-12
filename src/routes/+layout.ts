import { SiteTheme } from "$lib/types";

export async function load({ data }: { data: { theme?: SiteTheme } }): Promise<{ themeFromSession: SiteTheme }> {
  return {
    themeFromSession: data.theme ?? SiteTheme.System,
  };
}
