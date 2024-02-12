---
title: Kafka bindings
description: Learn how to configure Kafka bindings in your AsyncAPI document.
weight: 300
---

## Introduction

In a previous tutorial, you learned how to manage schemas with a schema registry. This tutorial teaches you how Kafka bindings function by defining Kafka messages and expanding your AsyncAPI document with protocol-specific details.

## Background context

Bindings are essential for event-driven applications because they provide protocol-specific details, abstracting the complexities of message handling from your application's core logic. They enhance the API's clarity and usability by offering setup options and context for different protocols. Bindings include details like the topics your application reads from or writes to, message formatting, and rules for interacting with multiple data or messages.

In an AsyncAPI document, bindings can be added to various sections like servers, channels, or messages. They contain protocol-specific details unique to each protocol. Binding definitions let you specify functionalities specific to the protocol, which are not covered by AsyncAPI's core features.

You can configure several objects using Kafka bindings. However, for the scope of this tutorial, you will focus on three levels of bindings: [server bindings](https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object), [channel bindings](https://github.com/asyncapi/bindings/tree/master/kafka#channel-binding-object) and [message bindings](https://github.com/asyncapi/bindings/tree/master/kafka#message-binding-object).

Using the code snippets from the previous tutorial, where you learned [how to manage Avro schemas using a centralized schema registry that enables you to share schemas across multiple applications](pages/docs/tutorials/kafka/managing-schemas-using-schema-registry), you will add configurations for server, channel, and message bindings.

## Add server bindings

Server bindings provide protocol-specific configuration details for connecting and interacting with a server. For server bindings, we will add three fields: 

```
servers:
  kafkaServer:
    host: test.mykafkacluster.org:8092
    description: Kafka Server
    protocol: kafka
  production:
    bindings:
      kafka:
        schemaRegistryUrl: '$ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp'
        schemaRegistryVendor: 'apicurio'
        bindingVersion: '0.4.0'
```

## Add channel bindings

Channel bindings provide protocol-specific information for a particular channel. In Kafka, you can specify a given topic's number of partitions or replicas.


```
channels:
  userSignedUp:
    description: This channel contains a message per each user who signs up in our application.
    address: user_signedup
    messages:
      userSignedUp:
        $ref: '#/components/messages/userSignedUp'
    bindings:
      kafka:
        topic: 'UserSignedUp'
        partitions: 10
        replicas: 2
        topicConfiguration:
          cleanup.policy: ["delete", "compact"]
          retention.ms: 604800000
          retention.bytes: 1000000000
          delete.retention.ms: 86400000
          max.message.bytes: 1048588
        bindingVersion: '0.4.0'
```


## Add message bindings

Message bindings provide protocol-specific information for a specific message. Like the Kafka topic, it's associated with a message key (if any) and Kafka-specific properties. 

```
components:
  messages:
    userSignedUp:
      bindings:
        kafka:
            key:
              type: string
              enum: ['myKey']
            schemaIdLocation: 'payload'
            schemaIdPayloadEncoding: '4'
            bindingVersion: '0.4.0'
      payload:
        schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0'
        schema:
          $ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp
```

## Summary

In this tutorial, you learned how to configure server and channel bindings. You also learned that bindings are essential when integrating Kafka with different systems, platforms, or protocols — especially in API specifications like AsyncAPI. 


## Next steps

Now that you have completed this tutorial, you can [learn more about other Kakfa bindings](https://github.com/asyncapi/bindings/tree/master/kafka) or [protocol-specific bindings](https://github.com/asyncapi/bindings).
