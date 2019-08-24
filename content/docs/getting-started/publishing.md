---
title: "Publishing"
date: 2019-04-13T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 120
---

{{% notice %}}
This article is about version 2.0.0-rc1 of the specification. Please note that documentation and tooling support are minimum or inexistent yet. We're working hard
to update everything to version 2.0.0 as soon as possible. Thanks for your patience.
{{% /notice %}}

In a previous lesson, we learned how to create the definition of a [subscriber application](/docs/getting-started/hello-world). Receiving (and processing) messages is an important part of an event-driven architecture but, where are these messages coming from? The publishers.

A publisher is any application that sends messages. They are the initiators of the communication.

![](/images/diagrams/simple-event-driven.png)

{{%hint%}}
A message broker is the infrastructure piece in charge of receiving the messages from the publishers and delivering them to the interested applications, i.e., the subscribers. For instance, Kafka and RabbitMQ are message brokers.
{{%/hint%}}

The publisher definition would look like the following:

{{<code lang="yaml" lines="2,4,12">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
channels:
  hello:
    publish:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

You probably have noticed that the only difference between this AsyncAPI definition and the one for the [Hello world application](/docs/getting-started/hello-world) are the lines 2, 4, and 9. The id must be unique for each application, that's the reason it is different. Since it's a publisher application, we also wanted to make it obvious in the title. In the case of the line 9, it is now `publish` because we're defining a publishing operation.

## Conclusion

From the AsyncAPI perspective, the differences between publishers and subscribers are very subtle. This level of expressiveness makes AsyncAPI documents highly explicit and self-documenting. However, it comes at the cost of duplicating a lot of information.

On the next chapter, you'll learn how to reuse messages and avoid duplication.

{{%next-chapter url="/docs/getting-started/reusing-messages"%}}
