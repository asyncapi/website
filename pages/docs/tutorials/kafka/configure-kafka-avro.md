---
title: Describe Kafka message payload using Avro Schema
description: Explore configuring AsyncAPI document for Kafka messages with Avro Schema.
weight: 30
---

## Introduction

The previous tutorial on [creating an AsyncAPI document for applications consuming from Kafka](/docs/tutorials/kafka) taught you about writing an AsyncAPI document for Kafka messages using the default schema. This tutorial will teach you to write the same document using Avro Schema.

While AsyncAPI schema can be the default choice for describing payloads, many prefer using Avro Schemas to define messages in Kafka. Through this tutorial, you'll learn to modify your existing AsyncAPI schema to add Avro schema into your document in both YAML and JSON formats.

## Background Context

[AsyncAPI](https://www.asyncapi.com/) is a specification for describing Event-Driven Architectures (EDAs) in a machine-readable format. AsyncAPI schema outlines the format and content specifications that enable a consistent representation of agreements for communication between services in an Event-Driven Architecture.

[Avro](https://avro.apache.org/), on the other hand is an efficient binary serialization format, used to ensure schema-aware communications between the messages within Apache Kafka. With Avro Schema there is a standardized method for serializing data allowing for interoperability and schema evolution capabilities. Avro promotes data exchange among systems by offering a common schema that fosters compatibility, between different components. 

## Defining message payload with Avro Schema directly in the AsyncAPI document

Defining message schema with the default schema is already covered in the [previous tutorial](/docs/tutorials/kafka). The default choice was the AsyncAPI schemas which is a superset of JSON Schema that looked as follows, 

```
messages:
  userSignedUp:
    payload:
      type: object
      properties:
        userId:
          type: integer
          description: This property describes the ID of the user
        userEmail:
          type: string
          description: This property describes the email of the user
```

In this section, let's shift our focus to defining messages using Avro Schemas directly within our document. 

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
          - name: userId
            type: int
          - name: userEmail
            type: string
```

In the above snippet: 
- The `userSignedUp` message is defined with Avro Schema, using the specified `schemaFormat` and the `schema`.
- Use the `schemaFormat` to specify using a MIME type, that you use Avro and what version of Avro Schema.
- The `schema` includes a `record` named `UserSignedUp` within the `com.company` namespace. It also describes two fields, `userId` and `userEmail`, defining their data types as `int` and `string` respectively.

By combining the Avro Schema discussed above into the previous tutorial, you'll have an AsyncAPI document fully equipped with Avro Schema!

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
            - name: userId
              type: int
            - name: userEmail
              type: string
```

## Reusing existing Avro Schemas

Occasionally you might find yourself with a set of existing Avro Schemas. In such cases, instead of defining these schemas again anew in your AsyncAPI document, you can integrate them seamlessly by calling out existing files.

Assume you have a file named `userSchema.json` that encapsulates the Avro Schema that resembles the following:

```
// userSchema.json
{
  "type": "record",
  "name": "UserSignedUp",
  "namespace": "com.company",
  "doc": "User sign-up information",
  "fields": [
    { "name": "userId", "type": "int" },
    { "name": "userEmail", "type": "string" }
  ]
}
```

To seamlessly incorporate this existing Avro schema into your AsyncAPI document, you can use the `$ref` property to reference the path to the JSON file. This way, your AsyncAPI document will incorporate the Avro Schema from the external JSON file, ensuring consistency and interoperability in your Kafka ecosystem. 

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
Now you know how to write an AsyncAPI document using Avro Schemas. Let's now proceed to learn to how use [Schema Registry with AsyncAPI](/docs/tutorials/kafka/managing-schemas-using-schema-registry). 
