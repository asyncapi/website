---
title: "Hello world"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 30
---

Let's define an application that's capable of receiving a "hello {name}" message.
<CodeBlock>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>
Let's get into the details of this sample AsyncAPI document:

<CodeBlock highlightedLines={[1]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>
The first line of the specification starts with the document type `asyncapi` and the version (3.0.0). This line doesn't have to be the first one, but it's a recommended practice.
<CodeBlock highlightedLines={[2,3,4]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>
The `info` object contains the minimum required information about the application. It contains the `title`, which is a memorable name for the API, and the `version`. While it's not mandatory, it's strongly recommended to change the version whenever you make changes to the API.

<CodeBlock highlightedLines={[5,6,7,8,9,10,11,12]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>

The `channels` section of the specification houses all of the mediums where messages flow through. For example, some systems use `topic`, `event name` or `routing key`. Different kinds of information flow through each channel similar to the analogy of TV channels.

In this example, you only have one channel called `hello`. The sample application subscribes to this channel to receive `hello {name}` messages.

<CodeBlock highlightedLines={[6,7,8,9]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>

You can read the highlighted lines as:
> This is the `payload` of the `message` that the `Hello world application` is subscribed to. You can pass the value of `address` to the `messages` to the `hello` channel and the `Hello world application` will receive it through `operations` object.

<CodeBlock highlightedLines={[10,11,12]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>

The `payload` object defines how the message must be structured. In this example, the message must be a string and match the given regular expression in the format `hello {name}` string.

<CodeBlock highlightedLines={[13,14,15,16,17]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        payload:
          type: string
          pattern: '^hello .+$'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'`}
</CodeBlock>

The `operations` object defines the operations that are supported by the API and it receive message from the `receiveHello`.
