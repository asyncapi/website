---
title: Create AsyncAPI document
description: In this tutorial, you'll learn how to create an AsyncAPI document.
weight: 80
---

## Introduction

In this tutorial, you'll learn how to create an AsyncAPI document based on a sample real-world use case. Additionally, you will learn about event-driven architecture, message brokers, pub/sub pattern.

Let's pretend you have a company called Smarty Lighting, and you install smart-city streetlight lighting systems. This smart lighting system is a use case of the Internet of things (IoT).You will create a Smartylighting Streetlights API using Node.js and Mosquitto (MQTT) as the message broker. This API will allow you to manage city lights remotely. 

You want to build a system that can turn streetlights on and off based on their environmental conditions: 

- You will implement an event-driven architecture (EDA) with a message broker in its "center."

- Streetlights will publish information about their environmental lighting to the broker.

- Your application will connect to the broker and receive a stream of events from all the streetlights reporting their conditions.

- Your application decides based on events when to turn the streetlight off.

- Your application is not aware of how many streetlights are publishing events - it just connects to the broker and receives all events.


## Background context

Event-driven architecture (EDA) is a design pattern built around the production, detection, and reaction to events that take place in time. In this pattern, a message broker, event publishers and subscribers are its main components for event exchange within microservices.

[Message brokers](/docs/tutorials/getting-started/event-driven-architectures#message-broker) enables asynchronous communications between services so that the sending service need not wait for the receiving service’s reply. This allows interdependent services to “talk” with one another directly, even if they were written in different languages or implemented on different platforms. 

Futhermore, the [Pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission.  

[MQTT](https://mqtt.org/), is a well-known protocol that is widely used in IoT applications because it was created particularly to address machine-to-machine (M2M) communication.

## Create AsyncAPI document

In this step, you will create an AsyncAPI document to describe the Streelights API. It will help you generate the code and the documentation later on.

To create one, you can either use the [AsyncAPI Studio](https://studio.asyncapi.com) or the [AsyncAPI CLI](https://github.com/asyncapi/cli), depending on your project need.

<Remember>

You can create a new `asyncapi.yaml` document by running: 
`asyncapi new --example=tutorial.yml --no-tty`.

</Remember>

Go ahead to create the specification documents titled `asyncapi` with a `.yaml` extension.

<CodeBlock>
{`asyncapi: '2.5.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message:
        name: LightMeasured
        payload:
          type: object
          properties:
            id:
              type: integer
              minimum: 0
              description: Id of the streetlight.
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.
            sentAt:
              type: string
              format: date-time
              description: Date and time when the message was sent.`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`asyncapi: '2.5.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'`}
</CodeBlock>

- The `asyncapi` field indicates you use the AsyncAPI version 2.5.0.

- The `info` field holds information about the Streetlights API. Here, the title, version, description and license were defined.

Moving on, let's talk about the `servers` section.
<CodeBlock>
{`servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt`}
</CodeBlock> 

In this section, you point to the Eclipse Mosquitto message broker. The `url` point to a real instance of the broker [hosted by the Mosquitto community](https://test.mosquitto.org/) and the `protocol` as MQTT. If you do not want to use the test instance, you can spin up your own broker locally with `docker run -it -p 1883:1883 eclipse-mosquitto:1.5`. But remember to change `url` to `mqtt://localhost`

Now lets move on to the `channels` section. This section is used to describe the event names your API will be publishing and/or subscribing to.

<CodeBlock>
{`channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured`}
</CodeBlock>

In this example, `light/measured` is the channel name the Streetlight API will `subscribe` to (i.e, to interact with the Streetlight API you `publish` to the broker). The `operationId` property, describes what is the name of function or method that takes care of this functionality in the generated code.

Next is the `payload` property which is used to understand how the event should look like when publishing to that channel:

<CodeBlock>
{`      payload:
        type: object
        properties:
          id:
            type: integer
            minimum: 0
            description: Id of the streetlight.
          lumens:
            type: integer
            minimum: 0
            description: Light intensity measured in lumens.
          sentAt:
            type: string
            format: date-time
            description: Date and time when the message was sent.`}
</CodeBlock>

The `payload` property defines the content of the event using AsyncAPI schemas. It means that your event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—, and a `sentAt` property that should be a string containing a date and time.

>  JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also use other standards to describe payload schema, like, for example [Avro](https://github.com/asyncapi/avro-schema-parser#usage).

## Summary

In this tutorial, you learned how to create an AsyncAPI specification document via a real-life example with an IoT use case.

This tutorial is only a bootstrap; you'll need to add your own business logic into it. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.

## Next steps
Now that you've completed this tutorial, go ahead to learn how to [validate your AsyncAPI document with Studio](https://www.asyncapi.com/docs/tutorials/studio-document-validation).
