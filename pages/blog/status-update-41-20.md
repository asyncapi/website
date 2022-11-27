---
title: 'AsyncAPI Initiative Status Update (week 41, 2020)'
date: 2020-10-07T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-41-20-new-website.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## New Website

I'm super excited to share with you that last week we released [a new AsyncAPI website](https://www.asyncapi.com/):

- On a home page, we now promote [Studio](https://studio.asyncapi.com) more and put much more emphasis on the different ways you can engage with AsyncAPI Community,
- Documentation view got additional navigation per document so, for example, it is now much better to navigate through different sections of [the specification document](/docs/specifications/2.0.0),
- The tools section is now dedicated to AsyncAPI's official tools to clarify the AsyncAPI initiative is not just the spec. Just have a look how much detailed is, for example, the [generator view](https://www.asyncapi.com/tools/generator),
- Don't worry, all the other tools are still there, under [the Tools section](/docs/tools)
- The cherry on the cake is a much more appealing [Blog view](https://www.asyncapi.com/blog)

[Fran Méndez](https://twitter.com/fmvilas) did all this fantastic job. Well done, Bro! Sources of the website are [here](https://github.com/asyncapi/website). Feel free to use it as a template for your website and let us know if you need help reusing it.

## Hacktoberfest

AsyncAPI Initiative joined Hacktoberfest. We decided to join the event at the end of August when nobody even thought this would happen. The first day of Hacktoberfest felt like a false start. Because of the enormous amount of spam pull requests, some open-source community people went too far in the #cancelculture trend. They opted on Twitter for the Hacktoberfest cancelation and DigitalOcean boycott. Luckily, not everyone is a hater, and Hacktoberfest stays. Anyway, this is a topic for another post.

Do we regret we engaged with event participants? Hell no! So far, we got only 2 spam PRs, but we also got many issues addressed (26 in 7 days) that we listed for the event.

We had two primary goals to join the event:

- Show the community that AsyncAPI Initiative is not just the spec but a lot of great tooling.
- Help out people to take their first baby steps in open-source contributions with a welcoming community. We not only prepared issues with different levels of difficulty but also created a set of videos that explain how to contribute and what the issues are about.

Anyway. We share the summary of how Hacktoberfest ended up for us in the next status update. So far, so good though.

Remember that throughout the entire October me and Fran, we'll be hosting office hours so anyone can join and ask for help or even do a pair programming session with us. Feel invited! More details in the blog post about the event. We will stream to our official media accounts:

- https://www.twitch.tv/asyncapi
- https://www.youtube.com/asyncapi
- https://twitter.com/AsyncAPISpec

Look into [this](https://calendar.google.com/calendar/u/0/embed?src=c_q9tseiglomdsj6njuhvbpts11c@group.calendar.google.com) calendar for the schedule.

## Apidays Live Hong Kong

The AsyncAPI founder, [Fran Méndez](https://twitter.com/fmvilas), was invited to present at Apidays Live Hong Kong. It is a free event that we recommend you to join. Fran's talk is scheduled for tomorrow at 8:10 AM CEST (2:10 PM Hong Kong timezone). He'll talk about `AsyncAPI and the Future of API specs`.

Our regular community member, Paul Taylor from Mulesoft, will talk about `Getting Started with AsyncAPI`. His talk is scheduled for tomorrow, 6:10 AM CEST (12:10 PM Hong Kong timezone).

To join the event, register [here](https://www.eventbrite.com/e/apidays-live-hong-kong-the-open-api-economy-finance-as-a-service-api-ecosystems-tickets-104511637120).

## React Component Improvements

The latest version of the component is 0.13.1. Since the last status update, we had three releases, where one was a feature to display descriptions of channels and operations correctly. We can see more interest in the component and more people asking about a client side's documentation rendering. External contributors pushed all recent changes to the component. Thanks a lot to [Dominik Henneke](https://github.com/dhenneke), [Oliver Sand](https://github.com/Fox32), and [Jakub Iwanowski](https://github.com/JakubIwanowski).

Don't think that server-side docs generation dies. So far generation of docs using [HTML Template](https://github.com/asyncapi/html-template) is most popular. We had a few bug fixes added to it, and the current release is 0.13.0. The latest release has a feature that few people asked for. Now you can add `-p outFilename=customName.html` parameter to modify the name of the output HTML file.

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 15th of September, 4PM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/443).

The next meeting is scheduled for next [Tuesday, 13th of October, 4PM UTC](https://everytimezone.com/s/89b676b6).

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/451). At the moment, there is nothing in the agenda so you can sneak in your topic easily.

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Some Good Read

- [3 Experts on How the API Industry Is Changing](https://nordicapis.com/3-experts-on-how-the-api-industry-is-changing/) article by [Thomas Bush](https://www.linkedin.com/in/thomasbush/)
- [Going AsyncAPI: The Good, The Bad, and The Awesome](https://www.youtube.com/watch?v=bSfgNDJf97M) video by [Ben Gamble](https://twitter.com/BenGamble7)
- [AsyncAPI @Hacktoberfest](https://www.asyncapi.com/blog/hacktoberfest-2020) article by [Lukasz Gornicki](https://twitter.com/derberq)

> Cover photo by <a href="https://unsplash.com/@pineapple?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Pineapple Supply Co.</a> on <a href="https://unsplash.com/s/photos/celebrate?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
