---
title: 'Securing Operations'
weight: 120
---

In an AsyncAPI document, the concept of server security implies that the security measures defined at the server level apply to all operations within all channels by default. 

## Features of Security in AsyncAPI Documents

- The security requirements specified at the server level are enforced consistently across the entire asyncapi document.

- There may be situations where certain operations within specific channels require different security measures than the default server-level settings.

- To accommodate such scenarios, AsyncAPI allows you to use the security property at the operation level.

- By using the security property at the operation level, you can override the default server-level security and define unique security requirements for individual operations.

- Gives the flexibility to tailor the security measures to the specific needs of each operation, even if they differ from the broader server-level settings.

- When you include the security property at the operation level, it takes precedence over the server-level security settings for that particular operation.

- The security measures specified at the operation level will be applied instead of the default server-level security.

## Specifying Security Requirement 

To specify different security requirements for a specific operation, you can include the security property within the operation's definition. 
The security property is an array where you can define one or more security requirement objects.

For example, let's say you have an AsyncAPI document with a channel called users and two operations within that channel: createUser and getUser. 
The server-level security is set to use API key authentication for all operations within all channels. 
However, you want to enforce OAuth2 authentication specifically for the getUser operation.

You can achieve this by including the security property at the operation level, as shown in the following example:

```
channels:
  users:
    publish:
      summary: Creates a user
      operationId: createUser
      message:
        ...
    subscribe:
      summary: Retrieves user information
      operationId: getUser
      message:
        ...
      security:
        - OAuth2: []
```

In this example, the security property is added under the getUser operation, indicating that the OAuth2 security requirement should be applied to that specific operation within the user's channel. The empty array [] signifies that no additional configuration is needed for the OAuth2 security mechanism.

Utilizing the security property at the operation level allows you to deviate from the server-level security settings and define unique security requirements for individual operations within your AsyncAPI document. The capability ensures that you can adequately secure your API operations, even if they require different security measures.