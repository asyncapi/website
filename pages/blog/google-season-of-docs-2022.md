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


Below is the **project proposal** we're submitting to `GSoD 2022`:


___ 

# 🙌🏾  Update Docs Information Architecture - AsyncAPI Initiative 

## ❤️ About AsyncAPI
AsyncAPI (currently version 2.3.0, first released in 2016) is an Apache License 2.0 library [under the Linux Foundation](https://www.linuxfoundation.org/press-release/linux-foundation-will-host-asyncapi-to-support-growth-and-collaboration-for-industrys-fastest-growing-api-spec/) that seeks to improve the current state of Event-Driven Architectures (EDA). The AsyncAPI Initiative is a specification and growing set of open-source tools to help developers define asynchronous APIs, and build and maintain event-driven architectures. Developers familiar with OpenAPI (aka Swagger) for RESTful APIs will see strong similarities when using AsyncAPI. One common use case is generating documentation (HTML or Markdown) of an asynchronous API. The specification is both platform and language agnostic. Current tooling includes support for common message brokers such as Apache Kafka and RabbitMQ, and languages including Python, Java, and Nodejs. Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management, and beyond. Our 150+ Open-Source (OSS) contributors are EDA enthusiasts from all around the world. 


## 📑 About our Docs project

### 🔎 Our current Docs problem
Our current Docs and their Information Architecture (IA) needs a major makeover. The current content buckets are far from ideal and much basic content is missing to help onboard new contributors. Users new to our API spec need `/Conceptual` docs that explain our spec terminology in more detail with engineering diagrams: people often learn visually! We also have to move our CLI docs under the Docs upcoming new `Reference` content bucket; currently we have a README version of CLI docs only. Similarly, we're adding a new and broader `/Tools` section of documentation for our tools in individual tools' GitHub repos, under a `/docs` directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way than what you see in a README. In time, we also need to add many more tutorials (i.e. Websocket, Kafka, etc) and Usecases and Troubleshooting Guides, under a new `How-To` section.


### 🎯 Our Docs project’s scope
_Tell us about what documentation your organization will create, update, or improve. If some work is deliberately not being done, include that information as well. Include a time estimate, and whether you have already identified organization volunteers and a technical writer to work with your project._

We're already invested in utilizing the [Diátaxis methodology](https://diataxis.fr/) for determining our **content buckets** _(Concepts, Tutorials, Tools, How-To Guides, Reference)_, it makes sense to ADD NEW landing pages to introduce each content bucket. In addition, each content bucket landing page could include cards featuring content the community has already requested but that we still need contributions for. For example, instead of having a card that says "coming soon," we would have the cards say, "Contributors Needed." Lastly, we have several CLI and Tools markdown README documentation in miscellaneous GitHub repos that we're in the process of migrating over to the main Docs site section. This last item would be another task we'd incoropate as part of our goal to finalize our 2022 AsyncAPI Docs Information Architecture makeover, which is not only mentioned in one of our OSS blog posts titled ["Change is coming to our AsyncAPI Developer Documentation"](https://www.asyncapi.com/blog/changes-coming-docs), but is also extensively documented in our [AsyncAPI Docs GitHub Project Board](https://github.com/orgs/asyncapi/projects/8). 

We've also started voluntary OSS bi-weekly updates via GitHub Gists to speak about the latest updates made in the AsyncAPI Docs Ecosystem. Due to our commitment to investing time in gaining interest in our community and getting Google excited about us, we've made sure to maintain updates about our `Google Season of Docs 2022` application too! In fact, you can take a look at the latest three where we made said mentions here in [AsyncAPI Docs update (31 Jan - 11 Feb 2022)](https://gist.github.com/alequetzalli/94ca1ffb5d123b450501e40a4a3b56e2), [AsyncAPI Docs update (14 Feb - 25 Feb 2022)](https://gist.github.com/alequetzalli/d34e3aececa49d10d0ddb2dc9938b477), and [AsyncAPI Docs update (28 Feb - 11 March 2022)](https://gist.github.com/alequetzalli/8f449f731b919193f4101098a69da14d).

### 📏 Measuring our Docs project’s success
How will you know that your new documentation has helped solve your problem? What metrics will you use, and how will you track them?

We will measure success in Docs project’s success partially by capturing specific feedback about the IA changes via our soon-to-come new [Docs Feedback card](https://github.com/asyncapi/website/issues/453). Some of you may remember even from our Gist Docs updates that Design contributors were teaming with Docs on `/website`issue [#453](https://github.com/asyncapi/website/issues/453) for the ideation and development of our new **feedback card** that will be added at the bottom of each Docs page. What the community decided over the last 2 weeks was that the `Submit feedback` button in the card will publish the feedback anonymously via the AsyncAPI bot and create a new **GitHub Discussion** with said feedback:

<img width="500" alt="Screen Shot 2022-03-10 at 8 47 22 PM" src="https://user-images.githubusercontent.com/19964402/158282499-a50737c0-a669-417d-99ae-a91ab21a0c07.png">
<img width="500" alt="Screen Shot 2022-03-10 at 8 48 47 PM" src="https://user-images.githubusercontent.com/19964402/158282500-a29c953b-e333-455f-b5bb-c1d2491fef2a.png">

The other way we will measure success is...

**
GloriousPickle receives an average of ten pull requests a quarter to add or update new ingredients (tagged ‘ingredient’). The majority of these pull requests (>60%) are from previous contributors. We believe that this improved documentation will result in more pull requests and more pull requests from new contributors. Since most of our active contributors began by adding ingredients, we also think improving this documentation will result in more active contributors overall.

We will track two metrics (number of ingredient-related pull requests and number of pull requests from new contributors) monthly after the documentation is published. We will also track the number of contributors who have made more than three contributions overall, starting quarterly after the documentation is published.

We would consider the project successful if, after publication of the new documentation:

The number of ingredient-related pull requests increases by 20%
The number of pull requests from new contributors increases by 15%
The number of contributors who have made >3 contributions increases by 10% (beginning the quarter after the documentation is published)




### ⌛ Timeline
How long do you estimate this work will take? Are you able to breakdown the tech writer tasks by month/week?

The project itself will take approximately six months to complete. Once the tech writer is hired, we'll spend a month on tech writer orientation, then move onto the audit and friction log, and spend last few months focusing on creating the documentation.


Dates	Action Items
May	Orientation
June - August	Audit existing documentation and create friction log
September - October	Create documentation
November	Project completion




### 💸 Project budget
General guidelines
You can include your budget in your proposal, or as a separate link. If your budget is fewer than ten items, we recommend including it in your proposal.
All budgets should be in US dollars. We expect grants to range from US$5000 to US$15000; if your project is outside of that range, please provide additional information to justify your budget.
We expect the bulk of your budget (60-70% minimum) to be allocated to the technical writer working on your project. We recommend budgeting on a per-project basis wherever possible.
We expect open source projects to use open source tools whenever possible; if your project absolutely requires funds for proprietary software licenses or support, please include a justification for the amount.
Other possible expenses include:
Design work to create branding, logos, templates, or other design assets for your documentation site
Minimal amounts (<US$200) for project swag (t-shirts or stickers for your participants). If you use the Season of Docs logo, it must be accompanied by your project or organization logo or name. Your swag may not use the name Google.
Minimal stipends for volunteers who take on considerable mentorship or guidance roles in the project (we recommend no more than $500 per volunteer, please)
Downstream donations to other open source projects should be no more than 10% of your budget total.
Include other budget items as needed, along with justification for the amount sought. Expense justifications should highlight how the expenditure will contribute to the success of the project as a whole.


https://developers.google.com/season-of-docs/docs/org-proposal-template#sample_budget



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
