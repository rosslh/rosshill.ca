/* eslint-disable no-bitwise, unicorn/no-for-loop, unicorn/numeric-separators-style */
import fs from "node:fs";

import { converter, parse, type Oklab, type Oklch, type Rgb } from "culori";
import imageminOptipng from "imagemin-optipng";
import sharp from "sharp";

import { getThemeOklchProperty } from "./designTokens";

const width = 384;
const height = 384;
const channels = 4;
const seed = 0x726f7373;
const outputPath = "assets/background-grain-dark.png";
const stylesheetPath = "src/lib/styles/design-system.scss";
const themeName = "dark";

const grainVisibility = 1.5;
const textureStrengths = [1.5, 0.25, 0.75, 0.75, 0.5, 0.5, 0.25, 0.25] as const;

const grainLayerWeights: [number, number][] = [
  [256, textureStrengths[0]],
  [128, textureStrengths[1]],
  [64, textureStrengths[2]],
  [32, textureStrengths[3]],
  [16, textureStrengths[4]],
  [8, textureStrengths[5]],
  [4, textureStrengths[6]],
  [2, textureStrengths[7]],
];

const pngOptimizer = imageminOptipng({
  optimizationLevel: 3,
});
const toOklab = converter("oklab");
const toRgb = converter("rgb");

function createRandom(seedValue: number): () => number {
  let state = seedValue;

  return () => {
    state += 0x6d2b79f5;
    let result = state;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function createGrid(size: number, random: () => number): Float64Array {
  const grid = new Float64Array(size * size);

  for (let index = 0; index < grid.length; index += 1) {
    grid[index] = random() * 2 - 1;
  }

  return grid;
}

function smooth(value: number): number {
  return value * value * value * (value * (value * 6 - 15) + 10);
}

function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

function sampleGrid(
  grid: Float64Array,
  size: number,
  x: number,
  y: number,
): number {
  const u = (x / width) * size;
  const v = (y / height) * size;
  const x0 = Math.floor(u) % size;
  const y0 = Math.floor(v) % size;
  const x1 = (x0 + 1) % size;
  const y1 = (y0 + 1) % size;
  const tx = smooth(u - Math.floor(u));
  const ty = smooth(v - Math.floor(v));

  return lerp(
    lerp(grid[y0 * size + x0]!, grid[y0 * size + x1]!, tx),
    lerp(grid[y1 * size + x0]!, grid[y1 * size + x1]!, tx),
    ty,
  );
}

function createGrainDeltas(): Int8Array {
  const random = createRandom(seed);
  const layers: [number, Float64Array, number][] = grainLayerWeights.map(
    ([size, weight]) => [size, createGrid(size, random), weight],
  );
  const field = new Float64Array(width * height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let value = 0;

      for (const [size, grid, weight] of layers) {
        value += sampleGrid(grid, size, x, y) * weight;
      }

      field[y * width + x] = value;
    }
  }

  let mean = 0;
  for (const value of field) mean += value;
  mean /= field.length;

  const deltas = new Int8Array(width * height);

  for (let index = 0; index < field.length; index += 1) {
    const centered = field[index]! - mean;
    deltas[index] = Math.round(centered * grainVisibility);
  }

  return deltas;
}

function isOklchColor(color: ReturnType<typeof parse>): color is Oklch {
  return color?.mode === "oklch";
}

function parseThemeBackground(stylesheet: string): Oklch {
  const color = parse(
    getThemeOklchProperty(stylesheet, themeName, "--color-background"),
  );

  if (!isOklchColor(color)) {
    throw new Error(
      `Could not resolve --color-background to oklch() in ${themeName}-theme`,
    );
  }

  return color;
}

function writeIfChanged(path: string, content: Buffer): void {
  if (fs.existsSync(path) && fs.readFileSync(path).equals(content)) {
    return;
  }

  fs.writeFileSync(path, content);
}

function colorChannelToByte(channel: number): number {
  return Math.max(0, Math.min(255, Math.round(channel * 255)));
}

function rgbaPixelToOklab(rgba: Uint8Array, index: number): Oklab {
  return toOklab({
    mode: "rgb",
    r: rgba[index]! / 255,
    g: rgba[index + 1]! / 255,
    b: rgba[index + 2]! / 255,
  });
}

function rgbaToOklabLightnessMean(rgba: Uint8Array): number {
  let mean = 0;
  const pixelCount = width * height;

  for (let index = 0; index < rgba.length; index += channels) {
    mean += rgbaPixelToOklab(rgba, index).l;
  }

  return mean / pixelCount;
}

function normalizeToTargetBackground(
  rgba: Uint8Array,
  target: Oklch,
): Uint8Array {
  const output = new Uint8Array(rgba);
  const meanLightness = rgbaToOklabLightnessMean(rgba);
  const targetLab = toOklab(target);

  for (let index = 0; index < output.length; index += channels) {
    const lab = rgbaPixelToOklab(output, index);
    const rgb: Rgb = toRgb({
      mode: "oklab",
      l: lab.l - meanLightness + target.l,
      a: targetLab.a,
      b: targetLab.b,
    });

    output[index] = colorChannelToByte(rgb.r);
    output[index + 1] = colorChannelToByte(rgb.g);
    output[index + 2] = colorChannelToByte(rgb.b);
  }

  return output;
}

function createBaseImage(deltas: Int8Array): Uint8Array {
  const rgba = new Uint8Array(width * height * channels);

  for (let index = 0; index < deltas.length; index += 1) {
    const offset = index * channels;
    const value = 128 + deltas[index]!;

    rgba[offset] = value;
    rgba[offset + 1] = value;
    rgba[offset + 2] = value;
    rgba[offset + 3] = 255;
  }

  return rgba;
}

async function createPng(rgba: Uint8Array): Promise<Buffer> {
  return sharp(Buffer.from(rgba), {
    raw: { width, height, channels },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function buildGrainImages(): Promise<void> {
  const target = parseThemeBackground(fs.readFileSync(stylesheetPath, "utf8"));
  const baseImage = createBaseImage(createGrainDeltas());
  const normalized = normalizeToTargetBackground(baseImage, target);
  const png = await createPng(normalized);
  const optimized = Buffer.from(await pngOptimizer(png));

  writeIfChanged(
    outputPath,
    optimized.byteLength < png.byteLength ? optimized : png,
  );
}

buildGrainImages().catch((error: unknown) => {
  throw error;
});
