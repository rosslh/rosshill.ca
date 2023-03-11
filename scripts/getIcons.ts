import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import fs from "fs";
import { hsluvToHex } from "hsluv-ts";
import { keyBy, merge } from "lodash-es";

import * as SimpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import type { PostItemStub, BrandColors, BrandColor } from "$lib/types";
import { tagAncestors } from "../src/lib/constants.js";

type Icon = Pick<SimpleIcon, "hex" | "path" | "slug">;

const customIcons: Icon[] = [
  {
    slug: "java",
    hex: "007396",
    path: "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
  },
];

const icons: Record<string, Icon> = keyBy(
  [...customIcons, ...Object.values(SimpleIcons)],
  "slug",
);

function handleFileError(err: Error | null): void {
  if (err) {
    throw err;
  }
}

function getForegroundColors(): { light: string, dark: string } {
  const getNumbersFromSassProperty = (fileLines: string[], propertyName: string): number[] => {
    const escapedPropertyName = propertyName.replace(/[$\\]/g, "\\$&");
    const pattern = new RegExp(`^\\s*${escapedPropertyName}:.*;$`);
    const matches = fileLines.filter((line) => pattern.test(line));
  
    return matches.map((m) => parseFloat(m.replace(/[^\d.]*/g, "")));
  };

  const cssFile = "src/lib/styles/global.scss";
  const fileLines = fs.readFileSync(cssFile, "utf8").split(/\r?\n/);
  const [themeHue] = getNumbersFromSassProperty(fileLines, "$theme-hue");
  const [themeSaturation] = getNumbersFromSassProperty(
    fileLines,
    "$theme-saturation",
  );
  const [darkColorLightness, lightColorLightness] = getNumbersFromSassProperty(
    fileLines,
    "--heading",
  );

  if (
    typeof themeHue !== "number"
    || typeof themeSaturation !== "number"
    || typeof darkColorLightness !== "number"
    || typeof lightColorLightness !== "number"
  ) {
    throw new Error("Could not parse theme colors from global.scss");
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

function getColorsForTag(icon: Icon, light: string, dark: string): BrandColor {
  const background = icon.hex;
  const foreground = getBestContrastForeground(background, light, dark);

  return {
    fg: foreground,
    bg: background,

    outlineOnLight: getContrast(background, light) === 0,
    outlineOnDark: getContrast(background, dark) === 0,
  };
}

function createSvgsForTags(
  tags: string[],
  brandColors: BrandColors,
): void {
  const tagDirectory = "assets/tags/";
  if (!fs.existsSync(tagDirectory)) {
    fs.mkdirSync(tagDirectory);
  }
  tags.forEach((tag) => {
    const brandColor = brandColors[tag];
    const icon = icons[tag];
    if (!(brandColor && icon)) {
      throw new Error(`No icon or brand color found for tag ${tag}`);
    }
    const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${brandColor.fg}"><path d="${icon.path}"/></svg>`;
    fs.writeFile(`${tagDirectory}${tag}.svg`, svg, handleFileError);
  });
}

function getBrandColors(
  uniqueTags: string[],
): BrandColors {
  const { light, dark } = getForegroundColors();
  return merge(
    {},
    ...uniqueTags.map((tag) => {
      const icon = icons[tag];
      if (!icon) {
        throw new Error(`No icon found for tag ${tag}`);
      }
      const brandColor = getColorsForTag(icon, light, dark);
      return { [tag]: brandColor };
    }),
  );
}

function getTags(data: PostItemStub[]): string[] {
  return data
    .filter((post: PostItemStub) => post.tags?.length)
    .flatMap((post: PostItemStub) => {
      const postTags: string[] = [...post.tags];

      post.tags.forEach((tag) => {
        const ancestors = tagAncestors[tag];
        if (ancestors?.length) {
          postTags.push(...ancestors);
        }
      });

      return Array.from(new Set(postTags));
    });
}

function main(): void {
  fs.readFile("src/data/posts.json", "utf8", (_err, file) => {
    const { data } = JSON.parse(file);
    const tags: string[] = getTags(data);
    const brandColors = getBrandColors(tags);
    createSvgsForTags(tags, brandColors);

    fs.writeFile(
      "src/data/brandColors.json",
      JSON.stringify(brandColors),
      handleFileError,
    );
  });
}

main();
