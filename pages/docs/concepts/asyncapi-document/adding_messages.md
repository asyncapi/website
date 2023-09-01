---
title: Adding Messages
weight: 140
---

[Messages](../message.md) represent the data being transmitted between your systems. They always include a payload, which is the data the application is sending or receiving, and they may also include headers, which are used to provide additional context or information about the message exchange.

```mermaid
graph TD;
    A[AsyncAPI Message] --> B[Headers]
    A --> C[Payload]
    B --> D[Header Content]
    C --> E[Payload Content]

    style A fill:#47BCEE,stroke:#47BCEE;
```

Here is an example of a simple message:

```yml
channels:
  user/signedup:
      address: 'application/json'
      messages:
        userSignUp:
          name: User SignUp
          summary: Action to sign a user up.
```

This document defines a `user/signedup` channel where a `userSignUp` message can be made.

## Using `oneOf` for Multiple Message Types

AsyncAPI supports the use of `oneOf` for messages under operations, allowing you to define multiple possible message types for a single operation.

```mermaid
graph TD;
    A[Operations] --> B[Messages]
    B --> C[oneOf]
    C --> D[Message Type 1]
    C --> E[Message Type 2]

    style C fill:#47BCEE,stroke:#47BCEE;
```

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

## Specifying `contentType` in Messages

The `contentType` field specifies the format of the payload. If it's not provided, the default payload format is `application/json`. However, it's recommended always to specify the contentType for clarity and to avoid potential misinterpretations.

```mermaid
graph TD;
    A[AsyncAPI Message] --> B[Payload]
    B -->|Default| C[application/json]
    B -->|Specified contentType| D[Other Content Types]

    style A fill:#47BCEE,stroke:#47BCEE;
```

The following code shows how `contentType` is added to the Message:

```yml
messageId: userSignup
name: UserSignup
title: User signup
summary: Action to sign a user up.
description: A longer description
contentType: application/json
```

In this example, the `contentType` is specified as `application/json` for the `userSignup`.

## Reusing Components

The components object in the AsyncAPI specification contains reusable objects, but they will only impact the API if they are specifically referred to outside the components object.

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

Here is an example demonstrating how components are reused in AsyncAPI:

```yml
components:
  messages:
    user:
      contentType: application/json
      schema:
        $ref: "#/components/schemas/User"

  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

This code enables the reuse of a component by defining a `User` schema.
