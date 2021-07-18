import staticAdapter from '@sveltejs/adapter-static';
import { slugify } from "./src/lib/functions.js";
import fs from "fs";

// This isn't strictly necessary but I don't trust the crawler
const getJson = fileName => JSON.parse(fs.readFileSync(new URL(fileName, import.meta.url), 'utf8'));
const { data } = getJson("./src/lib/data.json");
const pages = data
  .filter(entry => entry.contents)
  .map(entry => `/item/${slugify(entry.title)}`)
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
			force: false,
			pages
		},

		adapter: staticAdapter(),

		target: '#svelte',
    vite: () => ({})
	}
};
