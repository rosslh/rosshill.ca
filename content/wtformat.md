---
title: WTFormat
priorTitles: [WTFormat.com]
eventType: project
date: 2018-07-05
repository: https://github.com/rosslh/WTFormat
website: https://wtformat.com
image: wtformat
thumbnail: moment
thumbnailBorder: true
excerpt: Generate date format codes for date-fns, Moment.js, Day.js, and Luxon
tags: [typescript, vuedotjs]
---

I built <a href="https://wtformat.com" target="_blank" rel="noopener">WTFormat</a> because I was tired of looking up date format tokens. Every JavaScript date library invents its own dialect, and I never remember whether `YYYY` or `yyyy` is the right one for whichever library I happen to be using that day. WTFormat hands me the answer instead.

The flow is one step. The page shows a reference date, I retype it in the format I want, and the app returns the matching format codes for date-fns, Moment.js, Day.js, and Luxon side by side. Under the hood it tokenizes the input and tries each library's format atoms against the known timestamp, so any tokens that produce my exact string come back as valid options. I copy the one I need and move on.

It's useful in a few situations I keep running into. When I'm bouncing between codebases that use different date libraries, I get the right codes for each in the same view. When I'm pairing with someone less familiar with a particular library, we can compare how each one expresses the same format. And when a designer or PM wants a specific date format, I can point them at the tool to nail down the exact spec without a "did you mean MM-DD or DD-MM" round trip.

Date formatting is the kind of micro-friction that doesn't deserve five minutes of anyone's day. WTFormat is a small Nuxt and TypeScript app aimed squarely at that friction.
