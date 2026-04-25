---
title: uptime-checker
eventType: project
excerpt: CLI to check the status of UptimeRobot monitored websites
tags: [typescript, react, nodedotjs]
repository: https://github.com/rosslh/uptime-checker
date: 2024-10-11
thumbnail: uptime-checker-thumb
thumbnailExt: png
image: uptime-checker
imageExt: png
thumbnailBorder: true
isHidden: true
---

I built uptime-checker so I could monitor websites tracked by <a href="https://uptimerobot.com/" target="_blank" rel="noopener noreferrer">UptimeRobot</a> without leaving the terminal. I built it with React and the Ink renderer, which gives it a clean developer-friendly UI for checking uptime, performance, and outages.

You run a single command and it prints the current status of your monitored websites, including uptime ratio, average response time, and time since the last outage. The tool talks to UptimeRobot directly with a read-only access token and lays the data out in a concise, readable format that's great for quick status checks.

Key features

- Uptime status: see at a glance whether each site is up or down.
- Uptime statistics: pull metrics like uptime percentage over the past month and average response time.
- Outage insights: see when the last outage hit and how long it lasted.
- Built with React and Ink: Ink renders the CLI smoothly and gives it a modern feel right in the terminal.

If you want a clutter-free workflow, uptime-checker brings website monitoring into your terminal so you can check on your projects without context-switching. Whether you're debugging a performance issue or just glancing at your site's uptime, it puts the data you need in one place.
