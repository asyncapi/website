---
title: "AsyncAPI Initiative Status Update (week 29, 2020)"
date: 2020-07-14T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/asyncapi-sonarcloud.webp
weight: 10
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## Increasing the quality of tools with SonarCloud

We enabled [SonarCloud](https://sonarcloud.io) for the most critical AsyncAPI tools that are reaching or already reached 1.0.0 release. Luckily this amazing software is available for free for open-source projects.

1.0.0 release is something serious, and we wanted to make sure that we have an automated way of checking the code quality and security. Now every pull request is validated for the following projects:

- Generator
- Parser
- Custom schema parsers for OpenAPI schema and RAML data types

The quality of those projects is visible [here](https://sonarcloud.io/organizations/asyncapi/projects). We additionally validate code with [ESLint plugin from SonarCloud](https://github.com/SonarSource/eslint-plugin-sonarjs). 

With the Parser we went even one step further, and we now statically check the security of the code also with the [ESLint security plugin](https://github.com/nodesecurity/eslint-plugin-security).

Looking at the quality of SonarCloud we will roll it out to the rest of the project under AsyncAPI GitHub organization.

## Parser 1.0.0 right behind the corner

Recent releases in the JavaScript Parser, brought many new features to the parser:

- Server variables validation. Parser throws an error if you forgot to specify a Variable object for a variable used in the server URL like `url: api.streetlights.smartylighting.com:{port}` where `{port}` is a variable.
- Channel parameters validation. Parser throws an error if you forgot to specify a Parameter object for a parameter used in the channel name like `event/{streetlightId}/lighting/measured` where `{streetlightId}` is a parameter.
- We added missing validation of the payload provided with the AsyncAPI schema format. In the past, when you provided a message payload information in Components object, it was correctly validated, but not if you provided this information directly under the channel.
- Parser throws an error if OperationId is duplicated across the whole AsyncAPI document. This is an essential property for code generation, and specification is precise that duplicates of this information are not allowed.
- Parser throws an error if you provided server security information in a wrong format and has a corresponding Security Schema object.

For today, except for [handling circular references issue](https://www.asyncapi.com/blog/status-update-27-20/#circular-references) I mentioned in my last update, there are no other serious tasks we want to solve before the 1.0.0 release. Keep your fingers crossed.

## The Highlight of Interesting Discussions

There are some interesting discussions/topics where it would be great to hear your opinion.

### Add view property in the specification

This proposal addresses the confusion around the semantics of Publish and Subscribe channel operations. At the moment, the specification should be used to describe how users can interact with an application. In other words, if the AsyncAPI document of the application says that it **has a publish channel**, it means that this application is **subscribed to this channel**, and application users can publish an event to this application by publishing an event to this channel. Community proposal behind the `view` property is to enable you to decide if you want the specification to tell you how you can interact with an application, or how the application behaves. You could say that publish means that the application published events to the channel and not the other way around. 

Please have a look at [the corresponding issue](https://github.com/asyncapi/asyncapi/issues/390) and share your opinion.

### Allow $schema property in the specification

With `$schema` property you can specify a location of the JSON Schema file and most of the IDEs will make your life much easier by adding auto-completion and other super useful functionalities. In the issue we discuss how we could allow maybe not only `$schema` but any property starting with `$`, and also we talk about the opportunity to measure the adoption of the specification. 

Please have a look at [the corresponding issue](https://github.com/asyncapi/asyncapi/issues/377) and share your opinion.

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 7th of July, 8AM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/401).

The next meeting is scheduled for next Tuesday, 21st of July, 4PM UTC. 

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/404). At the moment, there is nothing in the agenda so you can sneak in your topic easily. 

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Curated Content

Some articles you might want to read to learn something new:

- [Event-Streaming: An Additional Architectural Style to Supplement API Design](https://www.asyncapi.com/blog/event-streaming-an-additional-architectural-style-to-suplement-api-design/) by [James Higginbotham](https://twitter.com/launchany)
- [How to mitigate unhappy paths with an event-driven architecture at scale](https://blogs.mulesoft.com/dev/design-dev/event-driven-architecture-for-unhappy-paths/) by Paul Taylor
- [Understanding Event Driven Architecture](https://hackernoon.com/understanding-event-driven-architecture-ub1k3umo) by [Craig Godden-Payne](https://twitter.com/DigitalBeardy)
