import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import nodeAdapter from "@sveltejs/adapter-node";

const testIdReplacements = [
  /data-testid\s?=\s?".*?"/g,
  /data-testid\s?=\s?'.*?'/g,
  /data-testid\s?=\s?{.*?}/g,
];

const stripTestIds = {
  markup({ content }) {
    if (process.env.VITE_ENV !== "production") {
      return { code: content };
    }
    let code = content;
    for (const regex of testIdReplacements) {
      code = code.replace(regex, "");
    }
    return { code };
  },
};

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: nodeAdapter(),
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
  preprocess: [stripTestIds, vitePreprocess()],
};
