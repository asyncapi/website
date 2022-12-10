---
title: 'AsyncAPI Initiative Status Update (week 37, 2020)'
date: 2020-09-09T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-33-vacation.webp
weight: 10
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

We canceled the previous status update due to the vacation cucumber season, so this status update covers the last four and not two weeks. Please familiarize yourself with many things we worked on and the exciting discussions we had.

## Template for templates development

We’ve spent a lot of time recently on tooling development. Now it is time to start working on some docs! Last few weeks, we worked on a template, a boilerplate that one can use to create a new repository to start writing their template for the AsyncAPI Generator.

The work is still in progress and will take a few weeks more, but you can already see a preview [here](https://github.com/asyncapi/template-for-generator-templates). All the Generator features are showcased there already. We are missing only example tests and readme there.

The next steps are writing a set of interactive tutorials that can explain all the features step by step, help create a super basic template, and then a more complex one.

In case you have some ideas, or maybe you want to help write those, please let us know.

## Avro 1.8.2 support

Avro schema parser now supports [Avro 1.8.2](https://github.com/asyncapi/avro-schema-parser/pull/6) and not only 1.9.0. The AsyncAPI Generator and the Playground already support the new version of the parser.

## Parser v1.0.0-rc.4

The latest release candidate includes few bug fixes, but most important is that it also introduces proper tests for the browser to make sure we avoid any future mistakes in the project that could cause browser-incompatible release.

## React component improvements

The AsyncAPI React component for rendering documentation on the client-side just reached release v0.12.1. Among all the other improvements, the most important are:

- Custom schema parsers for RAML, OpenAPI, and Avro are now also used by this component
- Better handling and rendering of `additionalProperties`
- Schemas are not presented in the tables anymore

## The Highlight of Interesting Discussions

### Proposal for more formal examples

AsyncAPI 2.0 specs allow you to specify an example of the message. You can have many examples stored in an array of maps, where the key is the name of the example, and value can be of any type. [Laurent Broudoux](https://github.com/lbroudoux) from [Microcks](https://github.com/lbroudoux) project created a proposal for better representation of examples where you can provide an example of the message payload and the headers. It means we will end up with more formal Examples object in the spec.

Please have a look at [this](https://github.com/asyncapi/asyncapi/issues/329) proposal and share your opinion. At the moment, it is a part of our AsyncAPI 2.1 milestone.

### Native support for projects like CloudEvents

[CloudEvents](https://cloudevents.io/) is a specification for commonly describing event data. AsyncAPI is a specification for describing an application's API related to asynchronous communication. In the end, users should not decide which spec is better cause they serve a different purpose. Through discussions with the community, we learned that many want to use AsyncAPI + CloudEvents + Avro.

Before AsyncAPI 2.0.0 we released [an article](https://www.asyncapi.com/blog/asyncapi-cloud-events/) where we discussed how CloudEvent could be used in an AsyncAPI document. Long story short, it was about presenting a payload of messages wrapped with CloudEvents in AsyncAPI Payload object, and how to leverage AsyncAPI custom schema format. Such an approach can lead to a lot of duplications.

CloudEvents is like an envelope for your letter. The message may include some non-business related data instead of having them separated in the headers. You do not want to mix this technical information with business information in the AsyncAPI document under one Payload field, even if this is possible.

One possible option could be to reuse AsyncAPI bindings functionality, but so far, they were used only for describing information related to specific protocols.

Please have a look at [this](https://github.com/asyncapi/asyncapi/issues/432) issue or talk to us on Slack. In short, we discuss there an option to introduce an object called Envelope.

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 1st of September, 8AM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/430).

The next meeting is scheduled for next [Tuesday, 15th of September, 4PM UTC](https://everytimezone.com/s/4347f3c8).

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/435). At the moment, there is nothing in the agenda so you can sneak in your topic easily.

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Curated Content

- [Microcks 1.0.0 release with AsyncAPI support](https://medium.com/microcksio/microcks-1-0-0-release-5a5d0dbaf212) by [Laurent Broudoux](https://twitter.com/lbroudoux)
- [Event-Streaming: An Additional Architectural Style to Supplement API Design](https://www.asyncapi.com/blog/event-streaming-an-additional-architectural-style-to-suplement-api-design/) by [James Higginbotham](https://twitter.com/launchany)
- [Choosing Between Web APIs and Message Streaming](https://www.asyncapi.com/blog/choosing_between_web_apis_and_message_streaming/) by [James Higginbotham](https://twitter.com/launchany)
