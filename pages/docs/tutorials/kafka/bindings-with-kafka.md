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

You can configure several objects using Kafka bindings. However, for the scope of this tutorial, you will focus on four levels of bindings: [server bindings](https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object), [operations binding](https://github.com/asyncapi/bindings/tree/master/kafka#operation-binding-object), [channel bindings](https://github.com/asyncapi/bindings/tree/master/kafka#channel-binding-object) and [message bindings](https://github.com/asyncapi/bindings/tree/master/kafka#message-binding-object).

Using the code snippets from the previous tutorial, where you learned [how to manage Avro schemas using a centralized schema registry that enables you to share schemas across multiple applications](pages/docs/tutorials/kafka/managing-schemas-using-schema-registry), you will add configurations for server, operations, channel, and message bindings.

## Add server bindings

Server bindings provide protocol-specific configuration details for connecting and interacting with a server. For server bindings, we will add three fields: 

```yaml
servers:
  kafkaServer:
    host: test.mykafkacluster.org:8092
    description: Kafka Server
    protocol: kafka
  production:
    bindings:
      kafka:
        schemaRegistryUrl: 'http://localhost:8080/apis/registry/'
        schemaRegistryVendor: 'apicurio'
        bindingVersion: '0.5.0'
```

> Important: `Binding-version` is the field version of a binding. If omitted, the "latest" version MUST be assumed. The `bindingversion` field is an optional field that is available for all bindings.


## Add operation bindings

Operation bindings object contains information about the operation representation in Kafka (eg. the way to consume messages).

```yaml
operations:
  onUserSignedUp:
    action: receive
    channel:
      $ref: '#/channels/userSignedUp'
    bindings:
      kafka:
        groupId:
          type: string
          enum: ['myGroupId']
        clientId:
          type: string
          enum: ['myClientId']
```

## Add channel bindings

Channel bindings provide protocol-specific information for a particular channel. In Kafka, you can specify a given topic's number of partitions or replicas.

```yaml
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
```

## Add message bindings

Message bindings provide protocol-specific information for a specific message. Like the Kafka topic, it's associated with a message key (if any) and Kafka-specific properties. 

```yaml
components:
  messages:
    userSignedUp:
      bindings:
        kafka:
            key:
              type: string
              enum: ['myKey']
            schemaIdLocation: 'payload'
            schemaIdPayloadEncoding: 'apicurio-new'
            schemaLookupStrategy: 'TopicIdStrategy'
            bindingVersion: '0.5.0'
      payload:
        schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0'
        schema:
          $ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp
```

Congratulations, you've completed the tutorial! Putting these blocks together gives you an AsyncAPI document all ready to go.

```yaml
asyncapi: 3.0.0
info:
  title: User Signup API
  version: 1.0.0
  description: The API notifies you whenever a new user signs up in the application.
servers:
  kafkaServer:
    host: test.mykafkacluster.org:8092
    description: Kafka Server
    protocol: kafka
  production:
    bindings:
      kafka:
        schemaRegistryUrl: 'http://localhost:8080/apis/registry/'
        schemaRegistryVendor: 'apicurio'
        bindingVersion: '0.5.0'
operations:
  onUserSignedUp:
    action: receive
    channel:
      $ref: '#/channels/userSignedUp'
    bindings:
      kafka:
        groupId:
          type: string
          enum: ['myGroupId']
        clientId:
          type: string
          enum: ['myClientId']
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
components:
  messages:
    userSignedUp:
      bindings:
        kafka:
            key:
              type: string
              enum: ['myKey']
            schemaIdLocation: 'payload'
            schemaIdPayloadEncoding: 'apicurio-new'
            schemaLookupStrategy: 'TopicIdStrategy'
      payload:
        schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0'
        schema:
          $ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp          
```

## Summary

In this tutorial, you learned how to configure server and channel bindings. You also learned that bindings are essential when integrating Kafka with different systems, platforms, or protocols — especially in API specifications like AsyncAPI. 


## Next steps

Now that you have completed this tutorial, you can [learn more about other Kakfa bindings](https://github.com/asyncapi/bindings/tree/master/kafka) or [protocol-specific bindings](https://github.com/asyncapi/bindings).
