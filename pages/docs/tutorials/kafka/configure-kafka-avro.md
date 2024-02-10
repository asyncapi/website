---
title: Describe Kafka message payload using Avro Schema
description: Explore configuring an AsyncAPI document for Kafka messages with Avro Schema.
weight: 230
---

## Introduction

The previous tutorial on [creating an AsyncAPI document for applications consuming from Kafka](/docs/tutorials/kafka) taught you about writing an AsyncAPI document for Kafka messages using the default schema. This tutorial will teach you to write the same document using Avro Schema.

While AsyncAPI schema can be the default choice for describing payloads, many prefer using Avro Schemas to define messages in Kafka. This tutorial teaches you to modify your existing AsyncAPI schema to add Avro schema into your document in both YAML and JSON formats.

## Background context

AsyncAPI is a specification for describing Event-Driven Architectures (EDAs) in a machine-readable format. AsyncAPI schema outlines the format and content specifications that enable a consistent representation of agreements for communication between services in an Event-Driven Architecture.

[Avro](https://avro.apache.org/) is a sophisticated tool in Apache Kafka that handles data communication efficiently. It provides a standardized method for organizing and transmitting data, ensuring that different parts of the system can understand each other effectively. With Avro, there's a common language for messages, promoting compatibility and smooth operation between various components. It's like having a shared rulebook that helps different system parts communicate and exchange information seamlessly.

## Define message payload with Avro Schema directly in AsyncAPI document

Defining message schema with the default schema is already covered in the [previous Kafka tutorial](/docs/tutorials/Kafka). The default choice was the AsyncAPI schema, a JSON Schema superset. Here's an example of what the AsyncAPI schema looks like: 

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

Now it's time to shift your focus to defining messages using Avro Schemas directly within your document. 

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

In the above code snippet: 
- The `userSignedUp` message is defined with Avro Schema, using the specified `schemaFormat` and the `schema`.
- Use the `schemaFormat` to indicate that you're using Avro and specify the version of Avro Schema by using a MIME type.
- The `schema` includes a `record` named `UserSignedUp` within the `com.company` namespace. It also describes two fields, `userId` and `userEmail,` defining their data types as `int` and `string`, respectively.

Now let's combine the above Avro Schema with the AsyncAPI document that you created in the previous tutorial. Check out below what an AsyncAPI document fully equipped with Avro Schema looks like!

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

Occasionally, you might find yourself with an existing set of Avro Schemas. In such cases, instead of repeatedly defining these schemas in your AsyncAPI document, integrate them seamlessly by calling out existing files.

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

In this tutorial, you smoothly updated from the default schema to utilize the capabilities of Avro Schema. The use of Avro Schema with AsyncAPI ensures improved communication in event-driven systems.  Now, you can further experiment by incorporating your business logic and experimenting with more advanced capabilities.

## Next Steps
Now that you know how to write an AsyncAPI document using Avro Schemas, let's learn how to use [Schema Registry with AsyncAPI](/docs/tutorials/kafka/managing-schemas-using-schema-registry). 
