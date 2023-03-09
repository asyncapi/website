---
title: "Status update (week 17, 2019)"
date: 2019-04-25T13:56:52+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-week-17-2019.webp
authors:
  - name: Fran Méndez
    photo: /img/avatars/fmvilas.webp
    link: https://twitter.com/fmvilas
    byline: AsyncAPI founder
excerpt: Alas güenas tardis! This week we've made significant progress on the documentation and the parser. The goal is to make AsyncAPI 2.0.0 easy and quick to learn at the same time we provide you the necessary tools to start playing with it.
---

Alas güenas tardis! This week we've made significant progress on the documentation and the parser. The goal is to make AsyncAPI 2.0.0 easy and quick to learn at the same time we provide you the necessary tools to start playing with it. Check out the progress so far:

## The parser

1. [Compile for all platforms](https://github.com/asyncapi/parser/pull/32): One of the hardest things to solve, before we continue moving forward, was the compilation process. We had to make sure we can compile the Go parser to C shared objects for Linux, Mac, and Windows. To make thing easier, we moved the compilation process to Travis CI, so now we don't have to configure our computers for cross-compilation.
2. [JSON Schema dereferencing](https://github.com/asyncapi/parser/pull/33): When we decided to choose Go as our main language for the parser development we knew there were less libraries than in the Node.js universe. One of the missing pieces was a JSON Schema dereferencer, i.e., a library that takes a JSON Schema document and replaces all the appearances of `$ref` with the value they point to. [Rubén](https://twitter.com/xinoman12) came up with an initial solution and he's now working on polishing it, extracting the code to a separate library so the Go community can benefit from it, and adding support for circular references.

## The documentation

1. [New Getting Started guide](https://www.asyncapi.com/docs/getting-started/): This week we just launched our new getting started guide for AsyncAPI 2.0.0. The guide targets new users of AsyncAPI and event-driven architectures. Also, if you're coming from OpenAPI (Swagger), don't miss the comparative chart.
2. [New blog](https://www.asyncapi.com/blog/): Enough with Medium. There's no point on hosting the blog on a service that puts very low limits on how much you can read for free. We'll keep posting there as a distribution channel but the full articles will live in our self-hosted blog, powered by [Hugo](https://gohugo.io).

## Talks
Join us tomorrow for [API days Madrid](http://apidaysmad.apiaddicts.org/schedule/#session-2) if you're in the city. I'll be talking all things AsyncAPI, past, present, and future. And also having some beers and tapas 🍻. Let's connect!

## Donate
And last but not least, we’re running a sponsorship campaign. We’ve got different tiers so that everybody can show their love! ❤️

![](/img/posts/donation.webp)

[Donate here](https://opencollective.com/asyncapi). Help Open Source projects.

---

> “Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win.”
> — Sun Tzu

See you next week, folks! 👋