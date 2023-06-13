---
title: Operations
weight: 60
---

## Meaning of Operations

- In a messaging system, the term "operations" refers to the various methods by which messages are exchanged between participants or components. 

- Operations describe the behaviors and capabilities of the messaging channels described in the document.

- In a messaging channel, an operation represents a particular action or interaction that can be performed. 

- The purpose of these operations is to provide a standardized means for describing the process of publishing, subscribing to, requesting, or replying to messages within the messaging system.

## Steps for Adding Operations

For adding operations to an AsyncAPI document, we need to define them within the channels section of the document. The step-by-step guide on how to add operations to an AsyncAPI document is as follows - 

- Open your AsyncAPI document in a text editor or an AsyncAPI editor tool.

- Locate the `channels` section in your AsyncAPI document. This section defines the messaging channels and their associated operations.

- Within the `channels` section, add a new channel using the desired channel name. Channels are represented as properties within the `channels` object, and their names are usually formatted as paths or topics, depending on the messaging protocol you are using (e.g. `/users/{userId}/notifications` or `user.notifications`).

- Inside the channel definition, specify the desired operations by creating sub-properties for each operation. Common operations include `publish`, `subscribe`, `publishSubscribe`, `requestReply`, and request.

- For each operation, define its details using the appropriate keywords and properties. These details include the operation type, payload schema, headers, bindings, and other relevant information.

## Types of Operations 

The operations of the AsyncAPI document are divided into the following different categories based on the purpose they serve -

- <b> Publishing: </b> In the publish operation, components are able to send messages to specific channels. This operation allows publishers to publish messages or events for consumption by other components.

- <b> Subscribing: </b> By using the subscribe operation, components are able to receive messages from a particular channel. The subscriber can use this operation to indicate whether they are interested in receiving messages from a particular channel.

- <b> Request-Reply: </b> RequestReply establishes a pattern of request-response communication between components. The client can send a request message, and the server will respond with a corresponding reply message. Typically, this operation is used for synchronous communication in which the client anticipates a response from the server.

- <b> Request: </b> A request operation allows components to submit a request message without requiring a response from the server. This is typically used in situations where the client does not need a direct response from the server, such as fire-and-forget or one-way communication.

- <b> Publish-Subscribe: </b> With the publishSubscribe operation, messages published to a channel are distributed to multiple subscribers in a publish-subscribe pattern. Messages can be broadcast to a number of consumers interested in a particular topic or event at the same time.

