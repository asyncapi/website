---
title: Validate Messages/Events in runtime
description: This guide explains different use cases for messages/events validation using AsyncAPI.
---

# Introduction

In this guide, you will learn how to validate the messages in your AsyncAPI document after creating your application in runtime.

# Prerequisites
Because this guide covers two different options for validating AsyncAPI messages, there are different tool options you might choose to install:

- [Node.js](https://nodejs.org/en/download/) (v15 or newer).
- [AsyncAPI validator](https://www.npmjs.com/package/asyncapi-validator)
- [AsyncAPI event gateway](https://github.com/asyncapi/event-gateway)

# Message validation
There are two tools to validate AsyncAPI message (events); [AsyncAPI validator](https://github.com/WaleedAshraf/asyncapi-validator) validates your messages against your AsyncAPI schema and [AsyncAPI event gateway](https://github.com/asyncapi/event-gateway) validates messages on a gateway, before they reach the app.

Let's further break down how validation works for both.

## AsyncAPI schema validation
The [AsyncAPI schema validator](https://github.com/WaleedAshraf/asyncapi-validator) is a message validator for AsyncAPI schema. 

Run the following command to install AsyncAPI schema validator:
<CodeBlock language="bash"> 
`npm i asyncapi-validator`
</CodeBlock>

### `messageId` validation method
The messageId is defined in [AsyncAPI Schema v2.4.0](https://www.asyncapi.com/docs/reference/specification/v2.4.0#messageObject).
<CodeBlock>
`.validateByMessageId(key, payload)`
</CodeBlock>

1. Create an AsyncAPI document:
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

2. Validate incoming MQTT messages by loading the AsyncAPI schema definition via the `fromSource` method. 

<CodeBlock>
{`const AsyncApiValidator = require('asyncapi-validator')
let va = await AsyncApiValidator.fromSource('./api.yaml')
// validate messageId 'UserRemoved'
va.validateByMessageId('UserRemoved', {
  userId: '123456789',
  userEmail: 'alex@mail.com',
})`}
</CodeBlock>

### `.validate()` validation method 
In this method, you must provide the `msgIdentifier` in the AsyncApiValidator `options`.

<CodeBlock>
`.validate(key, payload, channel, operation)`
</CodeBlock>

1. Create an AsyncAPI file:

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

In this example, the `msgIdentifier` is the `x-custom-key`, and `UserDeleted` is the _key_ used in the `va.validate()` method.

<CodeBlock>
{`const AsyncApiValidator = require('asyncapi-validator')
let va = await AsyncApiValidator.fromSource('./api.yaml', {msgIdentifier: 'x-custom-key'})
// validate 'UserDeleted' on channel 'user-events' with operation 'publish'
va.validate('UserDeleted', {
  userId: '123456789',
  userEmail: 'alex@mail.com',
}, 'user-events', 'publish')`}
</CodeBlock>

## AsyncAPI gateway validation
AsyncAPI gateway intercepts all incoming messages by passing them through middleware and handler pipelines. 

<Remember>
Currently, only the Kafka protocol is supported.
</Remember>

1. Create an AsyncAPI document. 

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
    description: Demo Kafka topic for asyncapi-event-gateway-demo server. Users can send their events to this topic and see how message validation happens on the fly based on this right AsyncAPI file by connecting to \`event-gateway-demo-validation-events\` channel (\`asyncapi-event-gateway-demo-validation\` ws server).
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
    description: Validation errors are published to and consumed from it. AsyncAPI Event-gateway is the only user of this channel. It can be consumed and exposed via \`event-gateway-demo-validation-events\` channel (\`asyncapi-event-gateway-demo-validation\` ws server).
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

2. AsyncAPI gateway accepts `lightMeasured` as a message that informs about the environmental lighting conditions of a particular streetlight.

<CodeBlock>
{`lumens      
integer >= 0
Light intensity measured in lumens.
sentAt      
    string format: date-time 
    uid: sentAt
Date and time when the message was sent.
`}
</CodeBlock>

3. Invalid messages (`invalidMessage`) return an error:

<CodeBlock>
{`UUID       string
           Unique identifier of message. I.e. Kafka message key.
Payload    string
           Message value. I.e. Kafka message (base64).`}
</CodeBlock>

# Additional Resources
- AsyncAPI file and demo can be opened with [Studio.](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/event-gateway/master/deployments/k8s/event-gateway-demo/event-gateway-demo.asyncapi.yaml)

- You can check out other AsyncAPI validators [here](https://www.asyncapi.com/docs/tools#validators)
