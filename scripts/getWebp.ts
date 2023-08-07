import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

async function convertImages(directory: string): Promise<void> {
  await imagemin([`${directory}/*.{png,jpg,jpeg}`], {
    destination: directory,
    plugins: [imageminWebp({ quality: 75 })],
  });
}

(async () => {
  await Promise.all([
    convertImages("assets"),
    convertImages("assets/timeline"),
    convertImages("assets/occasions"),
  ]);
})();
