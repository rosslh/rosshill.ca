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

The escape-time math runs in Rust, compiled to WebAssembly via wasm-pack. Tile requests are dispatched to a pool of Web Workers (using threads.js), which keeps the main thread free for UI work and parallelizes rendering across CPU cores. One small optimization helps a lot in practice: because the Mandelbrot set is simply connected, if every point on a tile's border is in the set, the whole tile is. I check the perimeter first and skip the interior when that holds, which makes deep regions of solid black render almost instantly.

You can adjust the iteration count, switch between roughly thirty color palettes, reverse them, tweak hue, saturation, and lightness in your choice of color space (HSL, HSLuv, LCh, or Okhsl), and clamp the palette to a custom iteration range. Smooth coloring is optional. The exponent is configurable too, so you can wander into multibrot sets with cubic, quartic, or higher powers.

Every view is encoded in URL parameters, so sharing a link drops someone onto the exact coordinates, zoom, and color settings you found. Image export renders the current viewport in 24 vertical strips (each a parallel worker job), stitches them on a canvas, and optionally runs the PNG through oxipng before saving. The whole thing is a Progressive Web App, so it installs and runs offline once the assets are cached.

Treating the complex plane as a tile grid is what made the rest fall into place. Once tiles were the unit of work, parallelization and optimization came along for the ride.
