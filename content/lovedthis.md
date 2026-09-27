---
title: LovedThis!
eventType: project
date: 2026-08-11
thumbnail: lovedthis-thumb
thumbnailBorder: true
image: lovedthis
imageExt: png
imageBorder: false
excerpt: A cozy app for sharing your latest favourite things with friends. I built it for my mom's birthday, and we run it together.
tags: [typescript, react, expo, supabase]
---

LovedThis! is a place to keep lists of your favourite books, movies, TV shows, podcasts, restaurants, and board games, and to see what your friends are loving lately. My mom came up with the idea and I built it for her birthday. She steers the product, and I run it.

### What it is

There are no ratings and no reviews, only things you loved, so the bar for posting is joy rather than thoroughness. Each topic is a re-sortable list with your current favourite on top and room for a one-line note like "I read the last forty pages standing up." Tap something a friend loved to see their note and real details from the source, like a film's synopsis or a restaurant's hours today, and save it to Loved Notes, a private list of things to try.

Anyone can join with an email address. Everyone shares into one big room unless they opt out, and anyone can start a private Inner Circle for a book club or a family. The front page shows what your circle-mates love by name, and what the big room loves without names. A flame marks anything three or more people love, and once a month a gentle nudge asks "What have you loved lately?"

The personality is "a friend's kitchen": warm, soft, and personal, with hot pink as the brand colour. Nothing clinical and no engagement mechanics.

### How we work on it

Mom sends her ideas to the app's hello@ address. A Claude Code loop checks that the message really came from her, builds what she asked for, runs the full test suite and end-to-end tests on the iOS simulator, ships it, and writes back, usually the same day. Small asks are just done. Anything that changes where things live comes back to her as two or three options with rough mockups and honest tradeoffs, so the design stays coherent as it grows. I'm copied on every reply, and privacy, moderation, money, and App Store releases stay with me.

### How it's built

It's an Expo and React Native app for iPhone and iPad, with a web version for everyone else, backed by a self-hosted Supabase instance running on my own MapleDeploy server. Postgres row-level security enforces the whole privacy model, circles and blocks included, at the database layer. Moderation is a word filter on every write, reports that always reach a person, and blocking. Edge functions handle search with cover art and the monthly nudge. Most changes ship over the air in minutes with no App Review in between, so the test pass is the only gate before they reach real phones.

Happy birthday, Mom.
