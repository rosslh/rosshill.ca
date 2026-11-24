---
title: MapleDeploy
eventType: project
date: 2026-01-13
thumbnail: mapledeploy-thumb
image: mapledeploy
imageExt: png
excerpt: Canadian app hosting built for git push. Apps and databases on your own Toronto server, with the server maintained for you.
tags: [typescript, nextdotjs, nestjs, postgresql]
website: https://mapledeploy.ca/?utm_source=rosshill.ca&utm_medium=referral&utm_content=experience-website-link
---

I built <a href="https://mapledeploy.ca/?utm_source=rosshill.ca&utm_medium=referral&utm_content=experience-body-link" target="_blank" rel="noopener">MapleDeploy</a> because I wanted a Canadian deployment platform and it didn't exist. It's app hosting built for git push: a customer picks a plan and within minutes has their own server running in Toronto, with Coolify, the open-source deployment platform, set up and ready. They deploy apps, websites, and databases. I take care of the server.

### Why Canadian

The developer-friendly hosting platforms, Heroku, Railway, Render, and Vercel among them, are US companies, so the US CLOUD Act reaches data they hold wherever it's stored. That's an awkward answer for Canadian developers who want their work on Canadian infrastructure, and for businesses and agencies whose clients ask where their data lives. On MapleDeploy, apps, databases, and server configuration sit on a dedicated VM in Toronto, run by a Canadian company with no US parent or subsidiary.

### What customers get

Push to a Git branch and Coolify builds the app, deploys it, and adds an SSL certificate. PostgreSQL, MySQL, Redis, and MongoDB are one click each. Every customer gets their own VM rather than a slice of shared infrastructure, and pricing is a flat monthly price per server, so several apps and databases can share one server with no per-project fees. I handle operating system security updates, Coolify updates, uptime monitoring, and weekly full-server snapshots.

### How it fits together

The platform is three services: a Next.js marketing site, a React dashboard where customers manage their servers and subscriptions, and a NestJS API backed by PostgreSQL. The API owns authentication, billing, and the provisioning pipeline.

That pipeline is the interesting part. When a customer orders a server, it creates a VM through LunaNode, waits for it to come up, hardens it, installs Coolify, configures DNS and a Let's Encrypt certificate, runs health checks, and registers the server with monitoring. The whole flow is a state machine with timeouts, abort handling, and cleanup on failure.

I run those provisioning jobs, along with scheduled work like metric polling and health checks, through pg-boss, a PostgreSQL-backed job queue. Reusing the existing database meant one less moving part to operate.

Most "deploy your app in minutes" platforms leave the question of where your data lives to the fine print. With MapleDeploy, the answer is a specific city in Canada.
