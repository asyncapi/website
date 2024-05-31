---
title: "Hello world"
weight: 30
---

Let's define an application that's capable of receiving a `"hello {name}"` message:

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

The first line of the specification starts with the document type `asyncapi` and the version (3.0.0). That line doesn't have to be the first one, but it's a best practice.

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

You only have one channel called `hello`, and you see what message is available in this channel and how it must be structured. The `payload` object defines that the message must be a string and match the given regular expression in a string format such as `hello {name}`.

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

The `operations` section is where you describe what the application is doing. Each operation has a unique identifier for example, `receiveHello`.

In the above example, you see that the `Hello world application` is a consumer listening to the `sayHelloMessage` message from the `hello` channel. In other words, you can say that the `Hello world application` subscribes to the `hello` topic to `receive` the `sayHelloMessage` message. That AsyncAPI document describes what the `Hello world application` is doing, not what others can do with it. 
