---
title: 'AsyncAPI @Hacktoberfest'
date: 2020-09-30T06:00:00+01:00
type: Community
tags:
  - Hacktoberfest
cover: /img/posts/hacktoberfest.webp
weight: 10
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

<Warning
title="HacktoberFest 2020 has finished"
description={
<span>Check out our <Link href="/blog/hacktoberfest-summary-2020" passHref><a>summary blog post</a></Link>. There are lots of good insights!</span>
}
/>

## What is AsyncAPI

AsyncAPI is a specification for describing your [event-driven architecture](https://www.asyncapi.com/docs/getting-started/event-driven-architectures/). You are probably using already [OpenAPI/Swagger specification](https://www.asyncapi.com/docs/getting-started/coming-from-openapi/) for describing your synchronous RESTful APIs. AsyncAPI is something that supplements OpenAPI. As an example, you should use AsyncAPI when your services do not talk to each other directly but through a message broker.

In contrast to the OpenAPI Initiative, AsyncAPI Initiative is focused not only on creating and evolving the AsyncAPI specification but also on its tooling. It is a vendor-neutral space for the community to work together on the spec and its tools. We work on tools like specification parsers or docs and code generators.

<YouTube id="pU71J-F7pfI" />

## What Is Hacktoberfest And Why AsyncAPI Initiative Joins It

[Hacktoberfest](https://hacktoberfest.digitalocean.com/) is a well-known event that promotes open source contributions. In short, you have the entire October to submit four pull requests to any project you want, and in exchange, you get a super cool t-shirt. Is that it? Is it just for a t-shirt? Nah, the t-shirt is nice but what you also get is easy access to open source world. Maintainers of many projects open up for contributions, and it is a great chance to make your first step to joining this fantastic world.

AsyncAPI Initiative joins the Hacktoberfest for two main reasons:

- Promote AsyncAPI Initiative as a place where we don't work on the specification only but also build a lot of great tools
- Make it much easier for the community to make the first contribution to one of the AsyncAPI repositories

In the past, we were also there where you are now, shy and uncertain if we can impact open source community. We want to give you an easy path to take the first baby steps in the world of open source in a welcoming and friendly environment.

> Don't forget to [sign up](https://hacktoberfest.digitalocean.com/) to the Hacktoberfest

<YouTube id="_1WRr3Ml9t4" />

## How Can You Help

There is always a lot of work waiting out there. For the sake of this special event, we prepared around 75 GitHub issues that you can pick up. They represent different areas (for example, JavaScript or HTML), different difficulty (for example, 50 issues are easy), and different repositories. No matter if they are trivial or demanding, all of them are important for us. Even with trivial ones where you, for example, need to remove a semicolon, we will still be super happy because this will improve the quality of the project (SonarCloud reports). In other words, every single issue from [this](https://docs.google.com/spreadsheets/d/1vX4J395apexutfQ0OSqPNltFKDacmemHZwCmOXwHNLo/edit?usp=sharing) list is important.

### 1. Pick The Right Issue

[Here](https://docs.google.com/spreadsheets/d/1vX4J395apexutfQ0OSqPNltFKDacmemHZwCmOXwHNLo/edit?usp=sharing) you can find a list of all the issues that you can work on. Most of the issues are about code contribution, but not all of them. There are also issues about documentation or CI/CD configuration (we use GitHub Actions). Just pick the issues you want to work on, one at a time, and let us know in the comments section that you want to work on it.

<YouTube id="Iqs_2BiNEEo" />

### 2. Setup Your Environment And Create A First Pull Request

Once you [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your machine and get a [GitHub account](https://github.com/join), you need first to decide if you are here just for Hacktoberfest or longer, and make sure if your issue is easy and maybe you can complete it in the GitHub UI.

In case you are here just for the Hacktoberfest, and you picked easy issues that involve changes only to a single file, there is no need to install Git and complicate your life. GitHub UI enables you to [make changes to a single file online](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files).

In case you:

- want to stay with us longer,
- you picked up an issue where you need to make changes to more than just one file,
- you also need to run the project locally to check if it works

Then follow [this](https://github.com/asyncapi/community/blob/master/git-workflow.md) short instruction on how to fork the repository and set it up locally.

Once you are ready with your changes, submit a pull request. Be nice and follow our [code of conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md) and make sure your pull request is [described properly](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md#conventional-commits).

<YouTube id="BsC5tu4M1rw" />

## Office Hours

Do you feel overwhelmed? No need. You can do it. Just take this blog post seriously.

Trust me when I write that every pull request is crucial for us.
Trust me when I write that we are a welcoming community.
Don't be afraid that you will waste our time. If we would think about it this way, we would not even join the Hacktoberfest.

Still not sure if you can make it? Don't worry. We want to host office hours throughout the event, 2x a week, 1h long, and different time zones. You can join whenever you want and ask us anything, or do pair programming with us. We start with the first meeting on [Tuesday 6th, 8AM UTC](https://calendar.google.com/calendar/u/0/embed?src=c_q9tseiglomdsj6njuhvbpts11c@group.calendar.google.com) and then on the following days:

- Tuesday 6th, 8AM UTC
- Thursday 8th, 4PM UTC
- Tuesday 13th, 8AM UTC
- Thursday 15th, 4PM UTC
- Tuesday 20th, 8AM UTC
- Thursday 22nd, 4PM UTC
- Tuesday 27th, 8AM UTC
- Thursday 29th, 4PM UTC

We stream to our official media accounts:

- https://www.twitch.tv/asyncapi
- https://www.youtube.com/asyncapi
- https://twitter.com/AsyncAPISpec

You can also join us in a more asynchronous discussion on [Slack](https://www.asyncapi.com/slack-invite/). For updates and latest news, the best is to follow our [Twitter account](https://twitter.com/AsyncAPISpec).

## Blooper Reel

Before you jump to your first contribution, have a look at the making of the videos. It was quite fun.

<YouTube id="anjcF2l0lGs" />

Enjoy the Hacktoberfest!
