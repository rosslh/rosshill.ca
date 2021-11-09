import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import Icons from 'unplugin-icons/vite';
import preprocess from 'svelte-preprocess';
import staticAdapter from '@sveltejs/adapter-static';

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
      entries: ['*']
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
