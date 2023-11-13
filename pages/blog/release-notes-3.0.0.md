---
title: AsyncAPI 3.0.0 Release Notes
date: 2023-09-15T19:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.4.0/cover.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
excerpt: 'The new era has arrived'
featured: true
---

The new version of the AsyncAPI specification - 3.0.0 - is now available and is packed with goodies! Some clear up confusion, some add features, and others improve maintainability.

To make the information as clear as possible, we have split up the information into digestible chunks.

If you want to get an overview of:
- All the changes done in v3, you are in the right place! 
- All the breaking changes between v2 and v3, i.e. migration guide - Read the [AsyncAPI 3.0.0 migration guide](/docs/migration/migrating-to-v3) 

## Overview
This post will give you an overview of all the changes done in v3.

### Operation, channel, and message decoupling

In v2, it has never been possible to re-use channels, because it was directly coupled with operations of an application.

In v3, this is now possible, with the mindset a channel and message should be detached from the operations performed. This means for any message broker, for example, for Kafka, channels now ONLY define topics and the messages it contains. For REST interfaces, it's all the paths and corresponding messages across all request types. For WebSocket, it's all the messages flowing through the WebSocket server. For Socket.Io, it defines all the rooms and messages therein.

This change makes the channels reusable across multiple AsyncAPI documents.

```
asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: user/signedup
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

Issues: [#618](https://github.com/asyncapi/spec/issues/618), [#663](https://github.com/asyncapi/spec/issues/663) | Pull request: [#806](https://github.com/asyncapi/spec/pull/806), [#827](https://github.com/asyncapi/spec/pull/827)

### Messages instead of message
As you probably noticed above, messages in channels are no longer singular, and with `oneOf`, instead messages are defined as key/value pairs. This was part of the request-reply feature to enable easier referencing of messages.

```
asyncapi: 3.0.0
...
channels:
  UserSignup:
    address: user/signedup
    messages: 
      UserMessage: 
        ...
