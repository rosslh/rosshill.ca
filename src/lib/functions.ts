import getSlug from "slugify";

export const slugify = (str: string) => getSlug(str, { replacement: "-", lower: true, remove: /[:]/ }).replace(/-+/g, "-");

export const remsToPixels = (rems: number) => Math.round(rems * 16);
