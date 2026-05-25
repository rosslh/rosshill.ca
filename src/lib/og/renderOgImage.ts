import { read } from "$app/server";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";

import backgroundAsset from "../../../assets/og-background-dark.png";
import interRegularAsset from "../../../assets/fonts/inter-v13-latin-regular.ttf";
import newsreaderMediumAsset from "../../../assets/fonts/newsreader-v26-latin-500.ttf";

const width = 1200;
const height = 630;

const headingColor = "#ddf1e1";
const roleColor = "#c2dcc8";

const titleFontSize = 100;
const roleFontSize = (titleFontSize * 12) / 22;
const stackGap = (titleFontSize * 15) / 22;

const title = "Ross Hill";
const subtitle = "Projects and Experience";

let pngPromise: Promise<Buffer> | null = null;

async function loadAssets(): Promise<{
  backgroundDataUrl: string;
  fonts: SatoriOptions["fonts"];
}> {
  const [backgroundBytes, interBytes, newsreaderBytes] = await Promise.all([
    read(backgroundAsset).arrayBuffer(),
    read(interRegularAsset).arrayBuffer(),
    read(newsreaderMediumAsset).arrayBuffer(),
  ]);

  return {
    backgroundDataUrl: `data:image/png;base64,${Buffer.from(
      backgroundBytes,
    ).toString("base64")}`,
    fonts: [
      {
        name: "Inter",
        data: interBytes,
        weight: 400,
        style: "normal",
      },
      {
        name: "Newsreader",
        data: newsreaderBytes,
        weight: 500,
        style: "normal",
      },
    ],
  };
}

async function renderToBuffer(): Promise<Buffer> {
  const { backgroundDataUrl, fonts } = await loadAssets();

  const tree = {
    type: "div",
    props: {
      style: {
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f261e",
        backgroundImage: `url(${backgroundDataUrl})`,
        backgroundSize: `${width}px ${height}px`,
        gap: stackGap,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Newsreader",
              fontWeight: 500,
              fontSize: titleFontSize,
              lineHeight: 1,
              letterSpacing: "0.023em",
              color: headingColor,
            },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: roleFontSize,
              lineHeight: 1.2,
              color: roleColor,
            },
            children: subtitle,
          },
        },
      ],
    },
  };

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width,
    height,
    fonts,
  });

  return Buffer.from(
    new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng(),
  );
}

export async function renderOgImage(): Promise<Buffer> {
  if (!pngPromise) {
    pngPromise = renderToBuffer();
  }

  return pngPromise;
}
