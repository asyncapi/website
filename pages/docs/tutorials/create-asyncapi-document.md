---
title: Create AsyncAPI document
description: In this tutorial, you'll learn how to create an AsyncAPI document.
weight: 80
---

## Introduction

In this tutorial, you'll learn how to create an AsyncAPI document based on a sample real-world use case. Additionally, you will learn about event-driven architecture, message brokers, pub/sub pattern.

Let's pretend you have a company called Smarty Lighting, and you install smart-city streetlight lighting systems. Such a smart lighting system is an Internet of Things (IoT) use case. You will create a Smarty Lighting Streetlights application using Node.js and Mosquitto (MQTT) as the message broker. Your application will allow you to manage city lights remotely. 

You want to build a system that can turn streetlights on and off based on their environmental conditions: 

- You will implement an event-driven architecture (EDA) with a message broker in its "center."

- The Streetlights application will receive information about environmental lighting.

- The Streetlights application will connect to the broker and receive a stream of events from all the streetlights devices reporting their conditions.

- The Streetlights application is unaware of how many streetlights devices send measurement events to the broker; it just connects to the broker and receives all events.


## Background context

Event-driven architecture (EDA) is a design pattern built around the production, detection, and reaction to events that take place in time. In this pattern, a message broker, event publishers, and subscribers are its main components for event exchange within microservices.

[Message brokers](/docs/tutorials/getting-started/event-driven-architectures#message-broker) enables asynchronous communications between services so that the sending service need not wait for the receiving service’s reply. That allows interdependent services to “talk” with one another directly, even if they were written in different languages or implemented on different platforms. 

Furthermore, the [Pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission.  

[MQTT](https://mqtt.org/), is a well-known protocol that is widely used in IoT applications because it was created particularly to address machine-to-machine (M2M) communication.

## Create AsyncAPI document

In this step, you will create an AsyncAPI document to describe the Streelights application. It will help you generate the code and the documentation later on.

To create one, you can either use the [AsyncAPI Studio](https://studio.asyncapi.com) or the [AsyncAPI CLI](https://github.com/asyncapi/cli), depending on your project's needs.

<Remember>

You can create a new `asyncapi.yaml` document by running: 
`asyncapi new --example=tutorial.yml --no-tty`.

</Remember>

Create the following specification document titled `asyncapi` with a `.yaml` extension.

<CodeBlock>
{`asyncapi: 3.0.0
info:
  title: Streetlights App
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights application allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  mosquitto:
    host: test.mosquitto.org
    protocol: mqtt
channels:
  lightMeasured:
    address: 'light/measured'
    messages:
      lightMeasuredMessage:
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
              description: Date and time when the message was sent.
operations:
  onLightMeasured:
    action: 'receive'
    summary: Information about environmental lighting conditions for a particular streetlight.
    channel:
      $ref: '#/channels/lightMeasured'`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`asyncapi: 3.0.0
info:
  title: Streetlights App
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights application allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'`}
</CodeBlock>

- The `asyncapi` field indicates you use the AsyncAPI version 3.0.0.

- The `info` field holds information about the Streetlights application. Here, the title, version, description, and license were defined.

Moving on, let's talk about the `servers` section:
<CodeBlock>
{`servers:
  mosquitto:
    host: test.mosquitto.org
    protocol: mqtt`}
</CodeBlock> 

In this section, you point to the Eclipse Mosquitto message broker. The `url` points to a real broker instance [hosted by the Mosquitto community](https://test.mosquitto.org/), and the `protocol` is MQTT. If you do not want to use the test instance, you can spin up your own broker locally with `docker run -it -p 1883:1883 eclipse-mosquitto:1.5`. Remember to change the `url` to `mqtt://localhost`.

Now, let's move on to the `channels` section. In the `servers` section, you specified how to connect to the broker where the application sends messages to or receives messages from. In `channels`, you go into more details about the connection `address` inside the broker. (Example: A topic name that specifies what `messages` are available in the channel.)

<CodeBlock>
{`channels:
  lightMeasured:
    address: 'light/measured'
    messages:
      lightMeasuredMessage:
        name: LightMeasured
        payload:
          redacted for brevity`}
</CodeBlock>

In this example, `light/measured` is the channel address. From the Streetlight application example perspective, it means that `light/measured` is the topic's name in the MQTT broker.

Next is the `payload` property, which is used to understand how the event should look like when transfered over the specific channel:

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

The `payload` property defines the event's content using AsyncAPI schemas. It means that your event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—and a `sentAt` property which should be a string containing a date and time.

>  JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also use other standards to describe payload schema, such as [Avro](https://github.com/asyncapi/avro-schema-parser#usage).

The last section is `operations`, where you describe what the application described in the AsyncAPI document is doing. 

<CodeBlock>
{`operations:
  onLightMeasured:
    action: 'receive'
    summary: Information about environmental lighting conditions for a particular streetlight.
    channel:
      $ref: '#/channels/lightMeasured'`}
</CodeBlock>

You can see that the Streetlight application is a consumer that only receives events from the broker. Using the mandatory `channel` field, you specify with `$ref` what channel the events come from.

The `onLightMeasured` key property describes the function or method name that takes care of this functionality in the generated code. It is a unique ID of the operation across the whole document.

## Summary

In this tutorial, you learned how to create an AsyncAPI specification document via a real-life example with an IoT use case.

Your finished document is just a starting point; you must add your business logic. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.

## Next steps
Now that you've completed this tutorial, you can proceed to learn how to [validate your AsyncAPI document with AsyncAPI Studio](https://www.asyncapi.com/docs/tutorials/studio-document-validation).
