import fs from 'fs';
import Icons from "simple-icons";
import colorContrast from 'color-contrast';

function getBestContrast(compareTo) {
  // colors taken from global.scss
  const white = "FCFCFD";
  const black = "1F2938";
  const whiteContrast = colorContrast(compareTo, white);
  const blackContrast = colorContrast(compareTo, black);

  // prefer white icons
  return whiteContrast + 4.8 > blackContrast ? white : black;
}

function handleWriteFileError(err) {
  if (err) {
    console.error(err);
  }
}

function main() {
  const brandColors = {};

  fs.readFile('src/lib/posts.json', 'utf8' , (err, file) => {
    const { data } = JSON.parse(file);
    data
      .filter(post => post.tags && post.tags.length)
      .forEach(post => {
        post.tags.forEach(tag => {
          if (!(tag in brandColors)) {
            let icon = Icons.Get(tag)
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