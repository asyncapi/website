---
title: "The New Era Approaches"
date: 2023-06-10T06:00:00+01:00
type: Communication
tags:
  - Specification
  - Announcement
  - Release
cover: /img/posts/async-api-spec-3.0-update.webp
authors:
  - name: Jonas Lagoni 
    photo: /img/avatars/jonaslagoni.webp
    link: https://www.linkedin.com/in/jonaslagoni/
excerpt: "An update around AsyncAPI 3.0, where we are, what is remaining, release schedule, and a first look at 3.0"
featured: true
---

Back in [March 2022](https://www.asyncapi.com/blog/async-api-spec-3.0-release), you heard the first official words around AsyncAPI 3.0, since then a lot of people have been working diligently across many expertise's to bring it to life. And with it's current state, it's finally time to give an update on the progress.

## Show me the money!
I am not going to give any lengthy description of features, fixes and changes done to the spec up until this point in time, I will instead just show you the money as a teaser :wink:

Below is an AsyncAPI v3 document that defines how you, a public application, can interact my Smartylighting Streetlights system, where you can turn on a specific streetlight through WebSocket, and get real-time information about environmental lighting conditions through Kafka.

As of the pre-release `v3.0.0-next-major-spec.12`, this is a valid AsyncAPI document. You can always find the most recent pre-release version here: https://www.asyncapi.com/docs/reference

This example is not the full capabilities of 3.0, but only a fraction of what you can do in the upcoming version.

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
    description: Test kafka broker
    security:
      - saslScram: []
  websocket:
    host: test.websocket.org:1999
    protocol: ws
    description: Test WebSocket server

defaultContentType: application/json

channels:
  turnStreetlightOnChannel:
    address: "/"
    message:
      $ref: "#/components/messages/turnOn"
    servers:
      - $ref: "#/servers/websocket"

  turnStreetlightOnReplyChannel:
    address: null
    message:
      $ref: "#/components/messages/turnOnReply"
    servers:
      - $ref: "#/servers/websocket"

  lightMeasured:
    description: The topic on which measured values may be produced and consumed.
    address: "smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured"
    parameters:
      streetlightId:
        $ref: "#/components/parameters/streetlightId"
    message:
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
        command:
          type: string
          enum:
            - on
          description: Whether to turn on the light.
        streetlightId:
          description: The ID of the streetlight.
          type: string
        sentAt:
          $ref: "#/components/schemas/sentAt"

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

In due time we will give you a complete rundown about all the changes in 3.0, as well as extended documentation that explains the features more in depth. This of course also includes migration guide.

## Remaining effort

The specification work is nearly done, very few tasks remaining there.

However, at AsyncAPI, a specification is nothing if there are no tools available to work with it. Thats why the remaining effort are mainly resolving around documentation and tooling. 

For documentation, you have probably noticed that since the first release of 2.0, we now have concepts, tutorials, and guides, and almost all is going to change for 3.0 in some way or another.

When it comes to tooling, it's impossible to give you a clear overview of what exactly will support 3.0 right out the gate, because there are many different code owners and contributors that each has specific priorities. So if you want to see a tool support 3.0, please do head over to the issue and voice the need, add a :thumbs_up: or write a comment, maybe even contribute the needed changes! 

- [AsyncAPI CLI](https://github.com/asyncapi/cli/issues/629)
- [AsyncAPI bundler](https://github.com/asyncapi/bundler/issues/133)
- [AsyncAPI diff](https://github.com/asyncapi/diff/issues/154)
- [AsyncAPI cupid](https://github.com/asyncapi/cupid/issues/171)
- [AsyncAPI studio](https://github.com/asyncapi/studio/issues/641)
- [AsyncAPI vs-asyncapi-preview](https://github.com/asyncapi/vs-asyncapi-preview/issues/181)
- [AsyncAPI glee](https://github.com/asyncapi/glee/issues/457)
- [AsyncAPI converter-js](https://github.com/asyncapi/converter-js/issues/110)
- [AsyncAPI server-api](https://github.com/asyncapi/server-api/issues/294)
- [AsyncAPI modelina](https://github.com/asyncapi/modelina/issues/1376)
- [AsyncAPI asyncapi-react](https://github.com/asyncapi/asyncapi-react/issues/733)
- [AsyncAPI generator](https://github.com/asyncapi/generator/issues/979)
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

The only tools I can say for sure that will support 3.0 right out the gate are the JS parser and the specification JSON Schema documents, well because they need to be updated for any specification change :laughing:

## Release date

The big question... When is the release then?

Honestly, we tried to stick with a release date, and more specifically, we thought the July release period (yes, next month :laughing:). However as you can probably guess with the remaining work, thats most likely not going to happen. As we are learning, major changes take time, and schedules in Open source is, hard, to say the least :smile: 

While all the spec changes, are most likely done by July, my best guess, right now, is for everything to be released in September.

The more people that helps, the faster it gets done :wink:

> Photo by <a href="https://unsplash.com/fr/@timmarshall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Marshall</a> on <a href="https://unsplash.com/photos/mWqE5OD15wk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  