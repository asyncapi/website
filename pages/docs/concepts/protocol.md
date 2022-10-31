---
title: Protocol
weight: 25
---


## What is a protocol?
A protocol is a mechanism that handles the exchange of messages. It provides a way of getting messages from one point in an event-driven architecture to another. A protocol could either be wired or API.

`Protocol` examples:
* WebSockets
* HTTP
* Kafka
* MQTT

## Why do we need protocols?
Whenever a producer detects a state change (events) and publishes those events as messages, a protocol carries those messages to the channel and then to a consumer. Protocol plays a vital role in message transmission.