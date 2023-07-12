---
title: Create AsyncAPI document
description: In this tutorial, you'll learn how to create an AsyncAPI document.
weight: 80
---

## Introduction

In this tutorial, you'll learn how to create an AsyncAPI document based on a sample real-world use case. Additionally, you will learn about event-driven architecture, message brokers, pub/sub pattern.

Let's pretend you have a company called Smarty Lighting, and you install smart-city streetlight lighting systems. This smart lighting system is a use case of the Internet of Things (IoT). You will create a Smarty Lighting Streetlights API using Node.js and Mosquitto (MQTT) as the message broker. This API will allow you to manage city lights remotely.

You want to build a system that can turn streetlights on and off based on their environmental conditions:

- You will implement an event-driven architecture (EDA) with a message broker in its "center."

- Streetlights will send information about their environmental lighting to the broker.

- Your application will connect to the broker and receive a stream of events from all the streetlights reporting their conditions.

- Your application decides based on events when to turn off the streetlights.

- Your application is not aware of how many streetlights are sending events - it just connects to the broker and receives all events.


## Background context

**Event-driven architecture (EDA)** is a design pattern built around the production, detection, and reaction to events that take place in time. In this pattern, a message broker, event publishers and subscribers are its main components for event exchange within microservices. Publishers send events as messages to a message broker and subscribers recieve events as messages from the message broker.

[Message brokers](/docs/tutorials/getting-started/event-driven-architectures#message-broker) enables asynchronous communications between services so that the sending service need not wait for the receiving service’s reply. This allows interdependent services to “talk” with one another directly, even if they were written in different languages or implemented on different platforms.

Furthermore, the EDA [pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) model is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission.

[MQTT](https://mqtt.org/), is a well-known protocol that is widely used in IoT applications because it was created particularly to address machine-to-machine (M2M) communication.

## Create AsyncAPI document

In this step, you will create an AsyncAPI document to describe the Streelights API. It will help you generate the code and the documentation later on.

To create one, you can either use the [AsyncAPI Studio](https://studio.asyncapi.com) or the [AsyncAPI CLI](https://github.com/asyncapi/cli), depending on your project's needs..

<Remember>

You can create a new `asyncapi.yaml` document by running:
`asyncapi new --example=tutorial.yml --no-tty`.

</Remember>

Go ahead to create the specification documents titled `asyncapi` with a `.yaml` extension.

<CodeBlock>
{`asyncapi: '3.0.0'
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
		action: 'recieve'
		summary: Inform about enviromental lighting conditions for a particular streetlight.
		operationId: onLightMeasured
		channel:
			$ref: '#/channels/lightMeasured'`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`asyncapi: '3.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
`}
</CodeBlock>

- The `asyncapi` field indicates you use the AsyncAPI version 3.0.0.

- The `info` section holds information about the Streetlights API. Here, its
title, version, description and license is defined.

Moving on, let's talk about the `servers` section. In this section, you define
the connection details of the servers that will handle the events sent by
the streetlights to your API. Each server's connection detail is
defined as a Server Object:
<CodeBlock>
{`servers:
  	mosquitto:
  		host: test.mosquitto.org
    	protocol: mqtt
`}
</CodeBlock>
You have defined a Server Object named `mosquitto`, which
refers to the Eclipse Mosquitto message broker. In a Server Object, the `host`
field is used to specify the hostname of the server, and the `protocol` field is
used to specify the protocol the server supports. The `host` is
set as a real instance of the broker
[hosted by the Mosquitto community](https://test.mosquitto.org/) and the
`protocol` is set as MQTT. If you do not want to use the test instance, you can run
a broker on your local machine with `docker run -it -p 1883:1883 eclipse-mosquitto:1.5`.
But remember to change `host` to `localhost:1883`

Now lets move on to the `channels` section. In this section, you define the
communication channels for all the events that will be processed by the message
broker. Each communication channel is defined as a Channel Object with an
identifier that follow common programming naming conventions:
<CodeBlock>
{`channels:
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
							description: Light intensity mesured in lumens.
						sentAt:
							type: string
							format: date-time
							description: Date and time when the message was sent.`}
</CodeBlock>

You have defined one Channel Object named `lightMeasured`. In the `address`
field of a Channel Object, you define the "topic name", "routing key", "event
type", or "path" of the channel and then in the `messages` field, you define
Message Objects to describe the messages that can be sent to the channel by an
application at any time. In the example, you have set `address` as
`'light/measured'` and `messages` has one defined Message Object named
`lightMeasuredMessage`.

In the Message Object `lightMeasuredMessage` two fields are defined; `name` and
`payload`. The `name` field of a Message Object is used to specify a
machine-friendly name for the message, and the `payload` field is used to
define how the message should look like when it is sent to the channel. In the
example, `name` is set as *LightMeasured* and `payload` defines the event using
AsyncAPI schemas that means the message should contain an `id` and a `lumens`
property-which are integers bigger than zero-, and a `sentAt` property that should be a
string containing a date and time.

> JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also
> use other standards to describe payload schema, like, for example
> [Avro](https://github.com/asyncapi/avro-schema-parser#usage).


Next is the `operations` section. In this section, you define all the
operation your application MUST implement. Each operation is defined as an
Operation Object with an identifier that follows common programming naming
conventions:

<CodeBlock>
{`operations:
	onLightMeasured:
		action: 'receive'
		summary: Inform about enviromental lighting conditions for a particular streetlight.
		channel:
			$ref: '#/channels/lightMeasured'`}
</CodeBlock>
You have defined one Operation Object named `onLightMeasured`. In the `action`
field of Operation Object, you define how your application should
interact with a message. You use the `summary` field to provide a short summary of
what the operation is about and, then its `channel` field is used to provide a
reference point to the channel in which the operation is performed. In the example,
`action` is set as *receive* (which is an operation keyword) because your
application expects to receive messages from channel it is subscribed to. The
`summary` field is set with a clear summary of the nature of the messages the
operation expects to receive and the `channel` field is set with a reference
pointer to the channel the operation will get its messages from.

## Summary

In this tutorial, you learned how to create an AsyncAPI specification document via a real-life example with an IoT use case.

This tutorial is just a starting point; you'll need to add your own business logic to it. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.

## Next steps
Now that you've completed this tutorial, proceed to learn how to [validate your AsyncAPI document with AsyncAPI Studio](https://www.asyncapi.com/docs/tutorials/studio-document-validation).
