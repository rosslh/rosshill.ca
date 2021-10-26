import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import fs from "fs";
import Icons from 'unplugin-icons/vite';
import preprocess from 'svelte-preprocess';
import staticAdapter from '@sveltejs/adapter-static';

import { slugify } from "./src/lib/functions.js";

// This isn't strictly necessary but I don't trust the crawler
const getJson = fileName => JSON.parse(fs.readFileSync(fileName, 'utf8'));

const { data } = getJson("./src/lib/posts.json");
const entries = data
  .filter(({ contents, WIP }) => contents && !WIP)
  .map(({ title }) => `/item/${slugify(title)}`)
  .concat(['*']);

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    amp: false,
    // appDir: '_app',
    files: {
      assets: 'static',
      // hooks: 'src/hooks',
      lib: 'src/lib',
      routes: 'src/routes',
      // serviceWorker: 'src/service-worker',
      template: 'src/app.html'
    },
    // host: null,
    // hostHeader: null,
    paths: {
      assets: '',
      base: ''
    },
    prerender: {
      crawl: true,
      enabled: true,
      entries
    },

    adapter: staticAdapter(),

    target: '#svelte',
    vite: {
      plugins: [
        Icons({
          compiler: 'svelte',
        }),
      ],
    },
  },
  preprocess: preprocess({
    // TODO: Add babel support
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: 'default',
        }),
      ],
    }
  }),
};
