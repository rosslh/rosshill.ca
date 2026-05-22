import fs from "node:fs";

import { converter, parse, type Rgb } from "culori";

import {
  getCustomProperties,
  getThemeOklchProperty,
  type ThemeName,
} from "./designTokens";

const stylesheetPath = "src/lib/styles/design-system.scss";
const outputPath = "assets/colour-palette-swatches.svg";
const toRgb = converter("rgb");

type ColorToken = {
  name: string;
  scale: string;
  shade: number;
  value: string;
  hex: string;
};

type HighlightToken = {
  theme: ThemeName;
  value: string;
  hex: string;
};

const swatchWidth = 148;
const swatchHeight = 76;
const highlightSwatchWidth = 104;
const labelColumnWidth = 120;
const headingHeight = 48;
const rowGap = 12;
const highlightGap = 16;
const outerPadding = 24;
const fontFamily =
  "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

function colorChannelToHex(channel: number): string {
  return Math.max(0, Math.min(255, Math.round(channel * 255)))
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

function oklchToHex(value: string): string {
  const color = parse(value);

  if (!color) {
    throw new Error(`Could not parse color value ${value}`);
  }

  const rgb = toRgb(color) as Rgb;

  return `#${colorChannelToHex(rgb.r)}${colorChannelToHex(
    rgb.g,
  )}${colorChannelToHex(rgb.b)}`;
}

function getColorTokens(stylesheet: string): ColorToken[] {
  const customProperties = getCustomProperties(stylesheet);

  return Object.entries(customProperties)
    .flatMap(([name, value]) => {
      const match = name.match(/^--color-([a-z]+)-(\d+)$/);

      if (!match) {
        return [];
      }

      const [, scale, shade] = match;

      if (!scale || !shade || !/^oklch\([^)]+\)$/.test(value)) {
        return [];
      }

      return [
        {
          name,
          scale,
          shade: Number(shade),
          value,
          hex: oklchToHex(value),
        },
      ];
    })
    .sort((a, b) => a.scale.localeCompare(b.scale, "en") || a.shade - b.shade);
}

function getHighlightTokens(stylesheet: string): HighlightToken[] {
  return (["light", "dark"] as const).map((theme) => {
    const value = getThemeOklchProperty(stylesheet, theme, "--highlight-color");

    return {
      theme,
      value,
      hex: oklchToHex(value),
    };
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getReadableTextColor(token: ColorToken): string {
  return token.shade >= 500 ? "#FFFFFF" : "#111111";
}

function createSwatch(token: ColorToken, x: number, y: number): string {
  const textColor = getReadableTextColor(token);

  return `
    <g transform="translate(${x} ${y})">
      <rect width="${swatchWidth}" height="${swatchHeight}" fill="${token.hex}" />
      <text x="10" y="24" fill="${textColor}" font-size="15" font-weight="700">${token.shade}</text>
      <text x="10" y="48" fill="${textColor}" font-size="11">${escapeXml(token.hex)}</text>
      <text x="10" y="64" fill="${textColor}" font-size="9">${escapeXml(token.value)}</text>
    </g>`;
}

function getHighlightTextColor(token: HighlightToken): string {
  return token.theme === "dark" ? "#111111" : "#FFFFFF";
}

function createHighlightSwatches(
  tokens: HighlightToken[],
  x: number,
  y: number,
  showLabel: boolean,
): string {
  const height = swatchHeight / tokens.length;

  return `
    <g transform="translate(${x} ${y})">
      ${
        showLabel
          ? '<text x="0" y="-10" fill="#111111" font-size="11" font-weight="700">highlight</text>'
          : ""
      }
      ${tokens
        .map((token, index) => {
          const textColor = getHighlightTextColor(token);
          const rowY = index * height;

          return `
      <g transform="translate(0 ${rowY})">
        <rect width="${highlightSwatchWidth}" height="${height}" fill="${token.hex}" />
        <text x="10" y="16" fill="${textColor}" font-size="10" font-weight="700">${token.theme}</text>
        <text x="10" y="30" fill="${textColor}" font-size="9">${escapeXml(token.hex)}</text>
      </g>`;
        })
        .join("")}
    </g>`;
}

function createScaleRow(
  scale: string,
  tokens: ColorToken[],
  highlightTokens: HighlightToken[],
  maxScaleLength: number,
  showHighlight: boolean,
  y: number,
): string {
  const highlightX =
    outerPadding +
    labelColumnWidth +
    maxScaleLength * swatchWidth +
    highlightGap;

  return `
    <text x="${outerPadding}" y="${y + 43}" fill="#111111" font-size="20" font-weight="700">${escapeXml(scale)}</text>
    ${tokens
      .map((token, index) =>
        createSwatch(
          token,
          outerPadding + labelColumnWidth + index * swatchWidth,
          y,
        ),
      )
      .join("")}
    ${showHighlight ? createHighlightSwatches(highlightTokens, highlightX, y, true) : ""}`;
}

function groupTokensByScale(tokens: ColorToken[]): [string, ColorToken[]][] {
  const scales = new Map<string, ColorToken[]>();

  for (const token of tokens) {
    scales.set(token.scale, [...(scales.get(token.scale) ?? []), token]);
  }

  return [...scales.entries()];
}

function createSvg(
  tokens: ColorToken[],
  highlightTokens: HighlightToken[],
): string {
  const scaleEntries = groupTokensByScale(tokens);
  const maxScaleLength = Math.max(
    ...scaleEntries.map(([, scaleTokens]) => scaleTokens.length),
  );
  const width =
    outerPadding * 2 +
    labelColumnWidth +
    maxScaleLength * swatchWidth +
    highlightGap +
    highlightSwatchWidth;
  const height =
    outerPadding * 2 +
    headingHeight +
    scaleEntries.length * swatchHeight +
    (scaleEntries.length - 1) * rowGap;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">Design system colour palette swatches</title>
  <desc id="description">Generated from ${escapeXml(stylesheetPath)}</desc>
  <rect width="100%" height="100%" fill="#FFFFFF" />
  <g font-family="${escapeXml(fontFamily)}">
    <text x="${outerPadding}" y="${outerPadding + 30}" fill="#111111" font-size="24" font-weight="700">Design system colour palette</text>
    ${scaleEntries
      .map(([scale, scaleTokens], index) =>
        createScaleRow(
          scale,
          scaleTokens,
          highlightTokens,
          maxScaleLength,
          index === 0,
          outerPadding + headingHeight + index * (swatchHeight + rowGap),
        ),
      )
      .join("")}
  </g>
</svg>
`;
}

function writeIfChanged(path: string, content: string): void {
  if (fs.existsSync(path) && fs.readFileSync(path, "utf8") === content) {
    return;
  }

  fs.writeFileSync(path, content);
}

function main(): void {
  const stylesheet = fs.readFileSync(stylesheetPath, "utf8");
  const tokens = getColorTokens(stylesheet);
  const highlightTokens = getHighlightTokens(stylesheet);

  if (tokens.length === 0) {
    throw new Error(`No --color-*-shade tokens found in ${stylesheetPath}`);
  }

  writeIfChanged(outputPath, createSvg(tokens, highlightTokens));
}

main();
