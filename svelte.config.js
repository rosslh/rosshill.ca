import netlifyAdapter from '@sveltejs/adapter-netlify';

import slugify from "slugify";
import fs from "fs";

const getJson = fileName => JSON.parse(fs.readFileSync(new URL(fileName, import.meta.url), 'utf8'));
const { data } = getJson("./src/lib/data.json");

const getRedirect = (url) => `/redirect/${encodeURIComponent(url)}`;
const pages = ['*', getRedirect('https://www.linkedin.com/in/rosslh'), getRedirect('https://github.com/rosslh')];
data.forEach(entry => {
  if (entry.contents) {
    pages.push(`/item/${slugify(entry.title, { replacement: '-', lower: true, remove: /[:]/ })}`);
  }
  if (entry.website) {
    pages.push(getRedirect(entry.website));
  }
  if (entry.repository) {
    pages.push(getRedirect(entry.repository));
  }
});

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

		adapter: netlifyAdapter(),

		target: '#svelte',
    vite: () => ({})
	}
};
