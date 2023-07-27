---
title: "Migrating to v3"
---
Migration to a new major version is always difficult, and AsyncAPI is no exception, but we want to provide as smooth a transition as possible, and this is where this document comes in. It shows the breaking changes between AsyncAPI v2 and v3 in an interactive manner.

For a detailed read through about all the changes (non-breaking as well), please do read [the release notes for v3](/blog/release-notes-3.0.0) before this, at it will give you some more context about the changes in v3.

If you just want to convert your AsyncAPI document from v2 to v3, then we suggest to use [our converter](https://github.com/asyncapi/converter-js).

import {Asyncapi3Comparison, Asyncapi3ChannelComparison, Asyncapi3IdAndAddressComparison, Asyncapi3MetaComparison, Asyncapi3OperationComparison,Asyncapi3SchemaFormatComparison} from '../../../components/Asyncapi3Comparison'

<Asyncapi3Comparison className="my-8" />

### Operation, Channel and message decoupling

The decoupling between operations, channels and messages, is by far the most intrusive breaking change in v3 that completely splits out how they are related to each other.

<Asyncapi3ChannelComparison className="my-8" />

In v2, it was impossible to reuse channels, and impossible to have more than one operation per channel, i.e. operation variants.

In v3, this is now possible, with the mindset, a channel and message should be detached from the operations performed. 

For any message broker, for example kafka, this is the same as defining topics and the messages it contains. For REST interfaces it's all the paths and corresponding messages across all request types. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

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

### Channel address and object id's

Another breaking change is that the object id of a channel, is no longer the channel path, instead it's an arbitrary unique id, and instead channel paths are described in `address` property.

<Asyncapi3IdAndAddressComparison className="my-8" />

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
### Optional channels
In v3 channels are now completely optional, that means that you dont have to define channels as an empty object as you did in v2.

```yml
asyncapi: 2.6.0
...
channels: {}
```

```yml
asyncapi: 3.0.0
...
```

### Operation keywords

Another breaking change is that operations no longer are defined with `publish` and `subscribe`and their opposite meaning for your application. Instead you define your application behavior directly, with `send` and `receive` through an `action` property. 

<Asyncapi3OperationComparison className="my-8" />

For more information about this publish and subscribe confusion here is some more reading materials:
- Fran Méndez's [Proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618)
- Nic Townsend's blog post [Demystifying the Semantics of Publish and Subscribe](https://www.asyncapi.com/blog/publish-subscribe-semantics)

#### Subscribe becomes send

Any `subscribe` operation become the action `send`, because the `subscribe` keyword meant, "you can subscribe to this, because I, this application, publishes on this channel". 

```yml
asyncapi: 2.6.0
...
channels: 
  test/path:
    subscribe:
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
```

#### Publish becomes receive

Any `publish` operation become the action `receive`, because the `publish` keyword meant, "you can publish to this, because I, this application, subscribes to this channel".
```yml
asyncapi: 2.6.0
...
channels: 
  test/path:
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
  consumeFromTestPath:
    action: receive
    channel: 
      $ref: "#/channels/testPathChannel"
```

### Meta data being moved

In v2 two properties, `tags` and `externalDocs` was placed outside of the meta information object `info`, this has been moved in v3 to stay consistent.

<Asyncapi3MetaComparison className="my-8" />

```yml
asyncapi: 2.6.0
info: 
  ...
externalDocs:
  description: Find more info here
  url: https://www.asyncapi.org
tags:
  - name: e-commerce
```

```yml
asyncapi: 3.0.0
info:
  externalDocs:
    description: Find more info here
    url: https://www.asyncapi.org
  tags:
    - name: e-commerce
```

### Messages instead of message
In v2, if you wanted to define channels to have one of more messages, you would do it with `oneOf`, or if just a single message.

In v3, messages are now defined with an object, if you want a channel to have one or more messages, you just define multiple key/value pairs, or if a single message, its just a single key/value pair.

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
```

### Unifying explicit and implicit references

In v2, it was possible to do implicit references, for server security configuration, by name referencing security requirement Object in components, for channels to reference global servers by name.

In v3, this information MUST be explicit references. The server security information is also now an array instead of an object.

```yml
asyncapi: 2.6.0
servers:
  production:
    ...
    security:
      user_pass: [<potential scopes>]
...
channels: 
  test/path:
    severs:
      - production
components:
  securitySchemes:
    user_pass: 
      ...
```

```yml
asyncapi: 3.0.0
servers:
  production:
    ...
    security:
      - $ref: "#/components/securitySchemes/user_pass"
...
channels: 
  test/path:
    severs:
      - $ref: "#/servers/production"
components:
  securitySchemes:
    user_pass: 
      ...
      availableScopes: [<potential scopes>]
```

### New trait behavior
Traits in v2, always replaced any duplicate properties that was defined both in traits and the associated object. This meant for example if the message traits defined headers and the message object did as well, only the message trait headers would be applied, because it overwrote anything you wrote in the message object.

In v3, this have now been changed so that main objects has a higher priority that what ever you define in traits. This applies to traits in both operation and message object.

Lets go through a few examples, for example here with the message object and associated traits:
```yml
messageId: userSignup
description: A longer description.
payload:
  $ref: '#/components/schemas/userSignupPayload'
traits:
  - summary: Action to sign a user up.
    description: Description from trait.
```

After traits has been applied in v2, the full message object would look like this, take notice how the `description` was overwritten:
```yml
messageId: userSignup
summary: Action to sign a user up.
description: Description from trait.
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
This is the default behavior of the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm we use.

However, in v3, we enforce a rule that `A property on a trait MUST NOT override the same property on the target object`. This means that in v3, after traits has been applied this is the full message object in v3:
```yml
messageId: userSignup
summary: Action to sign a user up.
description: A longer description. # it's still description from "main" object
payload:
  $ref: '#/components/schemas/userSignupPayload'
```
Take notice how the `description` are now no longer overwritten.

### Schema format and schemas

In v2, the information about which schema the payload is defined with is located under the message object and not directly associated with the schema itself. This makes reusability impossible, because the two pieces of information is not directly associated with each other.

So in v3, we add [a multi format schema object](https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#multiFormatSchemaObject), encapsulating this information together. That means that if you anywhere use `schemaFormat`, you have to change the schema like below.

<Asyncapi3SchemaFormatComparison className="my-8" />

```yml
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

### Server URL splitting up
In v2, to connect to a server was always defined as one long URL, sometimes even duplicating information such as protocol.

In v3, the `url` property have now been split up into `host`, `pathname` and as in v2 `protocol`. Making the information explicit.
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
