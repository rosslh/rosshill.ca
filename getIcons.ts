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
    files.forEach(file => {
      fs.unlink(`${directory}${file}`, handleFileError);
    });
  });
}

function getNumbersBySassPropertyName(fileName: string, propertyName: string) {
  const escapedPropertyName = propertyName.replace("$", "\\$");
  const pattern = new RegExp(`^\\s*${escapedPropertyName}:.*;$`);
  const matches = fs.readFileSync(fileName, "utf8").split("\n")
    .filter(line => pattern.test(line));

  return matches.map(m => parseFloat(m.replace(/[^\d.]*/g, "")));
}

function getForegroundColors() {
  const cssFile = "src/assets/styles/global.scss";

  const [themeHue] = getNumbersBySassPropertyName(cssFile, "$theme-hue");
  const [themeSaturation] = getNumbersBySassPropertyName(cssFile, "$theme-saturation");
  const [darkColorLightness, lightColorLightness] = getNumbersBySassPropertyName(cssFile, "--heading");

  const light = hsluvToHex([themeHue, themeSaturation, lightColorLightness]).replace(/^#/, "").toUpperCase();
  const dark = hsluvToHex([themeHue, themeSaturation, darkColorLightness]).replace(/^#/, "").toUpperCase();

  return { light, dark };
}

function getBestContrast(color: string, light: string, dark: string) {
  const contrastWithLight = chroma.contrast(color, light);
  const contrastWithDark = chroma.contrast(color, dark);

  // prefer light-on-dark icons
  return contrastWithLight + 4.8 > contrastWithDark ? light : dark;
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
  if (!brandColors[tag]) {
    const icon = Icons.Get(tag)
      ?? (tag.endsWith("dotjs") ? Icons.Get("javascript") : Icons.Get("visualstudiocode"));

    brandColors[tag] = getColorsForTag(icon, light, dark);
    createSvgForTag(tag, icon, brandColors, tagDirectory);
  }
}

function getTagIconsAndColors(tagDirectory: string, light: string, dark: string) {
  const brandColors = {};
  fs.readFile("src/data/posts.json", "utf8", (_err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter((post: PostItem) => post.tags && post.tags.length)
      .forEach((post: PostItem) => {
        post.tags.forEach(tag => getIconDataForTag(tag, brandColors, light, dark, tagDirectory));
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
