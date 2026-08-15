---
title: LovedThis
eventType: project
date: 2026-08-14
thumbnail: lovedthis-thumb
thumbnailBorder: true
image: lovedthis
imageExt: png
imageBorder: false
excerpt: A cozy, invite-only app where friends share their latest favourite things. A birthday gift for my mom.
tags: [typescript, react, expo, supabase]
---

My mom had an idea for an app: a place where she and her friends could each keep lists of their favourite books, movies, TV shows, restaurants, and recipes, with everyone's newest favourite at the top. I offered to build it for her birthday. It launched at her party, where our immediate family and partners joined on our phones on the spot.

### What it is

LovedThis is deliberately tiny and invite-only. There are no ratings and no reviews, only things you loved, so the bar for posting is joy rather than thoroughness. Each topic is a re-sortable list with your current favourite on top and room for a one-line note like "I read the last forty pages standing up." You follow friends and browse what everyone's loving lately in The Circle. Restaurants carry a neighbourhood and cuisine, and once a month a gentle push notification nudges everyone to refresh their lists so they stay alive.

The design brief for the personality was "a friend's kitchen": warm, soft, and personal, with hot pink as the brand colour. Nothing clinical, no feeds, no engagement mechanics.

### Launch day

Every decision was weighed against a single moment: Mom opens the finished app at her party, and within minutes the whole family has scanned a QR code, entered an invite code, and started adding favourites of their own. That meant the app had to feel finished on first open, onboarding had to work on whatever iPhones and iPads showed up, and the room could never be empty when someone joined.

### How it's built

It's an Expo and React Native iOS app backed by a self-hosted Supabase instance running on my own MapleDeploy server. Postgres row-level security enforces the invite-only privacy model at the database layer, and edge functions handle search with cover art for books, movies, and shows, plus the monthly nudge. It ships through the App Store, with an invite code as the only gate.

Happy birthday, Mom.
