---
title: Glossary
Description: This glossary defines general terms and terms specific to AsyncAPI style guide, products, and documentation. 
---

This Glossary serves as a central location for terms that appears in the AsyncAPI documentation. If you find a term that you wish was defined here, please post an [issue requesting it](https://github.com/asyncapi/website/issues).


## API
The general definition of "Application Program Interface" can refer to different things for different people. However, in this case, APIs refer to different kinds of APIs, including HTTP-based, Async, and Event-driven Architecture.

## AsyncAPI
AsyncAPI is an open specification that allows you to describe and document asynchronous APIs (Application Programming Interfaces). It focuses on the communication patterns and message-driven architectures commonly found in event-driven systems, such as message queues, publish-subscribe systems, and streaming platforms.

<Remember>
It is not asyncAPI or Async API.
</Remember>

## AsyncAPI document
An AsyncPI document is a file that defines and annotates the different components of a specific Event-Driven API.

## AsyncAPI specification
The AsyncAPI Specification is a project used to describe and document message-driven APIs in a machine-readable format. It is protocol-agnostic, so you can use it for APIs that work over any protocol (e.g., AMQP, MQTT, WebSockets, Kafka, STOMP, HTTP, etc.).

**Note:**
The AsyncAPI specification does not assume any kind of software topology, architecture or pattern.

## Bindings
A "binding" (or "protocol binding") is a mechanism to define protocol-specific information. Therefore, a protocol binding MUST define protocol-specific information only.

## CLI 
The AsyncAPI CLI is a tool you can use to work with your AsyncAPI documents. You can use the CLI to create, develop, validate, maintain, and maintain your AsyncAPI documents, use the Generator tool, and even create new AsyncAPI documents.

## Consumer
In an Event Driven Architecture (EDA), a consumer is an application that listens for a particular event from a broker and reacts to it.

## EDA
EDA stands for Event-Driven Architecture, an architectural pattern that structures software systems around event production, detection, and consumption. In an event-driven architecture, components or services communicate by producing and consuming events representing significant changes or occurrences in the system.

## Event
An event is a message that provides details of something that has already occurred.

An Event-Driven Architecture (EDA) uses events to trigger and communicate between services and is common in modern applications built with microservices.

## Generator
The AsyncAPI generator is a tool that generates anything you want using the AsyncAPI Document and Template that are supplied as inputs to the AsyncAPI CLI. 

You can use the generator to generate anything you want, provided that it can be defined in a template, such as code, diagrams, markdown files, microservices, and applications.

## Github Actions
The Github Actions tool seamlessly integrates and generates docs and code for your GitHub Actions pipeline.

## Identifier
This field represents a unique universal identifier of the application the AsyncAPI document defines. It must conform to the URI format, according to RFC3986.


## Message-driven APIs
Message-driven APIs, also known as Messaging APIs, facilitate communication between different components or services by exchanging messages. Instead of traditional request-response patterns in synchronous APIs, message-driven APIs rely on asynchronous messaging to enable decoupled and loosely coupled communication.

## Microservices
Microservices are a software architecture approach where applications are divided into small, independent services that communicate with each other through APIs. Each microservice focuses on a specific function, allowing scalability, agility, fault isolation, and technology flexibility.

## Modelina
Modelina is a library for generating data models based on inputs such as AsyncAPI, OpenAPI, or JSON Schema documents.

## Parsers 
Parser is a package used to validate and parse AsyncAPI documents —YAML or JSON— in your Node.js or browser application.

## Producer
A producer is an application that senses state changes (events) and publishes those events as messages. An event indicates a state change or update triggered by a user's/device's action.

## Protocol
A protocol is a set of rules that specifies how information is exchanged between applications and/or servers.

## ProtocolVersion
The version of the protocol used for the connection.

## Studio
Also known as the AsyncAPI studio is a tool that allows you to develop an AsyncAPI document, validate it, preview it, convert it to the latest version, and visualise event flows.
