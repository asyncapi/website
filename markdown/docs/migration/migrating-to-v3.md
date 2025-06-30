---
title: "Migrating to v3"
weight: 2
---



Migration to a new major version is always difficult, and AsyncAPI is no exception. To provide as smooth a transition as possible, this document shows the breaking changes between AsyncAPI v2 and v3 in an interactive manner.

If you want to update your AsyncAPI document, use the [AsyncAPI converter](https://github.com/asyncapi/converter-js) directly in the CLI with the following command:

```bash
asyncapi convert asyncapi.json --output=asyncapi_v3.json --target-version=3.0.0
```

For a detailed read-through about all the changes (non-breaking as well), read all the [v3 release notes](/blog/release-notes-3.0.0) first to acquire additional context about the changes introduced in v3.

## Moved metadata

In v2, two properties of `tags` and `externalDocs` were placed outside of the [Info Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#infoObject). For consistency, `info` has been moved in v3. 

<Asyncapi3MetaComparison className="my-8" />

```yml
asyncapi: 2.6.0
info: 
  ...
externalDocs:
  description: Find more info here
  url: https://www.asyncapi.com
tags:
  - name: e-commerce
```

```yml
asyncapi: 3.0.0
info:
  externalDocs:
    description: Find more info here
    url: https://www.asyncapi.com
  tags:
    - name: e-commerce
```

## Server URL splitting up
There was occasional confusion regarding what the URL of a [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) should include.

<Asyncapi3ServerComparison className="my-8" />

In v2, the URL was often a lengthy string, sometimes redundantly including details like the protocol.

In v3, the `url` property has been divided into `host`, `pathname`, and `protocol`—as was the case in v2—making the information more explicit.

```yml
asyncapi: 2.6.0
servers:
  production:
    url: "amqp://rabbitmq.in.mycompany.com:5672/production"
    protocol: "amqp"
```

```yml
asyncapi: 3.0.0
servers:
  production:
    host: "rabbitmq.in.mycompany.com:5672",
    pathname: "/production",
    protocol: "amqp",
```

## Operation, channel, and message decoupling

The decoupling of operations, channels, and messages is the most significant breaking change in v3, fundamentally altering how they relate to each other.

<Asyncapi3ChannelComparison className="my-8" />

In v2, reusing channels and having multiple operations per channel, such as operation variants, was impossible.

In v3, this has become possible, emphasizing that a channel and message should be independent of the operations performed.

For message brokers like Kafka, this is akin to defining topics and their associated messages. In REST interfaces, it pertains to the path and request type (e.g., POST, GET), along with the corresponding request and response messages. For WebSocket, it encompasses all messages transmitted through the WebSocket server. For Socket.IO, it delineates all the rooms and their messages.

Channels are now reusable across multiple AsyncAPI documents, each facilitating a slightly different action.

```yml
asyncapi: 2.6.0
...
channels: 
  user/signedup:
    publish:
      message:
        payload:
          type: object
          properties:
            displayName:
              type: string
              description: Name of the user
```

```yml
asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: "user/signedup"
    messages: 
      UserMessage: 
        payload:
          type: object
          properties:
            displayName:
              type: string
              description: Name of the user
operations:
  ConsumeUserSignups:
    action: receive
    channel: 
      $ref: "#/channels/UserSignup"
```

Read more about the confusion between publishing and subscribing in the [Operation keywords](#operation-keywords) section.

## Channel address and channel key

Another breaking change is that the channel key no longer represents the channel path. Instead, it's now an arbitrary unique ID. The channel paths are now defined using the `address` property within the [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject).

<Asyncapi3IdAndAddressComparison className="my-8" />

In v2, the channel's `address/topic/path` doubled as its ID, hindering reusability and preventing the definition of scenarios where the same address was used in different contexts.

In v3, the `address/topic/path` has been shifted to an `address` property, allowing the channel ID to be distinct and arbitrary. 

```yml
asyncapi: 2.6.0
...
channels: 
  test/path:
    ...
```

```yml
asyncapi: 3.0.0
channels:
  testPathChannel:
    address: "test/path"
```

## Operation keywords

Another significant change is the shift away from defining operations using `publish` and `subscribe`, which had inverse meanings for your application. Now, you directly specify your application's behavior using `send` and `receive` via the `action` property in the [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject). 

<Asyncapi3OperationComparison className="my-8" />

In v2, the `publish` and `subscribe` operations consistently caused confusion, even among those familiar with the intricacies.

When you specified `publish`, it implied that others could `publish` to this channel since your application subscribed to it. Conversely, `subscribe` meant that others could subscribe because your application was the one publishing.

In v3, these operations have been entirely replaced with an `action` property that clearly indicates what your application does. That eliminates ambiguities related to other parties or differing perspectives.

Read more information about the confusion between publishing and subscribing:
- Fran Méndez's [Proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618)
- Nic Townsend's blog post [Demystifying the Semantics of Publish and Subscribe](https://www.asyncapi.com/blog/publish-subscribe-semantics)

Here is an example where the application both consumes and produces messages to the test channel:

```yml
asyncapi: 2.6.0
...
channels: 
  test/path:
    subscribe:
      ...
    publish:
      ...
```

```yml
asyncapi: 3.0.0
channels:
  testPathChannel:
    address: "test/path"
    ...
operations: 
  publishToTestPath:
    action: send
    channel: 
      $ref: "#/channels/testPathChannel"
  consumeFromTestPath:
    action: receive
    channel: 
      $ref: "#/channels/testPathChannel"
```

## Messages instead of message
In v2, channels were defined with one or more messages through the operation using the `oneOf` property.

In v3, messages are defined using the [Messages Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messagesObject). For a channel with multiple messages, you specify multiple key-value pairs. For a channel with just one message, you use a single key-value pair.

```yml
asyncapi: 2.6.0
...
channels:
  user/signedup:
    publish:
      ...
      message: 
        oneOf:
          - messageId: UserMessage
            ...
          - messageId: UserMessage2
            ...

asyncapi: 2.6.0
...
channels:
  user/signedup:
    publish:
      ...
      message: 
        messageId: UserMessage
        ...
```

```yml
asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: user/signedup
    messages: 
      UserMessage: 
        ...
      UserMessage2:
        ...

asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: user/signedup
    messages: 
      UserMessage: 
        ...
```

We have updated the structure of the Message Object by eliminating the `messageId` property. We now use the ID of the Message Object itself as the key in the key/value pairing, rendering a separate `messageId` property redundant.

## Unifying explicit and implicit references

In v2, implicit references were allowed in certain instances. For instance, the server security configuration was identified by name, linking to a [Security Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject) within the components. Similarly, a channel could reference global servers by name.

In v3, all such references MUST be explicit. As a result, we made a minor modification to the [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) `security` property, transforming it from an object to an array. The details regarding required scopes for OAuth and OpenID Connect were then relocated to the [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject). 

```yml
asyncapi: 2.6.0
servers:
  production:
    ...
    security:
      oauth_test: ["write:pets"]
...
channels: 
  test/path:
    servers:
      - production
components:
  securitySchemes:
    oauth_test: 
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'https://example.com/api/oauth/dialog'
          availableScopes:
            'write:pets': modify pets in your account
            'read:pets': read your pets
      scopes:
        - 'write:pets'
```

```yml
asyncapi: 3.0.0
servers:
  production:
    ...
    security:
      - $ref: "#/components/securitySchemes/oauth_test"
...
channels: 
  test/path:
    servers:
      - $ref: "#/servers/production"
components:
  securitySchemes:
    oauth_test:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'https://example.com/api/oauth/dialog'
          availableScopes:
            'write:pets': modify pets in your account
            'read:pets': read your pets
      scopes:
        - "write:pets"
```

## New trait behavior
In v2, traits invariably overwrote any duplicate properties specified both in the traits and the corresponding object. For instance, if both message traits and the message object defined headers, only the headers from the message traits would be recognized, effectively overriding those in the Message Object.

In v3, this behavior has been revised. The primary objects now take precedence over any definitions in the traits. Such an adjustment is consistent for traits in both operation and message objects.

Here is a message object and associated traits:
```yml
messageId: userSignup
description: A longer description.
payload:
  $ref: '#/components/schemas/userSignupPayload'
traits:
  - summary: Action to sign a user up.
    description: Description from trait.
```

In v2, after applying the traits, the complete message object appeared as follows. Note how the `description` was overridden:

```yml
messageId: userSignup
summary: Action to sign a user up.
description: Description from trait.
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
That is the default behavior of the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm we use.

In v3, we've instituted a guideline stating, `A property on a trait MUST NOT override the same property on the target object`. Consequently, after applying the traits in v3, the complete message object appears as follows:

```yml
messageId: userSignup
summary: Action to sign a user up.
description: A longer description. # it's still description from "main" object
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
Notice how the `description` is no longer overwritten.

## Schema format and schemas

One limitation with schemas has always been the inability to reuse them across different schema formats.

<Asyncapi3SchemaFormatComparison className="my-8" />

In v2, the details about which schema format the payload uses are found within the message object, rather than being directly linked to the schema itself. Such separation hampers reusability, as the two data points aren't directly correlated.

To address this in v3, we've introduced [a multi-format schema object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#multiFormatSchemaObject) that consolidates this information. Consequently, whenever you utilize `schemaFormat`, you'll need to modify the schema as follows: 

```yml
asyncapi: 2.6.0
...
channels:
  user/signedup:
    publish:
      message: 
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          type: record
          name: User
          namespace: com.company
          doc: User information
          fields:
            - name: displayName
              type: string
```

```yml
asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: user/signedup
    messages: 
      userSignup: 
        payload:
          schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
          schema:
            type: record
            name: User
            namespace: com.company
            doc: User information
            fields:
              - name: displayName
                type: string
```

## Optional channels
In v3, defining channels has become entirely optional, eliminating the need to specify channels as an empty object (required in v2).

```yml
asyncapi: 2.6.0
...
channels: {}
```

```yml
asyncapi: 3.0.0
...
```

## Restricted parameters object

Parameters have often prioritized convenience over accurately reflecting real-world use cases.

<Asyncapi3ParameterComparison className="my-8" />

In v2, we significantly streamlined the Schema Object. While the previous version offered full capability with numerous, often underutilized options, it posed challenges in serializing objects or booleans in the channel path. 

The new v3 simplifies this by consistently using the string type and limiting available properties. Now, you can only access `enum`, `default`, `description`, `examples`, and `location`, ensuring a more focused and practical approach.

```yml
asyncapi: 2.6.0
...
channels: 
  user/{user_id}/signedup:
    parameters:
      location: "$message.payload"
      description: Just a test description
      schema:
        type: string
        enum: ["test"]
        default: "test"
        examples: ["test"]
    ...
```

```yml
asyncapi: 3.0.0
...
channels: 
  userSignedUp:
    address: user/{user_id}/signedup
    parameters:
      user_id: 
        enum: ["test"]
        default: "test"
        description: Just a test description
        examples: ["test"]
        location: "$message.payload"
```
