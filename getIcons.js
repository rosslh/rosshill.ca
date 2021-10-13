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
  const icons = {};

  fs.readFile('src/lib/posts.json', 'utf8' , (err, file) => {
    // get icons
    const { data } = JSON.parse(file);
    data
      .filter(post => post.tags)
      .forEach(post => {
        post.tags.forEach(tag => {
          if (!(tag in icons)) {
            let icon = Icons.Get(tag);
            if (!icon) {
              icon = Icons.Get("javascript");
            }
          
            const bestContrast = getBestContrast(icon.hex);

            icons[tag] = { foreground: bestContrast, hex: icon.hex, path: icon.path, title: icon.title };
          }
        });
      });

    // output file
    fs.writeFile('src/lib/icons.json', JSON.stringify(icons), err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  });
}

main();