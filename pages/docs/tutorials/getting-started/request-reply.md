---
title: Request/reply pattern
weight: 40
---

In this tutorial, you'll learn how to implement the request/reply pattern in an AsyncAPI document using a straightforward ping-pong example.

Before we begin, it would be beneficial for you to have a basic understanding of AsyncAPI and Event-Driven Architectures (EDA). If you need a refresher, refer to our [Event-Driven Architecture](/docs/tutorials/getting-started/event-driven-architectures) document.

[Request/reply](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html) is a messaging pattern involving two key components: the **requester**, which sends a request message, and the **replier**, responsible for receiving this request and responding with a reply. This pattern fundamentally revolves around these two roles, requester and replier.

## Static reply address 

Here's how you can implement the request/reply pattern when the response address is known at the compile or design time. 

A requester can be configured with the `send` operation, where it dispatches a message to the `ping` channel and anticipates receiving a response through the `pong` channel.

In the below example, the `Operation Reply` object within the `pingRequest` operation provides essential details, like the destination for the reply, which is the `pong` channel. Since the `pong` channel is configured with only one message, there's no need to explicitly define the reply message. Similarly, the `ping` channel has just one message, eliminating the need to specify the message sent in the request.

<CodeBlock highlightedLines={[6,7,8,9,10,11,18,19,20,21,22,23,24]}>
{`asyncapi: 3.0.0
info:
  title: Ping/pong example with static reply channel
  version: 1.0.0
  description: Requester example that initiates the request/reply pattern on a different channel than the reply is using
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

## Dynamic reply address 

Occasionally, the destination for a reply cannot be predetermined during the design or compile phase. In such cases, the address for the reply is dynamically determined at runtime, allowing for more flexible and adaptive communication.

In scenarios where the address or reply channel is unknown at design time, the `address` property can either be set to `null` or omitted entirely. To define the reply address dynamically, the `Operation Reply Address` object can be used, allowing for runtime expressions. That enables the `requester` to specify where the `replier` should send the reply, detailing the address's location and its specific position within the request.

In this situation, the `location` property is assigned the runtime expression `$message.header#/replyTo`. Such an expression indicates that the address for the reply is located within the header of the request, specifically in the `replyTo` field. This method dynamically determines the reply address based on the content of the request header.

<CodeBlock highlightedLines={[13,14,15,16,22,23,24,25,26,27,30,31,32,33,34,35]}>
{`asyncapi: 3.0.0
info:
  title: Ping/pong example with reply specified as dynamic information provided in the runtime
  version: 1.0.0
  description: Example document for an application that processes ping requests and replies to the address dynamically specified by the requestor in the message header
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
        description: Reply is sent to topic specified in 'replyTo' property in the message header
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
            description: Provide path to which reply must be provided
          requestId:
            type: string
            format: uuid
            description: Provide request id that you will use to identify the reply match
      payload:
        type: object
        properties:
          event:
            type: string
            const: ping
      correlationId:
        $ref: "#/components/correlationIds/pingCorrelationId"
    pong:
      headers:
        type: object
        properties:
          requestId:
            type: string
            format: uuid
            description: Reply message must contain id of the request message
      payload:
        type: object
        properties:
          event:
            type: string
            const: pong
      correlationId:
        $ref: "#/components/correlationIds/pingCorrelationId"
  correlationIds:
    pingCorrelationId:
      location: '$message.header#/requestId'`}
</CodeBlock>

While the above examples are a simple implementation of the request/reply pattern, in a protocol-agnostic world there are many different ways to represent the request/reply pattern. All of which are supported by AsyncAPI.
