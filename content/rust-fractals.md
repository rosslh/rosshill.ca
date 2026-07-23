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
excerpt: Explore the Mandelbrot set at unlimited depth in your browser, rendered with Rust and WebAssembly.
tags: [rust, webassembly, typescript, pwa]
---

I built <a href="https://mandelbrot.site" target="_blank" rel="noopener">Mandelbrot.site</a>, a website for exploring the Mandelbrot set, a famous fractal with endless detail at every scale. It works like an online map: you pan and zoom the same way you would in Google Maps, and each piece of the image is calculated on your own device as you go.

The heavy math is written in Rust and runs in the browser through WebAssembly, split across background threads so the page stays responsive. A few mathematical shortcuts help too, like detecting solid-black regions from their edges so they don't have to be computed point by point.

You can zoom essentially forever. Ordinary computer arithmetic runs out of precision at extreme depths, so the renderer switches to a technique called perturbation theory: it computes one point with very high precision, then describes every other pixel by its tiny difference from that point.

Colours are adjustable, with several colour modes and smooth gradients that avoid visible banding. Because the underlying math is cached separately from the image, changing colours updates the view instantly without recomputing anything. There are also small tools for the curious: hovering over a point shows its coordinates and other details, a side panel shows the related Julia set for wherever your cursor is, favourite views can be saved, and a caption compares your current zoom to familiar objects (a city, a coin, an atom) as if the fractal were the size of Earth.

Every view has its own URL, so a shared link reproduces exactly what you were seeing. You can export high-resolution images that can later be loaded back in as views, record zoom animations as video, and use the whole site offline.

Performance changes are benchmarked in an automated harness before they ship, with statistical checks to make sure the output stays correct. One optimization alone cut rendering time by 44% on a deep-zoom test.
