const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		amp: false,
		// appDir: '_app',
		files: {
			assets: 'static',
			// hooks: 'src/hooks',
			// lib: 'src/lib',
			routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		// host: null,
		// hostHeader: null,
		paths: {
			assets: 'static',
			base: ''
		},
		prerender: {
			crawl: true,
			enabled: true,
			force: false,
			pages: ['*']
		},
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: staticAdapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
			rollupOptions: {
				external: [/node_modules/]
			}
		}
	}
};
