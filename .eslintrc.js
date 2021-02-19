module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended"],
  globals: {
    gtag: false
  },
  overrides: [{
    files: ['*.svelte'],
    processor: 'svelte3/svelte3'
  }],
  parser: "babel-eslint",
  plugins: ['svelte3'],
  rules: {
    "brace-style": [1, "1tbs"],
    curly: [1, "multi-line"],
    eqeqeq: [2, "always", {
      "null": "ignore"
    }],
    "no-console": [1, {
      allow: ["warn", "error"]
    }],
    "no-param-reassign": 1,
    "no-unused-vars": [1, {
      argsIgnorePattern: "^_"
    }],
    "no-var": 2,
    "prefer-const": 1,
    semi: 1
  },
  settings: {
    "svelte3/ignore-warnings": warning => warning.code === "missing-declaration" && warning.message.startsWith("'gtag'")
  }
};
