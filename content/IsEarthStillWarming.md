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

I built <a href="https://isearthstillwarming.com" target="_blank" rel="noopener">IsEarthStillWarming.com</a> as a plain-language overview of global warming: what causes it, how much the Earth has warmed, and what effects scientists have observed and predicted. The site pulls fresh climate data from NASA and NOAA on a recurring schedule and renders it as charts so anyone can see how warming is progressing. It runs on <a target="_blank" rel="noopener noreferrer" href="https://astro.build/">Astro</a>, a static-site generator that pairs well with React.

The homepage summarizes the current state of warming and cites a reference for every claim. I generate the pages at build time rather than fetching on demand, for two reasons. The upstream servers can be slow, and the source data arrives as CSV or whitespace-delimited text that needs parsing before any chart can use it. Doing that work during the build, then redeploying every twelve hours via a scheduled GitHub Actions job, keeps the site fast for visitors.

The build script pulls from four sources: NASA GISS for global temperature, the NOAA Mauna Loa Observatory and the Scripps Institution of Oceanography for atmospheric CO2, the NOAA Laboratory for Satellite Altimetry for sea level rise, and the NSIDC dataset hosted by NOAA for arctic sea ice extent. Each response runs through csvtojson (or a small custom parser for the trickier formats), and I use the regression library to fit linear trends for recent sea level and sea ice change. The cleaned data feeds into Chart.js scatter plots via react-chartjs-2, embedded in the Astro page. If a fetch fails, the script falls back to a cached copy from the previous successful build so the deploy still goes out. Every figure on the site links back to its source so readers can verify the numbers themselves.
