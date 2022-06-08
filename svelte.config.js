import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import Icons from "unplugin-icons/vite";
import preprocess from "svelte-preprocess";
import netlifyAdapter from "@sveltejs/adapter-netlify";
import { resolve } from "path";
 
/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: netlifyAdapter({
      edge: true, // use Netlify edge functions
      split: false, // do not use a separate function for each route
    }),
    files: {
      assets: "src/assets",
      hooks: "src/hooks",
      lib: "src/lib",
      routes: "src/routes",
      template: "src/app.html",
    },
    inlineStyleThreshold: 100_000,
    paths: {
      assets: "",
      base: "",
    },
    prerender: {
      enabled: false,
    },
    vite: {
      plugins: [
        Icons({
          compiler: "svelte",
        }),
      ],
      resolve: {
        alias: {
          $data: resolve("./src/data"),
        },
      },
    },
  },
  preprocess: preprocess({
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: "default",
        }),
      ],
    },
  }),
};
