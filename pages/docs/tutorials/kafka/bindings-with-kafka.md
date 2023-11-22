---
title: Adding Kafka information using bindings.
description: In this tutorial, you'll learn how bindings with Kafka work and different ways to utilize bindings in your AsyncAPI applications.
weight: 150
---

## Introduction

In this tutorial, you will learn how bindings with Kafka works. You will learn how to extend your AsyncAPI document with Protocol-specific information, such as how to specify Kafka topic-specific configurations or how to define Kafka message key content.

## Background Context
Bindings are relevant when integrating Kafka with other programs or services. A binding is a specific agreement or configuration that governs how an application connects to and interacts with Kafka. It can include information such as:

- Which topics should an application read from or write to?
- How should messages be formatted?
- What are the rules for interacting with various data or messages?

Bindings configure ecosystems to accommodate Kafka-specific functionalities not supported by AsyncAPI's core features. This necessity for bindings arises to bridge these specific requirements of Kafka with AsyncAPI. Hence the need for bindings. 

You can configure several objects using Kafka bindings. However, for the scope of this tutorial, we are focusing on two levels of bindings:

- Server Bindings
- Channel Bindings


The diagram below shows how bindings with Kafka work. 



Now, let's see how to use bindings with Kafka.


## Summary

In this tutorial, you learned how to configure server and channel bindings. You also learned that Kafka bindings are essential because they indicate how Kafka components are configured.

## Next Steps

