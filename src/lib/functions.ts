import getSlug from "slugify";

export const slugify = (str: string): string => getSlug(str, {
  replacement: "-",
  lower: true,
  remove: /[:]/,
})
  .replace(/-+/g, "-");

export const remsToPixels = (rems: number): number => Math.round(rems * 16);

export const prefersColorSchemeDark = (isBrowser: boolean): boolean => isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const formatPostTitle = (title: string): string => title.replace(/\s[-–—]\s/g, " – ");

export const truncateBySentence = (text: string, maxLength: number): string => {
  const sentences: string[] = text
    .split(".")
    .filter((sentence) => sentence.trim())
    .map((sentence) => `${sentence.trim()}.`);

  if (!sentences[0]) {
    return text;
  }

  let truncated: string = sentences[0];

  for (let i = 1; i < sentences.length; i += 1) {
    const sentence = sentences[i];
    if (truncated.length + (sentence?.length ?? 0) > maxLength) {
      break;
    }
    truncated += ` ${sentence}`;
  }

  const firstSentence = `${text.split(".")[0]}.`;

  return truncated || firstSentence;
};
