---
title: "📑 Google Season of Docs 2022 at AsyncAPI"
date: 2021-12-13T06:00:00+01:00
type: Engineering
tags:
  - Documentation
  - Announcement
cover: /img/posts/gsod-2022/SeasonofDocs_Logo.webp
authors:
  - name: Alejandra Quetzalli
    photo: /img/avatars/canela-ale.webp
    link: https://www.linkedin.com/in/alejandra-quetzalli/
    byline: Our proposal? Update Docs Information Architecture
excerpt: 
featured: true
---

## 🦄 Hola

¡Hola, AsyncAPI community! 😄

For today's blog post about AsyncAPI Docs 📑, I wanted to share to all technical writers about our organization’s plan for participation in `Google Season of Docs 2022 (GSoD)`. 

As some of you may remember from my [Gist Docs update for 31 Jan - 11 Feb 2022](https://gist.github.com/alequetzalli/94ca1ffb5d123b450501e40a4a3b56e2), I noted that GSoD 2022 was coming up and that AsyncAPI wanted to participate in the application process once it opened on February 23, 2022.  

In anticipation of this, I also created a new AsyncAPI Slack channel named `#temp-gsod-2022` that anyone can [join here](https://join.slack.com/share/enQtMzA4OTA1NjUyNzk1OC01NjI3YjBjNGQ1OGYzNjg3MmMwZDFlY2U5ZjkxYjA3ZGU4MjNiYTg5ODNmY2M3MWNmZmU0ZDA0ZTc0ZDc5NTc3). This slack channel is a temporary channel to coordinate GSoC 2022 setup. I'll publish regular updates on where we are in the application process, so stay tuned as the process continues. 🙂

Join the `#temp-gsod-2022` slack channel for:
- mentees identification
- mentors identification
- ideas identification
- mentees and ideas and mentors matching


Below is the **project proposal** we're submitting to `GSoD 2022` and then we close with a reminder of how to get started as an AsyncAPI Docs contributor:


___ 

# 🙌🏾  Update Docs Information Architecture - AsyncAPI Initiative 

## ❤️ About AsyncAPI
AsyncAPI (currently version 2.3.0, first released in 2016) is an Apache License 2.0 library [under the Linux Foundation](https://www.linuxfoundation.org/press-release/linux-foundation-will-host-asyncapi-to-support-growth-and-collaboration-for-industrys-fastest-growing-api-spec/) that seeks to improve the current state of Event-Driven Architectures (EDA). The AsyncAPI Initiative is a specification and growing set of open-source tools to help developers define asynchronous APIs, and build and maintain event-driven architectures. Developers familiar with OpenAPI (aka Swagger) for RESTful APIs will see strong similarities when using AsyncAPI. One common use case is generating documentation (HTML or Markdown) of an asynchronous API. The specification is both platform and language agnostic. Current tooling includes support for common message brokers such as Apache Kafka and RabbitMQ, and languages including Python, Java, and Nodejs. Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management, and beyond. Our 150+ Open-Source (OSS) contributors are EDA enthusiasts from all around the world. 


## 📑 About our Docs project

### 🔎 Our current Docs problem
Our current Docs and their Information Architecture (IA) needs a major makeover. The current content buckets are far from ideal and much basic content is missing to help onboard new contributors. Users new to our API spec need `/Conceptual` docs that explain our spec terminology in more detail with engineering diagrams: people often learn visually! We also have to move our CLI docs under the Docs upcoming new `Reference` content bucket; currently we have a README version of CLI docs only. Similarly, we're adding a new and broader `/Tools` section of documentation for our tools in individual tools' GitHub repos, under a `/docs` directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way than what you see in a README. In time, we also need to add many more tutorials (i.e. Websocket, Kafka, etc) and Usecases and Troubleshooting Guides, under a new `How-To` section.


### 🎯 Our Docs project’s scope
We're already invested in utilizing the [Diátaxis methodology](https://diataxis.fr/) for determining our **content buckets** _(Concepts, Tutorials, Tools, How-To Guides, Reference)_, it makes sense to ADD NEW landing pages to introduce each content bucket. In addition, each content bucket landing page could include cards featuring content the community has already requested but that we still need contributions for. For example, instead of having a card that says "coming soon," we would have the cards say, "Contributors Needed." Lastly, we have several CLI and Tools markdown README documentation in miscellaneous GitHub repos that we're in the process of migrating over to the main Docs site section. This last item would be another task we'd incoropate as part of our goal to finalize our 2022 AsyncAPI Docs Information Architecture makeover, which is not only mentioned in one of our OSS blog posts titled ["Change is coming to our AsyncAPI Developer Documentation"](https://www.asyncapi.com/blog/changes-coming-docs), but is also extensively documented in our [AsyncAPI Docs GitHub Project Board](https://github.com/orgs/asyncapi/projects/8). 

We've also started voluntary OSS bi-weekly updates via GitHub Gists to speak about the latest updates made in the AsyncAPI Docs Ecosystem. Due to our commitment to investing time in gaining interest in our community and getting Google excited about us, we've made sure to maintain updates about our `Google Season of Docs 2022` application too! In fact, you can take a look at the latest three where we made said mentions here in [AsyncAPI Docs update (31 Jan - 11 Feb 2022)](https://gist.github.com/alequetzalli/94ca1ffb5d123b450501e40a4a3b56e2), [AsyncAPI Docs update (14 Feb - 25 Feb 2022)](https://gist.github.com/alequetzalli/d34e3aececa49d10d0ddb2dc9938b477), and [AsyncAPI Docs update (28 Feb - 11 March 2022)](https://gist.github.com/alequetzalli/8f449f731b919193f4101098a69da14d).

### 📏 Measuring our Docs project’s success
We will measure success in Docs project’s success partially by capturing specific feedback about the IA changes via our soon-to-come new [Docs Feedback card](https://github.com/asyncapi/website/issues/453). We need this specific and granular feedback to make sure we listen and make changes according to what the community requests from Docs. In previous AsyncAPI Docs Gist updates, we've mentioned that Design contributors were teaming with Docs on `/website`issue [#453](https://github.com/asyncapi/website/issues/453) for the ideation and development of our new **feedback card** that will be added at the bottom of each Docs page. What the community decided over the last 2 weeks was that the `Submit feedback` button in the card will publish the feedback anonymously via the AsyncAPI bot and create a new **GitHub Discussion** with said feedback:

<img width="500" alt="Screen Shot 2022-03-10 at 8 47 22 PM" src="https://user-images.githubusercontent.com/19964402/158282499-a50737c0-a669-417d-99ae-a91ab21a0c07.png">
<img width="500" alt="Screen Shot 2022-03-10 at 8 48 47 PM" src="https://user-images.githubusercontent.com/19964402/158282500-a29c953b-e333-455f-b5bb-c1d2491fef2a.png">

The other way we would consider the project successful is the number of our contributors and Docs PRs increased by even 2-5 more community members. Currently, a majority of our OSS contributor community focuses only on contributing code, but we would like to instill a greater interest in contributing to documentation that provides value for everyone.


### ⌛ Timeline
The project itself will take approximately 3-6 months to complete, depending on how many technical writers (TW) get involved. If we can get even just 2-4 TWs, then we can work on both migrating the CLI and Tools documentation. But if we can only get 1-2 folks, it would be hard to do more than the migration of CLI or Tools docs. Ideally, the timeline could look like the following:

- **May:** Orientation on how to contribute to AsyncAPI Inititiave, how Docs issues are organized, detail how we're migrating our CLI and Tools Docs, and assign good `first-time-tickets` to get each new TW contributor started. 
- **June - August:**	Each TW goes through designated issues marked for both first time contributors and work set aside for `GSoD 2022`. Each TW starts creating documentation for their individual issues assigned/selected. 
- **September - October:** We determine if we're going to be able to complete both CLI and Tools Docs, depending on how many TWs are in our group and how much they've been able to complete so far. We re-align priorities as needed and asses what is missing to reach our 2022 IA change goals for AsyncAPI Docs.
- **November:**	Project completion and all contributors receive some swag! 


### 💸 Project budget
We have set aside 2 mentors for now, for our 1 project on improving our IA. For this we would like to request a US $5000 budget to Google, should we be selected. 

___ 

## 👉🏽 Get started contributing to AsyncAPI Docs Today
Last but not least, don't forget that code isn't the only way to contribute to OSS; Dev Docs are a **huge** help that benefit the entire OSS ecosystem. At AsyncAPI, we value Doc contributions as much as every other type of contribution. ❤️

To get started as a Docs contributor:
1. Familiarize yourself with our [project's Contribution Guide](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md) and our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
2. Head over to our Docs GH Board [here](https://github.com/orgs/asyncapi/projects/8).
3. Pick an issue you would like to contribute to and leave a comment introducing yourself. This is also the perfect place to leave any questions you may have on how to get started. 
4. If there is no work done in that Docs issue yet, feel free to open a PR and get started!

### 🏷 Tag me in your AsyncAPI Doc PRs
Do you have a documentation contributor question and you're wondering how to tag me into a GitHub discussion or PR? Never fear!

Tag me in your AsyncAPI Doc PRs or [GitHub Discussions](https://github.com/asyncapi/community/discussions/categories/docs) via my GitHub handle, [`/alequetzalli`](https://github.com/alequetzalli) 🐙.


_-A.Q. 👩🏻‍💻 and Canela 🐕‍🦺_