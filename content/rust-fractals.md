---
title: Mandelbrot.site
eventType: project
date: 2021-01-01
repository: https://github.com/rosslh/Mandelbrot.site
website: https://mandelbrot.site
thumbnail: mandelbrot-thumb
image: rust-mandelbrot
excerpt: Explore the Mandelbrot set fractal in your web browser
tags: [rust, webassembly, typescript, pwa]
---

I built <a href="https://mandelbrot.site" target="_blank" rel="noopener">Mandelbrot.site</a> as a web-based viewer for exploring the Mandelbrot set, a famously complex mathematical fractal. The project uses Rust, WebAssembly, TypeScript, and Leaflet.js to make the experience fast, interactive, and visually striking right in the browser.

You can pan and zoom seamlessly across different regions of the set, adjust the iteration count, and switch between custom color schemes. You can also explore multibrot sets and generate shareable URLs so other people can land on the exact same view of the fractal you discovered.

Under the hood, I run the heavy math in Rust, ship it to the browser as WebAssembly for near-native speed, and wire everything up with TypeScript on the frontend. I added a few optimizations to keep things responsive, including rectangle checking to skip uniform regions and Web Workers to spread work across CPU cores.

I think Mandelbrot.site shows what modern web technologies can do for sophisticated, CPU-intensive applications. I hope it works as a teaching tool, an artistic platform, and a starting point for anyone curious about where math, computation, and visual beauty meet.
