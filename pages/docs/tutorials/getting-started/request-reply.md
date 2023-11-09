---
title: Request/reply pattern
weight: 40
---

In this tutorial, you'll learn how to implement the request/reply pattern in a AsyncAPI document using a simple pong-pong example.

Before we begin, it would be beneficial and easy to follow if you have a basic understanding of AsyncAPI and event-driven architecures. If you don't or need a refresher, you can refer to the [Event-Driven architecture](/docs/tutorials/getting-started/event-driven-architectures) document.

[Request-reply](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html) is a common messaging pattern where we have a component known as the **requester** that sends a request message to another component known as **replier**, which receives the request and responds to the request with a reply. So, the request/reply pattern consists of majorly two components, a requester and a replier. 

## Static Reply Address 
Here's how you can implement the request/reply pattern when the address of the response channel(i.e address of the reply) is known at the compile time or at the time of design. 

You can define a requester using the `send` operation that sends a message to the `ping` channel and expects a reply over the `pong` channel. 

In the below example, the `Operation Reply` object in the `pingRequest` operation describes the necessary information such as **where to**(address of the response channel) and what message to properly reply to the request. 
<CodeBlock highlightedLines={[27,28,31,30,29,39,40,41,42,43,44,45]}>
{`asyncapi: 3.0.0

info:
  title: Ping/pong example with static reply channel
  version: 1.0.0
  description: Example with a requester that initiates the request/reply pattern on a different channel than the reply is using.

channels:
  ping:
    address: /ping
    messages:
      ping:
        $ref: '#/components/messages/ping'
  pong:
    address: /pong
    messages:
      pong:
        $ref: '#/components/messages/pong'

operations:
  pingRequest:
    action: send
    channel: 
      $ref: '#/channels/ping'
    reply:
      channel: 
        $ref: '#/channels/pong'

components: 
  messages: 
    ping:
      payload:
        type: object
        properties:
          event:
            type: string
            const: ping
    pong:
      payload:
        type: object
        properties:
          event:
            type: string
            const: pong`}
</CodeBlock>

## Dynamic Reply Address 
While in the [above section](#static-response-channel) you know the address of the response channel, sometimes, you do not know where the reply needs to be sent at the time of design or compile time. Instead the address of the response channel is determined dynamically at runtime.

Here's how you can implement request/reply while dynamically determining the reply channel:
<CodeBlock highlightedLines={[78,79,80,81,82,94,95,96,97]}>
{`asyncapi: 3.0.0

info:
  title: Ping/pong example with reply specified as dynamic information provided in the runtime
  version: 1.0.0
  description: Example document for an application that accepts ping requests and responds to the address that was specified in runtime by the requestor, in the message header

channels:
  ping:
    address: /ping
    messages:
      ping:
        $ref: '#/components/messages/ping'
  pong:
    address: null
    messages:
      pong:
        $ref: '#/components/messages/pong'

operations:
  pingRequest:
    action: receive
    channel: 
      $ref: '#/channels/ping'
    reply:
      address:
        description: Reply is sent to topic specified in `replyTo` property in the message header
        location: "$message.header#/replyTo"
      channel: 
        $ref: '#/channels/pong'

components:
  messages:
    ping:
      headers:
        type: object
        properties:
          replyTo:
            type: string
      payload:
        type: object
        properties:
          event:
            type: string
            const: ping

    pong:
      payload:
        type: object
        properties:
          event:
            type: string
            const: pong`}
</CodeBlock>

In the above example, since we don't know the address or the reply channel at the design time, you can set the `address` property to null or you can choose to omit entirely. You can use the `Operation Reply Address ` object to to define the address of the reply channel dynamically using a runtime expression. 

In this case, we use `$message.header#/replyTo` as the value of the `location` property which is a runtime expression and determines where the reply channel is by using the value of the `replyTO` header in the request message. 

While the above examples are a simple implementation of request/reply pattern, in an protocol-agnostic world there are many different ways to represent the request/reply pattern. All of which are supported by AsyncAPI.
