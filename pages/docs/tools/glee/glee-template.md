---
title: "Create AsyncAPI Glee template"
weight: 170
---
This tutorial teaches you how to create a simple glee template. You'll use the AsyncAPI Glee template you develop to generate Javascript code. Additionally, you'll create a template code with a reusable component to reuse the custom functionality you create and test your code using an WS server.

<CodeBlock>
{`asyncapi: '3.0.0'
info:
  title: Hello, Glee!
  version: '0.1.0'
servers:
  websockets:
    url: ws://0.0.0.0:3000
    protocol: ws
channels:
  hello:
    publish:
      operationId: onHello
      message:
        $ref: '#/components/messages/hello'
    subscribe:
      message:
        $ref: '#/components/messages/hello'
components:
  messages:
    hello:
      payload:
        type: string`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`info:
  title: Hello, Glee!
  version: '0.1.0'`}
</CodeBlock>

The `info` section provides general information about the API, including its title and version.

Moving on, let's talk about the `servers` section.

<CodeBlock>
{`servers:
  mosquitto:
    url: ws://0.0.0.0:3000
    protocol: ws`}
</CodeBlock> 

The servers section defines the different servers where the API can be accessed. In this case, there is a single server named "websockets" that uses the WebSocket protocol (`ws`) and listens on the address `ws://0.0.0.0:3000`.

Now lets move on to the `channels` section. This section is used to describe the event names your API will be publishing and/or subscribing to.

<CodeBlock>
{`channels:
  hello:
    publish:
      operationId: onHello
      message:
        $ref: '#/components/messages/hello'
    subscribe:
      message:
        $ref: '#/components/messages/hello'`}
</CodeBlock>

The channels section defines the communication channels available in the API. In this case, there's a channel named "hello". This channel supports both publishing and subscribing.

The `publish` section specifies that the operation with ID onHello is used for publishing to the `hello` channel. The message structure is referenced from the hello message component.
The `subscribe` section indicates that messages received on the `hello` channel should follow the structure defined in the hello message component.

Next is the `payload` property under `hello` message component which is used to understand how the event should look like when publishing to that channel:

<CodeBlock>
{`components:
  messages:
    hello:
      payload:
        type: string`}
</CodeBlock>

The components section contains reusable elements, in this case, a definition for the "hello" message. It specifies that the payload of the "hello" message should be of type string.

## Summary

In this tutorial, you learned how to create an AsyncAPI specification document via a simple example with a glee template.