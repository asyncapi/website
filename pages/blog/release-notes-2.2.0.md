---
title: AsyncAPI Spec 2.2.0 Release Notes
date: 2021-09-28T06:00:00+01:00
type: Communication
tags:
  - Release Notes
  - Specification
cover: /img/posts/release-notes-2.2.0/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: '2.2 release of AsyncAPI specification is here. The long-awaited feature for assigning channels to servers is finally here.'
---

I'm happy to share that AsyncAPI specification 2.2.0 is here. Check out all the goodies that it brings.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.1.0'` into `asyncapi: '2.2.0'`

## Assigning channels to servers

This feature allows the definition of AsyncAPI documents for applications with more selective use of channels and servers. An example is message protocol adapters that consume messages from one server (say, Kafka) and publish those messages to another server (say, Anypoint MQ).

Now you can add a new **servers** property to [Channel Item Object](https://github.com/asyncapi/spec/blob/v2.2.0/spec/asyncapi.md#channel-item-object). It must be a list of server names provided as a string.

```yaml
description: This application publishes WebUICommand messages to an AMQP queue on RabbitMQ brokers in the Staging and Production environments.
servers:
  - rabbitmqBrokerInProd
  - rabbitmqBrokerInStaging
subscribe:
  message:
    $ref: "#/components/messages/WebUICommand"
bindings:
  amqp:
    is: queue
```

Names of servers must match the names of the servers defined in the [Servers Object](https://github.com/asyncapi/spec/blob/v2.2.0/spec/asyncapi.md#serversObject). This new property is optional, so moving from 2.1.0 to 2.2.0 is as easy as changing the specification version in your current AsyncAPI file. If **servers** is absent or empty, the given channel must be available on all servers defined in the Servers Object, like the previous version.

For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/531).

We heard some community members asking for this feature. It was [Gerald Loeffler](https://www.linkedin.com/in/geraldloeffler/) that decided to champion the proposal and lead it until it got released. Thank you :pray:.

## New protocol bindings

The specification is now extended to support the following custom protocols through the bindings feature:
- **Anypoint MQ**, thanks to [Gerald Loeffler](https://www.linkedin.com/in/geraldloeffler/). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/545) and [binding definition](https://github.com/asyncapi/bindings/tree/master/anypointmq).

## Become a contributor

Pushing things through into the specification is not an easy process. It requires a lot of time and patience, but it is worth it. Have a look at our [contribution guide](https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md) and start contributing.

## Conclusions

Are you wondering how we managed to release 2.2.0 just three months after 2.1.0? I recommend you familiarize yourself with the [AsyncAPI release process](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md). The next release is scheduled for January 2022. Later releases are in April, June and September, according to the agreed [release cadence](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

<img className="w-3/4" src="/img/posts/release-notes-2.2.0/brace.webp" alt="Meme showing a knight, Ned Stark from Game of Thrones. Description says: Brace yourself, all the stars in heaven say 3.0.0 version is coming." />

Does the above meme give you mixed feelings? Are you afraid of possible changes, or actually happy to see it coming? Don't overthink it! Join our [Slack](https://www.asyncapi.com/slack-invite) and talk to us, or check out the [3.0.0 milestone](https://github.com/asyncapi/spec/milestone/18).

> Photo by <a href="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Thomas</a> on <a href="https://unsplash.com/s/photos/autumn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
