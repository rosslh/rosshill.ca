---
title: IsEarthStillWarming.com
eventType: project
date: 2019-01-11
website: https://isearthstillwarming.com
repository: https://github.com/rosslh/IsEarthStillWarming.com
image: isearthstillwarming
thumbnail: fire
thumbnailBorder: true
excerpt: Global warming information and data, updated daily
tags: [typescript, astro, react]
---

I built IsEarthStillWarming.com to give visitors a high-level overview of global warming: what causes it, how much the Earth has warmed, and what effects scientists have observed and predicted. The site pulls fresh climate data from NASA and NOAA every day and renders it as charts so anyone can see how warming is progressing. I built it with <a target="_blank" rel="noopener noreferrer" href="https://astro.build/">Astro</a>, a static-site generator that plays nicely with React.

I summarize the current state of global warming on the homepage and cite a reference for every claim. The site fetches data and generates the pages at build time, then serves the prebuilt pages at runtime. I chose this approach because retrieving and parsing the climate data is slow. The source servers take a while to respond, and the data arrives as CSV that I have to parse into JSON before a JavaScript application can use it.
