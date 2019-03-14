---
title: Mandelbrot set explorer
date: 2016-11-29
repository: https://github.com/rosslh/Mandelbrot-set-explorer
image: mandelbrot
thumbnail: mandelbrot-thumb
blurb: An interactive application that lets you explore the Mandelbrot set fractal. Made with Python and TKinter.
tags:
  - Python
  - TKinter
  - Pillow
  - Multiprocessing
  - Graphics
---

The Mandelbrot Set is the set of complex numbers that stays bounded when iterated on the function, <code>f(z) = z<sup>2</sup> + c</code>. A famous example of a fractal in mathematics, the Mandelbrot Set has infinite complexity which makes exploring it quite interesting. In Python, using the UI and graphics libraries TKinter and Pillow, I created an interactive Mandelbrot Set visualizer that lets you zoom into parts of the fractal.

One challenge with the Mandelbrot set is that it is quite computationally intensive to visualize. For each pixel in the visualization, those coordinates need to be iterated on the before-mentioned formula. In order to speed up the visualization, this project uses mutliprocessing to split up the work load across all available CPU cores on the computer. Through this project I gained experience in software graphics and designing user interfaces.
