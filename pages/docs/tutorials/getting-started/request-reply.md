---
title: Request/reply pattern
weight: 40
---

In this tutorial, you'll learn how to implement the request/reply pattern in a AsyncAPI document using a simple ping pong example. 

Before we begin, it would be beneficial and easy to follow if you have a basic understanding of AsyncAPI and event-driven architecures. If you don't or need a refresher, you can refer to the [Event-Driven architecture](https://www.asyncapi.com/docs/tutorials/getting-started/event-driven-architectures) document.

## Background 
[Request-reply](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html) is a quite common messaging pattern where we have a component known as the **requester** that sends a request message to another component known as **replier**, which receives the request and responds to the request with a reply.

## Implementing Request/reply
The request/reply pattern consists of majorly two components as defined above, a requester and a replier. 

Here's how you can define a requester using the `send` operation that sends a message to the `ping` channel and expects a reply over the `pong` channel.

In the below example, the `Operation Reply` object in the `pingRequest` operation defines the necessary information such as where to and what message to properly reply to the request. 
```yaml
asyncapi: 3.0.0

info:
  title: Ping/pong example for a requester with static reply channel
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
```

Similarly, here's how you can define a replier. It's very identical but with the only difference being you use the `receive` action instead of the `send` action.

In the below example, the replier receives a message over the '/ping' channel and is expected to return a reply over the '/pong' channel.
```yaml
asyncapi: 3.0.0

info:
  title: Ping/Pong Example for a Replier with Static Reply Channel
  version: 1.0.0
  description: Example with a replier that returns the response on a different channel than the request happened on.

channels:
  // Same as for the requester

operations:
  pongReply:
    action: receive
    channel: 
      $ref: '#/channels/ping'
    reply:
      channel: 
        $ref: '#/channels/pong'
```

While the above example is a simple implementation of request/reply pattern, in an protocol-agnostic world there are many different ways to represent the simple request/reply. All of which are supported by AsyncAPI.

## Dynamic Response Channel 
Sometimes, you do not know where the reply needs to be sent and is determined dynamically at runtime.

Here's how you can dynamically determine the reply channel:
```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example for a requester with a dynamic reply channel
  version: 1.0.0
  description: Example with a requester that initiates the request/reply pattern where the reply will happen on whatever is defined in the header `replyTo` of the request.

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
    action: send
    channel: 
      $ref: '#/channels/ping'
    reply:
      address:
        description: The reply address is dynamically determined based on the request header `replyTo`
        location: "$message.header#/replyTo"
      channel: 
        $ref: '#/channels/pong'
```

In the above example, since we don't know the address or the reply channel at the design time, you can set the `address` property to null or you can choose to omit entirely. You can use the `Operation Reply Address ` object to to define the address of the reply channel dynamically using a runtime expression. 

In this case, we use `$message.header#/replyTo` as the value of the `location` which is a runtime expression and determines where the reply channel is by using the value of the `replyTO` header in the request message. 