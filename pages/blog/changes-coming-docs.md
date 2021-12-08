---
title: "Change is coming to our AsyncAPI Developer Documentation"
date: 2021-12-07 06:00:00 +0100
type: Engineering
tags:
  - Documentation
  - Announcement
cover: /img/posts/changes-coming-docs/mind-map.webp
authors:
  - name: Alejandra Quetzalli
    photo: /img/avatars/canela-ale.webp
    link: https://www.linkedin.com/in/alejandra-quetzalli/
    byline: AsyncAPI Dev Docs are getting a makeover!
excerpt: Did you know that you can contribute Docs to AsyncAPI as well? Code isn't the only way to contribute to OSS; Dev Docs are a huge help that benefit the entire OSS ecosystem.
featured: true
---

## 🦄 Hola, soy Alejandra Quetzalli

¡Hola! 😄

AsyncAPI community, it's an absolute pleasure to meet you. My name is Alejandra. I was born and raised in México 🇲🇽, so my first language is Spanish.

I’m a Senior Technical Writer 👩🏻‍💻 recently hired by [Postman](https://www.postman.com/alejandra-quetzalli) to focus solely on the Open-Source (OSS) [AsyncAPI initiative](https://www.asyncapi.com/) as primary owner for our AsyncAPI Dev Docs 📄 . 

I also recently [joined our initiative's Technical Steering Committee (TSC)](https://www.asyncapi.com/community/tsc)! The TSC is responsible for the oversight of the AsyncAPI Initiative, helping make decisions on a higher level, or when maintainers cannot find a consensus.

By the second day, I was already working on community Pull Requests (PRs) and getting to know more of our community members. This direct engagement with community feels amazing, because I really **_do_** want to help as much as I can. I'm excited to listen what our OSS community thinks needs to be documented first.

Before I tell you more details about upcoming changes to the Docs and how you can contribute to them, I also want to share more granular details about my work here within our OSS community.

***

### 👩🏻‍💻 What I do for AsyncAPI Docs
- **Own the docs for the AsyncAPI feature set** — documenting this specific area of our Open Technologies function and driving all docs efforts around it.
- **Plan documentation in conjunction with OSS community feedback** — working with open-source communities to learn about a feature from specifications and user research.
- **Collaborate closely with Developer Relations to ensure docs, educational, and learning materials align with community needs:** this includes assisting with documentation, tutorials, and all education efforts within AsyncAPI.
- **Conduct editorial reviews on community doc drafts**— providing constructive and kind feedback that helps colleagues to grow.
- **Liaise with stakeholders** across the AsyncAPI Initiative to establish and address docs needs.
- **Maintain [AsyncAPI Docs GitHub Discussions](https://github.com/asyncapi/community/discussions/categories/docs)**.
 
***


## 💄 AsyncAPI Docs are getting a makeover!
Now that I've introduced myself, my role, and high-level goals, I wanted to tell you more about some of the cool stuff coming up for AsyncAPI Docs. Pretty big changes are coming to our Dev Docs; in fact, our first "big" item to tackle will be giving the Information Architecture (IA) a makeover!


#### 😭 Why do we need to make so many changes?
The current docs and repo READMEs were(are) made with much care and love, but with growth comes change, and with change comes improvements! 

In our case, we need to add...
- **Conceptual docs** that explain our spec terminology in more detail that include **engineering diagrams**: people often learn visually! 
- **Many more tutorials**. _(i.e. Websocket tutorial)_
- **CLI docs** under a **Reference** content bucket.
- A **tools section**! Currently we have documentation for our tools in individual tools' GitHub repos, under a `/docs` directory. Those should still remain there and continue to be maintained, but they also need to be documented in our Docs in a less informal way that what you see in a `README`.
- **Usecases** and **Troubleshooting Guides**, under a new _How-To_ section.


#### 🪣 Agnostic Content Buckets, coming right up
Engieering Documentation can and should be divided into _agnostic_ content buckets.

Currently, our documentation has the following content buckets:
- Getting Started
- Tutorials
- Specification
- Community

In upcoming months, the plan is to change it to the following content buckets instead:
- Concepts
- Tutorials
- Reference
- How-To 
- Tools

Why, you wonder? 

It was important (and exciting!) to me to introduce best practices from the [Diátaxis Framework](https://diataxis.fr/) for our new content buckets.

![Diátaxis framework](/img/posts/changes-coming-docs/diataxis.webp)

The Diátaxis engineering documentation system classifies content under 4 main _agnostic_ buckets. This approach for Information Architecture (IA) and User Flows in dev docs is currently upheld widely within the tech industry. _(i.e. One current live example is GatsbyJS, which also uses the Diátaxis system for their Dev Docs. If you want to see a longer list of companies using it, go over [here](https://diataxis.fr/adoption/).)_

#### The Diátaxis 4-Part Classification System:
- **concepts:** Defining concepts within a technology's features and capabilities.
- **how-to:** Solve a problem or advanced use case by doing.
- **tutorial:** Learn a beginner process or concept by doing.
- **reference:** Learn how to set up your development environment, CLI, APIs, etc.


#### 💁🏻‍♀️ How does the Diátaxis system apply to an actual technology?
Let’s take a look at the following Mind Map.

![Mind Map, displaying Diátaxis system applied to documenting AsyncAPI capabilities](/img/posts/changes-coming-docs/mind-map.webp)

Here we see that the AsyncAPI _CLI_ and _Spec_ fall under the `Reference` bucket. The `Concepts` bucket details AsyncAPI's specification concepts and terms that deserve to be covered in more detail. But when it comes to understanding the difference between what fits under a `Tutorial` vs. a `How-To` bucket, it feels harder to understand.

Let’s make the subtle difference between the audiences for `Tutorial` and `How-To` buckets clearer.

***

##### The Tutorial bucket

Think of a Tutorial as something that you need to teach a user that is new to your technology.
- A first-time AsyncAPI user.
- A user who is new to APIs **AND** AsyncAPI.

##### The How-To bucket

Think of a How-To as the bucket to address problems and advanced scenarios that you already know your users will encounter. These problems tend to fall under unique usecases or advanced troubleshooting guides that a more active user would encounter.

- How to generate documentation from an AsyncAPI file
  - How to generate a standalone static website with documentation
  - How to generate documentation in a component that you can embed in an existing website
  - How to generate markdown
  - How to generate PDFs
- How to reuse schema definitions from an OpenAPI file with an AsyncAPI file

- Organising your AsyncAPI files
- Generating documentation from your AsyncAPI files
- Describing WebSocket APIs with AsyncAPI
***

## 👉🏽 How to contribute to AsyncAPI Docs
Did you know that you can contribute Docs to AsyncAPI as well? Code isn't the only way to contribute to OSS; Dev Docs are a **huge** help that benefit the entire OSS ecosystem. At AsyncAPI, we value Doc contributions as much as every other type of contribution. ❤️


To get started as a Docs contributor:
1. Familiarize yourself with our [project's Contribution Guide](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md) and our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
2. Head over to our Docs GH Board [here](https://github.com/orgs/asyncapi/projects/8).
3. Pick an issue you would like to contribute to and leave a comment introducing yourself. This is also the perfect place to leave any questions you may have on how to get started. 
4. If there is no work done in that Docs issue yet, feel free to open a PR and get started!

### 🏷 Tag me in your AsyncAPI Doc PRs
Do you have a documentation contributor question and you're wondering how to tag me into a GitHub discussion or PR? Never fear!

Tag me in your AsyncAPI Doc PRs or [GitHub Discussions](https://github.com/asyncapi/community/discussions/categories/docs) via my GitHub handle, [`/alequetzalli`](https://github.com/alequetzalli) 🐙.


## 🙂 Talk to me
I want and need to listen 👂🏽 to all of your perspectives and ideas. Please don't be shy to express to me what you think needs to be documented first or what is missing. 📝

There's a lot of good work ahead, but **you** determine _our content roadmap_ because the OSS community needs should always come first.✨




---
> Photo from <a href="https://diataxis.fr/">Diátaxis</a> on <a href="https://diataxis.fr/">Diátaxis framework</a>
