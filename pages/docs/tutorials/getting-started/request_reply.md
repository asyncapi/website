---
title: Request-reply in AsyncAPI
weight: 20
---

A quite common [messaging pattern is request-reply](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html), which describes a **requester**, which sends a request message and waits for a reply message and a **replier** which receives the request message and responds with a reply message.

This pattern is now available natively as of AsyncAPI v3.
 
# Describing a requester

To describe a requester in AsyncAPI we make use of an operation that `send`s the ping and expects a `reply` over `pong`.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example with the requester
  version: 1.0.0
  description: Simple example with a requester that initiates the request-reply pattern.

channels:
  ping:
    address: /
    messages:
      ping:
        $ref: '#/components/messages/ping'
  pong:
    address: /
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

Take notice this is an application-level ping and pong and is not related to ping/pong in standards such as WebSocket.

# Describing a replier

To describe a replier, we take the same structure as for the requester, with the simple difference, of using the `receive` action instead.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example with replier
  version: 1.0.0
  description: Simple example with a replier that replies to the request.

channels:
  //Same as for the requester

operations:
  pongReply:
    action: receive
    channel: 
      $ref: '#/channels/ping'
    reply:
      channel: 
        $ref: '#/channels/pong'
```

# Different patterns within request/reply

In the simple example above we saw how you could set up a request and reply pattern across two applications, where the request and reply happened over the same channel `/` on an unknown server and protocol, which could have been HTTP or WebSocket. 

However, there are sub-patterns to request/reply that AsyncAPI v3 supports, let's take a look at them.

## Request/reply over different channels
If you come from a REST or WebSocket environment, this sub-pattern might seem weird, but in the event-driven world of Kafka or NATS this is a common pattern to utilize where you do the request over one channel, and reply on a different one.

In this example, the reply is on a statically defined channel so you at design time know exactly where the reply comes.

The only difference in this AsyncAPI document to the simple example is that each channel has now been given a different address `/ping` and `/pong` respectfully.

```yml
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

Defining the replier is the same as for the requester, again using the `receive` action instead as the only difference.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example for replier with static reply channel
  version: 1.0.0
  description: Example with a replier that returns the response on a different channel than the request happened on.

channels:
  //Same as for the requester

operations:
  pongReply:
    action: receive
    channel: 
      $ref: '#/channels/ping'
    reply:
      channel: 
        $ref: '#/channels/pong'
```

## Request/reply with dynamic response channel

A second sub-pattern is where we do not know the reply channel at design time, but instead, it's dynamic and determined at runtime. This could for example be using the request message payload or header to dictate the response channel.

Take notice how we utilize `address: null` to define that we dont know the address.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example for a requester with dynamic reply channel
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

Defining the replier is the same as for the requester, again using the `receive` action instead as the only difference.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example for replier with dynamic reply channel
  version: 1.0.0
  description: Example with a replier that returns the response on a channel determined by the header `replyTo` of the request.

channels:
  //Same as for the requester

operations:
  pongReply:
    action: receive
    channel: 
      $ref: '#/channels/ping'
    reply:
      address:
        description: The reply address is dynamically determined based on the request header `replyTo`
        location: "$message.header#/replyTo"
      channel: 
        $ref: '#/channels/pong'
```

You can use different types of `location` values here as it's not limited to headers specifically, you can also use payload properties with `$message.payload#/replyTo`.

## Multiple messages over the same channel with request/reply

In for example WebSocket, often you encounter that a channel will contain multiple messages over the same channel, but when you design the request/reply operations, you want to explicitly state which messages are "active". 

In the following example it's very close to the first requester example, where the difference is that we merged the two ping and pong channels into a single one (because they use the same address). The request operation then explicitly defined the request message among the available channel messages and the same for the reply.

```yml
asyncapi: 3.0.0

info:
  title: Ping/pong example when a channel contains multiple multiples
  version: 1.0.0
  description: Simple example with a requester that initiates the request-reply pattern, where the root channel contains multiple messages.

channels:
  rootChannel:
    address: /
    messages:
      ping:
        $ref: '#/components/messages/ping'
      pong:
        $ref: '#/components/messages/pong'

operations:
  pingRequest:
    action: send
    channel: 
      $ref: '#/channels/rootChannel'
    messages:
      - $ref: "/components/messages/ping"
    reply:
      messages:
        - $ref: "/components/messages/pong"
      channel: 
        $ref: '#/channels/rootChannel'
```

