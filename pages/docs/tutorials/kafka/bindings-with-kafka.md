---
title: Adding Kafka information using bindings.
description: In this tutorial, you'll learn how bindings with Kafka work and different ways to utilize bindings in your AsyncAPI applications.
weight: 150
---

## Introduction

In this tutorial, you will learn how bindings with Kafka works. You will learn how to define Kafka message key content and extend your AsyncAPI document with protocol-specific information.

## Background Context

Bindings are relevant when integrating Kafka with other programs or services. A binding is a specific agreement or configuration that governs how an application connects to and interacts with Kafka. It includes information such as, topics an application reads from or writes to, how the messages are formatted, and the rules for interacting with various data or messages.

Bindings configure ecosystems to accommodate Kafka-specific functionalities not supported by AsyncAPI's core features. This necessity for bindings arises to bridge these specific requirements of Kafka with AsyncAPI. Hence the need for bindings. 

You can configure several objects using Kafka bindings. However, for the scope of this tutorial, we are focusing on two levels of bindings: [server bindings](https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object) and [channel bindings](https://github.com/asyncapi/bindings/tree/master/kafka#channel-binding-object). 

The diagram below shows how bindings with Kafka work. 

```mermaid
sequenceDiagram
    A[Kafka Broker/Cluster] -->|Kafka bindings| B[receivers]
    C[senders] -->|message flow| A

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#cfc,stroke:#333,stroke-width:2px
    %% style D fill:#cfc,stroke:#333,stroke-width:2px
```


## Summary

In this tutorial, you learned how to configure server and channel bindings. You also learned that Kafka bindings are essential in integrating Kafka with different systems, platforms, or protocols, especially in API specifications like AsyncAPI. 


## Next Steps

