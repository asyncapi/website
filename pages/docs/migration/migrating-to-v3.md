---
title: "Migrating to v3"
---
Migration to any new version is always difficult, and AsyncAPI is no exception, but we want to provide as smooth a transition as possible, and this is where this document comes in. It shows the breaking changes between AsyncAPI v2 and v3 in an interactive manner.


import {Asyncapi3Comparison, Asyncapi3ChannelComparison, Asyncapi3IdAndAddressComparison, Asyncapi3MetaComparison, Asyncapi3OperationComparison} from '../../../components/Asyncapi3Comparison'

<Asyncapi3Comparison className="my-8" />

### Operation, Channel and message decoupling

This is by far the most intrusive breaking change in v3 that completely splits out how operations, channels and messages are related to each other.

<Asyncapi3ChannelComparison className="my-8" />

In v2, it was impossible to reuse channels, and impossible to have more then one operation per channel, i.e. operation variants.

In v3, this is now possible, with the mindset, a channel and message should be detached from the operations performed. 

For any message broker, for example kafka, this is the same as defining topics and the messages it contains. For REST interfaces it's all the paths and corresponding messages across all request types. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

### Channel address and object id's

Another breaking change is that the object id of a channel, is no longer the channel path, instead it's an arbitrary unique id, and instead channel paths are described in `address` property.

<Asyncapi3IdAndAddressComparison className="my-8" />

### Operation keywords

Another breaking change is that operations no longer are defined with `publish` and `subscribe`and their opposite meaning for your application. Instead you define your application behavior directly, with `send` and `receive` through an `action` property. 

<Asyncapi3OperationComparison className="my-8" />

#### Subscribe -> Send
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
      $ref: #/channels/test/
```
#### Publish -> Receive

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
      $ref: #/channels/test/
```

### Meta data being moved

In v2 two properties, `tags` and `externalDocs` was placed outside of the meta information object `info`, this has been moved in v3 to stay consistent.

<Asyncapi3MetaComparison className="my-8" />
