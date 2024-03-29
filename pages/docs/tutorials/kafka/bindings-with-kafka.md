---
title: Kafka bindings
description: Learn how to configure Kafka bindings in your AsyncAPI document.
weight: 300
---

## Introduction

[You learned how to manage schemas with a schema registry in the previous tutorial](/docs/tutorials/kafka/managing-schemas-using-schema-registry). This tutorial teaches you how Kafka bindings function by defining Kafka messages and expanding your AsyncAPI document with protocol-specific details.

## Background context

Bindings are essential for event-driven applications because they provide protocol-specific details, abstracting the complexities of message handling from your application's core logic. They enhance the API's clarity and usability by offering setup options and context for different protocols. Bindings include the topics your application reads from or writes to, message formatting, and rules for interacting with multiple data or messages.

In an AsyncAPI document, bindings can be added to various sections like servers, channels, or messages. They contain protocol-specific details unique to each protocol. Binding definitions let you specify functionalities specific to the protocol, which are not covered by AsyncAPI's core features.

You can configure several objects using [Kafka bindings](https://github.com/asyncapi/bindings/tree/master/kafka#readme). However, for the scope of this tutorial, you will focus on four levels of bindings: server bindings, operations binding, channel bindings, and message bindings.

Using the code snippets from the previous tutorial, where you learned [how to manage Avro schemas using a centralized schema registry that enables you to share schemas across multiple applications](/docs/tutorials/kafka/managing-schemas-using-schema-registry), you will add configurations for server, operations, channel, and message bindings.

Below, you can find the updated schema reference file you'll use for this tutorial.

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
operations:
  onUserSignedUp:
    action: receive
    channel:
      $ref: '#/channels/userSignedUp'
channels:
  userSignedUp:
    description: This channel contains a message per each user who signs up in our application.
    address: user_signedup
    messages:
      userSignedUp:
        $ref: '#/components/messages/userSignedUp'
components:
  messages:
    userSignedUp:
      payload:
        schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0'
        schema:
          $ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp
```

## Add server bindings

Server bindings provide protocol-specific configuration details for connecting and interacting with a server. 

Server bindings allow you to specify a `schemaRegistryUrl`, which provides an API URL for a given server where a schema registry was used. A schema registry is a repository for managing and validating messages' schemas. To learn more about schema registry, read the [message validation guide for schema registry](https://www.asyncapi.com/docs/guides/message-validation#schema-registry-validation).

`schemaRegistryVendor` is used optionally to refer to vendors or platforms that provide the schema registry service, in this case, Apicurio Registry. Learn about other fields you can configure under [server bindings](https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object).

```yaml
servers:
  kafkaServer:
    host: test.mykafkacluster.org:8092
    description: Kafka Server
    protocol: kafka
    bindings:
      kafka:
        schemaRegistryUrl: 'http://localhost:8080/apis/registry/'
        schemaRegistryVendor: 'apicurio'
        bindingVersion: '0.5.0'
```

> Important: `bindingVersion` is the field version of a binding. It specifies the version of the binding specification that is used to describe how an API interacts with Kafka. The `bindingVersion` field is an optional field that is available for all bindings.  

## Add operation bindings

Operation bindings object contains information about the operation representation in Kafka (eg. the way to consume messages).

The operation binding object provides a structured way to describe how a particular operation (publish, subscribe) should behave on a Kafka topic. The `groupid`, for example, is the Id of the consumer group, while the `cliendID` is the Id of the consumer within a consumer group.	

These configurations are vital for distributed message consumption and load balancing among consumers. Learn more about other fields you can configure under [operations binding](https://github.com/asyncapi/bindings/tree/master/kafka#operation-binding-object).

```yaml
operations:
  onUserSignedUp:
    action: receive
    channel:
      $ref: '#/channels/userSignedUp'
    bindings:
      kafka:
        bindingVersion: '0.5.0'
        groupId:
          type: string
          enum: ['myGroupId']
        clientId:
          type: string
          enum: ['myClientId']
```

## Add channel bindings

Channel bindings provide protocol-specific information for a particular channel.

These configurations may include information how the Kafka topic has been configured. The Channel Binding Object is part of AsyncAPI's wider bindings architecture, which specifies how the API interacts with the messaging system — in this case, Kafka.

In Kafka, you can specify a given topic's number of partitions or replicas therefore, enabling parallel processing of data or consumers. Learn more about other fields that you can configure under [channel bindings](https://github.com/asyncapi/bindings/tree/master/kafka#channel-binding-object).


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
        bindingVersion: '0.5.0'
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

Message bindings provide protocol-specific information for a specific message. For Kafka topics, this can include how message keys are used, and details about how serialized message data has been encoded. 

For example, the `schemaIdLocation` field, if specified is used to indicate where the schema identifier (ID) for the message payload's schema is located. It is useful for message serialization and deserialization, enabling consumers to understand how to interpret the message payload.

Learn more about other fields that you can configure under [message bindings](https://github.com/asyncapi/bindings/tree/master/kafka#message-binding-object)

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
        bindingVersion: '0.5.0'
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
        bindingVersion: '0.5.0'
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
          bindingVersion: '0.5.0'
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

In this tutorial, you learned how to configure server, operation, message, and channel bindings. You also learned that bindings are essential when integrating Kafka with different systems, platforms, or protocols — especially in API specifications like AsyncAPI. 


## Next steps

Now that you have completed this tutorial, you can [learn more about other Kakfa bindings](https://github.com/asyncapi/bindings/tree/master/kafka) or [protocol-specific bindings](https://github.com/asyncapi/bindings).
