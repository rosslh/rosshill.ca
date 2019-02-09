module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  plugins: ["cypress", "html"],
  env: {
    "cypress/globals": true,
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "no-restricted-globals": 0,
    indent: ["error", 2],
    quotes: ["error", "double"],
    "import/no-extraneous-dependencies": 0,
    "global-require": 0
  }
};
