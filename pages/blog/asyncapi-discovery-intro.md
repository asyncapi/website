---
type: Engineering
cover: /img/posts/asyncapi-discovery-intro/asyncapi-discovery-tool-header.webp
title: 'Align Production Reality and Event Documentation with the AsyncAPI Discovery Tool'
date: 2021-12-07T06:00:00+01:00
tags:
  - Discovery
  - Specification
  - EDA
  - Kafka
  - Solace
  - RabbitMQ
  - NATS
authors:
  - name: Jesse Menning
    photo: /img/avatars/jmenning.webp
    link: https://www.linkedin.com/in/jmenning
    byline: CTO Architect at Solace
---

The idealized world of AsyncAPI is neat and tidy:

- Interface definitions show developers exactly what events are exchanged amongst producers and consumers.
- Event contracts only change when permitted by well-defined governance processes.
- Bindings fill in the implementation details for open-source brokers like Kafka (including Confluent) and RabbitMQ along with closed-source brokers like IBM MQ and Solace.

The real world is often messier.

> This post [Align Production Reality and Event Documentation with the AsyncAPI Discovery Tool](https://solace.com/blog/asyncapi-discovery-tool/) appeared first on [Solace](https://solace.com).

In the decades-long absence of an asynchronous API spec, teams adopted (or didn’t adopt, or chose to ignore) different API definitions and governance. The result is a twisted mess of event producers, consumers, data paths, and multiple broker technologies, from on-premises to cloud connections.

Oftentimes, removing an event topic or queue requires nerves of steel, for fear it might disrupt key functionality. Many a middleware engineer has found religion during a production broker clean-up.

Thankfully, the AsyncAPI Discovery Tool offers a better way.

# How the AsyncAPI Discovery Tool Works

The AsyncAPI Discovery Tool analyzes event traffic passing through brokers like Kafka, RabbitMQ, IBM MQ, Solace, and more. After learning how the broker distributes events, the AsyncAPI Discovery Tool generates a corresponding [AsyncAPI specification](https://www.asyncapi.com/docs/specifications/latest). The generated spec can be used for code generation, documentation, visualization, infrastructure deployment, and more.

It’s a great starting point for getting events catalogued and governed.

It’s not perfect (more on that later), and there’s a lot more work to be done, but the AsyncAPI Discovery Tool helps your enterprise align production reality with AsyncAPI documentation. And perhaps relieve some tension for middleware engineers.

# Getting Started with AsyncAPI Discovery Tool

Getting started means a trip to the [SolaceLabs GitHub](https://github.com/SolaceLabs/event-discovery-agent), where you can find detailed instructions and documentation. (While Solace created the AsyncAPI Discovery Tool, it’s open-source with an Apache 2.0 license.)

The AsyncAPI Discovery Tool runs as a stand-alone Java Jar, so getting it running requires only Java and Maven. Once it’s up and running, AsyncAPI has its own self-contained UI, offering fill-in-the-blanks configuration. You can read more details about the UI ([here](https://github.com/SolaceLabs/event-discovery-agent/blob/main/docs/ui.md)).

Here’s an example for Kafka:

![Figure 1: UI for AsyncAPI Discovery for Kafka](/img/posts/asyncapi-discovery-intro/asyncapi-discovery-tool-1.webp)

Just fill in the configuration, asking your friendly local administrator for help if needed, and then click the “Start Scan” button. After grinding away, the AsyncAPI Discovery Tool returns a consolidated spec file. The AsyncAPI file describes the channels and schemas of events passing through the broker. From there, the world is your oyster: generate code, create infrastructure, or start governing your events.

![Figure 2: Resulting (greatly simplified) AsyncAPI spec](/img/posts/asyncapi-discovery-intro/asyncapi-discovery-tool-2.webp)

# The Future of the AsyncAPI Discovery Tool

The most obvious place to improve the AsyncAPI Discovery Tool is to expand the number of supported brokers. Right now, it supports:

- Apache Kafka
- Solace PubSub+
- NATS
- RabbitMQ
- HiveMQ

Fortunately, the tool was built with extensibility in mind. There is a documented plug-in architecture just itching to have more brokers added. If you’re interested, the people who maintain the tool welcome pull requests.

- The confusing `publish` and `subscribe` verbs in the output.
- The requirement that a single file must represent a single application makes it tough to get a high-level understanding of the architecture.

As the spec matures, the tooling will hopefully be close behind.

# Conclusion

In the meantime, the AsyncAPI Discovery Tool can be a huge help to enterprises that are new to AsyncAPI but experienced with event-driven architecture and messaging. The AsyncAPI Discovery Tool can start you down the road from a tangled event mess to a well-organized, fully documented, tightly governed architecture.

If you have more questions or want to share your experience with these standards, you can let us know in the [AsyncAPI Slack](https://www.asyncapi.com/slack-invite) or the [Solace Community Forum](http://solace.community/).
