---
title: How to validate Messages/Events in runtime
description: In this tutorial, you'll learn how to validate messages/events in AsyncAPI in runtime.
weight: 120
---

# Introduction

In this tutorial, you will learn how to validate the messages in your AsyncAPI document after creating your application in runtime.
You will create an application using Node.js.
- Your application will connect to the message broker and receive a stream of events/ messages.
- Message validator will check the message name, payload, channel and operation (publish/subscribe)
- Message validator reads the AsyncAPI document if it is valid or not and returns an error if it is invalid.
You will learn about application run time, messages and creating an AsyncAPI file to describe your API and generate code from it.


# Background Context

Runtime is the phase of the program lifecycle that executes and keeps a program running; other phases include edit time, compile time, link time, distribution time, installation time, and load time. Developers can manipulate and send instructions to a program while testing their program in a runtime. 
A [message](https://www.asyncapi.com/docs/reference/specification/v2.4.0#definitionsMessage) is the mechanism by which information is exchanged via a channel between servers and applications. A [message](https://www.asyncapi.com/docs/reference/specification/v2.0.0#definitionsMessage) MUST contain a payload and MAY also contain headers. The payload contains the data, defined by the application, which MUST be serialized into a format (JSON, XML, Avro, binary, etc.) We use a superset of [JSON Schema](https://www.asyncapi.com/docs/reference/specification/v2.0.0#schemaObject) as the default format for defining operation payloads, headers, channel parameter schemas, etc. The JSON Schema defines that the JSON data should be an object, which requires a property called `someRequiredProperty` to always be present and an optional property called `someOptionalProperty`. `someRequiredProperty` should validate against an integer and `someOptionalProperty` against an arbitrary string. We will be using it for validation of messages against the schema.
In the previous tutorial, we learned how to create the AsyncAPI file. 

# Installation Guide

You'll use Node.js to code the API. The selected technology is irrelevant here, since everything explained in this tutorial is applicable to any other programming language and message brokers.

Before you proceed to the next stage, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).

