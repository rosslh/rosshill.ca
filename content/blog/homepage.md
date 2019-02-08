---
title: Homepage
date: 2016-12-30
website: https://rosshill.ca
repository: https://github.com/rosslh/rosshill.ca
image: homepage.png
tags:
  - Sapper
  - Static site
  - JavaScript
  - Cypress
---

My personal website, [rosshill.ca](https://rosshill.ca), provides information about me and serves as a showcase of my projects. Originally the website was built in plain-old HTML, JavaScript, and SASS. Eventually though, after having gained experience in React.js, I felt that my webpage could use the functionality a library like React provides. Eventually I settled on using an exciting new framework, [Sapper](http://sapper.svelte.technology). What got me interested in Sapper, was [a blog post](https://svelte.technology/blog/sapper-towards-the-ideal-web-app-framework) by the framework's creator Rich Harris.

Sapper offers a component based architecture for a web app with baked in PWA support, without having to send a 40kb runtime to the client. As a benchmark of framework sizes, a Medium.com clone was made with React/Redux and Sapper, and the Sapper app's bundle, which would be sent to the user, was about half of the size. It's not just about the bundle size though, the project also had half of the lines-of-code as the React project.

After hearing these benefits, I had to give Sapper a try! I began building my website with a new blog-like project showcase, and I really enjoyed the simplicity of Sapper's project structure. It all came together quite quickly, and soon I published the static website on Netlify.
