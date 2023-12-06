---
title: Managing schemas using Schema Registry
description: This guide explains how you can manage schemas using Schema Registry.
weight: 50
---

## Introduction
This tutorial will teach you how to manage schemas with Schema Registry. This will enable us to ensure a consistent data exchange across distributed systems, thus minimizing errors.

## Background context
The need for schema management has become increasingly prevalent to handle the evolving complexity of modern Event-Driven Architecture. A Schema Registry is a centralized service that stores and maintains the schemas for data exchanged between various components of a modern distributed system. Validating data being exchanged helps in maintaining data consistency and compatibility. 

While several Schema Registry implementations exist, we will use the Apicurio Registry in this tutorial. Apicurio Registry is a popular open source Schema Registry implementation that supports multiple serialization formats and facilitates schema management for diverse data in distributed systems. We will be using the Apicurio Registry in combination with Avro, which is a language-neutral data serialization system.

# Installation guide

## Steps
1. Install [Docker](https://docs.docker.com/engine/install/) from the official website.
2. Open the command prompt and pull up the Apicurio Registry Docker Image from Docker Hub using the following command:
    <CodeBlock language="bash">
    {`docker pull apicurio/apicurio-registry`}
    </CodeBlock>
3. Run Apicurio Registry Docker Image in a Docker container by using the command:
    <CodeBlock language="bash">
    {`docker run -it -p 8080:8080 apicurio/apicurio-registry:latest-snapshot`}
    </CodeBlock>
4. Access Apicurio Registry once the container is running by navigating to http://localhost:8080.

## Summary

## Next steps
In the next tutorial, we are going to learn about Kafka bindings.