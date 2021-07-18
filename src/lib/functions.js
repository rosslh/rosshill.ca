import slug from "slugify";

export const slugify = str => slug(str, { replacement: '-', lower: true, remove: /[:]/ }).replace(/-+/g,"-");

export const remsToPixels = rems => Math.round(rems * 16);