---
title: "Migrating to v3"
---
Migration to any new version is always difficult, and AsyncAPI is no exception, but we want to provide as smooth a transition as possible, and this is where this document comes in. It shows the breaking changes between AsyncAPI v2 and v3 in an interactive manner as well as providing some guidance on why it happened.


import {Asyncapi3Comparison, Asyncapi3ChannelComparison, Asyncapi3IdAndAddressComparison, Asyncapi3MetaComparison, Asyncapi3OperationComparison} from '../../../components/Asyncapi3Comparison'

<Asyncapi3Comparison className="my-8" />

### Operation, Channel and message decoupling

This is by far the most intrusive breaking change in v3 that completely splits out how operations, channels and messages are related to each other.

<Asyncapi3ChannelComparison className="my-8" />

In v2, it was impossible to reuse channels, and impossible to have more then one operation per channel, i.e. operation variants.

In v3, this is now possible, with the mindset, a channel and message should be detached from the operations performed. 

For any message broker, for example kafka, this is the same as defining topics and the messages it contains. For REST interfaces it's all the paths and corresponding messages across all request types. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

This change makes the channels reusable across multiple AsyncAPI documents, each performing a slightly different action.

### Channel address and object id's

Another breaking change is that the object id of a channel, is no longer the channel path, instead it's an arbitrary unique id, and instead channel paths are described in `address` property.

<Asyncapi3IdAndAddressComparison className="my-8" />

```
asyncapi: 2.6.0
...
channels: 
  test/path:
    ...
```

```
asyncapi: 3.0.0
channels:
  testPathChannel:
    address: test/path
```

### Operation keywords

Another breaking change is that operations no longer are defined with `publish` and `subscribe`and their opposite meaning for your application. Instead you define your application behavior directly, with `send` and `receive` through an `action` property. 

<Asyncapi3OperationComparison className="my-8" />

For more information about this publish and subscribe confusion here is some more reading materials:
- Fran Méndez's [Proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618)
- Nic Townsend's blog post [Demystifying the Semantics of Publish and Subscribe](https://www.asyncapi.com/blog/publish-subscribe-semantics)


#### Subscribe -> Send

Any `subscribe` operation become an action `send`.

```
asyncapi: 2.6.0
...
channels: 
  test/path:
    subscribe:
      ...
```

```
asyncapi: 3.0.0
channels:
  testPathChannel:
    address: test/path
    ...
operations: 
  publishToTestPath:
    action: send
    channel: 
      $ref: #/channels/testPathChannel
```

#### Publish -> Receive

Any `publish` operation become an action `receive`.
```
asyncapi: 2.6.0
...
channels: 
  test/path:
    publish:
      ...
```

```
asyncapi: 3.0.0
channels:
  testPathChannel:
    address: test/path
    ...
operations: 
  consumeFromTestPath:
    action: receive
    channel: 
      $ref: #/channels/testPathChannel
```

### Meta data being moved

In v2 two properties, `tags` and `externalDocs` was placed outside of the meta information object `info`, this has been moved in v3 to stay consistent.

<Asyncapi3MetaComparison className="my-8" />


```
asyncapi: 2.6.0
info: 
  ...
externalDocs:
  description: Find more info here
  url: https://www.asyncapi.org
tags:
  - name: e-commerce

```

```
asyncapi: 3.0.0
info:
  externalDocs:
    description: Find more info here
    url: https://www.asyncapi.org
  tags:
    - name: e-commerce
```

### Unifying explicit and implicit references

In v2, it was possible to do implicit references, for server security configuration, by name referencing security requirement Object in components, for channels to reference global servers by name.

In v3, this information MUST be explicit references. The server security information is also now an array instead of an object.

```
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

```
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
      scopes: [<potential scopes>]
```

### New trait behavior

TODO

### Schema format and payload definition

TODO
