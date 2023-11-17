---
title: Create AsyncAPI Document for applications interacting with Kafka using Avro Schema
description: Explore configuring AsyncAPI document for Kafka messages with Avro Schema.
weight: 30
---

## Introduction

The previous tutorial taught you about writing an AsyncAPI document for Kafka messages using the default schema. In this tutorial, you'll learn how to write the same document using Avro Schema instead.

## Background Context

Avro is an efficient binary serialization format, used to ensure schema-aware communications between the messages within Apache Kafka. With Avro Schema there is a standardized method for serializing data allowing for interoperability and schema evolution capabilities. Avro promotes data exchange among systems by offering a common schema that fosters compatibility, between different components. 

## Defining messages using Avro Schema

You've already explored the essentials of building an AsyncAPI document in the previous tutorial. In this section, you'll focus on defining messages using Avro Schemas. 

```
messages:
  userSignedUp:
    payload:
      schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
      payload: |
        type: record
        name: UserSignedUp
        namespace: com.company
        doc: User sign-up information
        fields:
          - name: user-id
            type: int
          - name: user-email
            type: string
```

In the above snippet: 
- The `userSignedUp` message is defined with Avro Schema, using the specified `schemaFormat`.
- The `payload` includes a `record` named `UserSignedUp` within the `com.company` namespace. It also describes two fields, `user-id` and `user-email`, defining their data types as `int` and `string` respectively.

Now that you've understood how to define messages using Avro Schemas, combining it with the previous tutorial will provide you with a fully prepared AsyncAPI document using Avro Schema!

```
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
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload: |
          type: record
          name: UserSignedUp
          namespace: com.company
          doc: User sign-up information
          fields:
            - name: user-id
              type: int
            - name: user-email
              type: string
```

## Summary

Through this tutorial, you have smoothly progressed from the default schema to utilizing the capabilities of Avro Schema. The use of Avro Schema with AsyncAPI ensures improved interoperability and schema-aware communication in event-driven systems.  Now, you can further experiment by incorporating your business logic and experimenting with more advanced capabilities.

## Next Steps
Now you know how to write an AsyncAPI document using Avro Schemas. Let's now proceed to learn to how use Schema Registry with AsyncAPI. 
