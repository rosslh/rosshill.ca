import fs from 'fs';
import Icons from "simple-icons";
import colorContrast from 'color-contrast';

function getBestContrast(compareTo) {
  const white = "FFFFFF";
  const black = "000000";
  const whiteContrast = colorContrast(compareTo, white);
  const blackContrast = colorContrast(compareTo, black);

  // prefer white icons
  return whiteContrast + 3 > blackContrast ? white : black;
}

function main() {
  const brandColors = {};

  fs.readFile('src/lib/posts.json', 'utf8' , (err, file) => {
    // get icons
    const { data } = JSON.parse(file);
    data
      .filter(post => post.tags)
      .forEach(post => {
        post.tags.forEach(tag => {
          if (!(tag in brandColors)) {
            let icon = Icons.Get(tag);
            if (!icon) {
              icon = Icons.Get("javascript");
            }
          
            const bestContrast = getBestContrast(icon.hex);

            const svg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="fill: #${bestContrast};" fill="#${bestContrast}"><title>{icon.title}</title><path d="${icon.path}"/></svg>`;

            // write svg to file
            fs.writeFile(`static/tags/${tag}.svg`, svg, err => {
              if (err) {
                console.error(err);
                return;
              }
              //file written successfully
            });

            brandColors[tag] = icon.hex;
          }
        });
      });

    // output file
    fs.writeFile('src/lib/brandColors.json', JSON.stringify(brandColors), err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  });
}

main();