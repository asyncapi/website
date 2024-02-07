---
title: Managing schemas using Schema Registry
description: The tutorial explains how you can manage schemas using Schema Registry.
weight: 50
---

## Introduction
You will learn how to manage schemas with Schema Registry. Managing schemas will enable us to ensure a consistent data exchange across distributed systems, thus minimizing errors.

## Background context
The need for schema management has become increasingly prevalent to handle the evolving complexity of modern Event-Driven Architecture. A Schema Registry is a centralized service that stores and maintains the schemas for data exchanged between various components of a modern distributed system. Validating data being exchanged helps in maintaining data consistency and compatibility. 

While several Schema Registry implementations exist, you will use the [Apicurio Registry](https://www.apicur.io/registry/) in this tutorial. Apicurio Registry is a popular open-source Schema Registry implementation that supports multiple serialization formats and facilitates schema management for diverse data in distributed systems. You will be using the Apicurio Registry in combination with Avro, which is a language-neutral data serialization system.

## Prerequisites
Install [Docker](https://docs.docker.com/engine/install/) from the official website.

## Steps

### Start Apicurio Registry
1. Start Apicurio Registry locally using below docker command:
   
```
{`docker run --env CORS_ALLOWED_ORIGINS=* -it -p 8080:8080 apicurio/apicurio-registry-mem:2.5.8.Final`}
```

### Upload Avro Schema
2. Once your local instance of Apicurio Registry is running, you can upload your Avro schema to it. Open new terminal window and create an Avro schema artifact using the following command:
   
```
curl \
http://localhost:8080/apis/registry/v2/groups/my-group/artifacts \
-X POST  \
-H "Content-Type: application/json; artifactType=AVRO" \
-H "X-Registry-ArtifactId: UserSignedUp" \
--data @- << EOF
{
  "type": "record",
  "name": "UserSignedUp",
  "namespace": "com.company",
  "doc": "User sign-up information",
  "fields": [
    {
      "name": "userId",
      "type": "int"
    },
    {
      "name": "userEmail",
      "type": "string"
    }
  ]
}
EOF
```

<Remember>
Download your Avro schema by visiting the following URL: 
http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp.
</Remember>

### Replace link using JSON pointer
3. An alternative to having the schema in a separate file as you learned in the [previous tutorial](/docs/tutorials/kafka/configure-kafka-avro) where you used the existing Avro schema in your AsyncAPI document, would be to store it in the registry. After uploading your Avro schema, remove the schema from your document, and replace it with the following:
$ref: {url}
Replace {url} with the url from the previous step.

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
        schemaFormat: 'application/vnd.apache.avro+json;version=1.9.0'
        schema:
          $ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp
```

## Summary
In this tutorial you’ve gained insights about managing Avro schemas using a centralized schema registry that enables you to share schemas across multiple applications. It is important to note that this approach is valid for various other schema types.

## Next steps
Now that you have learnt how to manage schemas, check out our tutorial for [bindings with Kafka](/docs/tutorials/kafka/bindings-with-kafka) to start sending messages between your services.
