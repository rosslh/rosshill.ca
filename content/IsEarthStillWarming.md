---
title: IsEarthStillWarming.com
eventType: project
date: 2019-01-11
website: https://isearthstillwarming.com
repository: https://github.com/rosslh/IsEarthStillWarming.com
image: isearthstillwarming
thumbnail: fire
thumbnailBorder: true
excerpt: A website offering up-to-date global warming data and a high-level overview of its causes and effects.
tags: [astro, react, nodedotjs]
---

The goal of this webpage is to provide a high-level overview of what global warming is: how it's caused, how much the Earth has warmed, and its observed and predicted effects. Made with <a target="_blank" rel="noopener noreferrer" href="https://astro.build/">Astro</a>, a static-site generator compatible with React, IsEarthStillWarming.com fetches up-to-date climate data from NASA and NOAA servers and displays the data as charts to provide a visualization of how global warming is progressing.

The webpage has a summary of the current state of global warming, with references provided for each piece of information. The website fetches its data and generates the webpages at build time, and on runtime it simply serves the already generated webpages. I chose this approach because retrieving and parsing the climate data takes some time. The servers we fetch data from are fairly slow, and the data comes in as a CSV which needs to be parsed into JSON in order to be used in a JavaScript application.