2. Install Git based on your Operating System:
    - [Install Git on MacOs](https://git-scm.com/download/mac)
    - [Install Git on Windows](https://git-scm.com/download/win)
    - [Install Git on Linux](https://git-scm.com/download/linux)

# Validation of messages

Validation of messages can be done is several ways

- [asyncapi-validator](https://github.com/WaleedAshraf/asyncapi-validator), it validates your messages against your AsyncAPI schema.
- [AsyncAPI event gateway](https://github.com/asyncapi/event-gateway), it is not a library that you intergrate in an App, but validation is done before the message gets into the app, on a gateway.

# Validation using AsyncAPI Validator

It is a message validator through AsyncAPI schema. 
1. In order to validate messages, you need to install this package
<CodeBlock language="bash"> 
{`npm i asyncapi-validator`} 
</CodeBlock>

2. To validate messages using `messageId`
Here messageId should be as defined in [AsyncAPI Schema v2.4.0](https://www.asyncapi.com/docs/reference/specification/v2.4.0#messageObject).
<CodeBlock>
{`.validateByMessageId(key, payload)`}
</CodeBlock>

3. To validate messages using `.validate()` method you should provide `msgIdentifier` in AsyncApiValidator `options`.

<CodeBlock>
{`.validate(key, payload, channel, operation)`}
</CodeBlock>

# Here's an example usecase with `.validateByMessageId()` method

1. Let's first create the AsyncAPI file
<CodeBlock language="yaml">
{`cat <<EOT >> asyncapi.yaml
asyncapi: 2.0.0

info:
  title: User Events
  version: 1.0.0

channels:
  user-events:
    description: user related events
    publish:
      message:
        name: UserDeletedMessage
        x-custom-key: UserDeleted
        payload:
          type: object
          properties:
            userEmail:
              type: string
            userId:
              type: string
              EOT`}
              </CodeBlock>

2. Now by using `asyncapi-validator`.To validate incoming MQTT messages, you have to load the AsyncAPI schema definition using the `fromSource` method and then you can validate any message with its key and payload using the validate method.

<CodeBlock>
{`const AsyncApiValidator = require('asyncapi-validator')
let va = await AsyncApiValidator.fromSource('./api.yaml')

// validate messageId 'UserRemoved'
va.validateByMessageId('UserRemoved', {
  userId: '123456789',
  userEmail: 'alex@mail.com',
})`}
</CodeBlock>

# Here's an example usecase with .validate() method

1. Let's create another AsyncAPI file

<CodeBlock language="yaml">
{`asyncapi: 2.0.0

info:
  title: User Events
  version: 1.0.0

channels:
  user-events:
    description: user related events
    publish:
      message:
        name: UserDeletedMessage
        x-custom-key: UserDeleted
        payload:
          type: object
          properties:
            userEmail:
              type: string
            userId:
              type: string`}
              </CodeBlock>

2. Now by using `asyncapi-validator`. here "msgIdentifier" is "x-custom-key". That is why, "UserDeleted" is used as "key" in "va.validate()" method.

<CodeBlock>
{`const AsyncApiValidator = require('asyncapi-validator')
let va = await AsyncApiValidator.fromSource('./api.yaml', {msgIdentifier: 'x-custom-key'})

// validate 'UserDeleted' on channel 'user-events' with operation 'publish'
va.validate('UserDeleted', {
  userId: '123456789',
  userEmail: 'alex@mail.com',
}, 'user-events', 'publish')`}
</CodeBlock>

# Validation using AsyncAPI gateway

AsyncAPI gateway intercepts all incoming messages moving them into a pipeline of middlewares and handlers such as Message validator.As per today, only the Kafka protocol is supported.

# Here's an example usecase using AsyncAPI gateway

1. Let's create the AsyncAPI file. Expected messages are based on a small portion of the StreetLights tutorial.

<CodeBlock language="yaml">
{`asyncapi: '2.4.0'
info:
  title: AsyncAPI Event-Gateway demo API
  version: 1.0.0-alpha
  description: This API lets users interact with an instance of the [AsyncAPI Event-Gateway](https://github.com/asyncapi/event-gateway).
defaultContentType: application/json
servers:
  asyncapi-event-gateway-demo:
    url: 'event-gateway-demo.asyncapi.com:20472'
    protocol: kafka
    description: AsyncAPI [Event-Gateway](https://github.com/asyncapi/event-gateway) demo Kafka proxy. Expected messages are based on a small portion of the [StreetLights tutorial](https://bit.ly/asyncapi).
  asyncapi-event-gateway-demo-validation:
    url: 'event-gateway-demo.asyncapi.com:5000/ws'
    protocol: ws
    description: AsyncAPI [Event-Gateway](https://github.com/asyncapi/event-gateway) demo. Subscribe for Kafka proxy message validation errors.
  asyncapi-kafka-test:
    url: 'asyncapi-kafka-test-asyncapi-8f90.aivencloud.com:20472' # Kafka with 3 brokers.
    protocol: kafka-secure
    description: AsyncAPI Kafka test broker. Private.
channels:
  event-gateway-demo:
    description: Demo Kafka topic for asyncapi-event-gateway-demo server. Users can send their events to this topic and see how message validation happens on the fly based on this right AsyncAPI file by connecting to `event-gateway-demo-validation-events` channel (`asyncapi-event-gateway-demo-validation` ws server).
    x-servers: # Based on https://github.com/asyncapi/spec/pull/531
      - asyncapi-event-gateway-demo
    publish:
      message:
        $ref: '#/components/messages/lightMeasured'
  event-gateway-demo-validation-events:
    description: Validation errors are published here, so users can see how message validation happens on the fly based on this right AsyncAPI file.
    x-servers: # Based on https://github.com/asyncapi/spec/pull/531
      - asyncapi-event-gateway-demo-validation
    subscribe:
      message:
        $ref: '#/components/messages/invalidMessage'
  event-gateway-demo-validation:
    description: Validation errors are published to and consumed from it. AsyncAPI Event-gateway is the only user of this channel. It can be consumed and exposed via `event-gateway-demo-validation-events` channel (`asyncapi-event-gateway-demo-validation` ws server).
    x-servers: # Based on https://github.com/asyncapi/spec/pull/531
      - asyncapi-kafka-test
    subscribe:
      message:
        $ref: '#/components/messages/invalidMessage'
components:
  messages:
    # lightMeasured is copied from the Streetlights tutorial instead of using references due to a bug in parser-go: https://github.com/asyncapi/parser-go/issues/82
    lightMeasured:
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions of a particular streetlight.
      contentType: application/json
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    invalidMessage:
      title: Invalid message
      summary: Message with a Validation Error.
      contentType: application/json
      payload:
        $ref: "#/components/schemas/sentMessage"
      headers:
        type: object
        properties:
          _asyncapi_eg_channel:
            type: string
            description: AsyncAPI Channel where the message was published to.
          _asyncapi_eg_validation_error:
            $ref: '#/components/schemas/validationError'
  schemas:
    sentMessage:
      type: object
      properties:
        UUID:
          type: string
          description: Unique identifier of message. I.e. Kafka message key.
        Payload:
          type: string
          description: Message value. I.e. Kafka message (base64).
      examples:
        - UUID: 'YXN5bmNhcGktd2FzLWhlcmU='
          Payload: 'eyJsdW1lbnMiOiAid2hhdGV2ZXIifQ=='
    validationError:
      type: object
      properties:
        ts:
          type: string
          description: RFC-3339 date-time. Date and time when the message was validated.
        errors:
          type: array
          description: Array of string. Validation errors.
          items:
            type: string
      examples:
        - ts: '2021-09-10T12:04:18:475203609Z'
          errors: [ 'lumens: Invalid type. Expected: integer, given: string' ]
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          minimum: 0
          description: Light intensity measured in lumens.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100`}
</CodeBlock>

2. The gateway accepts the light measured `lightMeasured` as a message to inform about environmental lighting conditions of a particular streetlight.

<CodeBlock>
{`lumens      integer >= 0
Light intensity measured in lumens.

sentAt      string format: date-time `uid: sentAt`
Date and time when the message was sent.`}
</CodeBlock>

3. It returns the error when it detects the following invalid message `invalidMessage`

<CodeBlock>
{`UUID       string
           Unique identifier of message. I.e. Kafka message key.

Payload    string
           Message value. I.e. Kafka message (base64).`}
</CodeBlock>

# Summary

In this tutorial, we have learnt how to validate messages by using either AsyncAPI validator package or the AsyncAPI gateway, where we can validate the messages before it passes through the application.
