import fs from "node:fs/promises";
import path from "node:path";

import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminWebp from "imagemin-webp";

type Plugin = (input: Uint8Array) => Promise<Uint8Array>;

const assetDirectory = "assets";
const imageExtensions = new Set([".jpeg", ".jpg", ".png", ".webp"]);

const pngOptimizer = imageminOptipng({
  optimizationLevel: 3,
});
const jpegOptimizer = imageminJpegtran({
  progressive: true,
});
const webpOptimizer = imageminWebp({
  lossless: true,
  method: 6,
});

async function findImages(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const images = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findImages(entryPath);
      }

      if (entry.isFile() && imageExtensions.has(path.extname(entry.name))) {
        return [entryPath];
      }

      return [];
    }),
  );

  return images.flat();
}

function getOptimizer(filePath: string): Plugin {
  switch (path.extname(filePath)) {
    case ".jpeg":
    case ".jpg": {
      return jpegOptimizer;
    }
    case ".png": {
      return pngOptimizer;
    }
    case ".webp": {
      return webpOptimizer;
    }
    default: {
      throw new Error(`Unsupported image extension for ${filePath}`);
    }
  }
}

async function optimizeImage(filePath: string): Promise<void> {
  const input = await fs.readFile(filePath);
  const output = await getOptimizer(filePath)(input);

  if (output.byteLength < input.byteLength) {
    await fs.writeFile(filePath, Buffer.from(output));
  }
}

async function optimizeImages(): Promise<void> {
  const images = await findImages(assetDirectory);
  await Promise.all(images.map((image) => optimizeImage(image)));
}

optimizeImages();
