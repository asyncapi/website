---
title: "The New Era Approaches"
date: 2023-06-10T06:00:00+01:00
type: Communication
tags:
  - Specification
  - Announcement
  - Release
cover: /img/posts/the-new-era-approaches.webp
authors:
  - name: Jonas Lagoni 
    photo: /img/avatars/jonaslagoni.webp
    link: https://www.linkedin.com/in/jonaslagoni/
excerpt: "An update around AsyncAPI 3.0, where we are, what is remaining, release schedule, and a first look at 3.0"
---

Back in [March 2022](https://www.asyncapi.com/blog/async-api-spec-3.0-release), you heard the first official words around AsyncAPI 3.0. Since then, a lot of people have been working diligently across many expertise to bring it to life. And with its current state, it's finally time to give an update on the progress.

## Show Me the Money!
We are not going to give any lengthy description of features, fixes, and changes. Instead, I will just show you the money as a teaser. :wink:

Below is an AsyncAPI v3 document that defines how you, a public application, can interact with my Smartylighting Streetlights system, where you can turn on a specific streetlight through WebSocket and get real-time information about environmental lighting conditions through Kafka.

See how many features you can spot just from this example. Some changes are absent in the example, but I tried to cramp as many changes into it as possible. Below the example is a short list of changes you'll be able to fact-check your guess with.

```yml
asyncapi: "3.0.0"
info:
  title: Smartylighting Streetlights public API
  version: "1.0.0"
  description: |
    The Smartylighting Streetlights public API allows you to remotely manage the city lights through Kafka and WebSocket.

    ### Check out its awesome features:

    * Turn a specific streetlight on 🌃
    * Receive real-time information about environmental lighting conditions 📈
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0

servers:
  kafka:
    host: test.mykafkacluster.org:8092
    protocol: kafka-secure
    description: Test Kafka broker
    security:
      - $ref: '#/components/securitySchemes/saslScram'
  websocket:
    host: test.websocket.org:1999
    protocol: ws
    description: Test WebSocket server

defaultContentType: application/json

channels:
  turnStreetlightOnChannel:
    address: "/"
    messages:
      turnOn: 
        $ref: "#/components/messages/turnOn"
    servers:
      - $ref: "#/servers/websocket"

  turnStreetlightOnReplyChannel:
    address: "/"
    messages:
      turnOnReply: 
        $ref: "#/components/messages/turnOnReply"
    servers:
      - $ref: "#/servers/websocket"

  lightMeasured:
    description: The topic on which measured values may be produced and consumed.
    address: "smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured"
    parameters:
      streetlightId:
        $ref: "#/components/parameters/streetlightId"
    messages:
      lightMeasured: 
        $ref: "#/components/messages/lightMeasured"
    servers:
      - $ref: "#/servers/kafka"

operations:
  turnOn:
    action: send
    operationId: turnOn
    channel:
      $ref: "#/channels/turnStreetlightOnChannel"
    reply:
      channel:
        $ref: "#/channels/turnStreetlightOnReplyChannel"

  lightMeasured:
    action: receive
    summary: Inform about environmental lighting conditions of a particular streetlight.
    operationId: receiveLightMeasurement
    channel:
      $ref: "#/channels/lightMeasured"
    traits:
      - $ref: "#/components/operationTraits/kafka"

components:
  messages:
    turnOn:
      name: turnOn
      title: Turn on
      summary: Command a particular streetlight to turn the lights on.
      payload:
        $ref: "#/components/schemas/turnOnPayload"

    turnOnReply:
      name: turnOnReply
      title: Turn on reply
      summary: Reply from turning on the lights
      payload:
        $ref: "#/components/schemas/turnOnReplyPayload"

    lightMeasured:
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions of a particular streetlight.
      contentType: application/json
      traits:
        - $ref: "#/components/messageTraits/commonHeaders"
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"

  schemas:
    turnOnPayload:
      type: object
      properties:
        streetlightId:
          description: The ID of the streetlight.
          type: string
        sentAt:
          type: string
          format: date-time
          description: Date and time when the request was sent

    turnOnReplyPayload:
      type: object
      properties:
        turnedOnTimestamp:
          type: string
          format: date-time
          description: Date and time when the light was actually turned on.

    lightMeasuredPayload:
      schemaFormat: "application/vnd.apache.avro;version=1.9.0"
      schema:
        type: record
        name: User
        namespace: com.company
        doc: User information
        fields:
          - name: lumens
            type: int
          - name: sentAt
            type: timestamp_ms

  securitySchemes:
    saslScram:
      type: scramSha256
      description: Provide your username and password for SASL/SCRAM authentication

  parameters:
    streetlightId:
      description: The ID of the streetlight.

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100

  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: public
```
As of the pre-release `v3.0.0-next-major-spec.12`, this is a valid AsyncAPI document. You can always find the most recent pre-release version here: https://www.asyncapi.com/docs/reference.

All the changes in 3.0 up until now are the following:

- Request/reply pattern.
- Introduce the new Channel Object, detached from operations.
- Introduce the new Operation object, detached from channels.
- Channels are no longer identified with address/topic/path.
- Optional channels.
- Schemas and schema formats are now naturally bound.
- Cleaned up the root object.
- Added additional meta fields for Server Object, Channel Object, Operation Object, and Operation Trait Object.
- External Documentation Object and Tag Object can now be reused and referenced.
- Unified referencing behavior.

In due time we will give you a complete rundown about all the changes in 3.0 and extended documentation that explains the features in more in-depth, including a migration guide and release blog post.

## The Remaining Effort

The specification work is nearly done; only one change is still being discussed which is changing traits behavior to an inheritance that can be overwritten.

However, at AsyncAPI, a specification is nothing without documentation and tools, which is why the majority of the remaining effort resolves just that.

For documentation, you have probably noticed that since the first release of 2.0, we now have concepts, tutorials, and guides. Some of those docs will be updated due to 3.0.  

Regarding tooling, it's impossible to give you a clear overview of what exactly will support 3.0 right out the gate because there are many different code owners and contributors with individual priorities. So if you want a tool to support 3.0 right out the gate, please do head over to the issue and voice the need, add a :thumbsup:, write a comment, or maybe even contribute the needed changes! 

- [AsyncAPI CLI](https://github.com/asyncapi/cli/issues/629)
- [AsyncAPI asyncapi-react](https://github.com/asyncapi/asyncapi-react/issues/733)
- [AsyncAPI generator](https://github.com/asyncapi/generator/issues/979)
- [AsyncAPI studio](https://github.com/asyncapi/studio/issues/641)
- [AsyncAPI converter-js](https://github.com/asyncapi/converter-js/issues/110)
- [AsyncAPI vs-asyncapi-preview](https://github.com/asyncapi/vs-asyncapi-preview/issues/181)
- [AsyncAPI bundler](https://github.com/asyncapi/bundler/issues/133)
- [AsyncAPI diff](https://github.com/asyncapi/diff/issues/154)
- [AsyncAPI cupid](https://github.com/asyncapi/cupid/issues/171)
- [AsyncAPI glee](https://github.com/asyncapi/glee/issues/457)
- [AsyncAPI server-api](https://github.com/asyncapi/server-api/issues/294)
- [AsyncAPI modelina](https://github.com/asyncapi/modelina/issues/1376)
- [AsyncAPI dotnet-nats-template](https://github.com/asyncapi/dotnet-nats-template/issues/384)
- [AsyncAPI ts-nats-template](https://github.com/asyncapi/ts-nats-template/issues/545)
- [AsyncAPI python-paho-template](https://github.com/asyncapi/python-paho-template/issues/189)
- [AsyncAPI nodejs-ws-template](https://github.com/asyncapi/nodejs-ws-template/issues/294)
- [AsyncAPI java-template](https://github.com/asyncapi/java-template/issues/118)
- [AsyncAPI java-spring-cloud-stream-template](https://github.com/asyncapi/java-spring-cloud-stream-template/issues/336)
- [AsyncAPI go-watermill-template](https://github.com/asyncapi/go-watermill-template/issues/243)
- [AsyncAPI java-spring-template](https://github.com/asyncapi/java-spring-template/issues/308)
- [AsyncAPI markdown-template](https://github.com/asyncapi/markdown-template/issues/341)
- [AsyncAPI html-template](https://github.com/asyncapi/html-template/issues/430)

The only tools we can say for sure that will support 3.0 right out the gate are the JS parser and the specification JSON Schema documents because they need to be updated for any specification change to be accepted :laughing:

Currently, we are [using completed tasks as the release date for 3.0](https://github.com/asyncapi/spec/issues/944). Once all tasks are completed, we'll release 3.0.


## Release Date

That leaves the big question... When is the release then?

Honestly, we tried to stick with a release date, and more specifically, we thought the July release period (yes, next month). However as you can probably guess with the remaining work, that's most likely not going to happen. As we are learning, major changes take time, and schedules in open source are, hard, to say the least. :smile: 

While all the specification changes are most likely done by July, my best guess, right now, is for everything to be released in September.

The more people help out, the faster it will get done. :wink:

The next time you will hear from me will be the release blog post for 3.0. :wave:

> Photo by <a href="https://unsplash.com/fr/@timmarshall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Marshall</a> on <a href="https://unsplash.com/photos/mWqE5OD15wk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
