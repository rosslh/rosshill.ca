import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import path from "node:path";
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
      $data: path.resolve("./data"),
    },
  },
};

export default config;
