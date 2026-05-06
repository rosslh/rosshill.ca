import getSlug from "slugify";
import type { PostSeason } from "$lib/types";

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

export const normalizePostSeason = (
  season: unknown,
): PostSeason | undefined =>
  season === "summer" || season === "winter" ? season : undefined;
