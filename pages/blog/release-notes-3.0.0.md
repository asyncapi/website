---
title: AsyncAPI 3.0.0 Release Notes
date: 2023-06-15T19:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.4.0/cover.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
excerpt: 'AsyncAPI 3.0 is now released!'
featured: true
---

The new version of the AsyncAPI specification - 3.0.0 - is now available.

## Overview
This release is packed with goodies! Some which clears up confusions, some adding features, others improving maintainability. 

### Operation, channel and message decoupling

It has never been possible to re-use channels, that is up until now. 

In v3, this is now possible, with the mindset, a channel and message should be detached from the operations performed.

For any message broker, for example kafka, this is the same as defining topics and the messages it contains. For REST interfaces it's all the paths and corresponding messages across all request types. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

This change makes the channels reusable across multiple AsyncAPI documents, each performing a slightly different action.

Issues: [#94](https://github.com/asyncapi/spec/issues/94) | Pull request: https://github.com/asyncapi/spec/pull/806, https://github.com/asyncapi/spec/pull/827

### Optional channels
We have seen many use-cases where an AsyncAPI document, have been used as a form of menu or collection of definitions. To do this in v2 would require a bit of a hack and use an empty object, in v3 channels are entirely optional. This means that it's now possible to have a valid AsyncAPI document as such:

```
asyncapi: 3.0.0
components:
  ...
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: https://github.com/asyncapi/spec/pull/847

### Publish and subscribe confusion
For eternity, the `publish` and `subscribe` operation keywords have been a subject of great confusion. Does it mean I publishes to the channel? Does it mean you publish to me? Who are you in this context? 

In v3, you define your application behavior directly, no more confusion about what and who does what. This is achieved with two new operation keywords, `send` and `receive`, i.e. you application either send's or receive something.

This description of course alters slightly based on protocol, for the generic message brokers you produce or consume messages, but in the abstract AsyncAPI perspective, you still send or receive messages.

```
asyncapi: 3.0.0
...
operations: 
  SendUserSignedUp:
    action: send
  ReceiveUserSignedUp:
    action: receive
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: https://github.com/asyncapi/spec/pull/847

### Request/Reply
A long, long requested feature, is request and reply and it's finally here. 

One thorn in the eye of this feature, has always been the publish and subscribe confusion, which complicated any efforts to achieve a workable solution. However, with that out of the way, we now have a solution :fire:

This feature has been designed with the following use-cases in mind.

- Broker based messaging with well defined response topic + "correlationId".
- Broker based messaging with per process individual inbox aka. "replyTopic" + "correlationId".
- Broker based messaging with a temporary reply topic for a individual response
- WebSocket, that has no topics, where the channel is a tcp connection where flow messages. Only "correlationId"

```
...
action: send | receive
reply:
  address:
    location: '$message.header#/replyTo'
  channel:
    $ref: '#/channels/userSignupReply'
  messages:
    - $ref: '#/components/messages/userSignedUpReply'
```
Read more about the [Operation Reply Object here](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject).

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: https://github.com/asyncapi/spec/pull/847

### Unified referencing behaviors

In v2, there was two instances, where we used implicit references; server security configuration, by name referencing security requirement object in components, for channels to reference global servers by name. In an effort to stay as consistent as possible, we wanted to unify how references was used, that means that in v3, we ONLY use explicit references. 

The server security information is also now an array instead of an object.

```
asyncapi: 3.0.0
servers: 
  SomeServer:
    security:
      - $ref: '#/components/securitySchemes/SomeSecurity'
channels:
  SomeChannel: 
    servers: 
      - $ref: '#/servers/SomeServer'
...  
components:
  securitySchemes:
    SomeSecurity:
      ...
      scopes: [...]
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: https://github.com/asyncapi/spec/pull/852
### Common metadata fields
There have been some inconsistency between which type of metadata fields are available in the different objects. Now we have added a few extra fields 
- added `title`, `summary`, and `externalDocs` fields in Server Object
- added `title`, and `summary` fields in Channel Object
- added `title` field in Operation Object and Operation Trait Object

Issues: [#795](https://github.com/asyncapi/spec/issues/795) | Pull request: https://github.com/asyncapi/spec/pull/796
### Cleaning up the root object
There was two meta information lingering in the root of the AsyncAPI object, which did not make much sense since we have the `info` object for all the meta information.

Therefore the root `tags` and `externalDocs` have been moved to the info object.

Pull request: https://github.com/asyncapi/spec/pull/794
### Splitting out server URL into host and pathname
There have been some confusion about what `url` of a server should contain, is it both protocol + host + path? What about the protocol field then? Therefore the host, path, and protocol are all individual fields you defined.

```
asyncapi: 3.0.0
servers:
  localhost:
    host: localhost
    path: /api/v1,
    protocol: mqtt
```

Issues: [#547](https://github.com/asyncapi/spec/issues/547), [#274](https://github.com/asyncapi/spec/issues/274) | Pull request: https://github.com/asyncapi/spec/pull/888
### More reusable objects in components
This is a bit of a mixture between some of the features, that all added a little to this. It's now possible to add more stuff under components:
- External docs
- Tags
- replyAddresses
- replies
- operations
- channels

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: https://github.com/asyncapi/spec/pull/847, https://github.com/asyncapi/spec/pull/792, https://github.com/asyncapi/spec/pull/806,  https://github.com/asyncapi/spec/pull/827

### New trait behavior

TODO

### Schema format and payload definition

TODO


## Tooling support
The following official AsyncAPI tools are already updated to support 3.0.0 version of the specification:

    JSON Schema that supports validation of AsyncAPI documents is updated in this repository. Also @asyncapi/specs package has been updated on NPM to version 2.14.0, and it contains the 2.4.0 JSON Schema.
    JavaScript Parser uses latest @asyncapi/specs package and can be used to parse and validate 2.4.0 documents. Upgrade to 1.15.0 version.
    HTML template uses the latest @asyncapi/react-component package. Upgrade to 0.24.9 version.
    JavaScript Converter enables conversion from any AsyncAPI version into the 2.4.0 version of the spec. Upgrade to 0.11.0 version.
    Generator uses the latest @asyncapi/parser package, so while generating output, it can validate 2.4.0 documents. Upgrade to 1.9.3 version.

Last but not least is the AsyncAPI Studio. Check out the Studio with this example.

## Acknowledgements
Spec 3.0 have been a massive undertaking, so I would like to say a huge thank you! to everyone who have been involved, maybe you commented on your views, added to discussions, joined the live meetings, championed changes, reviewed proposed changes, list goes on, this section is for you!

Thank you, xxxxxxxxxxxxxxxxx

> Photo by <a href="https://unsplash.com/@andurache?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandru Tudorache</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
