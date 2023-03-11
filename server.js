const express = require("express");

const app = express();
const { resolve } = require("path");

const port = process.env.PORT || 3000;

const { createServer } = require("http");
const { svelte } = require("@sveltejs/vite-plugin-svelte");

const build = async () => {
  const { sveltePlugin } = svelte();
  const vite = require("vite");

  const server = await vite.createServer({
    plugins: [sveltePlugin()],
  });

  app.use(server.middlewares);

  app.use("*", (req, res) => {
    const url = req.originalUrl;
    const templatePath = resolve("./src/app.html");
    const renderOptions = {
      // add any props to be passed to the component here
    };

    server.ssrLoadModule("/src/main.js").then((module) => module.render(renderOptions)).then((html) => {
      const template = require("fs").readFileSync(templatePath, "utf-8");
      const rendered = template.replace("%svelte.body%", html);
      res.status(200).set({ "Content-Type": "text/html" }).send(rendered);
    }).catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
  });

  createServer(app).listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

build();
