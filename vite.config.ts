import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "node:path";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
  resolve: {
    alias: {
      $data: resolve("./data"),
    },
  },
};


export default config;
