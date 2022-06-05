---
title: WTFormat
eventType: project
date: 2021-08-01
repository: https://github.com/rosslh/wtformat
website: https://wtformat.com/
image: wtformat
thumbnail: moment
excerpt: WTFormat is an online tool for generating date format codes. Originally created in 2018, I rewrote it in 2021 to support more formatting libraries.
tags: [nuxtdotjs, typescript]
---

<a target="_blank" rel="noopener noreferrer" href="https://momentjs.com">Moment.js</a> is a JavaScript library that can parse, manipulate, and format dates and times. To format a date, you give Moment a time code like <code>YYYY-MM-DD</code>. When I was working front-end at <a target="_blank" rel="noopener noreferrer" href="https://www.nudge.ai">Nudge.ai</a>, I found myself having to go to Moment's documentation to see how to format dates in various ways.

In order to make the process of date formatting faster, I created WTFormat.com, which gives you a date which you rewrite in your preferred format. The site then generates the Moment format code that would yield that output.

Rewritten in 2021 to support more formatting libraries, now using NuxtJS (Vue) and TypeScript.
