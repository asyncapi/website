---
title: "How Microcks Can Speed-Up Your AsyncAPI Adoption - Part 1"
date: 2020-11-11T19:00:00+01:00
type: Engineering
tags:
  - Testing
cover: /img/posts/microcks-asyncapi-part1/microcks-1.0.0-loves-asyncapi.webp
authors:
  - name: Laurent Broudoux
    photo: /img/avatars/lbroudoux.webp
    link: https://twitter.com/lbroudoux
    byline: Microcks.io Founder
---

August 11th 2020 was the official announcement of [Microcks 1.0.0](https://microcks.io/blog/microcks-1.0.0-release/) release and our first Microcks General Availability (GA) version to fully manage event-driven API through the support of [AsyncAPI](https://www.asyncapi.com/) specification. **This first post explains why we decided to start this project and provides more insights.**

For those who don't know [Microcks](https://microcks.io) yet: it is the ultimate Open source Kubernetes Native tool for Mocking and Testing all your APIs. With Microcks, you can turn your API contract, collection or SOAP UI projects into live mocks in a few seconds. For further information, please read ["Why Microcks ?"](https://microcks.io/blog/why-microcks/).

We are following the [AsyncAPI](https://www.asyncapi.com/) specification initiative since day one and I clearly remember how the [first announcement back in 2017](https://blog.hitchhq.com/introducing-the-asyncapi-specification-7feb57b460ae) resonated within our team ! We shared the same principles: Open source and community driven... and last but not least, 100% aligned with our vision that open specifications standards like [OpenAPI](https://www.openapis.org/) is the ultimate way to move forward and perpetuate our mantra: unlock developers potential in an unpredictable and strongly innovative environment!

Since then, we have been in touch with our mutual communities and strategic users to see if we all embrace the idea of adding AsyncAPI testing and mocking support within Microcks. 
Microcks community was very enthusiastic by the idea and problem this integration can solve. We have helped some users on their AsyncAPI use cases to grab valuable feedback on how to manage Microcks event-driven API integration. We learned a lot from different vertical industries, including tricky IoT & Edge computing or fintech implementations.

Our communities clearly validate that it makes sense to have the same tool managing all their API whatever the type, open contract definition or design tool used. This is why, today Microcks supports open standards for contract definitions and mainstream open collaborative tools:

![microcks-supported-standards](/img/posts/microcks-asyncapi-part1/microcks-supported-standards.webp)

It took us a year to make, which explains why Microcks 1.0.0 release is already GA and the first tool on [this topic](https://www.asyncapi.com/docs/tools#mocking) :wink: 

![asyncapi-tool-tweet](/img/posts/microcks-asyncapi-part1/asyncapi-tool-tweet.webp)

This is a major step forward as we are convinced that the transition to cloud-native applications will strongly embrace event-based and reactive architecture. Thus the need to speed-up and govern event-based API like any other services mocking using Microcks will be crucial and a key success factor for any modern and agile software developments.

Microcks 1.0.0 provides a solid platform for simulating event-based API using message broker technologies like [Apache Kafka](https://kafka.apache.org) even before the publishing component has been developed. And once developed, it is then capable to validate that all the publisher sent events will be compliant with the defined specification, automatically from a CI/CD pipeline.

To demonstrate our commitment/vision and to [improve AsyncAPI specifications](https://www.asyncapi.com/blog/status-update-37-20/#proposal-for-more-formal-examples) on our favorite topic: testing & mocking, we have launched an upstream feature request in order to provide a formal type for message examples.

![call-to-action](/img/posts/microcks-asyncapi-part1/call-to-action.webp)

Please have a look at [this proposal #329](https://github.com/asyncapi/asyncapi/issues/329) and share your opinion. At the moment, it is a part of [AsyncAPI 2.1 milestone](https://github.com/asyncapi/asyncapi/milestone/17).

 ** In the next article, we will focus on Microcks + AsyncAPI use cases. Stay tuned.**

> And if you can't wait for text explanataions, do not hesitate having a look at the [AsyncAPI SIG Meeting #34 recording](https://www.youtube.com/watch?v=pmRA4M-TWuE) for full illustrations of the capabilities. :wink:
