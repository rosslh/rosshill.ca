import fs from "node:fs";

import { converter, parse, type Rgb } from "culori";
import sharp from "sharp";

import {
  getCustomProperties,
  resolveCustomPropertyValue,
  type ThemeName,
} from "./designTokens";

const channels = 4;

const stylesheetPath = "src/lib/styles/design-system.scss";
const sidebarPath = "src/lib/components/sidebar/Sidebar.svelte";
const leavesMaskPath = "assets/leaves-mask.png";

type Wallpaper = {
  outputPath: string;
  width: number;
  height: number;
  tileSize: number;
  theme: ThemeName;
};

const wallpapers: Wallpaper[] = [
  {
    outputPath: "assets/linkedin-wallpaper-light.png",
    width: 1584,
    height: 396,
    tileSize: 300,
    theme: "light",
  },
  {
    outputPath: "assets/linkedin-wallpaper-dark.png",
    width: 1584,
    height: 396,
    tileSize: 300,
    theme: "dark",
  },
  {
    outputPath: "assets/og-background-dark.png",
    width: 1200,
    height: 630,
    tileSize: 400,
    theme: "dark",
  },
];

const toRgb = converter("rgb");

function getSidebarThemeValue(
  stylesheet: string,
  sidebarSource: string,
  theme: ThemeName,
  propertyName: string,
): string {
  const mixinMatch = sidebarSource.match(
    new RegExp(`@mixin\\s+sidebar-${theme}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`),
  );
  const mixinBody = mixinMatch?.[1];

  if (!mixinBody) {
    throw new Error(`Could not find sidebar-${theme} mixin in Sidebar.svelte`);
  }

  const propertyMatch = mixinBody.match(
    new RegExp(`${propertyName}:\\s*([^;]+);`),
  );
  const rawValue = propertyMatch?.[1]?.trim();

  if (!rawValue) {
    throw new Error(
      `Could not find ${propertyName} in sidebar-${theme} mixin`,
    );
  }

  const resolved = resolveCustomPropertyValue(
    rawValue,
    getCustomProperties(stylesheet),
  );

  if (!resolved) {
    throw new Error(`Could not resolve ${propertyName} to a concrete value`);
  }

  return resolved;
}

function colorChannelToByte(channel: number): number {
  return Math.max(0, Math.min(255, Math.round(channel * 255)));
}

function oklchStringToRgbBytes(oklch: string): {
  r: number;
  g: number;
  b: number;
} {
  const rgb: Rgb = toRgb(parse(oklch));

  return {
    r: colorChannelToByte(rgb.r),
    g: colorChannelToByte(rgb.g),
    b: colorChannelToByte(rgb.b),
  };
}

async function createLeavesTile(
  tileSize: number,
  leavesColor: { r: number; g: number; b: number },
): Promise<Buffer> {
  const maskAlpha = await sharp(leavesMaskPath)
    .resize(tileSize, tileSize, { kernel: "lanczos3" })
    .ensureAlpha()
    .extractChannel(3)
    .raw()
    .toBuffer();

  const rgba = Buffer.alloc(tileSize * tileSize * channels);

  for (let pixel = 0; pixel < tileSize * tileSize; pixel += 1) {
    const offset = pixel * channels;

    rgba[offset] = leavesColor.r;
    rgba[offset + 1] = leavesColor.g;
    rgba[offset + 2] = leavesColor.b;
    rgba[offset + 3] = maskAlpha[pixel]!;
  }

  return sharp(rgba, {
    raw: { width: tileSize, height: tileSize, channels },
  })
    .png()
    .toBuffer();
}

async function buildWallpaper(
  stylesheet: string,
  sidebarSource: string,
  wallpaper: Wallpaper,
): Promise<void> {
  const backgroundColor = oklchStringToRgbBytes(
    getSidebarThemeValue(
      stylesheet,
      sidebarSource,
      wallpaper.theme,
      "--sidebar-background",
    ),
  );
  const leavesColor = oklchStringToRgbBytes(
    getSidebarThemeValue(
      stylesheet,
      sidebarSource,
      wallpaper.theme,
      "--sidebar-leaves",
    ),
  );

  const leavesTile = await createLeavesTile(wallpaper.tileSize, leavesColor);

  const output = await sharp({
    create: {
      width: wallpaper.width,
      height: wallpaper.height,
      channels,
      background: { ...backgroundColor, alpha: 1 },
    },
  })
    .composite([{ input: leavesTile, tile: true, blend: "over" }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(wallpaper.outputPath, output);
}

async function buildWallpapers(): Promise<void> {
  const stylesheet = fs.readFileSync(stylesheetPath, "utf8");
  const sidebarSource = fs.readFileSync(sidebarPath, "utf8");

  await Promise.all(
    wallpapers.map((wallpaper) =>
      buildWallpaper(stylesheet, sidebarSource, wallpaper),
    ),
  );
}

buildWallpapers().catch((error: unknown) => {
  throw error;
});