```

### Publish and subscribe confusion
In v2, the `publish` and `subscribe` operation keywords have always been confusing. Does it mean my application publishes to the channel? Does it mean you publish for me? Who are you in this context? 

In v3, we try to clear this up. You only need to worry about your and your application's behavior. No more confusion about what and who does what. We achieve this through two new operation keywords, `send` and `receive`, i.e. your application either sends or receives something.

This description of course alters slightly based on protocol; for the generic message brokers you produce or consume messages, but in the abstract AsyncAPI perspective, you still send or receive messages.

```
asyncapi: 3.0.0
...
operations: 
  SendUserSignedUp:
    action: send
  ReceiveUserSignedUp:
    action: receive
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: [#847](https://github.com/asyncapi/spec/pull/847)

### Request/Reply
One of the longest requested features is request and reply... and it's finally here! 

One thorn in the eye of this feature has always been the publish and subscribe confusion, which complicated any efforts to achieve a workable solution. However, we now have a solution with that out of the way. :fire:

This feature has been designed with the following use cases in mind:

- Broker-based messaging with well-defined response topic + "correlationId".
- Broker-based messaging with per process individual inbox aka "replyTopic" + "correlationId".
- Broker-based messaging with a temporary reply topic for an individual response.
- WebSocket, which has no topics, where the channel is a TCP connection where messages flow.

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

Issues: [#94](https://github.com/asyncapi/spec/issues/94), [#558](https://github.com/asyncapi/spec/issues/558) | Pull request: [#847](https://github.com/asyncapi/spec/pull/847)

### Optional channels
We have seen many use cases where an AsyncAPI document has been used as a form of menu or collection of definitions. To do this in v2 would require a bit of a hack. But in v3, channels are now entirely optional. This means that it's now possible to have a valid AsyncAPI document as such:

```
asyncapi: 3.0.0
components:
  ...
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: [#847](https://github.com/asyncapi/spec/pull/847)

### Unified referencing behaviors

In v2, there were two instances where we used implicit references; server security configuration, by name referencing security requirement object in components, for channels to reference global servers by name. To stay as consistent as possible, we wanted to unify how references were used, which means that in v3, we ONLY use explicit references. 

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

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: [#852](https://github.com/asyncapi/spec/pull/852)

### Common metadata fields
There has been some inconsistency between which metadata fields are available in the different objects. Now we have added a few extra fields:
- added `title`, `summary`, and `externalDocs` fields in Server Object
- added `title` and `summary` fields in Channel Object
- added `title` field in Operation Object and Operation Trait Object

```
asyncapi: 3.0.0
servers:
  SomeServer:
    title: Some Server title
    summary: This some server is for something
    externalDocs:
      ...
channels:
  SomeChannel:
    title: Some channel title
    summary: Some channel summary
operations:
  SomeOperation:
    title: Some operation title
    traits:
      - title: Some operation traits title
```

Issues: [#795](https://github.com/asyncapi/spec/issues/795) | Pull request: [#796](https://github.com/asyncapi/spec/pull/796)

### Cleaning up the root object
There was two meta information lingering in the root of the AsyncAPI object, which did not make much sense since we have the `info` object for all the meta information.

Therefore the root `tags` and `externalDocs` have been moved to the info object.

```
asyncapi: 3.0.0
info:
  ...
  externalDocs:
    description: Find more info here
    url: https://www.asyncapi.org
  tags:
    - name: e-commerce
...
```

Pull request: [#794](https://github.com/asyncapi/spec/pull/794)

### Splitting out server URL into host and pathname
There has been some confusion about what the `url` of a server should contain; is it both protocol + host + path? What about the protocol field, then? Therefore each field now has its field for the host, path, and protocol.

```
asyncapi: 3.0.0
servers:
  localhost:
    host: localhost
    path: /api/v1,
    protocol: mqtt
```

Issues: [#547](https://github.com/asyncapi/spec/issues/547), [#274](https://github.com/asyncapi/spec/issues/274) | Pull request: [#888](https://github.com/asyncapi/spec/pull/888)

### More reusable objects in components
This is a bit of a mixture between some of the features, that all added a little to this. It's now possible to add more stuff under components:
- Replies
- Reply addresses
- Tags
- External docs
- Operations
- Channels

```
asyncapi: 3.0.0
components:
  ...
  replies:
    ...
  replyAddresses:
    ...
  tags: 
    ...
  externalDocs:
    ...
  operations:
    ...
  channels:
    ...
```

Issues: [#829](https://github.com/asyncapi/spec/issues/829) | Pull request: [#847](https://github.com/asyncapi/spec/pull/847), [#792](https://github.com/asyncapi/spec/pull/792), [#806](https://github.com/asyncapi/spec/pull/806), [#827](https://github.com/asyncapi/spec/pull/827)

### New trait behavior
Traits in v2 always replaced any duplicate properties that were defined both in traits and the associated object. This meant, for example, if the message traits defined headers and the message object did as well, only the message trait headers would be applied because it overwrote anything you wrote in the message object.

In v3, this has now been changed so that main objects have a higher priority than what ever you define in traits.

For example, take a look at this message:
```
messageId: userSignup
description: A longer description.
payload:
  $ref: '#/components/schemas/userSignupPayload'
traits:
  - name: UserSignup
    title: User signup
    summary: Action to sign a user up.
    description: Description from trait.
```
Take notice of how `description` is not overwritten by the traits:

```
messageId: userSignup
name: UserSignup
title: User signup
summary: Action to sign a user up.
description: A longer description. # it's still description from "main" object
payload:
  $ref: '#/components/schemas/userSignupPayload'
```

Issues: [#505](https://github.com/asyncapi/spec/issues/505) | Pull request: [#517](https://github.com/asyncapi/spec/pull/517), [#532](https://github.com/asyncapi/spec/pull/532), [#907](https://github.com/asyncapi/spec/pull/907)

### Schema format and payload definition
With schemas, one thing that has always been impossible was reusing schemas with different schema formats. That's because the schema format information is part of the message object. That means that if you reference a Schema object, it has no information about the schema format because it's not located together.

In v3, schemaFormat has been removed from the message object and message trait object, and a new schema Object called `Multi Format Schema Object` has been introduced, which pairs a schema together with its schema format. Which now enables much better reusability:

```
asyncapi: 3.0.0
components:
  schemas:
    avroSchema:
      schemaFormat: 'application/vnd.apache.avro+yaml;version=1.9.0'
      schema:           
        type: record
        name: User
        namespace: com.company
        doc: User information
        fields:
          - name: displayName
            type: string
```

Issues: [#622](https://github.com/asyncapi/spec/issues/622) | Pull request: [#797](https://github.com/asyncapi/spec/pull/797), [#910](https://github.com/asyncapi/spec/pull/910)

### Simplified Parameters
In v2, it was possible to use the full power of JSON Schema to define parameters, however, it introduced a lot of complexity to parameters, so for v3 it was dialed way down to only allow a very small set of properties.
Parameters can now only have the following properties: `enum`, `default`, `description`, `examples`, and `location`. 

```
asyncapi: 3.0.0
channels: 
  userSignup:
    address: user/{userId}/signedup
    parameters:
      userId:
        description: Id of the user.
```

Issues: [#583](https://github.com/asyncapi/spec/issues/583) | Pull request: [#935](https://github.com/asyncapi/spec/pull/935) | Specification information: https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#parameterObject

### Editorial changes

We have [removed the note that stated we strived to be compatible with OpenAPI where possible]([#933](https://github.com/asyncapi/spec/pull/933)) because, with the recent changes, this is no longer the case. That said, we still strive to make the different specs as interoperable as possible i.e., with Avro, RAML, OpenAPI Schema, etc. 

## Acknowledgements
Spec 3.0 have been a massive undertaking, so I would like to say a huge "thank you!" to everyone who has been involved; maybe you commented on your views, added to discussions, joined the live meetings, championed changes, or reviewed proposed changes; this section is for you!



Thank you, [Simon Heimler](https://github.com/Fannon), [Vladimír Gorej](https://github.com/char0n), [Fran Méndez](https://github.com/fmvilas), [Lukasz Gornicki](https://github.com/derberg), [Sergio Moya](https://github.com/smoya), [Michael Davis](https://github.com/damaru-inc), [Maciej Urbańczyk](https://github.com/magicmatatjahu), [Jesse Menning](https://github.com/jessemenning), [Heiko Henning](https://github.com/GreenRover), [Gerald Loeffler ](https://github.com/GeraldLoeffler), [c-pius](https://github.com/c-pius), [Ian Cooper](https://github.com/iancooper), [Dale Lane](https://github.com/dalelane), [Jörg Walter](https://github.com/joerg-walter-de), [Nic Townsend](https://github.com/nictownsend), [Laurent Broudoux](https://github.com/lbroudoux), [olamiral](https://github.com/olamiral), [Iván García Sainz-Aja](https://github.com/ivangsa), [Fabian Bühler](https://github.com/buehlefs), [John Fallows](https://github.com/jfallows), [Adrian Hope-Bailie](https://github.com/adrianhopebailie), [Christian (prdatur)](https://github.com/prdatur), [Karl Morrison](https://github.com/basickarl), [Javier Jiménez Roda](https://github.com/jjimenezroda), [Marek Sebera](https://github.com/smarek), [Nathanaël Lécaudé](https://github.com/natcl), [Jeremy Whitlock](https://github.com/whitlockjc), [souvik](https://github.com/Souvikns), [Animesh Kumar](https://www.github.com/animeshkumar923), [Samir AMZANI](https://github.com/Amzani), [Alejandra Quetzalli](https://github.com/alequetzalli), [Vaishnavi](https://github.com/VaishnaviNandakumar), [Mahfuza](https://github.com/mhmohona), [Bhaswati](https://github.com/BhaswatiRoy), [Cynthia Peter](https://github.com/CynthiaPeter), [Arya Gupta](https://github.com/Arya-Gupta), [Joy Almeida](https://github.com/J0SAL), [Hridyesh](https://github.com/kakabisht), [Rohit](https://github.com/TRohit20)

> Photo by <a href="https://unsplash.com/@andurache?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandru Tudorache</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
