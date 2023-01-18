import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import preprocess from "svelte-preprocess";
import netlifyAdapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: netlifyAdapter({
      edge: true, // use Netlify edge functions
      split: false, // do not use a separate function for each route
    }),
    files: {
      assets: "src/assets",
      hooks: {
        server: "src/hooks",
      },
      lib: "src/lib",
      routes: "src/routes",
      appTemplate: "src/app.html",
    },
    inlineStyleThreshold: 100_000,
    paths: {
      assets: "",
      base: "",
    },
  },
  preprocess: preprocess({
    replace: process.env.APP_ENV === "test"
      ? undefined
      : [
        [/data-testid\s?=\s?".*?"/g, ""],
        [/data-testid\s?=\s?'.*?'/g, ""],
        [/data-testid\s?=\s?\{.*?\}/g, ""],
      ],
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
