declare module "imagemin-jpegtran" {
  import type { Plugin } from "imagemin";

  export default function imageminJpegtran(options?: {
    arithmetic?: boolean;
    progressive?: boolean;
  }): Plugin;
}

declare module "imagemin-optipng" {
  import type { Plugin } from "imagemin";

  export default function imageminOptipng(options?: {
    bitDepthReduction?: boolean;
    colorTypeReduction?: boolean;
    errorRecovery?: boolean;
    interlaced?: boolean;
    optimizationLevel?: number;
    paletteReduction?: boolean;
  }): Plugin;
}

declare module "imagemin-webp" {
  import type { Plugin } from "imagemin";

  export default function imageminWebp(options?: {
    alphaQuality?: number;
    autoFilter?: boolean;
    filter?: number;
    lossless?: boolean | number;
    method?: number;
    nearLossless?: number;
    preset?: string;
    quality?: number;
    sharpness?: number;
    size?: number;
    sns?: number;
  }): Plugin;
}
