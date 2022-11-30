---
title: "Avro Schema Parser and others in AsyncAPI Initiative Status Update (week 31, 2020)"
date: 2020-07-30T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/asyncapi-avro.webp
weight: 10
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## Avro Schema Parser

### Short Intro to Schema Types in AsyncAPI

There are many different schema formats that one might use to describe the message payload. Not everyone uses JSON Schema. There are multiple formats out there, like RAML 1.0 Data Types, Avro, or even OpenAPI 3.0. When you write your AsyncAPI file, you should not manually convert schemas that you already store somewhere in a format different from AsyncAPI Schema. The best practice is to reuse existing schemas by referring to them in your AsyncAPI file and making sure that the Message object has information about the schema format within the schemaFormat parameter. 

AsyncAPI [lists schema types](https://www.asyncapi.com/docs/specifications/2.0.0/#messageObjectSchemaFormatTable) that are a MUST but is not limited to this list only. RAML Data Types is not a MUST HAVE, yet we already have a custom parser for it.

From the AsyncAPI tooling perspective, we have a [basic JavaScript Parser](https://github.com/asyncapi/parser-js/) capable of parsing schema of the payload provided with AsyncAPI schema format or JSON schema format. Other schema parsers are plugins that you can register with a parser, like [OpenAPI 3.0](https://github.com/asyncapi/openapi-schema-parser) or [RAML 1.0 Data Types](https://github.com/asyncapi/raml-dt-schema-parser). You could provide such plugins as well for your custom formats.

### Avro Parser

The 3rd plugin that we now officially support is related to Avro schema type. The first minor version is already out there, and you can give it a try, even if your schemas are in the Confluent Schema Registry. Have a look at the docs of [the Avro schema parser](https://github.com/asyncapi/avro-schema-parser). The Avro parser is also part of the latest release candidate of [the Generator](https://github.com/asyncapi/generator/). Please help us make it work for you.

## Circular References in AsyncAPI

Now JavaScript Parser can handle circular references that you might have in your AsyncAPI files. The current implementation fully dereferences circular references, and you cannot change this behavior. We also extended the API to help you out to deal with circular references:

- The core AsyncAPI model now contains the hasCircular() function that you can use to determine at the very beginning if a given AsyncAPI document contains some circular references or not. An example use case for it is to throw a proper error message to the user with a clear message that circular references are not supported by your tool at the moment,
- The Schema model contains isCircular() function to check if a given schema is circular, so you do not have to detect it on your own and adequately react

Have a look at [this](https://github.com/asyncapi/parser-js/pull/94/files) pull request for implementation details. The work is still in progress as nice features in the Parser do not mean now all the Generator’s templates will support it. Have a look at [this](https://github.com/asyncapi/parser-js/issues/83#issuecomment-659958312) comment if you need more details.

## TypeScript Support in Parser

Since Parser 0.27 we will now always generate [TypeScript types](https://github.com/asyncapi/parser-js/blob/master/types.d.ts) to make it much easier for TypeScript developers to use Parser in their tools.

## Generator Release Candidate 7 is out

We just released another release candidate that contains a lot of improvements that we added to the Parser. It also includes the above mentioned `avro-schema-parser` so it is easier for you to test it out. Give it a try.

## The Highlight of Interesting Discussions

### Publish vs Subscribe Discussion Continues

We noticed that people that interact with AsyncAPI for the first time are confused about the meaning of those two words, publish and subscribe. Without going much into detail and oversimplifying things, we can say that this is the part of the community that considers using AsyncAPI to describe their internal broker-centric architecture. In such cases, you want to describe the application's behavior and not what others can do with it. You want to use the Publish verb to specify that your application publishes to a given channel. What if your application is exposed to the outside world where others can interact with it? You want Publish to mean something different, like it is now, that it means your application is subscribed to a given channel, so that you can publish to it, and the application will receive a message. 

Event-driven architectures are complex beasts with many patterns, and we should try to make AsyncAPI a single home for all of them. Please engage in this discussion, share your thoughts, and help us out to find the best solution:

- [Proposal](https://github.com/asyncapi/asyncapi/issues/390) to solve the above challenge with a view property that will not require 3.0 release. There is also an idea to introduce more verbs.
- [Recording](https://www.youtube.com/watch?v=U6h7LwdEr0w) of the last open SIG meeting where there was a discussion about publish/subscribe confusion.

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 21st of July, 4PM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/404). 

The next meeting is scheduled for next [Tuesday, 4th of August, 8AM UTC](https://everytimezone.com/s/6df9fcca). 

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/417). At the moment, there is nothing in the agenda so you can sneak in your topic easily. 

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Curated Content

- [Pulsar vs. Kafka — Part 1 — A More Accurate Perspective on Performance, Architecture, and Features](https://streamnative.io/blog/tech/pulsar-vs-kafka-part-1) - [StreamNative](https://streamnative.io/) view on Apache Pulsar vs Apache Kafka
- [Kafka vs. Pulsar vs. RabbitMQ: Performance, Architecture, and Features Compared](https://www.confluent.io/kafka-vs-pulsar/) - [Confluent](https://www.confluent.io/) view on Apache Kafka vs Apache Pulsar
- [How to Write Your First AsyncAPI Specification](https://nordicapis.com/how-to-write-your-first-asyncapi-specification/) - by [Thomas Bush](https://nordicapis.com/author/thomas_bush/)
