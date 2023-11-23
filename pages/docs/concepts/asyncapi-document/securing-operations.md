---
title: 'Securing Operations'
weight: 120
---

The concept of server security implies that the security measures defined at the server level apply to all operations within all channels by default. 

## Security Features 

The security requirements specified at the server level are enforced consistently across the entire Asyncapi document. There may be situations where certain operations within specific channels require different security measures than the default server-level settings. 

- To accommodate such scenarios, the AsyncAPI document allows you to use the `security` property at the `operation` level. This means users can define security requirements at both the global level and the operation (endpoint) level.

```yaml
channels:
   AUTHORIZATION_REVOCATION:
    address: AUTHORIZATION_REVOCATION
    messages:
      subscribe.message:
        $ref: '#/components/messages/message'

security:
  - apiKey: []
```

- One more way is when users don't use the `server` feature from AsyncAPI, and only include `channels` and `operations`. In this case, the user needs to specify the security of the operation within the `operations`.

```yaml
channels:
  AUTHORIZATION_REVOCATION:
    address: AUTHORIZATION_REVOCATION
    messages:
      subscribe.message:
        $ref: '#/components/messages/message'
operations:
  AUTHORIZATION_REVOCATION.subscribe:
    action: send
    channel:
      $ref: '#/channels/AUTHORIZATION_REVOCATION'
    security:
      - type: oauth2
        description: The oauth security descriptions
        flows:
          clientCredentials:
            tokenUrl: 'https://example.com/api/oauth/dialog'
            availableScopes:
              'subscribe:auth_revocations': Scope required for authorization revocation topic
        scopes:
          - 'subscribe:auth_revocations'
```

The `security` field comprises of 2 parts -

- Security scheme object = This portion mentions the security schemes associated with the given operation. One of the security scheme objects must be satisfied to authorize an operation.

- Reference object = This portion references a definition by linking to somewhere else in the document using the `$ref:` keyword.

## Specifying Security Requirement 

To specify different security requirements for a specific operation, you can include the `security` property within the operation's definition. 
The security property is an array where you can define one or more security requirement objects.

For example, let's say you have an AsyncAPI document with a channel called users and two operations within that channel: `createUser` and `getUser`. 
The server-level security is set to use API key authentication for all operations within all channels. 
However, you want to enforce OAuth2 authentication specifically for the getUser operation.

The following example explains how to include security requirement for operations definition

```yaml
title: User sign up
summary: Action to sign a user up.
description: A longer description
channel:
  $ref: '#/channels/userSignup'
action: send
security:
  - OAuth2: []
```

In the above example, the `security` property is added under the `getUser` operation, indicating that the OAuth2 security requirement should be applied to that specific operation within the user's channel. The empty array [] signifies that no additional configuration is needed for the OAuth2 security mechanism.

Utilizing the security property at the operation level allows you to deviate from the server-level security settings and define unique security requirements for individual operations within your AsyncAPI document. The capability ensures that you can adequately secure your API operations, even if they require different security measures.
