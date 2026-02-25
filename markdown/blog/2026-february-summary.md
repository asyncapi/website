---
title: "Monthly Community Update: February 2026"
date: 2026-03-03T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/2026-blog-banner/feb-banner.webp
authors:
  - name: Thulisile Sibanda
    photo: /img/avatars/thulieblack.webp
    link: https://www.linkedin.com/in/v-thulisile-sibanda/
    byline: Community Builder and Open Source Fanatic!
excerpt: 'AsyncAPI community and project updates for February 2026'
---

It's been a busy few weeks as we lay some groundwork, plan for the rest of the year, and align with the goals we have as a community. 
We recently held our first conference for 2026, announced our latest spec release, and we have an update on our Google Summer of Code application. So let's dive into the updates that happened this month.

## AsyncAPI Conference 2026

While we are still finalizing the venues for the AsyncAPI Conference 2026 and communicating with our host sponsors, we have also been working on the AsyncAPI Meetups section, which will be part of the Conference Initiative but on a smaller scale. We have been busy over the past year adding the details that will be integrated into the website and also sharing the news by word of mouth.

Once the [meetups section pull request is merged](https://deploy-preview-721--peaceful-ramanujan-288045.netlify.app/meetups), we look forward to finally sharing more details with the rest of the community. In the meantime, please keep an eye out for announcements about where we might be going next this year and start planning to submit those proposals.

### DeveloperWeek 2026 Recap
We recently went to California, where we held our first-ever conference in the US and the first conference of the year as part of DeveloperWeek 2026. We had a full track spanning the 2-day conference, with an agenda full of expert speakers sharing case studies, use cases, and the community work behind AsyncAPI.

But the biggest highlight for us was the API Standards Booth, where all of our speakers had time to volunteer and answer popular questions about what AsyncAPI is and its use cases.

<Figure
  src="/img/posts/2026-blog-banner/booth-day1.webp"
  caption="Volunteers at the API Standards Booth Day 1"
  className="text-center"
/>

Aside from this, it was also an opportunity to network and share ideas on how to improve. Huge thank you to everyone who attended and [to our host sponsor, DeveloperWeek](https://www.developerweek.com), for having us there. And finally, a huge thank you to the speakers who also volunteered at the API Standards Booth.

<Profiles profiles={[
  {
    name: 'Annegret Junker',
    avatar: 'https://avatars.githubusercontent.com/u/17088443?v=4',
    link: 'https://www.linkedin.com/in/dr-annegret-junker-141a99a4'
  },
  {
    name: 'Ignacio Castillejos',
    avatar: 'https://avatars.githubusercontent.com/u/7246119?v=4',
    link: 'https://www.linkedin.com/in/icast7'
  },
  {
    name: 'Artur Ciocanu',
    avatar: 'https://avatars.githubusercontent.com/u/743192?v=4',
    link: 'https://www.linkedin.com/in/artur-ciocanu'
  },
  {
    name: 'Leonid Lukyanov',
    avatar: 'https://avatars.githubusercontent.com/u/7077439?v=4',
    link: 'https://www.linkedin.com/in/leonid-lukyanov'
  },
  {
    name: 'Hugo Guerrero',
    avatar: 'https://avatars.githubusercontent.com/u/1001939?v=4',
    link: 'https://www.linkedin.com/in/hugoguerrero'
  },
  {
    name: 'Ruchi Pakhle',
    avatar: 'https://avatars.githubusercontent.com/u/72685035?v=4',
    link: 'https://github.com/Ruchip16'
  },
  {
    name: 'John Fallows',
    avatar: 'https://avatars.githubusercontent.com/u/2099911?v=4',
    link: 'https://www.linkedin.com/in/johnfallows'
  },
  {
    name: 'Frank Kilcommins',
    avatar: 'https://avatars.githubusercontent.com/u/15875424?v=4',
    link: 'https://www.linkedin.com/in/frank-kilcommins'
  }
]} 
/>

## Spec x Tooling

The AsyncAPI spec maintainers now meet monthly to coordinate specification work and are seeking community input on key proposals:
- [Late/out-of-sequence events](https://github.com/asyncapi/spec/issues/1143): Adding event delivery latency specifications for streaming frameworks like Apache Flink and Spark.
- [Multiple security schemes](https://github.com/asyncapi/spec/issues/1129): Enabling AND logic so multiple security mechanisms can be required simultaneously.
- [Discriminator alignment](https://github.com/asyncapi/spec/issues/1073): Expanding beyond string-only discriminators to align with the OpenAPI Discriminator Object.

Additionally, we recently released the AsyncAPI Spec 3.1. Be sure to [read the release notes](https://www.asyncapi.com/blog/release-notes-3.1.0) on what’s new and what needs to be updated as well.

## GSoC 2026
Our application for Google Summer of Code 2026 was not accepted for this year. While we anticipated being part of the program this year, we will also explore other options and programs, and some maintainers are considering doing the Maintainership outside the paid programs. 

Be sure to attend the next Community WG meetings as we navigate the next steps.

## Coming in March
- AsyncAPI Community Updates Newsletter - The March Edition will arrive in your inbox on the 5th. [Please subscribe to the AsyncAPI Newsletter to stay up-to-date with the latest updates](https://www.asyncapi.com/newsletter).
- The list for conference venues will be finalized this month. Please start planning to submit proposals.