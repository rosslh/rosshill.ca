/* eslint-disable no-bitwise, unicorn/no-for-loop, unicorn/numeric-separators-style */
import fs from "node:fs";
import zlib from "node:zlib";

import imageminOptipng from "imagemin-optipng";

type OklchColor = {
  L: number;
  C: number;
  h: number;
};

type OklabColor = {
  L: number;
  a: number;
  b: number;
};

type LinearRgb = {
  r: number;
  g: number;
  b: number;
};

type ThemeConfig = {
  imagePath: string;
  themeName: "light" | "dark";
};

const width = 384;
const height = 384;
const channels = 4;
const seed = 0x726f7373;
const stylesheetPath = "src/lib/styles/design-system.scss";

// Overall visibility of the finished grain. Higher values make the light and
// dark speckles farther from the base background color.
const grainVisibility = 3;

// Sharp, close-up speckle. This is the main film-grain character.
const fineGrainStrength = 0.75;

// Slightly wider texture between the fine speckles and the broad cloudy areas.
const midTextureStrength = 1;

// Broad background variation. Lower values reduce large cloudy patches.
const cloudyPatchStrength = 1;

const grainLayerWeights: [number, number][] = [
  [192, 0.5 * fineGrainStrength],
  [128, 0.36 * fineGrainStrength],
  [64, 0.24 * midTextureStrength],
  [31, 0.12 * cloudyPatchStrength],
  [15, 0.06 * cloudyPatchStrength],
];

const themes: ThemeConfig[] = [
  { imagePath: "assets/background-grain-light.png", themeName: "light" },
  { imagePath: "assets/background-grain-dark.png", themeName: "dark" },
];
const pngOptimizer = imageminOptipng({
  optimizationLevel: 3,
});

function getValue(array: ArrayLike<number>, index: number): number {
  return array[index] ?? 0;
}

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
    lerp(getValue(grid, y0 * size + x0), getValue(grid, y0 * size + x1), tx),
    lerp(getValue(grid, y1 * size + x0), getValue(grid, y1 * size + x1), tx),
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
  let deltaMean = 0;

  for (let index = 0; index < field.length; index += 1) {
    const centered = getValue(field, index) - mean;
    const delta = Math.max(
      -3,
      Math.min(3, Math.round(centered * grainVisibility)),
    );

    deltas[index] = delta;
    deltaMean += delta;
  }

  deltaMean /= deltas.length;

  for (let index = 0; index < deltas.length; index += 1) {
    deltas[index] = Math.max(
      -3,
      Math.min(3, Math.round(getValue(deltas, index) - deltaMean)),
    );
  }

  return deltas;
}

function parseThemeBackgrounds(stylesheet: string): Record<string, OklchColor> {
  const targets: Record<string, OklchColor> = {};

  for (const { themeName } of themes) {
    const mixinMatch = stylesheet.match(
      new RegExp(`@mixin\\s+${themeName}-theme\\(\\)\\s*\\{([\\s\\S]*?)\\n\\}`),
    );
    const mixinBody = mixinMatch?.[1];
    const colorMatch = mixinBody?.match(
      /--color-background:\s*oklch\(([^)]+)\)\s*;/,
    );

    if (!colorMatch) {
      throw new Error(
        `Could not find literal --color-background in ${themeName}-theme`,
      );
    }

    const [rawL, rawC, rawH] = colorMatch[1]?.trim().split(/\s+/) ?? [];

    if (!rawL || !rawC || !rawH) {
      throw new Error(`Unexpected OKLCH syntax in ${themeName}-theme`);
    }

    targets[themeName] = {
      L: rawL.endsWith("%")
        ? Number.parseFloat(rawL) / 100
        : Number.parseFloat(rawL),
      C: Number.parseFloat(rawC),
      h: Number.parseFloat(rawH),
    };
  }

  return targets;
}

function crc32(buffer: Buffer): number {
  let crc = ~0;

  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= getValue(buffer, index);

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return ~crc >>> 0;
}

function createPngChunk(type: string, data = Buffer.alloc(0)): Buffer {
  const typeBuffer = Buffer.from(type, "ascii");
  const output = Buffer.alloc(12 + data.length);

  output.writeUInt32BE(data.length, 0);
  typeBuffer.copy(output, 4);
  data.copy(output, 8);
  output.writeUInt32BE(
    crc32(Buffer.concat([typeBuffer, data])),
    8 + data.length,
  );

  return output;
}

function createPng(rgba: Uint8Array): Buffer {
  const stride = width * channels;
  const raw = Buffer.alloc((stride + 1) * height);
  let offset = 0;

  for (let y = 0; y < height; y += 1) {
    raw[offset] = 0;
    offset += 1;

    for (let x = 0; x < stride; x += 1) {
      raw[offset + x] = getValue(rgba, y * stride + x);
    }

    offset += stride;
  }

  const ihdr = Buffer.alloc(13);

  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    createPngChunk("IHDR", ihdr),
    createPngChunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    createPngChunk("IEND"),
  ]);
}

function writeIfChanged(path: string, content: Buffer): void {
  if (fs.existsSync(path) && fs.readFileSync(path).equals(content)) {
    return;
  }

  fs.writeFileSync(path, content);
}

