---
title: "AsyncAPI Initiative Status Update (week 27, 2020)"
date: 2020-06-30T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/radar.webp
weight: 10
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## AsyncAPI is innovation and you should assess it

ThoughtWorks and InfoQ clearly point out this is the best moment to have a closer look at AsyncAPI specification. Specification brings standardization into event-driven architectures and makes space for building great tools to solve problems like testing, documentation, code generation, and many others. Read more:

- [ThoughtWorks Technology Radar - Tools](https://www.thoughtworks.com/radar/tools?blipid=202005046)
- [Software Architecture and Design InfoQ Trends Report—April 2020](https://www.infoq.com/articles/architecture-trends-2020/)

## Generator and Parser 1.0 releases

We are going in the right direction with the first major releases for [the Generator](https://github.com/asyncapi/generator/) and [the Parser](https://github.com/asyncapi/parser-js/). The last [release candidate](https://github.com/asyncapi/generator/releases/tag/v1.0.0-rc.4) we produced for the Generator is pretty much stable, and all tasks were completed. We also tried it in our [GitHub Action](https://github.com/asyncapi/github-action-for-generator/pull/8) and [AsyncAPI Studio](https://studio.asyncapi.com/), and it works like a charm.

> Then why are you not promoting the last release candidate to 1.0.0?

Good question, I’m glad you asked :) 

Generator depends a lot on the Parser. Parser did not reach a major release yet. As you may have guessed, I'm now focused on the Parser 1.0.0 release, and the issues we want to complete before the release are listed in [this milestone](https://github.com/asyncapi/parser-js/milestone/3). The good news is that most of the issues are either in progress, and some have pull requests already opened.

> What’s the plan then?

Release the Parser with 1.0.0 and then Generator 1.0.0 as we already know that Parser 1.0.0 introduces some breaking changes.

> It is taking way too long.

Fair point. We just need more hands on the board. If you are a JavaScript developer and you thought about joining AsyncAPI as a contributor, but you never knew the right moment, now is the time. I'm now entirely focused on the Parser and would be happy to onboard some more people. Just let me know, and I'll onboard you.

## New Website Right Behind The Corner

The time has come to do some refreshment of the AsyncAPI website. We also change the engine used to generate the website, from Hugo to Next.js. Have a look at [the preview](https://deploy-preview-108--asyncapi-website.netlify.app/) of the work and feel free to share your feedback to Fran in [this pull request](https://github.com/asyncapi/website/pull/108). Greatest things you can see there:

- Better exposure of community-related channels on the landing page
- More prominent promotion of AsyncAPI maintained tools, like [the Generator](https://deploy-preview-108--asyncapi-website.netlify.app/generator)
- A more unobstructed view of the [Blog](https://deploy-preview-108--asyncapi-website.netlify.app/blog) section
- Right-hand side page navigation with scroll spy on [documentation view](https://deploy-preview-108--asyncapi-website.netlify.app/docs/specifications/2.0.0).

There are many other significant changes. You'll see them immediately on the main landing page.

## The Highlight of Interesting Discussions

There are some interesting discussions/topics where it would be great to hear your opinion.

### Circular References

How would you expect those are handled by the Parser and also by the Generator? Should such references be ignored or resolved, and if resolved, then how? Should generated docs indicate circular reference or ignore this info as irrelevant? These are all the questions we face now, and it would be awesome to get your input [here](https://github.com/asyncapi/parser-js/issues/83).

### React Wrapper Redoc style

AsyncAPI Initiative provides two ways of generating docs from AsyncAPI specification:

- [HTML template](https://github.com/asyncapi/html-template) for the AsyncAPI generator. The classical server-side generation you perform in your CI pipelines or in an application with Node.js server.
- [React component](https://github.com/asyncapi/asyncapi-react/) that you can use for dynamic docs rendering client-side. This one is great, but only if you want to use React in your application.

We are thinking about how we could consolidate both into one project that is maintained just once. In the meantime, the community created [this wrapper](https://github.com/jfveronelli/instant-asyncapi-doc) for our React component inspired by ReDoc approach to OpenAPI. It would be great to know what you think about this and what are your expectations toward AsyncAPI Initiative. Join the [discussion](https://github.com/asyncapi/asyncapi/issues/391).

### React for Template Engine for the Generator

We are getting a bit tired of Nunjucks and how hard it is to debug and read the templates. Fran came up with an idea to use React as a template engine for our docs and code generator. He got inspired by the emerging popularity of solutions like Gatsby or Next.js (supporting pre-rendering of React components). Before you say out loud "you are crazy" join the discussion [here](https://github.com/asyncapi/generator/issues/377).

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 23rd of June, 4PM UTC. Meeting notes are available [here](https://github.com/asyncapi/asyncapi/issues/394).

{{%youtube id="LDanOihP9i4"%}}

The next meeting is scheduled for next Tuesday, 7th of July, 8AM UTC. 

The agenda for the meeting is built [here](https://github.com/asyncapi/asyncapi/issues/401). There is nothing on the agenda, so you can easily sneak your topic in. 

The meeting is hosted on [Zoom](https://zoom.us/j/165106914). Do not forget about future meetings, and always have up to date invitations in your calendar. Add your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Curated Content

Some articles you might want to read to learn something new:

- [Choosing Between Web APIs and Message Streaming](https://www.asyncapi.com/blog/choosing_between_web_apis_and_message_streaming/) by [James Higginbotham](https://twitter.com/launchany)
- [How event-driven architecture solves modern web app problems](https://stackoverflow.blog/2020/03/16/how-event-driven-architecture-solves-modern-web-app-problems/) by [Bogdan Sucaciu](https://twitter.com/BSucaciu)
- [WebSockets for fun and profit](https://stackoverflow.blog/2019/12/18/websockets-for-fun-and-profit/) by [Max Pekarsky](https://twitter.com/maxverse)
