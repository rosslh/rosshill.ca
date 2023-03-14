import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "path";
import type { UserConfig } from "vite";
import netlifyPlugin from "@sveltejs/adapter-netlify";
import { VitePWA } from "vite-plugin-pwa";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    netlifyPlugin({
      publish: "build",
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Antoine Greuzard",
        short_name: "Antoine Greuzard",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        description: "Antoine Greuzard's personal website",
        lang: "fr",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        prefer_related_applications: false,
        related_applications: [],
        serviceWorker: {
          src: "/sw.js",
          scope: "/",
        },
        offline_access: true,
      },
    }),
  ],
  resolve: {
    alias: {
      $data: resolve("./src/data"),
    },
  },
};

export default config;
