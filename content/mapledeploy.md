---
title: MapleDeploy
eventType: project
date: 2025-01-01
thumbnail: mapledeploy-thumb
image: mapledeploy
imageExt: png
excerpt: Powerful hosting on Canadian soil. Git push deploys, managed databases, flat pricing.
tags: [typescript, react, nestjs, postgresql]
website: https://mapledeploy.ca
---

I built MapleDeploy as a Canadian alternative to Heroku, Railway, and Render. Customers sign up, pick a plan, and within minutes they have their own deployment platform running in a Toronto data center. No infrastructure management on their end.

The motivation is data sovereignty. A lot of Canadian companies need to keep their data in Canada for regulatory or compliance reasons, but most of the major hosting platforms run exclusively on US infrastructure. I wanted to fill that gap. Every server, database, and byte of customer data stays in Canada and is governed by Canadian law.

### Key features

- **Git push deployments** with automatic SSL certificates
- **One-click managed databases** including PostgreSQL, MySQL, Redis, and MongoDB
- **Flat pricing** with dedicated servers, not metered per-project billing
- **Automated provisioning**. Servers are security-hardened, configured, and ready within minutes

### Architecture

I split the platform into three services: a Next.js marketing site, a React dashboard where customers manage their servers and subscriptions, and a NestJS API backed by PostgreSQL. The API handles authentication and the provisioning pipeline. That pipeline spins up a VM, hardens it with Fail2Ban and SSH key authentication, installs the deployment platform, and configures DNS and SSL. All of it runs without my intervention.

The deployment layer is built on Coolify, an open-source PaaS. I run background jobs like provisioning and health checks through pg-boss, a PostgreSQL-based job queue. That kept the architecture simple and let me skip running a separate message broker.
