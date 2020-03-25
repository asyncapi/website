---
title: "Full automation of release with GitHub Actions and Conventional Commits for non-JS projects - part 2"
date: 2020-03-26T06:00:00+01:00
type: blog
featured: true
tags:
  - GitHubActions
  - Release
  - Generator
cover: /images/posts/robot2.jpg
weight: 100
authors:
  - name: Lukasz Gornicki
    photo: /images/avatars/lpgornicki.png
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
---

> tl;dr
[Here](/blog/automated-releases/) you can find the first blog post about automated releasing. Purpose of this blog post is to show how you can do the same automation in non-JavaScript projects. Even if tooling is created with JavaScript, you can still use it in other projects and don't freak out.

This post and the [previous one](/blog/automated-releases/) is based on the experience we gained when working of full automation for all tools maintained by [AsyncaPI Initiative](https://github.com/asyncapi/asyncapi/).

> [AsyncAPI](https://github.com/asyncapi/asyncapi/) is a specification that you use to create machine-readable definitions of your event-driven APIs. 
<iframe src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>

The previous post focused on JavaScript as our first library that we automated was our [generator](https://github.com/asyncapi/generator/). It covered publishing to NPM and usage of JavaScript community ecosystem.

To automate release in efficient way, you need two things:
- Machine-readable information that allows you to identify if given commit is release-triggering or not.
- Tooling that you can easily plugin and configure without a need of writing everything from scratch.

This is possible thanks to the following:
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Purpose of Conventional Commits is to make commits not only human-readable but also machine-readable. It defines a set of commit prefixes that can be easily parsed and analyzed by tooling.
- [Semantic Release](https://github.com/semantic-release/semantic-release) package and related plugins that support Conventional Commits.

Where's the catch?

## Chapter 1

tbc... 

## Chapter 2

tbc...

## Conclusion

If you think this blog post is not clear and is missing some more explanation, you most probably did not write the first part of the automation story. I highly recommend you to read [Full automation of release to NPM and Docker Hub with GitHub Actions and Conventional Commits](/blog/automated-releases/). I also recommend to [join our Slack](https://www.asyncapi.com/slack-invite/) for further discussion.

<br><br>
> Cover photo by [Rock'n Roll Monkey](https://unsplash.com/@rocknrollmonkey) on Unsplash