const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');
const { data } = require("./src/lib/data.json");
const slugify = require("slugify");

const pages = ['*'];
const getRedirect = (url) => `/redirect/${encodeURIComponent(url)}`;
data.forEach(entry => {
  if (entry.contents) {
    pages.push(`/item/${slugify(entry.title).toLowerCase()}`);
  }
  if (entry.website) {
    pages.push(getRedirect(entry.website));
  }
  if (entry.repository) {
    pages.push(getRedirect(entry.repository));
  }
});

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
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

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
