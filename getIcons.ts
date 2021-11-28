import chroma from "chroma-js";
import fs from "fs";
import { hsluvToHex } from "hsluv-ts";
import Icons from "simple-icons";
import type { PostItem } from "$lib/types";

function getBestContrast(color: string, light: string, dark: string) {
  const contrastWithLight = chroma.contrast(color, light);
  const contrastWithDark = chroma.contrast(color, dark);

  // prefer light icons
  return contrastWithLight + 4.8 > contrastWithDark ? light : dark;
}

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

function getNumbersFromFileWithRegex(fileName: string, lineRegex: RegExp) {
  const matches = fs.readFileSync(fileName, "utf8").split("\n")
    .filter(line => lineRegex.test(line));
  
  return matches.map(m => parseFloat(m.replace(/[^\d.]*/g, "")));
}

function getForegroundColors() {
  const cssFile = "src/assets/styles/global.scss";

  const [themeHue] = getNumbersFromFileWithRegex(cssFile, /\s*\$theme-hue:.*;/);
  const [themeSaturation] = getNumbersFromFileWithRegex(cssFile, /\s*\$theme-saturation:.*;/);
  const [darkColorLightness, lightColorLightness] = getNumbersFromFileWithRegex(cssFile, /\s*--heading:.*;/);

  const light = hsluvToHex([themeHue, themeSaturation, lightColorLightness]).replace(/^#/, "").toUpperCase();
  const dark = hsluvToHex([themeHue, themeSaturation, darkColorLightness]).replace(/^#/, "").toUpperCase();

  return { light, dark };
}

function writeBrandColorsToFile(tagDirectory: string, light: string, dark: string) {
  const brandColors = {};
  fs.readFile("src/data/posts.json", "utf8", (_err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter((post: PostItem) => post.tags && post.tags.length)
      .forEach((post: PostItem) => {
        post.tags.forEach((tag: string) => {
          if (!brandColors[tag]) {
            const icon = Icons.Get(tag)
              ?? (tag.endsWith("dotjs") ? Icons.Get("javascript") : Icons.Get("visualstudiocode"));

            const foreground = getBestContrast(icon.hex, light, dark);
            const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${foreground}"><path d="${icon.path}"/></svg>`;
            fs.writeFile(`${tagDirectory}${tag}.svg`, svg, handleFileError);
            brandColors[tag] = { background: icon.hex, foreground };
          }
        });
      });

    fs.writeFile("src/data/brandColors.json", JSON.stringify(brandColors), handleFileError);
  });
}

const tagDirectory = "src/assets/tags/";
deleteFilesInDirectory(tagDirectory);
const { light, dark } = getForegroundColors();
writeBrandColorsToFile(tagDirectory, light, dark);
