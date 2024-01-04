import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import preprocess from "svelte-preprocess";
import netlifyAdapter from "@sveltejs/adapter-netlify";

const testIdReplacements = [
  /data-testid\s?=\s?".*?"/g,
  /data-testid\s?=\s?'.*?'/g,
  /data-testid\s?=\s?{.*?}/g,
].map((regex) => [regex, ""]);

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: netlifyAdapter({
      edge: true, // use Netlify edge functions
      split: false, // do not use a separate function for each route
    }),
    files: {
      assets: "assets",
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
    alias: {
      "$data": "data",
      "$data/*": "data/*",
      "$lib": "src/lib",
      "$lib/*": "src/lib/*",
    },
  },
  preprocess: preprocess({
    replace:
      process.env.VITE_ENV === "production" ? testIdReplacements : undefined,
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
