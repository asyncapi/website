---
title: "Servers"
date: 2019-04-03T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 110
---

In this article, we will learn how to add "servers" to our AsyncAPI document. This is useful because it tells us where we should connect to send and receive messages.

In the previous lesson, we learned how to create the definition of a simple [Hello World application](/docs/getting-started/hello-world), so let's take it from there.

{{<code "yaml" "3-6">}}
asyncapi: '2.0.0'
id: hello-world-app
servers:
  - url: kafka.mycompany.com
    protocol: kafka
    description: This is "My Company" Kafka instance.
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

We added a new section called "servers" in our AsyncAPI document. Note that it's an array because we can have multiple servers, e.g., production, staging, development, etc.

> Hint: YAML arrays are denoted by a `-` (dash) symbol.

You might have noticed that the example mentions Kafka. This is just an example. You can use any protocol, the most common being `amqp` (known for RabbitMQ), `mqtt` (widely adopted by the Internet of Things and mobile apps), `ws` (WebSockets are frequently used in browsers), and `http` (used in HTTP streaming APIs.)

{{<important>}}
The "servers" section defines where your application should connect to start sending and receiving messages. If you are using a {{<link "https://fmvilas.com/event-driven-architectures-asyncapi/">}}broker-centric architecture{{</link>}} (like Kafka, RabbitMQ, ...), this is usually the URL of the broker. If you're doing the classic client-server model (like in REST APIs), then your server should be the URL of your application.
{{</important>}}

## Conclusion

Now we know where our application connects to start receiving "hello {name}" messages.

Go to the next chapter and [learn how to create a publisher](/docs/getting-started/create-publisher).
