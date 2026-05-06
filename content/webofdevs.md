---
title: Web of Devs
priorTitles: [WebOfDevs.com]
eventType: project
date: 2023-03-05
website: https://webofdevs.com
repository: https://github.com/rosslh/Web-of-Devs
thumbnail: webofdevs-thumb
thumbnailBorder: true
image: webofdevs
imageExt: png
excerpt: A directory of cool developer websites, homepages, and portfolios
tags: [typescript, svelte, nestjs, postgresql]
---

I built <a href="https://webofdevs.com/" target="_blank" rel="noopener">Web of Devs</a> as a curated directory of personal developer websites, portfolios, and homepages. Visitors browse for inspiration, favourite the ones that stand out, and submit their own.

Most "best portfolio" lists are someone's blog post from 2019 with broken links. I wanted something living. Developers sign in with GitHub, submit their site, and as long as it clears a quality bar it gets in: a personal site (not a company or product page), with real content, a description of the author, evident design effort, working mobile layout, HTTPS, a sub-two-second load, no obvious bugs, English copy, and headers that allow iframe embedding.

The criteria do most of the work. They keep the directory small, surface sites that respect their visitors, and make submitting feel like joining something rather than dumping a link. A good developer site is a small, deliberate piece of writing about yourself, and a directory is only useful if it treats it that way.

Each entry shows a live iframe preview next to the author's GitHub avatar and name, with sort and filter controls for programming language, follower count, and repository stars. A SvelteKit frontend talks to a NestJS API backed by PostgreSQL, with Knex managing migrations and queries and Redis backing a BullMQ queue. A scheduled scraper hits the GitHub REST API to refresh profile metadata, language breakdowns, and star counts, so rankings stay current without manual curation. Authentication runs on GitHub OAuth: the API issues short-lived JWT access tokens and rotating refresh tokens, and the SvelteKit server acts as a backend-for-frontend, exchanging them for HttpOnly cookies so the refresh token never reaches client-side JavaScript.
