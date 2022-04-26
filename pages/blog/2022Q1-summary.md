---
title: "Summary of things that happened around the AsyncAPI Initiative until end of April 2022"
date: 2022-04-28T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/2022Q1-summary/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Gardner
excerpt: 'New AsyncAPI brand. AsyncAPI 2.4 and work on 3.0 spec release. Meetings organization changes. Conference organization. AND SO MUCH MORE!'
featured: true
---

> TODO here will be link to podcast for those that do not read articles

Welcome to another update for AsyncAPI Initiative. In this article, I want to highlight the most important things around AsyncAPI in the first few months of 2022.

I usually ask the community if folks have anything important that I should put in my updates. Still, it is a pretty much subjective article based mainly on things I see in my personal bubble :smiley:

## Brand Refresh

This one is pretty easy to spot, especially if you have been with AsyncAPI Initiative for some time :smiley:

10th of March, we announced a change in the AsyncAPI brand. Change that was needed. A refresh of this faded green that I personally never liked :joy:

<TwitterTweetEmbed
  tweetId='1501977719915098120'
  options={{
    cards: 'hidden',
    width: 200,
    maxWidth: 400
  }}
/>

It was a gigantic effort by [Missy Turco](https://twitter.com/missyturco). Months of work, research, and discussions with the community.

It is not all. More work in the area is needed:
- Design System :muscle: - Get involved in [related repository](https://github.com/asyncapi/design-system) if you are interested in helping out. 
- AsyncAPI Mascots refresh - We need to refresh our existing Eve and Chan mascots to match the new brand. Any help would be appreciated.

For more regular news and updates on topics around brand and design in AsyncAPI Initiative, I definitely recommend you to follow [Missy Turco](https://twitter.com/missyturco) and read her [regular updates on the subject](https://missyturco.notion.site/03556522990e4067ae877fd236c37268?v=d60154483de849cd8125f8333cfe1d36).

## AsyncAPI Conference

We want to organize the first conference that you not only can watch online but also participate in-person. May is right behind the cornern, not much time left. We need to start working on the event actively now.

We discuss all the aspects of the conference [in Community Discussions](https://github.com/asyncapi/community/discussions/categories/asyncapi-conf-2022-organization) openly. Please join and actively support the effort. We need lots of volunteers to make that happen. 

We need to have a special task force that will focus on the subject. Please join the discussion on [hosting a conference-dedicated weekly meeting](https://github.com/asyncapi/community/discussions/322).

## Meetings scheduling automation and related changes

Because of the community's growth and the growing number of topic-specific meetings, we had to spend some time improving things, and automating as much as possible. After some initial discussions like [this one about Google-services](https://github.com/asyncapi/community/discussions/236), some initial requirements were defined, called [Meeting as a Service](https://github.com/asyncapi/community/issues/245).

- A week ago, we stopped using our `asyncapi-users` Google Group. We removed it, and all the members were migrated as subscribers of the AsyncAPI Newsletter. This is the place where we will now send email notifications every Monday-morning with a list of upcoming meetings,
- We switched to the new Google Calendar instance managed by the official AsyncAPI Google account. You should remove/unsubscribe from the old calendar and [subscribe to the new one](https://calendar.google.com/calendar/u/3?cid=Y19xOXRzZWlnbG9tZHNqNm5qdWh2YnB0czExY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t),
- [Our Technical Steering Committee (TSC)](https://github.com/asyncapi/community/discussions/295) approved to sponsor 8 Zoom licenses to host official AsyncAPI meetings. So far, only 3 licenses have been assigned. We have lots of room for more meetings and hosts, if there is a need.

Huge thanks to [Krishna Kumar](https://github.com/Krishks369) and [Shreyansh Jain](https://github.com/sudoshreyansh) that helped in research related to the implementation :heart:

If you want to learn more about becoming a host of the meeting, or other things related to meetings, get familiar with our [dedicated meetings FAQ](https://github.com/asyncapi/community/blob/master/MEETINGS_ORGANIZATION.md).

Oh, and I almost forgot, look at this :point_down: :star: 
All [info about AsyncAPI-related meetings](https://www.asyncapi.com/community/meetings) in one beatifull place :heart:

<Figure
  src="/img/posts/2022Q1-summary/meetings.webp"
  className="text-center"
  caption="View of dedicated community/meetings page on the AsyncAPI website."
/>

## Upcoming 2.4 and 3.0 releases of the spec

We released a new [2.4.0 version of AsyncAPI Specification](https://github.com/asyncapi/spec/releases/tag/v2.4.0). There are many good features, like the possibility to provide the `id` of the Message unique for the entire AsyncAPI file or the ability to specify security valid only for a given operation. You definitely need to read [release notes](https://www.asyncapi.com/blog/release-notes-2.4.0).

Huge shout out to [Sergio Moya](https://twitter.com/smoyac), who was a release coordinator for 2.4 release and pushed all the doors to make sure the release could go out.

2.4.0 was released, but this doesn't block us from working on something much bigger, 3.0.0 version of the specification :rocket:

If you do not know yet about it, I highly recommend you to have a look at [this article](https://www.asyncapi.com/blog/async-api-spec-3.0-release) from [Harsh Mishra](https://www.linkedin.com/in/harshcasper/).

Please join these efforts, as there is much work ahead of us, but not many hands doing actual work. We meet every two weeks to sync the work efforts and discuss important topics. Feel free to join :pray:

I also recommend following [Sergio Moya](https://twitter.com/smoyac) and reaching for [his regular updates on specification-related efforts](https://gist.github.com/smoya)

## Contributors onboarding initiatives

One of [goals for community-building efforts for 2022](https://github.com/asyncapi/community/discussions/193) was to involve AsyncAPI Initiative as a mentoring organization in as many coding (but not only) events. We have many maintainers here who like to help first-time contributors land their first pull requests in an open and relaxed environment.

### Google Summer of Code

We did not start well. We were not accepted for [Google Summer of Code](https://summerofcode.withgoogle.com). Don't ask me why. I really do not know. I wish I could have a clear answer from them about what failed on our end :sad:

We never give up here at AsyncAPI, though :smiley:

### OpenForce

March was a month where we joined [OpenForce](https://www.asyncapi.com/blog/openforce-2022) thanks to amazing support from [Hargun Kaur](https://www.linkedin.com/in/hkaur008/). As a result, we managed to onboard a few new folks and gained important contributions in exchange. There are actually a few PRs still open, but for now, completed are:
- [Namya LG](https://github.com/Namyalg) introduced a great improvement to our CI by creating dedicated workflows to [search for broken links](https://github.com/asyncapi/.github/issues/92) in our documentation across all repositories.
- [Harsh Mishra](https://www.linkedin.com/in/harshcasper/) introduced a workflow in our CI to [validate docker images](https://github.com/asyncapi/server-api/issues/50) in projects where we publish them
- [Abhijeet Jejurkar](https://github.com/abhijeetjejurkar) helped [improving Kubernetes deployment](https://github.com/asyncapi/server-api/issues/57) for our `server-api` service.
- [Samriddhi](https://github.com/Samridhi-98) contributed [new `/bundle` endpoint](https://github.com/asyncapi/server-api/issues/55) to our `server-api` service.
- [Ritik Rawal](https://github.com/ritik307) contributed [new `/diff` endpoint](https://github.com/asyncapi/server-api/issues/56) to our `server-api` service.
- [Everly Precia Suresh](https://github.com/everly-gif) added a possibility to [host API reference docs](https://github.com/asyncapi/server-api/issues/43) for our `server-api` service through a dedicated endpoint.

It is also super important to mention [Abir Pal](https://twitter.com/imabptweets), who helped to coordinate efforts and was the first point of contact for the community coming from OpenForce channels.

### Google Season of Docs

Success with OpenForce was followed by unexpected announcement that we were accepted as an organization for Google Season of Docs (GSoD) with $10k budget :muscle:

<TwitterTweetEmbed
  tweetId='1514670329246801926'
  options={{
    cards: 'hidden',
    width: 200,
    maxWidth: 400
  }}
/>

The amazing success of [Alejandra Quetzalli](https://twitter.com/QuetzalliAle) and an excellent opportunity for AsyncAPI Initiative to improve documentation big time!
In mid-May, we will have the names of six interns we want to hire to work on two different projects to have better docs. Alejandra leads a super challenging task to interview as many candidates as possible (around 200!). Keep your fingers crossed.

Alejandra and I will be mentors for interns for the next few months. Stay tuned to watch the progress.

### AsyncAPI Mentorship

Even though the Google Summer of Code (GSoC) application was declined, we did not want to give up. We knew many community members joined and started contributing because they counted on AsyncAPI being part of GSoC. 

Well tl;dr our TSC just accepted an idea to start our own [AsyncAPI Mentorship](https://github.com/asyncapi/community/discussions/284) program :rocket:

Now it is time until the 15th of May to discuss with mentors [in related ideas](https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+label%3Agsoc) to understand the scope and clearly state you are a candidate for a given idea. Then we will ask TSC to vote and select 10 ideas that AsyncAPI Initiative should sponsor this year.

## AsyncAPI Training

ICYMI, we run an effort to create official AsyncAPI training videos. [Barbaño González](https://www.linkedin.com/in/barbano-gonzalez-moreno/) leads this topic and almost finished [scripts and storyboards](https://github.com/asyncapi/training/pulls) for the first set of videos.

I do not think it is a secret if I say that great content is created only with great input, feedback, and review from people waiting for it. Please join Barbaño's efforts with any help as she is not doing it for herself but for the community.

I recommend you [follow Barbaño's monthly updates](https://gist.github.com/Barbanio), especially if you want to participate.

## Docs Feedback Form

One of our missions is to have kick-ass documentation. Easy right? 

Writing docs is easy, just like writing code. Well, we all know the devil is hidden in details. Details like gathering requirements, figuring out architecture, and making sure you have a well-motivated group of people working on it. And last but not least, make sure the community can easily share feedback on your work transparently.

I wrote already about [Alejandra Quetzalli](https://twitter.com/QuetzalliAle) and the efforts to get AsyncAPI into GSoD. Getting a well-motivated group of people to work on docs, checked :white_check_mark:

New docs information architecture is [almost here too](https://github.com/asyncapi/website/pull/601). I think we can say "checked" :white_check_mark: to this one too.

Since this week, we can also say "checked" :white_check_mark: to the idea of getting feedback from the community.

<TwitterTweetEmbed
  tweetId='1518596333749391363'
  options={{
    width: 200,
    maxWidth: 400
  }}
/>

Each documentation page has a dedicated feedback form that one can fill in anonymously. As a result, feedback lands in [GitHub Discussion](https://github.com/asyncapi/community/discussions/340).

Huge applause to:
- [Alejandra Quetzalli](https://twitter.com/QuetzalliAle) for leading the change
- [Missy Turco](https://twitter.com/missyturco) for amazing support with design
- [Maciej Urbanczyk](https://github.com/magicmatatjahu) for detailed review
- [Akshat Nema](https://twitter.com/AksNema) for implementation. Akshat demonstrated a lot of patience here. As an individual contributor, he waited for the merge for quite some time. There was a long discussion, many parties involved. Many contributors lost interest in such long-running PRs. Not Akshat :muscle:

Anyway, I recommend you follow [Alejandra](https://twitter.com/QuetzalliAle) and her [regular docs-related updates](https://gist.github.com/alequetzalli).

> Photo by <a href="https://unsplash.com/@mitchel3uo">Mitchell Luo</a> on <a href="https://unsplash.com/photos/H3htK85wwnU">Unsplash</a>