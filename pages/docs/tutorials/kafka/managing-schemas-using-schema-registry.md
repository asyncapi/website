---
title: Managing schemas using Schema Registry
description: The guide explains how you can manage schemas using Schema Registry.
weight: 50
---

## Introduction
You will learn how to manage schemas with Schema Registry. Managing schemas will enable us to ensure a consistent data exchange across distributed systems, thus minimizing errors.

## Background context
The need for schema management has become increasingly prevalent to handle the evolving complexity of modern Event-Driven Architecture. A Schema Registry is a centralized service that stores and maintains the schemas for data exchanged between various components of a modern distributed system. Validating data being exchanged helps in maintaining data consistency and compatibility. 

While several Schema Registry implementations exist, you will use the Apicurio Registry in this tutorial. Apicurio Registry is a popular open-source Schema Registry implementation that supports multiple serialization formats and facilitates schema management for diverse data in distributed systems. You will be using the Apicurio Registry in combination with Avro, which is a language-neutral data serialization system.

## Installation guide
1. Install [Docker](https://docs.docker.com/engine/install/) from the official website.

## Steps
1. Run Apicurio Registry Docker Image in a Docker container by using the command:
    <CodeBlock language="bash">
    {`docker run -it -p 8080:8080 apicurio/apicurio-registry-mem:2.5.7.Final`}
    </CodeBlock>
2. Once your Apicurio Registry is running, you can upload the schema in another terminal window. Create an Avro Schema Artifact using the following command:
<CodeBlock>
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
</CodeBlock>
3. You can download the Avro schema by visiting the URL below and replacing {UserSignedUp} with the id of the schema used in the previous step.
http://localhost:8080/apis/registry/v2/groups/my-group/artifacts/{UserSignedUp}
4. An alternative to having the schema in a separate file as in (Joy's tutorial), would be to store it in the registry. After uploading your Avro schema, remove the schema from your document, and replace it with the following:
$ref: {url}
Replace {url} with the url from the previous step.

## Summary

## Next steps
In the next tutorial, you are going to learn about Kafka bindings.
