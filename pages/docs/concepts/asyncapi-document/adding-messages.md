---
title: Adding Messages
weight: 140
---

Adding [messages](../message) in an AsyncAPI document primarily involves defining channels, operations, and messages. This process is crucial for documenting the exchange of data between your applications. In AsyncAPI, you define the interaction of your application with a message broker in terms of channels and operations. [Channels](../channel.md) are the medium through which messages are sent or received, while operations represent the actions of publishing or subscribing to these channels.

Here is a diagram explaining messages:

```mermaid
graph TD;
    A[AsyncAPI Message] --> B[Headers]
    A --> C[Payload]
    B --> D[Header Content]
    C --> E[Payload Content]

    style A fill:#47BCEE,stroke:#47BCEE;
```

The above diagram shows the components of AsyncAPI messages: headers and payload, which further contain header content and payload content.

Here is an example of a simple message:

```yml
channels:
  user/signedup:
    address: 'application/json'
    messages:
      userSignUp:
        $ref: '#/components/messages/userSignUp'
```

This document defines a `user/signedup` channel where a `userSignUp` message can be made.

## Using `oneOf` for multiple message types

AsyncAPI supports the use of `oneOf` for messages under operations, allowing you to define multiple possible message types for a single operation.

Here is a diagram showing the use of `oneOf`:

```mermaid
graph TD;
    A[Operations] --> B[Messages]
    B --> C[oneOf]
    C --> D[Message Type 1]
    C --> E[Message Type 2]

    style C fill:#47BCEE,stroke:#47BCEE;
```

This diagram shows how AsyncAPI uses `oneOf` to define multiple message types for a single operation.

Here is an example document of how `oneOf` permits the use of multiple message types for a single operation:

```yml
channel:
$ref: '#/channels/userSignupReply'
messages:
  oneOf:
      - $ref: '#/components/messages/userSignedUp'
      - $ref: '#/components/messages/userSignedUpReply'
```

The above document shows a channel `userSignupReply` under which two messages can be sent or received: `userSignedUp` or `userSignedUpReply`.

## Specifying `contentType` in messages

The `contentType` field specifies the format of the payload. If it's not provided, the default payload format is `application/json`. However, it's recommended always to specify the contentType for clarity and to avoid potential misinterpretations.

Here is a diagram showing how to specify `contentType` in messages:

```mermaid
graph TD;
    A[AsyncAPI Message] --> B[Payload]
    B -->|Default| C[application/json]
    B -->|Specified contentType| D[Other Content Types]

    style A fill:#47BCEE,stroke:#47BCEE;
```

The above diagram shows an AsyncAPI message consists of a payload, which can default to application/json but should ideally have a specified contentType for clarity and precision.

The following code shows how `contentType` is added to the Message:

```yml
messageId: userSignup
name: UserSignup
title: User signup
summary: Action to sign a user up.
description: A longer description
contentType: application/json
```

In this document, the `contentType` is specified as `application/json` for the `userSignup`.

## Reusing components

The components object in the AsyncAPI specification contains reusable objects, but they will only impact the API if they are specifically referred to outside the components object.

Here is a diagram explaining how to reuse components:

```mermaid
flowchart TB

subgraph Components Object
  Component_1
  Component_2
  Component_3
end

subgraph API
  API_implementation --> Component_1:Uses
  API_implementation --> Component_2:Uses
  API_implementation --> Component_3:Uses

  style API_implementation fill:#47BCEE,stroke:#47BCEE;
end
```

The above diagram shows how components in the API implementation are used by various components, emphasizing their impact when referred to outside the components object.

Here is an example demonstrating how components are reused in AsyncAPI:

```yml
components:
  messages:
    user:
      contentType: 'application/json'
      schema:
        $ref: '#/components/schemas/User'

  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

The above document shows reuse of a component by defining a `User` schema.
