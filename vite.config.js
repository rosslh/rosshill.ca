import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "path";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
  resolve: {
    alias: {
      $data: resolve("./src/data"),
    },
  },
};
