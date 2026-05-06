---
title: MetaProjection
priorTitles: [MetaProjection.ca]
eventType: project
date: 2019-08-20
website: https://2021.metaprojection.ca
repository: https://github.com/rosslh/MetaProjection
image: metaprojection
thumbnail: metaprojection-thumb
thumbnailBorder: true
excerpt: An aggregator of Canadian electoral projections
tags: [typescript, gatsby, graphql, nodedotjs]
---

I built <a href="https://2021.metaprojection.ca" target="_blank" rel="noopener">MetaProjection</a> to pull Canadian federal electoral projections into one place, so visitors can see how the race is shaping up nationally and by riding. An interactive map at the top of the page colours each district by its projected winner, and a "Find my riding" button uses the visitor's geolocation, with their permission, to jump straight to their own.

I started the project ahead of the 2019 federal election because I kept bouncing between projection sites and finding conflicting numbers. Aggregating a handful of reputable poll-trackers gave me a more balanced read on the race. I refreshed everything for the 2021 cycle and now scrape three sources: 338Canada, CBC's Poll Tracker, and Calculated Politics.

The site is built with Gatsby, a React-based static-site generator. At build time, a Node scraper pulls each source's latest projection and writes the results to JSON. Most sources I parse with plain fetch and JSDOM, but CBC loads its numbers dynamically, so I drive that one with Puppeteer. The React client reads the JSON through Gatsby's GraphQL layer, renders the map with React-Leaflet on top of OpenStreetMap tiles, and uses MobX to keep the map, riding picker, and federal summary in sync. Cypress covers the integration tests and Sentry catches runtime errors in production.

Pre-rendering everything keeps the site fast and cheap to host, which matters when traffic spikes for a few weeks around an election and then quiets down again.
