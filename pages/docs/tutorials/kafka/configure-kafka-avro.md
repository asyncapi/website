---
title: Create AsyncAPI Document for applications interacting with Kafka using Avro Schema
description: Explore configuring AsyncAPI document for Kafka messages with Avro Schema.
weight: 30
---

## Introduction

The previous tutorial taught you about writing an AsyncAPI document for Kafka messages using the default schema. This turorial will teach you to write the same document using Avro Schema.

While AsyncAPI schemas can be the default choice for describing payloads, many prefer using Avro Schemas to define messages in Kafka. Through this tutorial you'll learn to modify your existing AsyncAPI schema to add Avro schema into your document in both YAML and JSON formats.

## Background Context

AsyncAPI is a specification for describing Event-Driven Architectures (EDAs) in a machine-readable format. It allows developers to define how messages are exchanged between different services by providing a agreement for communication.

Avro is an efficient binary serialization format, used to ensure schema-aware communications between the messages within Apache Kafka. With Avro Schema there is a standardized method for serializing data allowing for interoperability and schema evolution capabilities. Avro promotes data exchange among systems by offering a common schema that fosters compatibility, between different components. 

## Defining messages using Avro Schema in YAML

In this section, let's focus on defining messages using Avro Schemas using YAML. 

```
messages:
  userSignedUp:
    payload:
      schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
      schema:
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
- The `userSignedUp` message is defined with Avro Schema, using the specified `schemaFormat` and the `schema`.
- The `schema` includes a `record` named `UserSignedUp` within the `com.company` namespace. It also describes two fields, `user-id` and `user-email`, defining their data types as `int` and `string` respectively.

By combining the Avro Schema discussed above into the previous tutorial, you'll have a AsyncAPI document fully equipped with Avro Schema!

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
        schema:
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

## Defining messages using Avro Schema in JSON

In this section you'll learn to add the Avro schemas using external JSON file. Start by creating a file called `userSchema.json`.

```
// userSchema.json
{
  "type": "record",
  "name": "UserSignedUp",
  "namespace": "com.company",
  "doc": "User sign-up information",
  "fields": [
    { "name": "user_id", "type": "int" },
    { "name": "user_email", "type": "string" }
  ]
}
```

In the above snippet, the structure captures the same Avro schema information, but this time it is represented in JSON format and saved into an external file named `userSchema.json`.

To incorporate this external JSON schema into the AsyncAPI document, you can use the `$ref` property to reference the path to the JSON file. This way, your AsyncAPI document will be fully equipped with the Avro Schema provided by the external JSON file.

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
        schema:
          $ref: './userSchema.json'
```

## Summary

Through this tutorial, you have smoothly progressed from the default schema to utilizing the capabilities of Avro Schema. The use of Avro Schema with AsyncAPI ensures improved interoperability and schema-aware communication in event-driven systems.  Now, you can further experiment by incorporating your business logic and experimenting with more advanced capabilities.

## Next Steps
Now you know how to write an AsyncAPI document using Avro Schemas. Let's now proceed to learn to how use Schema Registry with AsyncAPI. 
