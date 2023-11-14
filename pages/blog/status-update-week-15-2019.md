---
title: "Status update (week 15, 2019)"
date: 2019-04-11T13:56:52+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-week-15-2019.webp
authors:
  - name: Fran Méndez
    photo: /img/avatars/fmvilas.webp
    link: https://twitter.com/fmvilas
    byline: AsyncAPI founder
---

Kaixo lagunak! This week we continued working on the parser as it’s a top priority for us. We made significant progress and plan to release a simple but functional version soon.

## Building the parser

![](/img/diagrams/parser-architecture.webp)

1. [We’ve added support for AsyncAPI 1.x/OpenAPI schemas](https://github.com/asyncapi/parser/pull/31). This is the first step before we dive into Avro and Protobuf support.
2. [Updated the Node.js to automatically test itself on Linux, Mac, and Windows](https://github.com/asyncapi/parser-nodejs). We’re still struggling to debug some failures on Windows so we encourage people who work on this operating system to join and help us test.

## Talks
I’ll be speaking about AsyncAPI and event-driven architectures in a few conferences. Let’s connect!

* API Days Madrid (April 26): http://apidaysmad.apiaddicts.org/schedule/#session-2
* Gartner AADI (May 20–21): https://www.gartner.com/en/conferences/emea/applications-uk
* KubeCon Europe (Barcelona, May 22–23). Not speaking but let’s meet there!
* REST Fest Europe (Wrocław, May 31): http://2019.restfest.org/eu/schedule
* API Days Finland (Helsinki, June 4–5): https://www.apidays.fi/

## Donate
And last but not least, we’re running a sponsorship campaign. We’ve got different tiers so that everybody can show their love! ❤️

![](/img/posts/donation.webp)

[Donate here](https://opencollective.com/asyncapi). Help Open Source projects.

---

> “People who think they know everything are a great annoyance to those of us who do.”
> — Isaac Asimov

😄

See you next week, folks! 👋