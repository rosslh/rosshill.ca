---
title: MapleDeploy
eventType: project
date: 2026-01-13
thumbnail: mapledeploy-thumb
image: mapledeploy
imageExt: png
excerpt: Powerful hosting on Canadian soil. Git push deploys, managed databases, flat pricing.
tags: [typescript, nextdotjs, nestjs, postgresql]
website: https://mapledeploy.ca
---

I built <a href="https://mapledeploy.ca" target="_blank" rel="noopener">MapleDeploy</a> as a Canadian alternative to Heroku, Railway, and Render. A customer signs up, picks a plan, and within minutes has a dedicated deployment platform running in a Toronto data centre. They never touch the infrastructure.

The motivation is data sovereignty. Plenty of Canadian companies need to keep their data in Canada for regulatory or compliance reasons, but the developer-friendly hosting platforms all run on US infrastructure. I wanted to fill that gap. Every server, database, and byte of customer data stays in Canada under Canadian law.

### What customers get

Push to a Git branch and the app deploys with an automatic SSL certificate. Managed PostgreSQL, MySQL, Redis, and MongoDB are one click each. Pricing is flat per server rather than metered per project, so a customer can run several apps and databases on one VM without watching a usage meter. Provisioning is automated end to end: a fresh, hardened server with the deployment dashboard ready to go.

### How it fits together

The platform is three services: a Next.js marketing site, a React dashboard where customers manage their servers and subscriptions, and a NestJS API backed by PostgreSQL. The API owns authentication, billing, and the provisioning pipeline.

That pipeline is the interesting part. When a new server is requested, it provisions a VM through LunaNode, waits for SSH, then runs a hardening script that installs Fail2Ban, disables password authentication, enables unattended security upgrades, blocks outbound SMTP, and points DNS at CIRA's Canadian Shield resolvers. From there it installs Coolify (the open-source PaaS that powers the deployment experience), configures DNS and a Let's Encrypt certificate, runs health checks, takes an initial snapshot, and registers the server with monitoring. The whole flow is a state machine with timeouts, abort handling, and cleanup on failure.

I run those provisioning jobs, along with scheduled work like metric polling and health checks, through pg-boss, a PostgreSQL-backed job queue. Reusing the existing database meant one less moving part to operate.

Most "deploy your app in minutes" platforms quietly assume your data can sit anywhere. MapleDeploy is the version of that promise where the answer to "where is my server" is a specific city.
