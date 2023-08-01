import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import fs from "node:fs";
import { hsluvToHex } from "hsluv-ts";
import { keyBy, merge } from "lodash-es";

import * as SimpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import type { PostItemStub, TagColors, TagColor } from "$lib/types";
import { tagAncestors } from "../src/lib/tags.js";

const inputPaths = {
  posts: "src/data/posts.json",
  stylesheet: "src/lib/styles/design-system.scss",
};

const outputPaths = {
  tagSvgs: "assets/tags/",
  tagColors: "src/data/tagColors.json",
};

type Icon = Pick<SimpleIcon, "hex" | "path" | "slug">;

const customIcons: Icon[] = [
  {
    slug: "java",
    hex: "007396",
    path: "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
  },
  {
    slug: "rubyonrails",
    hex: "CC0000",
    path: "m 13.010939,4.6354525 c -0.288623,0.00424 -0.587811,0.024712 -0.893309,0.061372 l 0.201165,0.6239522 c 0.305498,-0.031422 0.613342,-0.040914 0.920585,-0.040914 h 0.105698 l -0.211395,-0.64441 c -0.04081,0 -0.08152,-6.068e-4 -0.122744,-2e-7 z m 4.163091,0.6239523 -0.04092,0.6989629 c 0.349141,0.116962 0.687617,0.2405525 1.026284,0.3784629 l 0.04432,-0.7057821 C 18.107714,5.5786775 17.840889,5.4496862 17.17403,5.2594048 Z M 8.465975,5.6617345 A 16.753507,16.753507 0 0 0 7.640858,6.1152082 L 8.128427,6.8584955 C 8.402502,6.6891624 8.667495,6.5275484 8.943316,6.3913838 L 8.465975,5.6651443 Z m 5.046171,0.037505 a 9.7794253,9.7794253 0 0 0 -1.142207,0.047734 c -0.773346,0.069829 -1.588345,0.295024 -2.41057,0.6546384 -2.475404,1.0788436 -5.022442,3.3478518 -6.689586,6.1270071 -1.667145,2.777409 -2.254384,5.238007 -2.444666,6.290665 -0.06459,0.352631 -0.08524,0.545533 -0.08524,0.545533 h 8.360278 c 0,0 -0.09899,-0.45342 -0.167069,-1.183124 a 14.279846,14.279846 0 0 1 -0.05796,-1.27859 c 0,-0.960135 0.09626,-2.099071 0.426197,-3.242507 0.08205,-0.284547 0.179753,-0.572998 0.293224,-0.855801 0.11347,-0.282805 0.243716,-0.559527 0.3921,-0.835348 0.29677,-0.548149 0.665959,-1.079771 1.128569,-1.561585 0.462612,-0.4818135 1.0193,-0.917066 1.680921,-1.2854092 0.432934,-0.2094843 1.217983,-0.6359263 2.349197,-0.8523933 0.377072,-0.071574 0.790613,-0.122496 1.244496,-0.1329702 0.453881,-0.00873 0.947398,0.021909 1.476345,0.1057022 1.057893,0.1693331 2.26456,0.559035 3.620969,1.2922284 0.677331,0.3683432 1.393971,0.8189261 2.144622,1.3740601 C 23.823792,10.751966 24,10.626084 24,10.626084 c 0,0 -0.341939,-0.344476 -0.954681,-0.8489841 C 22.434323,9.2708465 21.556587,8.6040423 20.484727,7.9563866 19.950542,7.631686 19.363904,7.3120316 18.742434,7.0187539 A 15.452959,15.452959 0 0 0 16.7717,6.2515912 13.057855,13.057855 0 0 0 14.630487,5.7776602 10.558008,10.558008 0 0 0 13.512146,5.6992395 Z m 3.641427,2.8810909 -0.04092,0.6682776 c 0.34914,0.010474 0.6976,0.052842 1.046741,0.1261618 l 0.04432,-0.6546384 a 7.5414347,7.5414347 0 0 0 -1.05015,-0.139801 z M 14.678221,8.8360498 C 14.318607,8.9425359 14.012754,9.056635 13.747407,9.1735971 l 0.24208,0.7296495 c 0.305498,-0.1483847 0.613342,-0.2739671 0.920585,-0.368235 z M 4.190368,8.8769688 C 3.916293,9.1405699 3.648818,9.4060529 3.406166,9.6713997 L 4.221054,10.370363 C 4.442758,10.085814 4.687348,9.7986177 4.940474,9.5350167 Z m 7.576076,1.5684052 c -0.244398,0.223448 -0.464357,0.464794 -0.654638,0.709192 l 0.508026,0.760328 c 0.179807,-0.263599 0.390028,-0.505707 0.623952,-0.750105 z m -1.871857,2.952692 a 10.03779,10.03779 0 0 0 -0.31709,1.162664 l 0.855803,0.675096 c 0.04364,-0.411985 0.118544,-0.823943 0.225032,-1.237674 z M 0.528484,13.820847 C 0.327729,14.27473 0.106488,14.802915 0,15.089211 l 1.217218,0.443244 C 1.356874,15.172839 1.57637,14.655129 1.745703,14.264094 Z m 8.888763,3.426624 c 0.02095,0.560371 0.07545,1.017172 0.129564,1.333145 l 1.268361,0.453472 A 13.970857,13.970857 0 0 1 10.562864,17.66344 Z",
  },
  {
    slug: "postgresql",
    hex: "4169E1",
    path: "M10.55 6.59c-.25-.18-.65-.2-1.1-.2l-1.1.29-1.02.54.05 2.17c-.1.7-.27 1.55-.14 2.26.25 1.38 1.18 2.57 2.78 2.6l.44-1.37c.24-.6.56-1.17.72-1.86.31-1.19.07-3.92-.63-4.43zm-.02.97c-.27.64-1.33.37-1.36-.32l.03-.06.26-.14c.54-.02.82.08 1.1.29l-.03.23zm9.01 1.06c.1-.77.18-1.54.27-2.32-.97-.04-1.96-.08-2.36.52-.28.43-.18 1.36-.03 1.86.39 1.25 1 2.34 1.6 3.37l.4.85.06-.03c.12-.62.4-1.3.27-2.12l-.2-2.13zm-1.15-.98c-.34-.1-.46-.16-.66-.38.02-.16.05-.16.12-.26.15-.06.25-.18.66-.2.3.04.39.1.53.29-.19.33-.32.35-.65.55zm-7.5 7.5-1.18 1.28c-.51.33-1.35.45-2 .62l.03.05c1.36.48 2.49.37 3.45-.43.48-.4.7-1.47-.3-1.51zm10.07.3c-.41-.08-.7-.32-1.07-.38-.5.26-.72.31-.69 1.1 1.24.6 3.6-.23 4.15-.9-.72.08-1.56.33-2.39.18zM4.92.32 3.65.47C2.44.77 1.47 1.46 1 2.5c-1.42 3.23.6 9.25 1.68 11.78.37.86 1.08 2.54 2 2.76.49.11.77-.25.96-.44l2.15-2.44c-.67-.78-1.58-1.75-1.3-3.45l.15-1.48-.06-2.7C7 3.73 7.32 2.8 8.7 1V.96C7.5.76 6.4.34 4.92.32Zm7.46-.06-.66.06-1.25.35c-1.88.81-2.99 3.1-3.1 5.66.42-.22.9-.45 1.39-.59 2.54-.69 2.88.94 3.22 2.87a6.9 6.9 0 0 1-.03 2.5c-.16.6-.39 1.14-.61 1.65l-.59 1.66h.03c.25-.07.49.02.66.08 1.05.41.93 1.44.93 2.85 0 2.55-.31 6.01 1.68 6.59.6.16 1.3-.03 1.77-.18 2.54-.78 2.04-3.8 2.53-6.52.12-.71-.03-1.67.29-2.2.21-.37.55-.43.9-.66-1.07-1.65-2.24-3.4-2.85-5.48-.73-2.5.57-3.5 3.02-3.34C18.6 2.65 16.35.28 12.38.26ZM17.1 0l-1.25.2.06.03c.47.35 1.04.57 1.51.9a8.27 8.27 0 0 1 3.14 4.58c.17.82-.14 2.08-.27 2.79-.21 1.16.41 2.13.2 3.37-.08.52-.59 1.75-.43 1.88v-.05c.36-.36.54-.94.82-1.4a22.5 22.5 0 0 0 2.37-6.35c.2-.9.38-2.43.03-3.28a3.15 3.15 0 0 0-.98-1.1C20.95.5 19.59-.01 17.1 0Z",
  },
];

