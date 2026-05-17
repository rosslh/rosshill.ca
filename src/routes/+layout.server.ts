import { SiteTheme } from "$lib/types";

export const load = ({
  locals,
}: {
  locals: { theme?: SiteTheme };
}): { theme: SiteTheme } => ({
  theme: locals.theme ?? SiteTheme.Auto,
});