function srgbChannelToLinear(value: number): number {
  const channel = value / 255;
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearChannelToSrgb(value: number): number {
  const clipped = Math.max(0, Math.min(1, value));
  const channel =
    clipped <= 0.003_130_8
      ? 12.92 * clipped
      : 1.055 * clipped ** (1 / 2.4) - 0.055;

  return Math.max(0, Math.min(255, Math.round(channel * 255)));
}

function linearRgbToOklab({ r, g, b }: LinearRgb): OklabColor {
  const l = 0.412_221_470_8 * r + 0.536_332_536_3 * g + 0.051_445_992_9 * b;
  const m = 0.211_903_498_2 * r + 0.680_699_545_1 * g + 0.107_396_956_6 * b;
  const s = 0.088_302_461_9 * r + 0.281_718_837_6 * g + 0.629_978_700_5 * b;
  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  return {
    L:
      0.210_454_255_3 * lRoot + 0.793_617_785 * mRoot - 0.004_072_046_8 * sRoot,
    a:
      1.977_998_495_1 * lRoot - 2.428_592_205 * mRoot + 0.450_593_709_9 * sRoot,
    b:
      0.025_904_037_1 * lRoot + 0.782_771_766_2 * mRoot - 0.808_675_766 * sRoot,
  };
}

function oklabToLinearRgb({ L, a, b }: OklabColor): LinearRgb {
  const lRoot = L + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
  const mRoot = L - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
  const sRoot = L - 0.089_484_177_5 * a - 1.291_485_548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;

  return {
    r: 4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s,
    g: -1.268_438_004_6 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s,
    b: -0.004_196_086_3 * l - 0.703_418_614_7 * m + 1.707_614_701 * s,
  };
}

function rgbaToOklabLightnessMean(rgba: Uint8Array): number {
  let mean = 0;
  const pixelCount = width * height;

  for (let index = 0; index < rgba.length; index += channels) {
    mean += linearRgbToOklab({
      r: srgbChannelToLinear(getValue(rgba, index)),
      g: srgbChannelToLinear(getValue(rgba, index + 1)),
      b: srgbChannelToLinear(getValue(rgba, index + 2)),
    }).L;
  }

  return mean / pixelCount;
}

function normalizeToTargetBackground(
  rgba: Uint8Array,
  target: OklchColor,
): Uint8Array {
  const output = new Uint8Array(rgba);
  const meanLightness = rgbaToOklabLightnessMean(rgba);
  const hueRadians = (target.h * Math.PI) / 180;
  const targetA = target.C * Math.cos(hueRadians);
  const targetB = target.C * Math.sin(hueRadians);

  for (let index = 0; index < output.length; index += channels) {
    const lab = linearRgbToOklab({
      r: srgbChannelToLinear(getValue(output, index)),
      g: srgbChannelToLinear(getValue(output, index + 1)),
      b: srgbChannelToLinear(getValue(output, index + 2)),
    });
    const rgb = oklabToLinearRgb({
      L: lab.L - meanLightness + target.L,
      a: targetA,
      b: targetB,
    });

    output[index] = linearChannelToSrgb(rgb.r);
    output[index + 1] = linearChannelToSrgb(rgb.g);
    output[index + 2] = linearChannelToSrgb(rgb.b);
  }

  return output;
}

function createBaseImage(deltas: Int8Array): Uint8Array {
  const rgba = new Uint8Array(width * height * channels);

  for (let index = 0; index < deltas.length; index += 1) {
    const offset = index * channels;
    const value = 128 + getValue(deltas, index);

    rgba[offset] = value;
    rgba[offset + 1] = value;
    rgba[offset + 2] = value;
    rgba[offset + 3] = 255;
  }

  return rgba;
}

function rollAndBlend(rgba: Uint8Array): Uint8Array {
  const output = new Uint8Array(rgba);
  const taperSize = Math.max(16, Math.floor(Math.min(width, height) / 8));
  const wx = new Float64Array(width);
  const wy = new Float64Array(height);

  for (let x = 0; x < width; x += 1) {
    const distance = Math.min(x, width - 1 - x);
    const clamped = Math.max(0, Math.min(1, distance / taperSize));
    wx[x] = 0.5 * (1 - Math.cos(Math.PI * clamped));
  }

  for (let y = 0; y < height; y += 1) {
    const distance = Math.min(y, height - 1 - y);
    const clamped = Math.max(0, Math.min(1, distance / taperSize));
    wy[y] = 0.5 * (1 - Math.cos(Math.PI * clamped));
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * channels;
      const rolledX = (x + Math.floor(width / 2)) % width;
      const rolledY = (y + Math.floor(height / 2)) % height;
      const rolledIndex = (rolledY * width + rolledX) * channels;
      const mask = getValue(wx, x) * getValue(wy, y);

      for (let channel = 0; channel < 3; channel += 1) {
        output[index + channel] = Math.round(
          getValue(rgba, index + channel) * mask +
            getValue(rgba, rolledIndex + channel) * (1 - mask),
        );
      }
    }
  }

  return output;
}

async function buildGrainImages(): Promise<void> {
  const targets = parseThemeBackgrounds(
    fs.readFileSync(stylesheetPath, "utf8"),
  );
  const baseImage = createBaseImage(createGrainDeltas());

  await Promise.all(
    themes.map(async ({ imagePath, themeName }) => {
      const target = targets[themeName];

      if (!target) {
        throw new Error(`Missing grain target for ${themeName}-theme`);
      }

      const normalized = normalizeToTargetBackground(baseImage, target);
      const png = createPng(rollAndBlend(normalized));
      const optimized = Buffer.from(await pngOptimizer(png));
      writeIfChanged(
        imagePath,
        optimized.byteLength < png.byteLength ? optimized : png,
      );
    }),
  );
}

buildGrainImages().catch((error: unknown) => {
  throw error;
});
