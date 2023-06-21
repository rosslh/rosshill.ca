import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

async function convertImages(dir: string): Promise<void> {
  await imagemin(
    [`${dir}/*.{png,jpg,jpeg}`],
    {
      destination: dir,
      plugins: [imageminWebp({ quality: 75 })],
    },
  );
}

(async () => {
  await Promise.all([
    convertImages("assets"),
    convertImages("assets/timeline"),
    convertImages("assets/occasions"),
  ]);
})();
