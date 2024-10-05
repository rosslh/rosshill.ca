import getSlug from "slugify";

export const slugify = (stringToSlugify: string): string =>
  getSlug(stringToSlugify, {
    replacement: "-",
    lower: true,
    remove: /:/,
  }).replaceAll(/[–—-]+/g, "-");

export const remsToPixels = (rems: number): number => Math.round(rems * 16);

export const prefersColorSchemeDark = (browser: boolean): boolean =>
  browser && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const formatPostTitle = (title: string): string =>
  title.replaceAll(/\s[–—-]\s/g, " – ");
