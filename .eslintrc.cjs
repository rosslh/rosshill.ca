module.exports = {
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:svelte/recommended",
    "plugin:unicorn/recommended",
    // "airbnb-typescript/base"
  ],
  ignorePatterns: ["*.cjs"],
  overrides: [{
    files: ["*.svelte"],
    parser: "svelte-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
  }],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // tsconfigRootDir: __dirname,
    ecmaVersion: 2019,
    requireConfigFile: false,
    sourceType: "module",
    // project: ["./tsconfig.json", "./tests/tsconfig.json"],
    extraFileExtensions: [".svelte"],
  },
  plugins: ["@typescript-eslint", "unicorn"],
  rules: {
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-shadow": 2,
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/quotes": 0,
    "brace-style": [
      1,
      "1tbs",
    ],
    camelcase: 1,
    "comma-dangle": [
      1,
      "always-multiline",
    ],
    curly: [
      1,
      "multi-line",
    ],
    "eol-last": 1,
    eqeqeq: [
      2,
      "always",
      {
        null: "ignore",
      },
    ],
    "import/extensions": 0,
    "import/first": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-mutable-exports": 0,
    "import/no-unresolved": 0,
    "import/order": 0,
    "import/prefer-default-export": 0,
    "linebreak-style": 0,
    "max-len": 0,
    "no-console": [
      1,
      {
        allow: [
          "warn",
          "error",
        ],
      },
    ],
    "no-constant-condition": 2,
    "no-implicit-coercion": 2,
    "no-multiple-empty-lines": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "no-shadow": 0,
    "no-trailing-spaces": [
      1,
      {
        skipBlankLines: true,
      },
    ],
    "no-unused-vars": 1,
    "no-var": 2,
    "prefer-const": 1,
    "quote-props": [
      1,
      "consistent",
    ],
    quotes: 0,
    semi: 1,
    "unicorn/explicit-length-check": 0,
    "unicorn/filename-case": 0,
    "unicorn/no-array-callback-reference": 0,
    "unicorn/no-await-expression-member": 0,
    "unicorn/no-document-cookie": 0,
    "unicorn/no-null": 0,
    "unicorn/prefer-add-event-listener": 0,
    "unicorn/prefer-dom-node-dataset": 0,
    "unicorn/prefer-string-replace-all": 0,
    "unicorn/prefer-top-level-await": 0,
  },
  settings: {
    "svelte3/typescript": true,
  },
};
