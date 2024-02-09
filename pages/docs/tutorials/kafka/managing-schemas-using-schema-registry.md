---
title: Managing schemas using Schema Registry
description: A tutorial teaching how to manage schemas using Schema Registry.
weight: 50
---

## Introduction
In this tutorial, you'll learn how to manage schemas with Schema Registry. Managing schemas ensures a consistent data exchange across distributed systems, thus minimizing errors.

## Background context
The need for schema management has become increasingly prevalent to handle the evolving complexity of modern Event-Driven Architecture. A Schema Registry is a centralized service that stores and maintains schemas for data exchanged between various components of a modern distributed system. Validating exchanged data maintains data consistency and compatibility. 

While several Schema Registry implementations exist, you will use the [Apicurio Registry](https://www.apicur.io/registry/) for this tutorial. Apicurio Registry is a popular open-source Schema Registry implementation that supports multiple serialization formats and facilitates schema management for diverse data in distributed systems. You will use Apicurio Registry combined with Avro, a language-neutral data serialization system.

## Prerequisites
[Install Docker](https://docs.docker.com/engine/install/) from the official website.


### Start Apicurio Registry
Start the Apicurio Registry locally with the following docker command:
   
```
{`docker run --env CORS_ALLOWED_ORIGINS=* -it -p 8080:8080 apicurio/apicurio-registry-mem:2.5.8.Final`}
```

### Upload Avro Schema
Once your local instance of Apicurio Registry is running, upload your Avro schema. Open a new terminal window and create an Avro schema artifact with the following command:
   
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
One alternative is to keep your schema in a separate file, as you learned in the previous tutorial, [Describe Kafka message payload using Avro Schema](/docs/tutorials/kafka/configure-kafka-avro). After uploading your Avro schema, remove the schema from your AsyncAPI document and add a `$ref` pointing to the previous step's URL.
```
$ref: http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/UserSignedUp
```

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
In this tutorial, you managed Avro schemas using a centralized schema registry that enables you to share schemas across multiple applications. The good news is that this approach is valid for various other schema types!

## Next steps
Now that you have learned how to manage schemas, check out the [bindings with Kafka tutorial](/docs/tutorials/kafka/bindings-with-Kafka) to start sending messages between your services.
