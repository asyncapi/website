---
title: "Servers"
date: 2019-04-03T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 110
---

In the previous lesson, you learned how to create the definition of a simple [Hello World application](/docs/getting-started/hello-world), so let's take it from there.

In this article, you learn how to add `servers` to your AsyncAPI document. Adding and defining servers is useful because it specifies where and how to connect. The connection facilitates where to send and receive messages.

<CodeBlock className="h-80" highlightedLines={[5,6,7,8,9]}>
{`asyncapi: 2.0.0
info:
  title: Hello world application
  version: '0.1.0'
servers:
  production:
    url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'`}
</CodeBlock>

You added a new section called `servers` in your AsyncAPI document.

You might have noticed that the example mentions `amqp`. This protocol is very common and was popularized by RabbitMQ (among others). You can use any protocol. For example, the most common are `mqtt` (widely adopted by the Internet of Things and mobile apps), `kafka` (popular for its streaming solution), `ws` (WebSockets are frequently used in browsers), and `http` (used in HTTP streaming APIs).

<Remember>

The `servers` section defines where your application should connect to start sending and receiving messages. 

1. If you are using a <a href="https://fmvilas.com/event-driven-architectures-asyncapi/" target="_blank" className="text-teal-600 font-medium hover:underline">broker-centric architecture</a> such as Kafka or RabbitMQ, usually you specify the URL of the broker. 
2. If you have the classic client-server model such as for REST APIs, then your `server` should be the URL of the server.

</Remember>

## Conclusion

Now you know where `Hello world application` app connects to, to start receiving `hello {name}` messages.

In the next chapter, you'll learn how to add security requirements to a server.

<ChapterSuggestions
  suggestions={[
    {
      href: '/docs/getting-started/security',
      title: 'Security',
      description: 'Define the security mechanisms your application accepts.',
      linkText: 'Learn more about how to add security',
    }
  ]}
/>
