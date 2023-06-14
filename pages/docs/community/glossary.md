---
title: Glossary
weight: 10
---


This Glossary serves as a central location for terms that appears in the AsyncAPI documentation. If you find a term that you wish was defined here, please post an [issue requesting it](https://github.com/asyncapi/website/issues).


## API
The general definition of "Application Program Interface" can refer to different things for different people. However, in this case, APIs refer to different kinds of APIs, including HTTP-based, Async, and Event-driven Architecture.


## AsyncAPI
AsyncAPI is an open specification that allows you to describe and document asynchronous APIs (Application Programming Interfaces). It focuses on the communication patterns and message-driven architectures commonly found in event-driven systems, such as message queues, publish-subscribe systems, and streaming platforms.


## AsyncAPI document
An AsyncPI document is a file that defines and annotates the different components of a specific Event-Driven API.


## Bindings
A "binding" (or "protocol binding") is a mechanism to define protocol-specific information. Therefore, a protocol binding MUST define protocol-specific information only.


## Consumer
In an Event Driven Architecture (EDA), a consumer is an application that listens for a particular event from a broker and reacts to it.


## EDA
EDA stands for Event-Driven Architecture, an architectural pattern that structures software systems around event production, detection, and consumption. In an event-driven architecture, components or services communicate by producing and consuming events representing significant changes or occurrences in the system.


## Event
An event is a message that provides details of something that has already occurred.

An Event-Driven Architecture (EDA) uses events to trigger and communicate between services and is common in modern applications built with microservices.


## Identifier
This field represents a unique universal identifier of the application the AsyncAPI document defines. It must conform to the URI format, according to RFC3986.


## Message-driven APIs
Message-driven APIs, also known as Messaging APIs, facilitate communication between different components or services by exchanging messages. Instead of traditional request-response patterns in synchronous APIs, message-driven APIs rely on asynchronous messaging to enable decoupled and loosely coupled communication.


## Microservices
Microservices are a software architecture approach where applications are divided into small, independent services that communicate with each other through APIs. Each microservice focuses on a specific function, allowing scalability, agility, fault isolation, and technology flexibility.


## Modelina
Modelina is a library for generating data models based on inputs such as AsyncAPI, OpenAPI, or JSON Schema documents.


## Producer
A producer is an application that senses state changes (events) and publishes those events as messages. An event indicates a state change or update triggered by a user's/device's action.


## Protocol
A protocol is a set of rules that specifies how information is exchanged between applications and/or servers.


## ProtocolVersion
The version of the protocol used for the connection.


## Studio
Also known as the AsyncAPI studio is a tool that allows you to develop an AsyncAPI document, validate it, preview it, convert it to the latest version, and visualise event flows.




<!---
TODO: I need help deciding what these terms could be fit for and will appreciate any help or suggestions I can get.

AsyncAPI specification
AsyncAPI spec
AsyncAPI file
AsyncAPI specification file
AsyncAPI instance
AsyncAPI definition
AsyncAPI contract

Secondly, in writing AsyncAPI, are there any variants? like these:

-  asyncAPI
-  Async API

I noticed that in different cases, it is spelt differently. Do we want to specify anything?

Finally, I'll apprecite new words to be added. Thanks

-->











