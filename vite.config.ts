import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { resolve } from "path";
import type { UserConfig } from "vite";
import { splitVendorChunkPlugin } from 'vite'

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    splitVendorChunkPlugin()
  ],
  resolve: {
    alias: {
      $data: resolve("./src/data"),
    },
  },
};

export default config;