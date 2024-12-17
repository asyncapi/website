---
title: "Summary of things that happened at AsyncAPI Initiative from January to April, 2022"
date: 2022-04-29T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/2022Q1-summary/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Gardener
excerpt: 'New AsyncAPI brand. AsyncAPI 2.4 and work on the 3.0 spec release. Meetings organization change. 2022 conference organization. AND SO MUCH MORE!'
---

<iframe src="https://anchor.fm/asyncapi/embed/episodes/Summary-of-things-that-happened-at-AsyncAPI-Initiative-from-January-to-April--2022-e1hqbi1" height="102px" width="100%" frameborder="0" scrolling="no"></iframe>

Welcome to another update from the AsyncAPI Initiative. In this article, I want to highlight the most important items contributed to AsyncAPI during the first few months of 2022.

I usually ask the community if folks have anything important that I should put in my updates. Still, this is a pretty subjective article because it's based mainly on things I see in my personal bubble. :smiley:

## Brand Refresh

This one is pretty easy to spot, especially if you have been with AsyncAPI Initiative for some time. :smiley:

On March 10, we announced a change to the AsyncAPI brand. Change that was needed. A refresh of this faded green that I personally never liked. :joy:

<TwitterTweetEmbed
  tweetId='1501977719915098120'
  options={{
    cards: 'hidden',
    width: 200,
    maxWidth: 400
  }}
/>

