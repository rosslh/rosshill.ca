import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "node:path";
import type { UserConfig } from "vite";
import netlifyPlugin from "@sveltejs/adapter-netlify";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    netlifyPlugin(),
  ],
  resolve: {
    alias: {
      $data: resolve("./data"),
      $components: resolve("./src/routes/components"),
    },
  },
  optimizeDeps: {
    include: [
      "svelte",
      "svelte/transition",
      "svelte/internal",
      "svelte/store", // Add this for faster rebuilds
    ],
  },
};

export default config;
