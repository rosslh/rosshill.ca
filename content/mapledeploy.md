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

MapleDeploy is a Canadian Platform-as-a-Service built for developers who want their infrastructure to stay on Canadian soil. It's the Canadian alternative to Heroku, Railway, and Render. Customers sign up, select a plan, and within minutes have their own deployment platform running in a Toronto data center — no infrastructure management required.

The motivation behind MapleDeploy is data sovereignty. Many Canadian companies need to keep their data within Canada for regulatory or compliance reasons, but most major hosting platforms run exclusively on US infrastructure. MapleDeploy fills that gap by offering a fully managed deployment experience where all servers, databases, and customer data are hosted in Canada and governed by Canadian law.

### Key features

- **Git push deployments** with automatic SSL certificates
- **One-click managed databases** including PostgreSQL, MySQL, Redis, and MongoDB
- **Flat pricing** with dedicated servers rather than metered, per-project billing
- **Automated provisioning** where servers are security-hardened, configured, and ready within minutes

### Architecture

The platform is split into three main services: a marketing site built with Next.js, a React dashboard where customers manage their servers and subscriptions, and a NestJS API server backed by PostgreSQL. The API handles authentication and an automated provisioning pipeline that spins up VMs, hardens them with Fail2Ban and SSH key authentication, installs the deployment platform, and configures DNS and SSL — all without manual intervention.

The deployment layer is built on Coolify, an open-source PaaS. Background jobs like server provisioning and health checks are processed through pg-boss, a PostgreSQL-based job queue, keeping the architecture simple by avoiding a separate message broker.
