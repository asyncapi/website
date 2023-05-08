---
title: "Finding a Good Open Governance Model for AsyncAPI"
date: 2021-03-08T06:00:00+01:00
type: Strategy
tags:
  - Governance
  - Foundation
cover: /img/posts/governance-motivation-cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
  - name: Fran Méndez
    photo: /img/avatars/fmvilas.webp
    link: https://twitter.com/fmvilas
    byline: AsyncAPI Founder
excerpt: 'AsyncAPI can be successful if the initiative is community-driven. To be community-driven, we need the community to see it can drive things and make an impact. For that, we need a proper open governance model. What model would be the best?'
---

> tl;dr charter for the AsyncAPI Initiative open governance is ready for review. Leave your comments there in [this](https://github.com/asyncapi/.github/pull/37) pull request. We will wait two weeks for your feedback.

December 2020 brought to AsyncAPI an important announcement, a [partnership with Postman](/blog/asyncapi-partners-with-postman). This huge milestone secured the AsyncAPI Initiative development efforts as few active community members moved to Postman. This move speeded up our work on transferring AsyncAPI to a foundation and forming an open governance model to assure the community that a single company does not control AsyncAPI Initiative.

It took us a lot of time to write down the initial charter for the initiative.

> **Pro Tip**:
[Charter](https://dictionary.cambridge.org/dictionary/english/charter) is not a person that creates charts :smiley:
Nobody's trying to be a smart ass here. We actually had to google that :smiley:

## The vision

We started with a basic vision in our heads and studied governance models of many diverse communities, like NodeJS Foundation, OpenJS Foundation, GraphQL Foundation, Cloud Events, OpenAPI Initiative, and CNCF. We also got a charter template from Linux Foundation. That was a lot to handle. 

<center><img className="w-1/3" src="https://media.giphy.com/media/5QMPpCzH6yxEqhev5A/giphy.gif" /></center>

In the end, we just wanted to make sure the initiative is community-driven and leaves no one behind. We tried to figure out a governance model that:
- is as democratic as possible
- supports the asynchronous decision-making process
- gives power to people that "work", not companies that "pay". In other words, it gives equal power to both individual and corporate contributors.

### Vocabulary

In the AsyncAPI governance model, you can find two essential roles: contributor and committer. A contributor is a person that contributes to the project code, docs, or other artifacts. A committer is a person that contributes regularly and is invited by other committers to manage the repository, to have more privileges, and to approve pull requests.

Committer rules in the repository, but for topics that go beyond, there is a Technical Steering Committee (TSC). 

TSC consists of all committers. 

Yes, not a dedicated group of people for now. Are you a committer? If yes, then it means you are a voting member of TSC (unless you do not want to). But more on that further in the blog post.

### Single TSC for spec and tools

Spec and tools will have different licenses, but there will not be two TSCs though. One TSC to handle both the specification and the tools.

Why?

- start small, they say.
- don't design processes and then work accordingly but better build a process that facilitates the way you work already.
- we are a large community, but not large enough to handle two different charters, not now.

The other good reason for not splitting is that we believe the initiative should work on spec and tools to provide essential open-source tools that consistently support the latest version of the specification. In other words, when we release the newest version of the specification, you can already use it with official tools and do not have to wait for other tooling providers to catch up. We know big companies do not care much about basic tooling as they most probably write their own because it is much easier for them to work without unnecessary noise. Nevertheless, we need to think about the small ones too. Two TSCs sound like having two silos that work separately, and it is not good for the start. Nobody says, though, that the TSC can't organically grow into two separate groups in the future.


### Value work more than money

We want to have a TSC consisting of all the active committers in the project, not people who are there because their company is a sponsor of the project. You are a TSC member because you work on the project, you code, write docs, maintain CI. You work, and therefore, you are a part of the initiative.

Why? Don't you like money?

We like money, don't get us wrong here :smiley: Money helps the project a lot, we can sponsor many good things with the money we obtain from you.

Nevertheless, we believe that it isn't good to run a project alone with lots of bucks in the pocket. 

What? We need a doctor here!

:man_shrugging: We just prefer to work with a large group of people, from different cultures, from other parts of the world, with diverse experience and use cases in heads. That is just how you build great products by having many people around you to help and validate the ideas actively.


### Respecting committers and the right to vote 

The rule we want to follow is that the committer automatically gets a right to vote. 

Why? 

Voting is always about essential things, essential for the entire initiative. Who else should have a right to vote if not people that are directly affected by the decisions of the ToC? The tricky situation here is that this approach can lead to a problem where one company hires most committers and, therefore, takes over project steering. This is something we actually have at the moment. The majority of folks working actively on the project are from Postman. Nothing terrible happened to the project for now, but this doesn't mean the whole community feels comfortable.

We had a tough brainstorming here about finding the right balance between respecting all contributors equally and still making sure that there is no risk that a company has most voters. That is why we have a rule that only 1/4 of voters can be affiliated with the same company. Or 1/3 in case we need to look for more maintainers to bring balance back to the force.

### Work on all the tools under the AsyncAPI umbrella

We want AsyncAPI Initiative to be a place where AsyncAPI open source tools are developed, together, so we do not duplicate each other in the community with different variations of the same tool. So far, seven AsyncAPI tools resulted from different companies or individuals' work and moved to the AsyncAPI GitHub organization. We want this to become a standard in the community. 

The governance model embraces this direction. How? 

If you own a project, you created it. It means you are its committer. 

Do you see where We're getting?

Yes, it means that once you donate the project to the AsyncAPI Initiative, you do not only stay there as a committer but also become a voting member.

### No meetings - async all the things

We hate to have too many meetings. Meetings suck out your blood. Meetings = schedule and schedule = leash. 

Zero meetings? No, we will have something on the schedule, but it will not be mandatory. We will not make decisions during the meetings, so you do not have to rush to be there. You just need to watch the recording to learn if there is something relevant for you if there is a topic that needs voting. Decision-making should be asynchronous, and people should have time to make wise decisions.

The async decision-making process also assures that the number of voters can scale up easily, and we should be able to handle as many committers in the group as we have. We can automate many things here.

### Wishful thinking

We hope that a side effect of such an open governance model will be that companies will have a better motivation to sponsor the initiative financially and assign employees to work on the spec and tooling regularly to become committers and become voting members of the TSC. 

Hopefully, these companies will take shortcuts here that will open up new job opportunities for individual contributors.

That was not our initial goal, though. We just figured that this might happen, and we look forward to it. 

I hope this rough explanation makes it easier to digest the charter. Please share what you think. Use [Twitter](https://twitter.com/AsyncAPISpec), [Slack](https://www.asyncapi.com/slack-invite/), email. Write publicly or privately. We just care about the feedback and not how you pass it on. 

You can also comment on [this](https://github.com/asyncapi/.github/pull/37) pull request with the charter. You can leave generic comments that we could reuse in official communication after we join the foundation.

Cheers :beers:

> Photo by <a href="">United Nations COVID-19 Response</a> on <a href="">Unsplash</a>
