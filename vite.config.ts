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
};

export default config;
