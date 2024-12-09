---
title: "📑 Google Season of Docs 2022 at AsyncAPI"
date: 2022-03-25T06:00:00+01:00
type: Engineering
tags:
  - Documentation
  - Announcement
cover: /img/posts/gsod-2022/SeasonofDocs_Logo.webp
authors:
  - name: Quetzalli Writes
    photo: /canela-quetzalli.webp
    link: https://www.linkedin.com/in/quetzalli-writes/
    byline: Our proposal? Update Docs Information Architecture
excerpt: Check out the Docs project proposal we're submitting to GSoD 2022! You won't want to miss out.
---

import ContributionNotes from '@/assets/docs/fragments/contribution-notes.md';

## ¡Hola, AsyncAPI community! 
For today's blog post about AsyncAPI Docs 📑, I wanted to share with all technical writers about our organization’s plan for participation in `Google Season of Docs 2022 (GSoD)`. Any and all technical writers are welcome to come participate with us for GSoD 2022 season, regardless of tech background or years of experience! At AsyncAPI, we love mentoring folks who want to get involved in OSS, tech, and Docs. ❤️

As some of you may remember from my [Gist Docs update for 31 Jan - 11 Feb 2022](https://gist.github.com/quetzalliwrites/94ca1ffb5d123b450501e40a4a3b56e2), I noted that GSoD 2022 was coming up and that AsyncAPI wanted to participate in the application process once it opened on February 23, 2022.  

In anticipation of this, I also created a new AsyncAPI Slack channel named `#temp-gsod-2022` that anyone can join! First, [join our Slack workspace](https://www.asyncapi.com/slack-invite) ☎️  and please respect [our slack etiquette](https://github.com/asyncapi/community/blob/master/slack-etiquette.md).🙂 Then join the `temp-gsod-2022` channel, our temporary channel to coordinate GSoC 2022 setup. I'll publish regular updates on where we are in the application process, so stay tuned as the process continues. 😄

Join the `#temp-gsod-2022` slack channel for:
- mentees identification
- mentors identification
- ideas identification
- mentees and ideas and mentors matching


Below is the **project proposal** we're submitting to `GSoD 2022` and then we close with a reminder of how to get started as an AsyncAPI Docs contributor:


___ 

# Update Docs Information Architecture - AsyncAPI Initiative 

## About AsyncAPI
AsyncAPI (currently version 2.3.0, first released in 2016) is an Apache License 2.0 library [under the Linux Foundation](https://www.linuxfoundation.org/press-release/linux-foundation-will-host-asyncapi-to-support-growth-and-collaboration-for-industrys-fastest-growing-api-spec/) that seeks to improve the current state of Event-Driven Architectures (EDA). The AsyncAPI Initiative is a specification and growing set of open-source tools to help developers define asynchronous APIs, and build and maintain event-driven architectures. Developers familiar with OpenAPI (aka Swagger) for RESTful APIs will see strong similarities when using AsyncAPI. One common use case is generating documentation (HTML or Markdown) of an asynchronous API. The specification is both platform and language agnostic. Current tooling includes support for common message brokers such as Apache Kafka and RabbitMQ, and languages including Python, Java, and Nodejs. Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management, and beyond. Our 150+ Open-Source (OSS) contributors are EDA enthusiasts from all around the world. 


## About our Docs project

### Our current Docs problem
Our current Docs and their Information Architecture (IA) needs a major makeover. The current content buckets are far from ideal and much basic content is missing to help onboard new contributors. Users new to our API spec need `/Conceptual` docs that explain our spec terminology in more detail with engineering diagrams: people often learn visually! We also have to move our CLI docs under the Docs upcoming new `Reference` content bucket; currently, we have a README version of CLI docs only. Similarly, we're adding a new and broader `/Tools` section of documentation for our tools in individual tools' GitHub repositories, under a `/docs` directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way than what you see in a README. In time, we also need to add many more tutorials (i.e. Websocket, Kafka, etc) and Use Cases and Troubleshooting Guides, under a new `How-To` section.

We also need to re-structure the [Generator tool](https://github.com/asyncapi/template-for-generator-templates) docs. Because this is one of our main tools, it's big enough to be it's own independent project for 2022 GSoD. Currently, our Generator docs need a major update, to better explain every single functionality of the Generator. 


### Our Docs project’s scope
We're already invested in utilizing the [Diátaxis methodology](https://diataxis.fr/) for determining our **content buckets** _(Concepts, Tutorials, Tools, How-To Guides, Reference)_. Along with this change, it makes sense to add new landing pages that introduce each content bucket. Each content bucket landing page could include cards featuring requested content from the community that still needs contributions. Then each card will read, "Contributors Needed." 

AsyncAPI has several CLI and Tools markdown README documentation in miscellaneous GitHub repositories that we plan to migrate over to the main Docs site. This task is part of our goal for finalizing our 2022 AsyncAPI Docs Information Architecture makeover. We explain this in more detail in our previous OSS blog post titled ["Change is coming to our AsyncAPI Developer Documentation"](https://www.asyncapi.com/blog/changes-coming-docs). It's also extensively documented in our [AsyncAPI Docs GitHub Project Board](https://github.com/orgs/asyncapi/projects/8). 

In addition, we want to also target improving the [Generator tool](https://github.com/asyncapi/template-for-generator-templates) docs that are only READMEs in a repo right now. The Docs for this one tool are a big enough job to merit being our 2nd proposed project for 2022 GSoD.

We're also writing voluntary OSS bi-weekly updates via GitHub Gists to speak about the latest updates made in the AsyncAPI Docs Ecosystem. Due to our commitment to investing time in gaining interest in our community and getting Google excited about us, we've made sure to maintain updates about our `Google Season of Docs 2022` application too! In fact, you can take a look at the latest three where we made said mentions here in [AsyncAPI Docs update (31 Jan - 11 Feb 2022)](https://gist.github.com/quetzalliwrites/94ca1ffb5d123b450501e40a4a3b56e2), [AsyncAPI Docs update (14 Feb - 25 Feb 2022)](https://gist.github.com/quetzalliwrites/d34e3aececa49d10d0ddb2dc9938b477), and [AsyncAPI Docs update (28 Feb - 11 March 2022)](https://gist.github.com/quetzalliwrites/8f449f731b919193f4101098a69da14d).

### Measuring our Docs project’s success
We will partially measure success in the Docs project by capturing specific feedback about the IA changes via our soon-to-come new [Docs Feedback card](https://github.com/asyncapi/website/issues/453). We need this specific and granular feedback to make sure we listen and make changes according to what the community requests from Docs. In previous AsyncAPI Docs Gist updates, we've mentioned that Design contributors were teaming with Docs on `/website`issue [#453](https://github.com/asyncapi/website/issues/453) for the ideation and development of our new **feedback card** that will be added at the bottom of each Docs page. What the community decided over the last 2 weeks was that the `Submit feedback` button in the card will publish the feedback anonymously via the AsyncAPI bot and create a new **GitHub Discussion** with said feedback:

![A screenshot displaying the design of our new feedback card for receiving feedback on AsyncAPI Docs](/img/posts/gsod-2022/feedback-card.webp)

![A screenshot of AsyncAPI GitHub Discussions for the Docs category](/img/posts/gsod-2022/docs-community-discussions.webp)  

The other way we would consider the project successful is the number of our contributors and Docs PRs increased from 3 to 6 community members. Currently, a majority of our OSS contributor community focuses only on contributing code, but we would like to instill a greater interest in contributing to documentation that provides value for everyone.


### Timeline
The project itself will take approximately 4-6 months to complete, depending on the different levels of knowledge from diverse technical writers (TW) that might get involved. (At AsyncAPI, we want to work with any TW, regardless of their years of experience. We have a passion for mentorship, and we do not wish to have a bar that would prevent any TW from contributing to our OSS Initiative. In fact, we look forward to potentially mentoring TW(s) who are completely new to tech and making them feel welcome!)

For our 2 projects, we would like to request a minimum of 2 TWs, so that we can work on both the CLI/Tools and Generator Docs. 

The timeline would look as follows:
- **May:** Orientation on how to contribute to AsyncAPI Inititiave, how Docs issues are organized, detail how we're migrating our CLI and Tools Docs, and assign good `first-time-tickets` to get each new TW contributor started. 
- **June - August:**	Each TW goes through designated issues marked for both first time contributors and work set aside for `GSoD 2022`. Each TW starts creating documentation for their individual issues assigned/selected. 
- **September - October:** We determine if we're going to be able to complete both CLI and Tools Docs plus the Generator Docs, depending on how many TWs are in our group and how much they've been able to complete so far. We re-align priorities as needed and asses what is missing to reach our 2022 IA change goals for AsyncAPI Docs.
- **November:**	Project completion and all contributors receive some swag! 


### Project budget
We have set aside 2 mentors for now, for our 2 projects: improving our IA and re-structuring our Generator Docs. Should we be selected, AsyncAPI would like to request from Google a US $5000 budget for each project. For both projects, the request then totals for a $10,000 budget.  

| **Budget item**                                                                                      | **Total Amount** |
|------------------------------------------------------------------------------------------------------|------------------|
| Technical writer updates, reviews, edits, and publishing new documentation for the IA improvements.  | $5000            |
| Technical writer updates, reviews, migration, and publishing improved Generator tool documentation.  | $5000            |

___ 

## Get started contributing to AsyncAPI Docs Today
Last but not least, don't forget that <ContributionNotes />

_-Q.W. 👩🏻‍💻 and Canela 🐕‍🦺_