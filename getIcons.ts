import fs from 'fs';
import Icons from "simple-icons";
import chroma from 'chroma-js';
import type { PostItem } from 'src/global';

function getBestContrast(color: string) {
  // colors taken from global.scss
  const light = "FCFCFD";
  const dark = "1F2938";
  const contrastWithLight = chroma.contrast(color, light);
  const contrastWithDark = chroma.contrast(color, dark);

  // prefer white icons
  return contrastWithLight + 4.8 > contrastWithDark ? light : dark;
}

function handleWriteFileError(err: Error) {
  if (err) {
    console.error(err);
  }
}

function main() {
  const brandColors = {};

  fs.readFile('src/lib/posts.json', 'utf8' , (_err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter((post: PostItem) => post.tags && post.tags.length)
      .forEach((post: PostItem) => {
        post.tags.forEach((tag: string) => {
          if (!(tag in brandColors)) {
            const icon = Icons.Get(tag)
              ?? (tag.endsWith("dotjs") ? Icons.Get("javascript") : Icons.Get("visualstudiocode"));
            
            const foreground = getBestContrast(icon.hex);
            const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${foreground}"><path d="${icon.path}"/></svg>`;
            fs.writeFile(`static/tags/${tag}.svg`, svg, handleWriteFileError);
            brandColors[tag] = { background: icon.hex, foreground };
          }
        });
      });

    fs.writeFile('src/lib/brandColors.json', JSON.stringify(brandColors), handleWriteFileError);
  });
}

main();