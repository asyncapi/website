---
title: 2nd half of 2021 at AsyncAPI
date: 2021-12-21T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/july-december-2021-at-asyncapi/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: It has been a while since the last update on the things at AsyncAPI Initiative. Lots of things have happened since June. You better have a read or listen to the podcast.
---

<iframe src="https://anchor.fm/asyncapi/embed/episodes/2nd-half-of-2021-at-AsyncAPI-Initiative-e1bvc3u" height="102px" width="600px" scrolling="no"></iframe>

Around August, I communicated that because vacation is a dead season (in Poland we call it cucumber time) I will not do my monthly updates or write a single vacation summary.

Well, the thing is that vacations were not as quiet as I expected. In September, a carousel started that was impossible to stop.

I started writing status updates bi-weekly in early 2020. These were about simple improvements in specific libraries, very detailed on libraries release level. Back then, I basically knew every single new thing happening in the initiative. This year I switched to monthly updates as there was simply too much happening, and I could not really do those bi-weekly. I also started picking the most important news as there were too many things happening.

I submit my official apologies to those awaiting my update-related articles. Honestly, looking at the size of the community and the growth that we are noticing, I don't know how I'll manage to publish these regularly in 2022. Maybe we should start writing those as a collective.

What I can promise for sure is that in January 2022, I will write a summary article about AsyncAPI growth in 2021.

## More regular live-streams

We started two live streams under the AsyncAPI brand:

