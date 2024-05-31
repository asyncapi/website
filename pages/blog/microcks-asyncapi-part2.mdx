---
title: "How Microcks Can Speed-Up Your AsyncAPI Adoption - Part 2"
date: 2021-01-07T00:07:00+01:00
type: Engineering
tags:
  - Testing
  - Mocking
  - Strimzi
  - Kafka
cover: /img/posts/microcks-asyncapi-part2/microcks-kafka-distribs.webp
authors:
  - name: Laurent Broudoux
    photo: /img/avatars/lbroudoux.webp
    link: https://twitter.com/lbroudoux
    byline: Microcks.io Founder
---

On our [first AsyncAPI blog post](/blog/microcks-asyncapi-part1) we have introduced [Microcks 1.0 General Availability (GA)](https://microcks.io/blog/microcks-1.0.0-release/) as a unique milestone for mocking and testing event-driven API like any other APIs through the support of AsyncAPI specification.

In case you missed it, we have already released [version 1.1.0](https://microcks.io/blog/microcks-1.1.0-release/) in the meantime. This release includes some nice enhancements related to the topic of the day: **Microcks + AsyncAPI use cases using Apache Kafka**. This post will show you how Microcks is leveraging the AsyncAPI specification on Kafka in a very pragmatic and powerful approach: way beyond documentation or code generation! We will also go through the different business use-cases implemented by users integrating Microcks in their asynchronous API toolchain.

When we are talking about Kafka we mean all Kafka distributions translated into *the choice is yours*: from vanilla Apache upstream distribution, to enterprise products and also cloud providers’ managed distributions!

![microcks-kafka-distribs](/img/posts/microcks-asyncapi-part2/microcks-kafka-distribs.webp)

> By the way, we will be happy to have some QA [contributors and reports](https://github.com/microcks/microcks/blob/master/CONTRIBUTING.md) on more brokers and AsyncAPI supported protocols :wink:

Before diving into AsyncAPI on Apache Kafka, let first see why simulating producers is a key project success factor.

## Why simulating producers is a key project success factor?

As good developers, we are lazy - in a very good way :wink: - and hate to restart from scratch our beautiful code implementations due to misunderstanding with Product Owners. However, nowadays Product Owners adopted and love the [Fail-Fast Principle](https://www.forbes.com/sites/danpontefract/2018/09/15/the-foolishness-of-fail-fast-fail-often/). We can't rely on functional implementations to start beta testing with consumers, we should fail fast and make them change requirements before we start implementation.

Apart from generating frustrations, this above situation is also very inefficient from a cost and time to market point of view for the organization. 

The contract-first approach is a wonderful way to create strong and efficient agreements between functional / business / product owners and developers! But it represents only a partial answer to the above situation

![time-money-quality](/img/posts/microcks-asyncapi-part2/time-money-quality.webp)

To avoid unnecessary work from developers and speed-up feedback gathering from consumers, simulation is the second part of the answer. That is why Microck's first use case and the killer feature is mocking!

These are some of the reasons why the way to do mocking with Microcks is highly scalable: 
* We rely 100% on Product Owners contracts 
* We rely 100% on standards and specifications to describe contracts
* We automatically generate all APIs mocks from contracts: no code!
* We publish APIs mocks like real implementations using specifications examples 
* We centralize all contracts and are the single point of trust
* We are always in sync with your repositories: no drift anymore!
* We provide sandbox at scale. You can heavily stress tests your business rules. Remember, we are Kubernetes-native!

This is why Microcks is the ultimate way to test, iterate and speed-up your APIs validations before asking developers to code the real implementation! And this certainly applies to asynchronous API on Kafka too: thanks to [AsyncAPI specification](https://www.asyncapi.com/docs/specifications/2.0.0).

Now let’s start with first feature: mocking asynchronous API.

## Mocking asynchronous API on top of Apache Kafka

This is how Microcks value proposition of accelerating Kafka asynchronous API simulation looks like:

![microcks-kafka-mocking](/img/posts/microcks-asyncapi-part2/microcks-kafka-mocking.webp)

In a very pragmatic approach, Microcks uses your AsyncAPI specification as the source of truth for your simulation. As soon as it is imported into Microcks, it manages to create a topic for your API version on the connected Kafka broker and starts publishing mock messages. Messages are published at a configured frequency and thus consumers immediately start receiving event messages as if it is published by a real application. Thanks to Microcks’ [message templating](https://microcks.io/documentation/using/advanced/templates/) you can also easily include dynamic content in the sample messages.

Mocking event-driven architecture using Microcks is a game-changer as you do not need to write code nor set up complex infrastructure! Your consumers can receive messages in the minute. Testing some changes is just one commit away. You update the AsyncAPI specification in the Git repository and Microcks will take care of updating everything! It's even capable of providing and managing the Kafka infrastructure thanks to the excellent [Strimzi.io](https://strimzi.io/) operator if you wish! See our [Everything managed by Microcks](https://microcks.io/documentation/installing/deployment-options/#everything-managed-by-microcks) deployment option :rocket:

Our second feature is testing or how to make your delivery lifecycle reliable.

## How to make your delivery lifecycle reliable?

As the number of event producers and subscribers is exploding, managing changes and taking care of versioning compatibility is essential. And what about checking that business rules implying event triggering are correctly implemented? The fact it produces syntactically correct events and all this in a fully automated way based on each change and new commit in your source code repository?

Again this is all provided by Microcks thanks to its capability to interoperate with your CI/CD pipeline using our plugins for [Jenkins](https://microcks.io/documentation/automating/jenkins/), [Tekton](https://microcks.io/documentation/automating/tekton/) or [any other CI pipeline technology like GitLab](https://microcks.io/documentation/automating/cli/). You'll typically use these plugins to trigger a Kafka test in Microcks.

![microcks-kafka-testing](/img/posts/microcks-asyncapi-part2/microcks-kafka-testing.webp)

In Microcks, testing Kafka endpoints means connecting to a remote Kafka topic on an existing broker in the organization, listening for incoming messages, and checking that received messages are valid against the event-based API schema that is referenced in your source of truth: the AsyncAPI specification. You can find further technical details on the blog post [mocking and testing Apache Kafka API using Microcks](https://microcks.io/blog/apache-kafka-mocking-testing/).

Testing of event-driven architecture is no longer a nightmare with Microcks! Microcks can connect to the Kafka brokers in your organization and tell you if the received messages are valid according to your specification. No drifting risks anymore or way to introduce regression in production! You'll drive and control everything from your pipeline.

What are the business use-cases of AsyncAPI? Where can you use Microcks as an essential part of your toolchain?

## Business use-cases of AsyncAPI

As said before, event-driven and asynchronous APIs are becoming mainstream because we truly understand the decoupling level - and thus power and agility - it brings within our products. We see the need for asynchronous APIs and Apache Kafka's presence as the de facto standard for message brokering - everywhere.

* In every business vertical: to decouple a recording action (registration, purchase, like) to a marketing reaction (CRM update, behavioral analysis, marketing notification, renewal process management, etc...)
* In Governmental organizations: to synchronize complex and partitioned repositories using master data management and staging pipelines techniques
* In Financial Services: to streamline the sharing of information between core platforms and distribution ecosystems of partners,
* In Industry: to enable Industry 4.0 to use IoT and become more agile to respond to market unpredictability and improve quality,
* Soon in every Citizen's life: to power tomorrow Smart Cities with IoT and enable smart real-time insights and decision making.

These use cases come from companies using Microcks for simulating and testing their API implementation, and we are thankful to our users and community.

## Summary

We are convinced that cutting edge developers understand the purpose, usages, and efficiency of asynchronous mechanisms. To take all its advantages and especially to use an AsyncAPI contract-first approach: developers must work hand in hand with software architects, business/product owners within the enterprise. In our humble opinion, this is clearly a strong point of attention to improve collaboration between enterprise silos and take the quintessence of AsyncAPI specification for a contract-first approach using Microcks as the ultimate tooling for mocking and testing purposes. Please read our [previous blog post on this topic](https://microcks.io/blog/continuous-testing-all-your-apis/) and share it with your software architects :wink:

We hope these two Microcks features - mocking and testing - and application use-cases are clear and you now better understand our value proposition. Microcks proposes a very pragmatic and powerful usage of AsyncAPI specification: way beyond documentation or code generation! It allows you to speed-up and makes your delivery of Kafka event-driven architectures reliable.

The roadmap ahead is also full of exciting new features we are looking forward to: 

* Continuing to make AsyncAPI full potential bloom through implementing multiple schema format supports - like Apache Avro - and [adding examples in the spec](https://github.com/asyncapi/asyncapi/issues/329),
* Taking advantage of multiple protocol binding capabilities, releasing very soon a [MQTT implementation](https://github.com/microcks/microcks/issues/293) to support our users and prospects on the IoT landscape,
* Solidifying an initiative we started a long time ago about a shared repository of simulation and test suites for standards or products APIs...

We are open and you can help make Microcks an even greater tool! Please spread the word, send us some love through [GitHub stars](https://github.com/microcks/microcks), follow us on [Twitter](https://twitter.com/microcksio) or join our chat room on [Zulip](https://microcksio.zulipchat.com/login/).