It was a massive effort led by [Missy Turco](https://twitter.com/missyturco). Months of work, research, and discussions with the community.

It is not all. More work in the area is needed:
- Design System :muscle: - Get involved in the [related design system repository](https://github.com/asyncapi/design-system) if you are interested in helping out. 
- AsyncAPI Mascots refresh - We need to refresh our existing Eve and Chan mascots to match the new brand. Any help would be appreciated.

For more regular news and updates on topics around brand and design in AsyncAPI Initiative, I definitely recommend you follow [Missy Turco](https://twitter.com/missyturco) and read her [regular design updates](https://missyturco.notion.site/03556522990e4067ae877fd236c37268?v=d60154483de849cd8125f8333cfe1d36).

## AsyncAPI Conference

We want to organize our first hybrid conference, one you can watch online and participate in person. May is right behind the corner, so not much time is left. We need to start working actively on the event now.

We discuss all aspects of our upcoming conference in our [Community Discussion for 2022 Conference Organization](https://github.com/asyncapi/community/discussions/categories/asyncapi-conf-2022-organization) openly. Please join and actively support the effort. We need lots of volunteers to make this happen. 

We need to have a special task force that will focus on the subject. Please join the [discussion on hosting a conference-dedicated weekly meeting](https://github.com/asyncapi/community/discussions/322).

## Meetings scheduling automation and related changes

Because of the community's growth and the growing number of topic-specific meetings, we had to spend some time improving things and automating as much as possible. After some initial discussions, such as [this discussion about Google-services](https://github.com/asyncapi/community/discussions/236), some initial requirements were defined, called [Meeting as a Service](https://github.com/asyncapi/community/issues/245).

- A week ago, we stopped using our `asyncapi-users` Google Group. We removed it, and all the members were migrated as subscribers to the AsyncAPI Newsletter. This newsletter is the new place where we'll send email notifications every Monday morning with a list of upcoming meetings.
- We switched to the new Google Calendar instance managed by the official AsyncAPI Google account. You should remove/unsubscribe from the old calendar and [subscribe to the new calendar](https://calendar.google.com/calendar/u/0/embed?src=c_q9tseiglomdsj6njuhvbpts11c@group.calendar.google.com),
- [Our Technical Steering Committee (TSC)](https://github.com/asyncapi/community/discussions/295) approved to sponsor 8 Zoom licenses to host official AsyncAPI meetings. So far, only 3 licenses have been assigned. We have lots of room for more meetings and hosts, if there is a need.

Huge thanks to [Krishna Kumar](https://github.com/Krishks369) and [Shreyansh Jain](https://github.com/sudoshreyansh), who helped research the implementation. :heart:

If you want to learn more about becoming a meeting host, or something else related to meetings, get familiar with our [dedicated meetings FAQ](https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md).

Oh, and I almost forgot, look at this. :point_down: :star: 
All [info about AsyncAPI-related meetings](https://www.asyncapi.com/community/meetings) is in one beautiful place! :heart:

<Figure
  src="/img/posts/2022Q1-summary/meetings.webp"
  className="text-center"
  caption="View of dedicated community/meetings page on the AsyncAPI website."
/>

## Upcoming 2.4 and 3.0 releases of the spec

We released a [new 2.4.0 version of AsyncAPI Specification](https://github.com/asyncapi/spec/releases/tag/v2.4.0). There are many good features, like the possibility to provide a unique Message `id` for the entire AsyncAPI file or the ability to specify that security is valid only for a given operation. You definitely need to read the[release notes](https://www.asyncapi.com/blog/release-notes-2.4.0).

Huge shout out to [Sergio Moya](https://twitter.com/smoyac), who was a release coordinator for the 2.4.0 release and pushed all the doors to make sure the release could go out.

2.4.0 was released, but this doesn't block us from working on something much bigger, 3.0.0 version of the specification! :rocket:

If you haven't heard about 3.0.0 yet, I highly recommend you have a look at the [3.0.0 release article](https://www.asyncapi.com/blog/async-api-spec-3.0-release) written by [Harsh Mishra](https://www.linkedin.com/in/harshcasper/).

Please join these efforts, as there is much work ahead of us, but not many hands doing actual work. We meet every two weeks to sync the work efforts and discuss important topics. Feel free to join :pray:

I also recommend following [Sergio Moya](https://twitter.com/smoyac) and reaching for his [regular updates on specification-related efforts](https://gist.github.com/smoya)

## Contributors onboarding initiatives

One of the [goals for our 2022 community-building efforts](https://github.com/asyncapi/community/discussions/193) was to involve AsyncAPI Initiative as a mentoring organization in as many coding (but not only) events as possible. We have many maintainers here who like to help first-time contributors land their first pull requests in an open and relaxed environment.

### Google Summer of Code

We did not start well. We were not accepted for [Google Summer of Code](https://summerofcode.withgoogle.com). Don't ask me why. I really do not know. I wish I could have a clear answer from them about what failed on my end, where I made mistakes in our application. :cry: 

We never give up here at AsyncAPI, though. :smiley:

### OpenForce

March was a month where we joined [OpenForce](https://www.asyncapi.com/blog/openforce-2022) thanks to amazing support from [Hargun Kaur](https://www.linkedin.com/in/hkaur008/). As a result, we managed to onboard a few new folks and gained important contributions in exchange. There are  a few PRs still open, but here are some of the completed PRs:
- [Namya LG](https://github.com/Namyalg) introduced a great improvement to our CI by creating dedicated [CI workflows that search for broken links](https://github.com/asyncapi/.github/issues/92) in our documentation across all repositories.
- [Harsh Mishra](https://www.linkedin.com/in/harshcasper/) introduced a [CI workflow that validates docker images](https://github.com/asyncapi/server-api/issues/50) in projects where we publish them.
- [Abhijeet Jejurkar](https://github.com/abhijeetjejurkar) [improved the Kubernetes deployment for our `server-api` service](https://github.com/asyncapi/server-api/issues/57).
- [Samriddhi](https://github.com/Samridhi-98) contributed a [new `/bundle` endpoint to our `server-api` service](https://github.com/asyncapi/server-api/issues/55).
- [Ritik Rawal](https://github.com/ritik307) contributed a [new `/diff` endpoint to our `server-api` service](https://github.com/asyncapi/server-api/issues/56).
- [Everly Precia Suresh](https://github.com/everly-gif) added a possibility to [host API reference docs for our `server-api` service](https://github.com/asyncapi/server-api/issues/43) through a dedicated endpoint.

It is also super important to mention [Abir Pal](https://twitter.com/imabptweets), who helped to coordinate efforts and was the first point of contact for the community coming from OpenForce channels.

### Google Season of Docs

Success with OpenForce was followed by the unexpected announcement that AsyncAPI was accepted as an organization for Google Season of Docs (GSoD) 2022, with a $10k budget. :muscle:

<TwitterTweetEmbed
  tweetId='1514670329246801926'
  options={{
    cards: 'hidden',
    width: 200,
    maxWidth: 400
  }}
/>

An amazing success for [Quetzalli Writes][quetzalliwrites-xcom] and an excellent opportunity for the AsyncAPI Initiative to improve its documentation big time!
On May 16, we will announce the names of six interns we want to hire to work on two different projects to have better docs. Quetzalli leads a super challenging task to interview as many candidates as possible (around 150!). Keep your fingers crossed.

Quetzalli and I will be mentors for our GSoD interns in the following months. Stay tuned to watch the progress.

### AsyncAPI Mentorship

We did not want to give up even though the Google Summer of Code (GSoC) 2022 application was declined. We knew many community members joined and started contributing because they counted on AsyncAPI being part of GSoC. 

Well tl;dr, our TSC just accepted an idea to start our own [AsyncAPI Mentorship](https://github.com/asyncapi/community/discussions/284) program! :rocket:

Now we have until May 15 to discuss with mentors your [mentorship ideas](https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+label%3Agsoc), understand the scope of each idea, and state clearly for which idea you are a candidate. Then we will ask TSC to vote and select 10 ideas that the AsyncAPI Initiative should sponsor this year.

## AsyncAPI Training

ICYMI, we run an effort to create official AsyncAPI training videos. [Barbaño González](https://www.linkedin.com/in/barbano-gonzalez-moreno/) leads this topic and almost finished [training scripts and storyboards](https://github.com/asyncapi/training/pulls) for the first set of videos.

I do not think it is a secret to say that great content is created only with great input, feedback, and review from people waiting for it. Please join Barbaño's efforts with any help you can, as she is not doing it for herself but the community.

I recommend you [follow Barbaño's monthly updates](https://gist.github.com/Barbanio), especially if you want to participate.

## Docs Feedback Form

One of our missions is to have kick-ass documentation. Easy, right? 

Writing docs is easy, just like writing code (at least in my opinion :stuck_out_tongue_winking_eye:). Well, we all know the devil is hidden in details. Details like gathering requirements, figuring out architecture, and making sure you have a well-motivated group of people working on it. And last but not least, make sure the community can easily share feedback on your work transparently.

I wrote already about [Quetzalli Writes][quetzalliwrites-xcom] and the efforts to get AsyncAPI into GSoD. Getting a well-motivated group of people to work on docs, checked. :white_check_mark:

Our [new docs information architecture is almost here too](https://github.com/asyncapi/website/pull/601). I think we can say "checked" :white_check_mark: to this one too.

Since this week, we can also say "checked" :white_check_mark: to the idea of **getting docs feedback** from the community.

<TwitterTweetEmbed
  tweetId='1518596333749391363'
  options={{
    width: 200,
    maxWidth: 400
  }}
/>

Each documentation page has a dedicated feedback form that one can fill in anonymously. The form injects the feedback into a [docs-related GitHub Discussion like this example](https://github.com/asyncapi/community/discussions/340).

Huge applause to:
- [Quetzalli Writes][quetzalliwrites-xcom] for leading the change
- [Missy Turco](https://twitter.com/missyturco) for amazing support with design
- [Maciej Urbanczyk](https://github.com/magicmatatjahu) for detailed review
- [Akshat Nema](https://twitter.com/AksNema) for implementation. Akshat demonstrated a lot of patience here. As an individual contributor, he waited for the merge for quite some time. There was a long discussion, many parties involved. Many contributors lost interest in such long-running PRs. Not Akshat! :muscle:

Anyway, I recommend you follow [Quetzalli][quetzalliwrites-xcom] and her [regular docs-related updates][quetzalliwrites-gist].

> Photo by <a href="https://unsplash.com/@mitchel3uo">Mitchell Luo</a> on <a href="https://unsplash.com/photos/H3htK85wwnU">Unsplash</a>

- [quetzalliwrites-xcom]: https://x.com/quetzalliwrites
- [quetzalliwrites-gist]: https://gist.github.com/quetzalliwrites