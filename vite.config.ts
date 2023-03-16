import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "path";
import type { UserConfig } from "vite";
import netlifyPlugin from "@sveltejs/adapter-netlify";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    netlifyPlugin({
      publish: "build",
    }),
  ],
  resolve: {
    alias: {
      $data: resolve("./src/data"),
    },
  },
  build: {
    optimizeDeps: {
      include: [
        "svelte",
        "svelte/transition",
        "svelte/internal",
        "svelte/store", // Add this for faster rebuilds
      ],
    },
    brotliSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          return undefined; // Add an explicit undefined return value here
        },
      },
    },
  },
};

export default config;
