import getSlug from "slugify";

export const slugify = (str: string) => getSlug(str, { replacement: "-", lower: true, remove: /[:]/ }).replace(/-+/g, "-");

export const remsToPixels = (rems: number) => Math.round(rems * 16);

export const prefersColorSchemeDark = (isBrowser: boolean) => isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;
