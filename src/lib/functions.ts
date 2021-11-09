import slug from "slugify";

export const slugify = (str: string) => slug(str, { replacement: '-', lower: true, remove: /[:]/ }).replace(/-+/g,"-");

export const remsToPixels = (rems: number) => Math.round(rems * 16);