const icons: Record<string, Icon> = keyBy(
  [...Object.values(SimpleIcons), ...customIcons],
  "slug",
);

function handleFileError(error: Error | null): void {
  if (error) {
    throw error;
  }
}

const getNumbersFromStylesheetProperty = (
  fileLines: string[],
  propertyName: string,
): number[] => {
  const escapedPropertyName = propertyName.replace(/\\/g, "\\\\").replace(/\$/g, "\\$");
  const pattern = new RegExp(`^\\s*${escapedPropertyName}:.*;$`);
  const matches = fileLines.filter((line) => pattern.test(line));

  return matches.map((m) => Number.parseFloat(m.replaceAll(/[^\d.]*/g, "")));
};

function getForegroundColors(): { light: string; dark: string } {
  const fileLines = fs.readFileSync(inputPaths.stylesheet, "utf8").split(/\r?\n/);
  const [themeHue] = getNumbersFromStylesheetProperty(fileLines, "$theme-hue");
  const [themeSaturation] = getNumbersFromStylesheetProperty(
    fileLines,
    "$theme-saturation",
  );
  const [darkColorLightness, lightColorLightness] = getNumbersFromStylesheetProperty(
    fileLines,
    "--color-heading",
  );

  if (
    typeof themeHue !== "number"
    || typeof themeSaturation !== "number"
    || typeof darkColorLightness !== "number"
    || typeof lightColorLightness !== "number"
  ) {
    throw new TypeError("Could not parse theme colors");
  }

  const light = hsluvToHex([themeHue, themeSaturation, lightColorLightness])
    .replace(/^#/, "")
    .toUpperCase();
  const dark = hsluvToHex([themeHue, themeSaturation, darkColorLightness])
    .replace(/^#/, "")
    .toUpperCase();

  return { light, dark };
}

function getContrast(color1: string, color2: string): number {
  const color1Luminance = sRGBtoY(chroma(color1).rgb());
  const color2Luminance = sRGBtoY(chroma(color2).rgb());
  return Math.abs(Number(APCAcontrast(color1Luminance, color2Luminance)));
}

function getBestContrastForeground(
  background: string,
  lightForeground: string,
  darkForeground: string,
): string {
  const contrastWithLight = getContrast(background, lightForeground);
  const contrastWithDark = getContrast(background, darkForeground);

  const contrastAdjust = 4; // light foreground is preferred
  return contrastWithLight + contrastAdjust > contrastWithDark
    ? lightForeground
    : darkForeground;
}

function getColorsForTag(icon: Icon, light: string, dark: string): TagColor {
  const background = icon.hex;
  const foreground = getBestContrastForeground(background, light, dark);

  return {
    fg: foreground,
    bg: background,

    outlineOnLight: getContrast(background, light) === 0,
    outlineOnDark: getContrast(background, dark) === 0,
  };
}

function createSvgsForTags(tags: string[], tagColors: TagColors): void {
  if (!fs.existsSync(outputPaths.tagSvgs)) {
    fs.mkdirSync(outputPaths.tagSvgs);
  }
  for (const tag of tags) {
    const tagColor = tagColors[tag];
    const icon = icons[tag];
    if (!(tagColor && icon)) {
      throw new Error(`No icon or brand color found for tag ${tag}`);
    }
    const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${tagColor.fg}"><path d="${icon.path}"/></svg>`;
    fs.writeFile(`${outputPaths.tagSvgs}${tag}.svg`, svg, handleFileError);
  }
}

function getTagColors(tags: string[]): TagColors {
  const { light, dark } = getForegroundColors();
  return merge(
    {},
    ...tags.map((tag) => {
      const icon = icons[tag];
      if (!icon) {
        throw new Error(`No icon found for tag ${tag}`);
      }
      const tagColor = getColorsForTag(icon, light, dark);
      return { [tag]: tagColor };
    }),
  );
}

function getTags(posts: PostItemStub[]): string[] {
  return posts
    .filter((post: PostItemStub) => post.tags?.length)
    .flatMap((post: PostItemStub) => {
      const postTags: string[] = [...post.tags];

      for (const tag of post.tags) {
        const ancestors = tagAncestors[tag];
        if (ancestors?.length) {
          postTags.push(...ancestors);
        }
      }

      return [...new Set(postTags)];
    });
}

function main(): void {
  fs.readFile(inputPaths.posts, "utf8", (_error, file) => {
    const { data: posts } = JSON.parse(file);
    const tags = getTags(posts);
    const tagColors = getTagColors(tags);
    createSvgsForTags(tags, tagColors);

    fs.writeFile(
      outputPaths.tagColors,
      JSON.stringify(tagColors),
      handleFileError,
    );
  });
}

main();
