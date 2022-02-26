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


Below is the **project proposal** we're submitting to `GSoD 2022`. 


___ 

# Update Docs Information Architecture - AsyncAPI Initiative 

## About AsyncAPI
AsyncAPI (currently version 2.3.0, first released in 2016) is an Apache License 2.0 library under the Linux Foundation that seeks to improve the current state of Event-Driven Architectures (EDA). The AsyncAPI Initiative is a specification and growing set of open-source tools to help developers define asynchronous APIs, and build and maintain event-driven architectures. Developers familiar with OpenAPI (aka Swagger) for RESTful APIs will see strong similarities when using AsyncAPI. One common use case is generating documentation (HTML or Markdown) of an asynchronous API. The specification is both platform and language agnostic. Current tooling includes support for common message brokers such as Apache Kafka and RabbitMQ, and languages including Python, Java, and Nodejs. Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management, and beyond. Our 150+ Open-Source (OSS) contributors are EDA enthusiasts from all around the world. 


## About our Docs project

### Our current Docs problem
Our current Docs and their Information Architecture (IA) needs a major makeover. The current content buckets are far from ideal and much basic content is missing to help onboard new contributors. Users new to our API spec need `/Conceptual` docs that explain our spec terminology in more detail with engineering diagrams: people often learn visually! We also have to move our CLI docs under the Docs upcoming new `Reference` content bucket; currently we have a README version of CLI docs only. Similarly, we're adding a new and broader `/Tools` section of documentation for our tools in individual tools' GitHub repos, under a `/docs` directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way than what you see in a README. In time, we also need to add many more tutorials (i.e. Websocket, Kafka, etc) and Usecases and Troubleshooting Guides, under a new `How-To` section.


### Our Docs project’s scope
_Tell us about what documentation your organization will create, update, or improve. If some work is deliberately not being done, include that information as well. Include a time estimate, and whether you have already identified organization volunteers and a technical writer to work with your project._

We're already invested in utilizing the [Diátaxis methodology](https://diataxis.fr/) for determining our **content buckets** _(Concepts, Tutorials, Tools, How-To Guides, Reference)_, it makes sense to ADD NEW landing pages to introduce each content bucket. each content bucket landing page could include cards featuring content the community has already requested but that we still need contributions for. Instead of having a card that merely says "coming soon," we could have the cards read, "Contributors Needed." 



**** 
The GloriousPickle project (code-named PicklePlus) will:

Audit the existing documentation and create a friction log of the current documentation for the three top use cases (adding a new ingredient, adding a variant ingredient, and updating or correcting information about an ingredient).
Using the friction log as a guide for understanding the gaps in the documentation, create updated documentation for the top use cases.
Create a quick “cheat sheet” to help contributors new to pull requests and GitHub to help them be able to use our process.
Incorporate feedback from documentation testers (volunteers in the project) and the wider GloriousPickle community.
Work with the release team to update the documentation on the GloriousPickle site, and to create a process for keeping the documentation in sync with the update tool going forward.
Work that is out-of-scope for this project:

This project will not create a process for cross-linking between different spellings or names for the same ingredient.
This project will not create any GitHub tutorials; instead, the cheat sheet will link to existing material that is relevant and helpful.
We have two strong technical writing candidates for this project, and we estimate that this work will take three months to complete. The GloriousPickle PickleDocs SIG and @GloriousPicklePat (the core maintainer of the ingredient-adding API) have committed to supporting the project.



### Measuring our Docs project’s success
How will you know that your new documentation has helped solve your problem? What metrics will you use, and how will you track them?

GloriousPickle receives an average of ten pull requests a quarter to add or update new ingredients (tagged ‘ingredient’). The majority of these pull requests (>60%) are from previous contributors. We believe that this improved documentation will result in more pull requests and more pull requests from new contributors. Since most of our active contributors began by adding ingredients, we also think improving this documentation will result in more active contributors overall.

We will track two metrics (number of ingredient-related pull requests and number of pull requests from new contributors) monthly after the documentation is published. We will also track the number of contributors who have made more than three contributions overall, starting quarterly after the documentation is published.

We would consider the project successful if, after publication of the new documentation:

The number of ingredient-related pull requests increases by 20%
The number of pull requests from new contributors increases by 15%
The number of contributors who have made >3 contributions increases by 10% (beginning the quarter after the documentation is published)




### Timeline
How long do you estimate this work will take? Are you able to breakdown the tech writer tasks by month/week?

The project itself will take approximately six months to complete. Once the tech writer is hired, we'll spend a month on tech writer orientation, then move onto the audit and friction log, and spend last few months focusing on creating the documentation.


Dates	Action Items
May	Orientation
June - August	Audit existing documentation and create friction log
September - October	Create documentation
November	Project completion




### Project budget
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

## 👉🏽 How to contribute to AsyncAPI Docs
Code isn't the only way to contribute to OSS; Dev Docs are a **huge** help that benefit the entire OSS ecosystem. At AsyncAPI, we value Doc contributions as much as every other type of contribution. ❤️

To get started as a Docs contributor:
1. Familiarize yourself with our [project's Contribution Guide](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md) and our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
2. Head over to our Docs GH Board [here](https://github.com/orgs/asyncapi/projects/8).
3. Pick an issue you would like to contribute to and leave a comment introducing yourself. This is also the perfect place to leave any questions you may have on how to get started. 
4. If there is no work done in that Docs issue yet, feel free to open a PR and get started!

### 🏷 Tag me in your AsyncAPI Doc PRs
Do you have a documentation contributor question and you're wondering how to tag me into a GitHub discussion or PR? Never fear!

Tag me in your AsyncAPI Doc PRs or [GitHub Discussions](https://github.com/asyncapi/community/discussions/categories/docs) via my GitHub handle, [`/alequetzalli`](https://github.com/alequetzalli) 🐙.
