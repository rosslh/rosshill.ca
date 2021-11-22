import fs from 'fs';
import Icons from "simple-icons";
import chroma from 'chroma-js';
import type { PostItem } from '$lib/types';

function getBestContrast(color: string) {
  // colors taken from global.scss
  const light = "FCFCFD";
  const dark = "2C313A";
  const contrastWithLight = chroma.contrast(color, light);
  const contrastWithDark = chroma.contrast(color, dark);

  // prefer white icons
  return contrastWithLight + 4.8 > contrastWithDark ? light : dark;
}

function handleFileError(err: Error) {
  if (err) {
    console.error(err);
  }
}

const tagDirectory = "src/static/tags/";

function main() {
  deleteFilesInDirectory(tagDirectory);

  const brandColors = {};

  fs.readFile('src/data/posts.json', 'utf8' , (_err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter((post: PostItem) => post.tags && post.tags.length)
      .forEach((post: PostItem) => {
        post.tags.forEach((tag: string) => {
          if (!brandColors[tag]) {
            const icon = Icons.Get(tag)
              ?? (tag.endsWith("dotjs") ? Icons.Get("javascript") : Icons.Get("visualstudiocode"));
            
            const foreground = getBestContrast(icon.hex);
            const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${foreground}"><path d="${icon.path}"/></svg>`;
            fs.writeFile(`${tagDirectory}${tag}.svg`, svg, handleFileError);
            brandColors[tag] = { background: icon.hex, foreground };
          }
        });
      });

    fs.writeFile('src/data/brandColors.json', JSON.stringify(brandColors), handleFileError);
  });
}

function deleteFilesInDirectory(directory: string) {
  fs.readdir(directory, (_err, files) => {
    files.forEach(file => {
      fs.unlink(`${tagDirectory}${file}`, handleFileError);
    });
  });
}

main();