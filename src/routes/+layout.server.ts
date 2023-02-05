import type { SiteTheme } from "$lib/types";

export const load = ({ locals }: { locals: { theme?: SiteTheme } }) => ({
  theme: locals.theme,
});
