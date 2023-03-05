---
title: Documenting SQS event-driven APIs with AsyncAPI
date: 2022-09-22T06:00:00-00:00
type: Engineering
tags: ['Getting Started','SQS']
cover: /img/posts/documenting-sqs-event-driven-apis-with-asyncapi/cover.webp
authors:
  - name: Mauro Bosetti
    photo: /img/avatars/mbosetti.webp
    link: https://www.linkedin.com/in/mauro-bosetti/?locale=en_US
    byline: Argentinian software explorer.
excerpt: This post demonstrates how documenting event-driven architectures is possible, using SQS as a (real-world) example.
---

> Hey, do you remember what this field looks like in GET /operations?

Ever since I started working in a team, the answer to that first question has been pretty straightforward:

> Sure, let’s check the OpenAPI documentation file.

After two or three times, people who didn’t work with our codebase started remembering where the information was and stopped asking altogether. At least when it came to synchronous HTTP APIs. But as the previous question disappeared, another, slightly different one arose:

> Which are the fields we need to send in this asynchronous message?

And the answer was not as easy. Finding it involved diving into the code, looking at DTO and data mapping objects, or even ancient Slack messages. While the HTTP API documentation was stored in a well-known file, everything event-driven API related was scrambled around. Wouldn’t it be nice if we could deal with both the synchronous and the asynchronous APIs in the same way? Turns out, we can!

## AsyncAPI
Asking around, I stumbled upon AsyncAPI, a specification just like OpenAPI, but made for Event-Driven Architectures. Just like with OpenAPI, it describes how to communicate with an application, defining channels and message formats. Let’s see how to use it with an example.

One of the requirements was a way to notify an event to our provider, only once. We decided to use [SQS](https://aws.amazon.com/sqs/?nc1=h_ls), an AWS message queueing service, into which our backend publishes messages with a specific format, and the provider listens to them.

<Figure src="/img/posts/documenting-sqs-event-driven-apis-with-asyncapi/diagram.webp"
caption="Simple diagram showing an application (our backend) which publishes messages in an SQS named OperationCreationQueue, and an external application which consumes those messages."
/>

To begin, we need to define the basics: the specification version, and our API name and version, in a new .yaml file.

```yaml
asyncapi: '2.4.0'
info:
  title: Best API in the world
```

Once that’s out of the way, we’ll add a new channel, through which the messages are delivered. In our case, that channel is our SQS:

```yaml
asyncapi: '2.4.0'
info:
  title: Best API in the world
  version: 0.1.0
channels:
  OperationCreationQueue:
```
The next field we need is one I struggled a bit to wrap my head around. If this were an HTTP API, it would be obvious that the endpoints exposed are to be called by the client. But since our API works either by receiving or sending messages to clients, we need a way to express how the clients will interact with the application. Will the clients **receive** messages through the SQS, or will they **send** them? Or, in other words, will the clients interact with the channel by **publishing messages**, or by **subscribing** to listen for new messages?

In our example, operations are created in our backend and then forwarded to the provider, who will listen for new messages. Since we are documenting how others can interact with our API, the correct operation for this queue is **subscribe**

```yaml
asyncapi: '2.4.0'
info:
  title: Best API in the world
    version: 0.1.0
channels:
  OperationCreationQueue:
    subscribe:
```

Once we have the basics, we can start documenting the operations as we see fit. For instance, we can add a description, expected message schema, and even protocol information if necessary. For instance, following our example:

```yaml
asyncapi: '2.4.0'
info:
  title: Best API in the world
  version: 0.1.0
channels:
  OperationCreationQueue:
    subscribe:
      description: The application will send new operation notification messages through this channel.
    message:
      payload:
        type: object
          properties:
          operationId:
            type: string
            format: uuid
            description: id of the operation
          operationAmount:
            type: number
            description: Operation amount in Argentinian pesos.
```
The message properties are defined using [JSON Schema](https://www.asyncapi.com/docs/reference/specification/v2.4.0#schemaObject).

## Visualization and other tools
Just like we have Swagger UI for RESTful API docs visualization, we can paste our AsyncAPI file into the [AsyncAPI Studio](https://studio.asyncapi.com/) for pretty visualization, like this:

<Figure src="/img/posts/documenting-sqs-event-driven-apis-with-asyncapi/visualizer.webp"
caption="Async API Studio"
/>

This tool will even generate basic examples for our messages, if we don’t provide our own.

Additional tools, such as code generation tools, parsers, other UI components, and CI integrations, can be found on the [AsyncAPI tools website page](https://www.asyncapi.com/docs/tools).

There are many other features I have not explored in this article — I haven’t even tried most of them yet! — but this is enough to write a simple document. The question introduced in the beginning has, from now on, an answer which is easy to find!

>This post was originally posted in [10Pines blog](https://blog.10pines.com/2022/08/17/documenting-event-driven-apis-with-asyncapi/)

> Cover image by <a href="https://unsplash.com/photos/MSN8TFhJ0is">Safar Safarov</a> from <a href="https://unsplash.com/">Unsplash</a>
