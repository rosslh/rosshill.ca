import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import sveltePreprocess from "svelte-preprocess";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = Boolean(process.env.SAPPER_LEGACY_BUILD);

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [
      require("autoprefixer"),
      require("cssnano")({
        preset: "default"
      })
    ]
  }
});

const onwarn = (warning, onwarn) => {
  if (warning.code === "CIRCULAR_DEPENDENCY" && /[/\\]@sapper[/\\]/.test(warning.message)) {
    return;
  }
  if (warning.code === "missing-declaration" && warning.message.startsWith("'gtag'")) {
    return;
  }
  onwarn(warning);
}

const dedupe = importee =>
  importee === "svelte" || importee.startsWith("svelte/");

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess
      }),
      resolve({
        browser: true,
        dedupe
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          babelHelpers: 'runtime',
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, last 2 versions",
                corejs: "3.9.0"
              }
            ]
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true
              }
            ],
            "@babel/plugin-transform-spread",
            "@babel/plugin-proposal-object-rest-spread",
          ]
        }),

      !dev && terser({ module: true })
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      svelte({
        generate: "ssr",
        dev,
        preprocess
      }),
      resolve({
        dedupe
      }),
      commonjs()
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    onwarn
  }
};
