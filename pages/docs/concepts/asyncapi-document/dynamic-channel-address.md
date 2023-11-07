---
title: Dynamic Channel Address
weight: 80
---

Dynamic channel addresses specify dynamic parts of a channel address, which becomes particularly useful when you want to use and reuse parameters in a channel address.

Here is the diagram explaining dynamic channel address:

```mermaid
      graph TD
      A[AsyncAPI]
      B[Dynamic Channel Address]
      D[Variable Usage in Channel Address]
      E[Adapted to Multiple APIs and Protocols]
      F[Reused Across Channels]

      style B fill:#47BCEE,stroke:#47BCEE;

      A --> B
      B --> D
      D --> E
      D --> F
```

The diagram shows how dynamic channel addresses allow flexible event-driven interfaces by using and reusing parameters in channel names, adapting well to various APIs and protocols.

Here is an example of dynamic channel address:

```yml
userSignedUp:
  address: 'user.signedup'
  messages:
    userSignedUp:
      $ref: '#/components/messages/userSignedUp'
```

This document defines a dynamic channel address for a `userSignedUp` event message, making it easy to include and reuse specific details in the channel address.

## Parameter context

In a channel address, there's a map of parameters, which needs to include all the same parameters that are in the main channel address. The names you use for the parameters in this map must be exactly the same as the names you used in the channel address.

Here is a diagram explaining parameter context:

```mermaid
graph TD
    A[Channel Address] --> B{Parameter Map}
    B --> C{Parameters}
    C --> D[Parameter 1]
    C --> E[Parameter 2]
    C --> F[Parameter 3]
    D --> G{Parameter Name}
    E --> G
    F --> G
    A --> G

    style B fill:#47BCEE,stroke:#47BCEE;
```

This diagram shows how the channel address includes the same parameters as the channel address, and each parameter's name matches the one used in the address.

Here is an example of a dynamic channel address and its parameter:

```yml
user/{userId}/signup:
  parameters:
    userId:
      description: Id of the user.
      location: $message.payload#/user/id
  subscribe:
    message:
      $ref: "#/components/messages/userSignedUp"
```

In the above document, `user/{userId}/signedup` is the address where `{userId}` is a parameter for that address.

## Reusing parameters

Parameters can be reused. This reuse optimizes the usage of parameters within the API by letting you use the parameters again.

If there is another message, for example, a `UserUpdated` message, which also requires the `userId` parameter, it can be reused like in the following example:

```mermaid
graph TD
    subgraph Channels
        userSignedUp["userSignedUp"]
    end

    subgraph Parameters
        userId["userId"]
    end

    userSignedUp -->|requires| userId

    subgraph Reused Parameters
        UserUpdated["UserUpdated"]
    style UserUpdated fill:#47BCEE,stroke:#47BCEE;
    
    end
    UserUpdated -->|reuses| userId
```

In this diagram, a channel named `userSignedUp` that requires a parameter `userId` .Additionally, the parameter `userId` is reused for another message, `UserUpdated`.

Here is an example of reusing parameters:

```yml
channels:
  UserSignedUp:
    address: 'user/{userId}/signedup'
    parameters:
      $ref: '#/components/parameters/userId'
  UserUpdated:
    address: 'user/{userId}/updated'
    parameters:
      $ref: '#/components/parameters/userId'
components:
  parameters:
    userId:
      description: Id of the user.
```

In the previous example, the `userId` parameter is defined under `components`, and both channels  `UserSignedUp` and `UserUpdated` are reusing it in their address by referencing via `$ref`.
