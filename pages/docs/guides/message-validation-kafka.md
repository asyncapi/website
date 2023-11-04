---
title: Message validation for Kafka
description: The guide explains how you can validate AsyncAPI messages being sent via Kafka.
weight: 140
---

## Introduction
The guide explains all the ways you can validate AsyncAPI messages being sent via Kafka. It provides an overview of message validation in Kafka, focusing on the role of the Schema Registry. You will also be introduced to popular Schema Registry implementations such as Apicurio and Confluent Schema Registry.

## Schema Registry usage in validation
Schema Registry can be used in a Kafka ecosystem to validate data being exchanged by producers and consumers. Data validation helps in maintaining data consistency and compatibility. Data is validated by comparing it to a pre-defined format stored in the Schema Registry. Producers try to encode their messages according to a schema definition while sending messages to Kafka, while also including the schema ID in the message header or metadata. These messages are then validated by comparing the schema ID and schema, and new schemas are stored. While receiving messages, consumers obtain the schema ID from the message header or metadata. They then validate the received messages against this schema. You can learn more about Schema Registry usage in message validation [here](https://www.asyncapi.com/docs/guides/message-validation#schema-registry-validation). 

## Schema Registry Implementations

### Apicurio

### Confluent schema registry

## Additional Resources 