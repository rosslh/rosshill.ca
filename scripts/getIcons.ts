import { hsluvToHex } from "hsluv-ts";
import chroma from "chroma-js";
import fs from "fs";
import Icons, { SimpleIcon } from "simple-icons";
import type { PostItem, BrandColors } from "$lib/types";

function handleFileError(err: Error) {
  if (err) {
    console.error(err);
  }
}

function deleteFilesInDirectory(directory: string) {
  fs.readdir(directory, (_err, files) => {
    files.forEach((file) => {
      fs.unlink(`${directory}${file}`, handleFileError);
    });
  });
}

function getNumbersBySassPropertyName(fileLines: string[], propertyName: string) {
  const escapedPropertyName = propertyName.replace("$", "\\$");
  const pattern = new RegExp(`^\\s*${escapedPropertyName}:.*;$`);
  const matches = fileLines
    .filter((line) => pattern.test(line));

  return matches.map((m) => parseFloat(m.replace(/[^\d.]*/g, "")));
}

function getForegroundColors() {
  const cssFile = "src/assets/styles/global.scss";
  const fileLines = fs.readFileSync(cssFile, "utf8").split(/\r?\n/);
  const [themeHue] = getNumbersBySassPropertyName(fileLines, "$theme-hue");
  const [themeSaturation] = getNumbersBySassPropertyName(fileLines, "$theme-saturation");
  const [darkColorLightness, lightColorLightness] = getNumbersBySassPropertyName(fileLines, "--heading");

  const light = hsluvToHex([themeHue, themeSaturation, lightColorLightness]).replace(/^#/, "").toUpperCase();
  const dark = hsluvToHex([themeHue, themeSaturation, darkColorLightness]).replace(/^#/, "").toUpperCase();

  return { light, dark };
}

function getBestContrast(color: string, light: string, dark: string) {
  const contrastWithLight = chroma.contrast(color, light);
  const contrastWithDark = chroma.contrast(color, dark);

  const contrastAdjust = 4.8; // light on dark is preferred
  return contrastWithLight + contrastAdjust > contrastWithDark ? light : dark;
}

function getColorsForTag(icon: SimpleIcon, light: string, dark: string) {
  const background = icon.hex;
  const foreground = getBestContrast(background, light, dark);
  return { foreground, background };
}

function createSvgForTag(tag: string, icon: SimpleIcon, brandColors: BrandColors, tagDirectory: string) {
  const { foreground } = brandColors[tag];
  const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${foreground}"><path d="${icon.path}"/></svg>`;
  fs.writeFile(`${tagDirectory}${tag}.svg`, svg, handleFileError);
}

function getIconDataForTag(tag: string, brandColors: BrandColors, light: string, dark: string, tagDirectory: string) {
  const output = { ...brandColors };
  if (!output[tag]) {
    const icon = Icons.Get(tag)
      ?? (tag.endsWith("dotjs") ? Icons.Get("javascript") : Icons.Get("visualstudiocode"));

    output[tag] = getColorsForTag(icon, light, dark);
    createSvgForTag(tag, icon, output, tagDirectory);
  }
  return output;
}

function getTagIconsAndColors(tagDirectory: string, light: string, dark: string) {
  let brandColors = {};
  fs.readFile("src/data/posts.json", "utf8", (_err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter((post: PostItem) => post.tags?.length)
      .forEach((post: PostItem) => {
        post.tags.forEach((tag) => {
          brandColors = getIconDataForTag(tag, brandColors, light, dark, tagDirectory);
        });
      });

    fs.writeFile("src/data/brandColors.json", JSON.stringify(brandColors), handleFileError);
  });
}

function main() {
  const tagDirectory = "src/assets/tags/";
  deleteFilesInDirectory(tagDirectory);
  const { light, dark } = getForegroundColors();
  getTagIconsAndColors(tagDirectory, light, dark);
}

main();
