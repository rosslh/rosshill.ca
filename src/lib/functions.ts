import getSlug from "slugify";
import { SiteTheme } from "./types";

export const slugify = (stringToSlugify: string): string =>
  getSlug(stringToSlugify, {
    replacement: "-",
    lower: true,
    remove: /:/,
  }).replaceAll(/[–—-]+/g, "-");

export const remsToPixels = (rems: number): number => Math.round(rems * 16);

export const prefersColorSchemeDark = (browser: boolean): boolean =>
  browser && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const isPageBackgroundDark = (
  browser: boolean,
  currentTheme: SiteTheme,
) => {
  const darkThemes = [SiteTheme.Dark, SiteTheme.Cyberpunk, SiteTheme.Black];

  return (
    darkThemes.includes(currentTheme) ||
    (currentTheme === SiteTheme.Auto && prefersColorSchemeDark(browser))
  );
};

export const formatPostTitle = (title: string): string =>
  title.replaceAll(/\s[–—-]\s/g, " – ");

export const truncateBySentence = (text: string, maxLength: number): string => {
  const sentences: string[] = text
    .split(".")
    .filter((sentence) => sentence.trim())
    .map((sentence) => `${sentence.trim()}.`);

  if (!sentences[0]) {
    return text;
  }

  let truncated: string = sentences[0];

  for (let index = 1; index < sentences.length; index += 1) {
    const sentence = sentences[index];
    if (truncated.length + (sentence?.length ?? 0) > maxLength) {
      break;
    }
    truncated += ` ${sentence}`;
  }

  const firstSentence = `${text.split(".")[0]}.`;

  return truncated || firstSentence;
};
