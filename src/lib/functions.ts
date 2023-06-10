import getSlug from "slugify";

export const slugify = (str: string): string => getSlug(str, { replacement: "-", lower: true, remove: /[:]/ }).replace(/-+/g, "-");

export const remsToPixels = (rems: number): number => Math.round(rems * 16);

export const prefersColorSchemeDark = (isBrowser: boolean): boolean => isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const formatPostTitle = (title: string): string => title.replace(/\s[-–—]\s/g, " – ");

export const truncateBySentence = (text: string, maxLength: number): string => {
  const truncated = text
    .split(".")
    .filter((sentence) => sentence.trim())
    .map((sentence) => `${sentence.trim()}.`)
    .reduce(
      (acc, sentence) => {
        if (acc.length + sentence.length <= maxLength) {
          return `${acc} ${sentence}`;
        }
        return acc;
      },
      "",
    );
  
  const firstSentence = `${text.split(".")[0]}.`;

  return truncated || firstSentence;
};
