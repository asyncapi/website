---
title: "Migrating to v3"
---
Migration to a new major version is always difficult, and AsyncAPI is no exception, but we want to provide as smooth a transition as possible, and this is where this document comes in. It shows the breaking changes between AsyncAPI v2 and v3 in an interactive manner.

If you are just looking to update your AsyncAPI document, then we suggest you use the [AsyncAPI converter](https://github.com/asyncapi/converter-js). You can do this directly in the CLI with:

```bash
asyncapi convert asyncapi.json --output=asyncapi_v3.json --target-version=3.0.0
```

For a detailed read-through about all the changes (non-breaking as well), please do read [the release notes for v3](/blog/release-notes-3.0.0) before this, as it will give you some more context about the changes in v3.

import {Asyncapi3Comparison, Asyncapi3ChannelComparison, Asyncapi3IdAndAddressComparison, Asyncapi3MetaComparison, Asyncapi3OperationComparison,Asyncapi3SchemaFormatComparison, Asyncapi3ServerComparison} from '../../../components/Asyncapi3Comparison'

<Asyncapi3Comparison className="my-8" />

### Metadata being moved

In v2 two properties, `tags` and `externalDocs` was placed outside of the [Info Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#infoObject) `info`, this has been moved in v3 to stay consistent.

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

### Server URL splitting up
A confusion that arose from time to time was what the URL of a [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#serverObject) should include.

<Asyncapi3ServerComparison className="my-8" />

In v2, defining the URL was always as one long URL, sometimes even duplicating information such as protocol.

In v3, the `url` property has now been split up into `host`, `pathname`, and as in v2 `protocol`, making the information explicit.
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

### Operation, channel, and message decoupling

The decoupling between operations, channels, and messages, is by far the most intrusive breaking change in v3 that completely splits out how they are related to each other.

<Asyncapi3ChannelComparison className="my-8" />

In v2, it was impossible to reuse channels, and impossible to have more than one operation per channel, i.e. operation variants.

In v3, this is now possible, with the mindset, a channel and message should be detached from the operations performed. 

For any message broker, for example, Kafka, this is the same as defining topics and the messages it contains. For REST interfaces it's the path and request type (POST, GET, etc.) and the request and response messages. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

This change makes the channels reusable across multiple AsyncAPI documents, each performing a slightly different action.

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

Read more about the publish and subscribe confusion under [Operation keywords](#operation-keywords).

### Channel address and channel key

Another breaking change is that the channel key is no longer the channel path, instead, it's an arbitrary unique ID, and instead, channel paths are described with the `address` property as part of the [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#channelObject).

<Asyncapi3IdAndAddressComparison className="my-8" />

In v2, the address/topic/path of the channel was also the ID of the channel, which complicated reusability and simply didn't allow you to define certain use cases where you were using the same address for different contexts.

In v3, the address/topic/path is now located in an `address` property, while the ID of the channel can be anything.

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

### Operation keywords

Another breaking change is that operations no longer are defined with `publish` and `subscribe` and their opposite meaning for your application. Instead, you define your application behavior directly with `send` and `receive` through an `action` property in the [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#operationObject).

<Asyncapi3OperationComparison className="my-8" />

In v2, the `publish` and `subscribe` operations were always a great source of confusion, even to folks that knew the confusion. 

Because if you define `publish` it means others may `publish` to this channel because you (the application) subscribe to it, and `subscribe` meant others may subscribe to this channel because you publish to it.

In v3, the two operations are completely removed and replaced with an `action` property, that explicitly says what you (the application) do. Nothing about `others` and different perspectives to take into account.

For more information about this publish and subscribe confusion, here are some more reading materials:
- Fran Méndez's [Proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618)
- Nic Townsend's blog post [Demystifying the Semantics of Publish and Subscribe](https://www.asyncapi.com/blog/publish-subscribe-semantics)

Here is an example where, for simplicity, the application both consumes and produces messages to the test channel.

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

### Messages instead of message
In v2, if you wanted to define channels to have one or more messages, you would do it with `oneOf`.

In v3, messages are now defined with the [Messages Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#messagesObject). If you want a channel to have one or more messages, you just define multiple key-value pairs, or if a single message, it's just a single key-value pair.

```yml
asyncapi: 2.6.0
...
channels:
  user/signedup:
    message: 
      oneOf:
        - ...
        - ...

asyncapi: 2.6.0
...
channels:
  user/signedup:
    message: 
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

### Unifying explicit and implicit references

In v2, it was possible to do implicit references in some places. For example, for server security configuration, it was by name which referred to a [Security Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#securitySchemeObject) in components - And for a channel to reference global servers by name.

In v3, this information MUST be explicit references. This did mean that we had to slightly change the [Server Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#serverObject) `security` property, which is now an array instead of an object. We then moved the information about needed scopes for OAuth and OpenID Connect to the [Security Scheme Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#securitySchemeObject).

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
    severs:
      - production
components:
  securitySchemes:
    oauth_test: 
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/api/oauth/dialog
          availableScopes:
            write:pets: modify pets in your account
            read:pets: read your pets
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
    severs:
      - $ref: "#/servers/production"
components:
  securitySchemes:
    oauth_test:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/api/oauth/dialog
          availableScopes:
            write:pets: modify pets in your account
            read:pets: read your pets
      scopes:
        - "write:pets"
```

### New trait behavior
Traits in v2 always replaced any duplicate properties that were defined both in traits and the associated object. This meant for example, if the message traits defined headers and the message object did as well, only the message trait headers would be applied because it overwrote anything you wrote in the Message Object.

In v3, this has now been changed so that main objects have a higher priority than what ever you define in traits. This applies to traits in both operation and message objects.

Let's go through a few examples. Here with the message object and associated traits:
```yml
messageId: userSignup
description: A longer description.
payload:
  $ref: '#/components/schemas/userSignupPayload'
traits:
  - summary: Action to sign a user up.
    description: Description from trait.
```

After traits have been applied in v2, the full message object would look like this, take notice of how the `description` was overwritten:
```yml
messageId: userSignup
summary: Action to sign a user up.
description: Description from trait.
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
This is the default behavior of the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm we use.

However, in v3, we enforce a rule that `A property on a trait MUST NOT override the same property on the target object`. This means that in v3, after traits have been applied, this is the full message object in v3:
```yml
messageId: userSignup
summary: Action to sign a user up.
description: A longer description. # it's still description from "main" object
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
Take notice how the `description` is now no longer overwritten.

### Schema format and schemas

With schemas, one thing that has always been impossible was reusing schemas with different schema formats. 

<Asyncapi3SchemaFormatComparison className="my-8" />

In v2, the information about which schema the payload is defined with is located under the message object and not directly associated with the schema itself. This makes reusability impossible because the two pieces of information are not directly associated with each other.

So in v3, we add [a multi-format schema object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#multiFormatSchemaObject), encapsulating this information together. This means that if you anywhere use `schemaFormat`, you have to change the schema like below:


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

### Optional channels
In v3, channels are now completely optional. It means that you don't have to define channels as an empty object as you did in v2.

```yml
asyncapi: 2.6.0
...
channels: {}
```

```yml
asyncapi: 3.0.0
...
```
