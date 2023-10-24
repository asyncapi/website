---
title: Configuring Schemas for Kafka messages using AsyncAPI
description: In this tutorial, you'll learn how to configure an AsyncAPI document for Kafka messages.
weight: 80
---


In this tutorial, you will learn how to create a schema document for Kafka Messages using AsyncAPI. Additionally, you will also learn about event-driven architecture, pub/sub model, and brokers in relation to Kafka. 
  
Let’s assume, you have a service that publishes data to a Kafka topic whenever a new user signs up into the application.

Basically, you want to build a system that can track the users who have signed up for your application, the entire flow of the application would be:

- You will implement an event-driven architecture with a message broker in its center. As a central piece, the broker will act as an orchestrator for sending and receiving messages between different system parts. 
  
- The service will publish information whenever the user signs up to the broker.
  
- Your application will connect to the broker and receive a stream of events from the users who have signed up. 

## Background context

[Event-driven architecture (EDA)](/docs/tutorials/getting-started/event-driven-architectures) is a design pattern that revolves around the production, detection, and reaction to events over time. It consists of three main components: a message broker, event publishers, and subscribers, which together serve as the backbone for event exchange within different services. 

[Message brokers](/docs/tutorials/getting-started/event-driven-architectures#message-broker) facilitate asynchronous communications between services, meaning that the sending service doesn't have to wait for the receiving service's response. This allows multiple services to talk to each other directly, even if they are written in different languages. A great example of such a message broker is Apache Kafka. [Apache Kafka](https://kafka.apache.org/) is a distributed system that is used by thousands of companies for their event-driven system.

[Publish/Subscribe (Pub/Sub)](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is a typical model in EDAs, providing flexible coupling between publishers and subscribers. In this model, the publishers of event notifications act as publishers and the consumers act as corresponding subscribers.

## Creating AsyncAPI document for Kafka

In this section, you’ll create an AsyncAPI document to describe the `UserSignUp` API. The same document can be later used to generate code and documentation as per requirement. 

### Step 1: Define AsyncAPI Version, API Information, and Server

Initially, you need to describe your application, including the AsyncAPI version, the info about the document, and the server your application is based upon.

```
asyncapi: "3.0.0"
info:
  title: "User Signup API"
  version: "1.0.0"
  description: |
    The API notifies you whenever a new user signups into the application
servers:
  kafkaServer:
    host: test.mykafkacluster.org:8092
    description: "Kafka Server"
    protocol: kafka
```

In the above snippet:

- The `asyncapi` field indicates that you are using AsyncAPI version 3.0.0.
  
- The `info` field provides information about the API. Here the the APIs `title`, `version`, and `description` are being defined.
  
- The `server` field specifies the details of the server, including the `host`, `description`, and the `protocol` that is being used i.e. Kafka.

### Step 2: Define Channels and Operations

Next, let's move on to the channels and operations section. The channel addresses are the topics in Kafka, they are the routes to which your API will be sending/receiving. The Operations section is used to describe a specific operation like how the services must interact with the channels.

```
operations:
  onUserSignedUp:
    action: receive
    channel:
      $ref: "#/channels/userSignedUp"
    messages:
      - $ref: "#/components/messages/userSignedUp"


channels:
  userSignedUp:
    description: When the User Signs up
```

In the above snippet:

- The `operation` object specifies onUserSignedUp operation. The `action` property suggests that the operation will be receiving the information. The `channel` property points to the channel where the operation occurs.
  
- The `channels` object describes the userSignedUp event, where your API will be sending/receiving the information and the associated message definition.

### Step 3: Define Messages and Schemas

Finally, you'll define the messages and their payload. The payload defines how the event would look line that will be sent from the channel.

```
components:
  messages:
    userSignedUp:
      payload:
        type: object
        properties:
          user-id:
            type: integer
            description: "id of the user"
          user-email:
            type: string
            description: "email of the user"
```

In the above snippet:

- The userSignedUp message is defined which describes the payload of the event.
  
- The `payload` property defines the content of the event using AsyncAPI schemas. It means that your event payload should contain a user-id which is an integer and a user-email property which is a string property


## Summary

In this tutorial, you learned how to create an AsyncAPI specification document via a real-world example. This tutorial is just a starting point; you'll need to add your own business logic to it. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.