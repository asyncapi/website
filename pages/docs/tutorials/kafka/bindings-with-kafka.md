---
title: Kafka-specific Bindings
description: In this tutorial, you'll learn how how to add specific Kafka information to an AsyncAPI document using bindings.
---

## Introduction

In a previous tutorial, you learnt how to manage schemas with schema registry. In this tutorial, you will learn how bindings with Kafka works by defining Kafka message key content and extending your AsyncAPI document with protocol-specific information.

## Background Context

Bindings enhances AsyncAPI documentation by providing protocol-specific information. They append to different document sections, such as servers, channels, or messages, and they include standard information that is unique to a particular protocol. 

Bindings improve the understanding and usability of the API by offering more setup options and context for various protocols. It includes information such as topics an application reads from or writes to, how the messages are formatted, and the rules for interacting with various data or messages. 

Bindings definitions allow you to specify the protocol specific functionalities not supported by AsyncAPI's core features.

You can configure several objects using Kafka bindings. However, for the scope of this tutorial, we are focusing on two levels of bindings: [server bindings](https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object) and [channel bindings](https://github.com/asyncapi/bindings/tree/master/kafka#channel-binding-object). 


The diagram below shows how bindings with Kafka work. 

```mermaid
graph TD
    A[AsyncAPI Application] -->|Kafka Server Bindings| B[Kafka Broker/Cluster]
    B -->|Kafka Channel Bindings| C[Producer Channel]
    B -->|Kafka Channel Bindings| D[Consumer Channel]
    C -->|Kafka Message Bindings| E[Producer Message]
    D -->|Kafka Message Bindings| F[Consumer Message]
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#ccf,stroke:#333,stroke-width:4px
    style C fill:#fcf,stroke:#333,stroke-width:4px
    style D fill:#fcf,stroke:#333,stroke-width:4px
    style E fill:#cff,stroke:#333,stroke-width:4px
    style F fill:#cff,stroke:#333,stroke-width:4px
```

## Server Bindings

Server bindings provide protocol-specific configuration details for connecting and interacting with a server.

## Channel Bindings

Channel bindings provide protocol-specific information for a particular channel. For example, in Kafka, you can specify number of partitions or replicas for a given topic.

## Summary

In this tutorial, you learned how to configure server and channel bindings. You also learned that bindings are essential in integrating Kafka with different systems, platforms, or protocols, especially in API specifications like AsyncAPI. 


## Next Steps

Now that you have completed this tutorial, you can [learn more about other Kakfa bindings](https://github.com/asyncapi/bindings/tree/master/kafka) or [protocol-specific bindings](https://github.com/asyncapi/bindings).