- **Thinking Out Loud** is hosted by AsyncAPI Founder (Fran Mendez). He invites different community members to talk about AsyncAPI specification. All recordings are available [in the official YouTube playlist](https://www.youtube.com/playlist?list=PLbi1gRlP7pigPxRRylHGCvpdppYLmSKfJ). Fran plans to continue doing them in 2022 as well.
- **Contributor-first** is strictly targeted at new or existing contributors. Any AsyncAPI Technical Steering Committee member can volunteer as a host and talk about specific contribution-related topics. We aim to have it as frequently as possible, at least once a week. All recordings are available [in the official YouTube playlist](https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY). Based on the community feedback, the live stream will be renamed to **Let's talk about contributing** in 2022.

Hosting these live streams is all possible thanks to the great support from the [Restream.io](https://restream.io/) folks who gave us free access to the tool that enables us to live stream directly to all our social media channels.

All official meetings are always listed in our:

- [Community repository](https://github.com/asyncapi/community/labels/meeting)
- [official Google Calendar](https://calendar.google.com/calendar/u/0/embed?src=c_q9tseiglomdsj6njuhvbpts11c@group.calendar.google.com)

The best way to learn about a new event is to join [our official Google Group](https://groups.google.com/u/1/g/asyncapi-users) that we use as a mailing list for invites.

## Solving publish/subscribe confusion aka possible AsyncAPI 3.0 release in 2022

It was hard to find someone in the community that was not confused by the semantics related to the **publish** and **subscribe** operations when learning about the AsyncAPI specification. Many people were asking in Slack. People were also opening pull requests to fix our documentation, assuming we mixed things up by accident.

There are cases where education is not enough. You can have great docs and education materials. Still, some stuff just needs to be improved and cannot be fixed by documentation.

At the beginning of my tech career, I learned a sentence from an experienced developer: "documented bugs become features". Sometimes you do not have a chance to learn from the best :sweat_smile:

This is causing too much confusion and needs to be solved in 2022. It is probably not possible without a breaking change in the specification.

Please join us and help us improve not only the specification but also update the tooling:

- [Proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618)
- [The many meanings of an AsyncAPI file](https://github.com/asyncapi/spec/issues/628)

## Google Summer of Code Summary

We closed holidays 2021 with massive success of the [Google Summer of Code](https://www.asyncapi.com/blog/march-2021-at-asyncapi#google-summer-of-code) participants. All participants not only finished their projects, but they also became members of AsyncAPI Technical Steering Committee and also got a chance to present their work at the 2021 AsyncAPI Conference.

- [Aayush Sahu](https://www.linkedin.com/in/aayushmau5) created [Diff](https://github.com/asyncapi/diff)
  <YouTube id="yILtksZriqA" />
- [Khuda Dad Nomani](https://www.linkedin.com/in/khudadadnomani) created [Optimizer](https://github.com/asyncapi/optimizer)
  <YouTube id="wHBfRheAero" />
- [Arjun Garg](https://www.linkedin.com/in/arjungarg17) created [Cupid](https://github.com/asyncapi/cupid)
  <YouTube id="V5H4pmz6yq8" />
- [Elegbede Azeez Wahab aka Ace](https://www.twitter.com/_acebuild) created [Chatbot](https://github.com/asyncapi/chatbot)
  <YouTube id="pxOrJl2c_DQ" />
- [Nektarios Fifes](https://www.linkedin.com/in/nektarios-fifes-372740220) created [Simulator](https://github.com/asyncapi/simulator). He could not unfortunately join us at the AsyncAPI Conference to talk about his work, but I'm sure he will be open to answer any of your questions asked through GitHub Issues.

It was a pleasure to work with these folks and see them staying with us after GSoC ends. I, therefore [proposed we do it again in 2022 on a larger scale](https://github.com/asyncapi/community/discussions/193).

## Technical Steering Committee members setup

After joining the [Linux Foundation (LF)](https://www.asyncapi.com/blog/asyncapi-joins-linux-foundation) and applying the [open governance model](https://github.com/asyncapi/community/blob/master/CHARTER.md), it was time for us to start setting up a Technical Steering Committee (TSC).

So here we are, 9 months after joining LF, we already have 24 members. Check out the [complete list of all the TSC members](https://www.asyncapi.com/community/tsc). Pay attention to those that are marked as **Available for hire**. Don't let folks work for free. Pay them to work on open-source. Be good humans.

Do you want to be on that list? Watch the following :point_down: presentation.

<YouTube id="uG_aLF9Z1F0" />

There are many things still missing, such as a TSC list synchronization, voting process automation, and more. Other things still need a lot of work. If you want to contribute to the project and you are a fan of automation, this is the right topic to help with.

## Welcome Studio and Goodbye Playground

We released a new application that you can use to work on your AsyncAPI files.

Before, you could use the AsyncAPI Playground, but now we are redirecting traffic to a new, beautiful :point_right: [AsyncAPI Studio](https://studio.asyncapi.com/) :point_left:

The new Studio has a bright future, and you should expect lots of new features coming there. I definitely recommend checking out [Studio's GitHub repository](https://github.com/asyncapi/studio/).

The cool stuff is that it is also integrated with the [AsyncAPI CLI](https://www.asyncapi.com/tools/cli):

```bash
#install CLI
npm install -g @asyncapi/cli
#create new file using an example
asyncapi new --file-name=asyncapi.yml --example=default-example.yaml --no-tty
#start studio that picks up asyncapi.yml file from the context it runs in
asyncapi start studio
```

Repository with [Playground source code](https://github.com/asyncapi/playground) will most probably be archived and moved to [organization with old archived projects](https://github.com/asyncapi-archived-repos).

## Hackathon

This year, we hosted our first [AsyncAPI Hackathon](https://www.asyncapi.com/blog/hackathon-faq). Even though we did not have a dedicated marketing campaign, and even though AsyncAPI is not trivial and requires experience to build tools for it, we received 9 submissions.

[Souvik De](https://www.linkedin.com/in/souvik-de-a2b941169) won first prize with [AsyncAPI Bundler](https://github.com/asyncapi/community/discussions/128). Check out Souvik talking about the AsyncAPI Bundler at AsyncAPI Conference.

<YouTube id="j_KLiCRW3t0" />

We also had 2 folks that tied in 2nd place:

- [Ace](https://www.twitter.com/_acebuild) submitted [AsyncAPI Blocks](https://github.com/asyncapi/community/discussions/149)
- [Greg Meldrum](https://www.linkedin.com/in/greg-meldrum-8b15a03/) submitted [Event Discovery Agent](https://github.com/asyncapi/community/discussions/147)

Congrats to all of you folks!

Check out [this discussion to get more details on the Hackathon voting process](https://github.com/asyncapi/community/discussions/165).

P.S. During the Hackathon, we also had a lot of people engaging with us because of Hacktoberfest. We got [30 issues resolved and merged](https://docs.google.com/spreadsheets/d/17YYe-ZompcuUACfCGa8Pc3XunFfWRBrNllIBChJ0yWw/edit#gid=0).

## Conference

COVID-19 is still here. Thus, we decided to host the 2021 AsyncAPI Conference this year only in online mode. It was a three-day event with lots of great content, and most importantly, with the 1st day dedicated to contributors only.

The conference was live-streamed. Full-day recordings were released immediately, and individual talk recordings will follow. All will be listed under the [dedicated Conference playlist](https://www.youtube.com/playlist?list=PLbi1gRlP7pijq9F5eYsJomWc7Zf6EYVTZ).

Check out the current sum of people that watched it during the conference and after as recordings:

- Day 1:

  - YouTube: 1119
  - Twitch: 89 (during event only, later Twitch removes old videos)
  - LinkedIn: 148
  - Twitter: 692

  Total: **2048**

- Day 2:

  - YouTube: 737
  - Twitch: 56 (during event only, later Twitch removes old videos)
  - LinkedIn: 49
  - Twitter: 283

  Total: **1125**

- Day 3:

  - YouTube: 521
  - Twitch: 26 (during event only, later Twitch removes old videos)
  - LinkedIn: 29
  - Twitter: 312

  Total: **888**

These numbers are great if we compare them against a total of 600 registrations!

Personally, the best number that I discovered was when I started listing the names of all the people who helped during the hackathon and conference organization. I think 62 is now my favorite number :heart:

<Figure
  src="/img/posts/july-december-2021-at-asyncapi/conf_contrib.webp"
  caption="Picture showing names of all people that helped in event organization."
  className="text-center"
/>

What about 2022? People during the conference voted for a hybrid approach:

<Figure
  src="/img/posts/july-december-2021-at-asyncapi/asyncapi_conf.webp"
  caption="Picture showing that out of 25 voters, 18 (72%) voted for a hybrid conference that is both online and in-person."
  className="text-center"
/>

Join [related discussion and help organize it](https://github.com/asyncapi/community/discussions/193).

> Photo by <a href="https://unsplash.com/@goian?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ian Schneider</a> on <a href="https://unsplash.com/s/photos/end-of-the-year-ahead?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
