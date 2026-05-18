import fs from "node:fs/promises";
import path from "node:path";

import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const sourceExtensions = new Set([".jpeg", ".jpg", ".png"]);

async function removeOrphanWebps(directory: string): Promise<void> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const sourceNames = new Set(
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          sourceExtensions.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => path.parse(entry.name).name.normalize("NFC")),
  );

  await Promise.all(
    entries
      .filter(
        (entry) =>
          entry.isFile() &&
          path.extname(entry.name).toLowerCase() === ".webp" &&
          !sourceNames.has(path.parse(entry.name).name.normalize("NFC")),
      )
      .map((entry) => fs.unlink(path.join(directory, entry.name))),
  );
}

async function convertImages(directory: string): Promise<void> {
  await removeOrphanWebps(directory);

  await imagemin([`${directory}/*.{png,jpg,jpeg}`], {
    destination: directory,
    plugins: [imageminWebp({ quality: 75 })],
  });
}

(async () => {
  await Promise.all([
    convertImages("assets"),
    convertImages("assets/experience"),
    convertImages("assets/occasions"),
  ]);
})();
