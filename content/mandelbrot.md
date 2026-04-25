---
title: Python Mandelbrot Set Explorer
eventType: project
date: 2016-11-29
repository: https://github.com/rosslh/Mandelbrot-set-explorer
image: mandelbrot
thumbnail: mandelbrot-thumb
excerpt: An interactive application that lets you explore the Mandelbrot set fractal. Made with Python and TKinter.
tags: [python]
isHidden: true
---

The Mandelbrot Set is the set of complex numbers that stay bounded when you iterate them on `f(z) = z² + c`. It's one of the most famous fractals in mathematics, and its infinite complexity makes it endlessly fun to explore. I built an interactive Mandelbrot Set visualizer in Python that lets you zoom into any part of the fractal. I used TKinter for the UI and Pillow for the graphics.

The hard part is that visualizing the Mandelbrot set takes a lot of compute. I have to iterate the formula above for every pixel on screen. To speed things up, I split the work across all available CPU cores using Python's multiprocessing module. I picked up a lot about software graphics and UI design while building this.
