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

(async (): Promise<void> => {
  await convertImages("assets");
  await convertImages("assets/timeline");
})();
