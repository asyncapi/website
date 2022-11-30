---
title: May 2021 at AsyncAPI
date: 2021-06-22T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/may-2021-at-asyncapi/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: 'We have JSON Schemas for bindings and some great community tools, one that was donated to AsyncAPI Initiative'
---

> Read [April 2021 at AsyncAPI](/blog/april-2021-at-asyncapi) for the update from April.

<center><iframe src="https://anchor.fm/asyncapi/embed/episodes/May-2021-at-AsyncAPI-Initiative-e1369a9" height="102px" width="400px" frameborder="0" scrolling="no"></iframe></center>

## JSON Schemas for the bindings

AsyncAPI is protocol agnostic. It doesn't mean that you cannot specify some protocol-specific information in the AsyncAPI document. It is possible through a **bindings** feature. In different parts of the AsyncAPI document, you can provide specific details for Kafka, MQTT, and other protocols. Definitions of bindings are maintained separately from the main AsyncAPI specification in the [bindings repository](https://github.com/asyncapi/bindings).

The current challenge with bindings is that they are hard to validate because they are written in Markdown, human-readable form only. Support in tooling is also pretty limited because of this. We had to start maintaining the JSON Schema, as we do with the main AsyncAPI specification. 

Thanks to a monumental effort from [Khuda Dad Nomani](https://github.com/KhudaDad414) I'm proud to say that all 15 bindings now have their JSON Schemas. So for example [Kafka binding](https://github.com/asyncapi/bindings/tree/master/kafka) has its [JSON Schemas](https://github.com/asyncapi/bindings/tree/master/kafka/json_schemas). The next step is to figure how to link these JSON Schemas with the main AsyncAPI specification JSON Schema and support it in parsers.

For more details, have a look at [this issue](https://github.com/asyncapi/spec/issues/507) and help us out to drive it further.

> Bindings are getting more and more adoption and interest. Many interesting discussions are happening that are shaping the bindings feature. I highly recommend joining them, like, for example, the debate started by [Ian Cooper](https://github.com/iancooper) to get [consistency between protocol configurations using bindings](https://github.com/asyncapi/bindings/issues/62).

## InfoQ Architecture and Design 2021

I don't think I need to write more than you can spot in this tweet :smiley:. 2021 is very generous for AsyncAPI.

<TwitterTweetEmbed
  tweetId='1391701921312948227'
  options={{
    width: 500,
    align: 'center'
  }}
/>

## Assigning channels to servers

I want to suggest you pay attention to the proposal from [Gerald Loeffler](https://github.com/GeraldLoeffler) that introduces a way to [assign a channel to a specific server](https://github.com/asyncapi/spec/pull/531). This proposal would enable you to have a single AsyncAPI document with multiple different servers supporting different protocols. You could specify that your application is subscribed to channel A on the Kafka server and that it publishes messages to Channel B on the MQTT server.

It is a feature that many asked for in the past. Please jump into the discussion. Even if you have no comments, then at least leave some emoji, so we know it was viewed and what people have an opinion.

## VSCode Plugin

[Iván García Sainz-Aja](https://github.com/ivangsa) donated to AsyncAPI Initiative the plugin he developed for the VSCode to enable you to preview AsyncAPI documents using our HTML template directly in the IDE. We need to do some cleanup and rebranding now, and then we will be ready with further development.

Any help will be highly appreciated, so please check out [the repository](https://github.com/asyncapi/vs-asyncapi-preview).

## New AsyncAPI-related tools

We have new tools on [our list](https://www.asyncapi.com/docs/community/tooling) of tools created by the AsyncAPI Community:
- [EventBridge Atlas](https://github.com/boyney123/eventbridge-atlas) from [David Boyne](https://github.com/boyney123)
> It parses AWS EventBridge schemas into documentation solutions, shows rules matched to your events, adds metadata to each event property, support slate, AsyncAPI, and docuowl output, and more...
- [Asynction](https://github.com/dedoussis/asynction) from [ Dimitrios Dedoussis](https://github.com/dedoussis)
> The purpose of Asynction is to empower a specification first approach when developing SocketIO APIs in Python

## Tests coverage tracking in tooling

To increase the quality of our tools now and maintain it in the future, we started exploring tools for tracking test coverage. We integrated [Coveralls](https://coveralls.io/) with the [Modelina](https://github.com/asyncapi/modelina) project.

<Figure
  src="/img/posts/may-2021-at-asyncapi/coverage.webp"
  className="text-center"
/>

[Jonas Lagoni](https://github.com/jonaslagoni) that actively maintains the library gave Coveralls a score of 8 out of 10. Now we need to roll it out to other projects. If you were looking for some good first issue to start contributing to AsyncAPI, then [this issue](https://github.com/asyncapi/.github/issues/30) is a good one.

> Modelina is a data models generator that supports AsyncAPI and JSON Schema. Its goal is to make it easier to write code generators. Jonas released many improvements in May and still does, so it is best to try it out now and provide feedback.

## Slack reorganization

We are growing fast, and it was the right time to do some reorg in our Slack workspace to get some structure, clean up, and properly structure discussions. In the end, yes, we are still using Slack because we got accepted as an exceptional organization and received **Standard** subscription for free :heart:.

All the official Slack channels are listed below:

<Figure
  src="/img/posts/may-2021-at-asyncapi/slack.webp"
  widthClass="w-1/2"
  className="text-center"
/>

I think that actually, the most important thing is that we defined our first version of the [Slack etiquette](https://github.com/asyncapi/community/blob/master/slack-etiquette.md).

> Photo by <a href="https://unsplash.com/@lazyartistgallery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rahul Pandit</a> on <a href="https://unsplash.com/s/photos/may?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
