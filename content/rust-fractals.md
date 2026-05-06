---
title: Mandelbrot.site
priorTitles:
  [Mandelbrot Set Explorer, Mandelbrot Set in Rust, Mandelbrot Set Explorer v2]
eventType: project
date: 2021-01-01
repository: https://github.com/rosslh/Mandelbrot.site
website: https://mandelbrot.site
thumbnail: mandelbrot-thumb
image: rust-mandelbrot
excerpt: Explore the Mandelbrot set fractal in your web browser
tags: [rust, webassembly, typescript, pwa]
---

I built <a href="https://mandelbrot.site" target="_blank" rel="noopener">Mandelbrot.site</a> as a browser-based viewer for the Mandelbrot set. The interface treats the complex plane like a slippy map: you pan and zoom with Leaflet.js, and tiles are computed on demand instead of pulled from a server.

The escape-time math runs in Rust, compiled to WebAssembly via wasm-pack. Tile requests are dispatched to a pool of Web Workers (using threads.js), which keeps the main thread free for UI work and parallelizes rendering across CPU cores. One optimization is worth calling out: because the Mandelbrot set is simply connected, if every point on a tile's border is in the set, the whole tile is. I check the perimeter first and skip the interior when that holds, which makes deep regions of solid black render almost instantly.

Colouring is where most of the perceived quality of a fractal viewer lives, so each control has a reason behind it. Hue, saturation, and lightness adjustments can run in HSL, HSLuv, LCh, or Okhsl, because perceptually uniform spaces produce noticeably smoother gradients along the boundary than HSL. Smooth colouring uses Inigo Quilez's logarithmic formula to eliminate banding at iteration thresholds. The palette can be reversed and clamped to a custom iteration range, which matters in shallow views where most pixels escape early and a default mapping crushes the visible variation. The exponent is configurable too, so the same renderer handles multibrot sets with cubic, quartic, and higher powers.

Every view is encoded in URL parameters, so sharing a link drops someone onto the exact coordinates, zoom, and colour settings. Image export renders the current viewport in 24 vertical strips (each a parallel worker job), stitches them on a canvas, and optionally runs the PNG through oxipng before saving. The whole thing is a Progressive Web App, so it installs and runs offline once the assets are cached.

The escape-time math is textbook. What's not is a fractal explorer that runs in the browser, stays responsive while you pan and zoom, and offers more rendering controls than the math strictly needs. Those three things don't normally show up together.
