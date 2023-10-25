---
title: Creating an AsyncAPI Document for a SlackBot in Socket Mode
description: In this tutorial, you'll learn how to create an AsyncAPI document designed for a Slack application that operates in Socket Mode.
weight: 80
---

## Introduction
In this tutorial, you will learn how to generate an AsyncAPI document designed for a Slack application that operates in Socket Mode. Our aim is to help you grasp a real-world application of AsyncAPI with the WebSocket protocol.

Consider a scenario where you are in charge of maintaining a highly active Slack workspace. You want an easy way to keep track of the popular messages across all the channels but doing this manually would be a difficult task. To simplify this process, you’re going to build a Slackbot called my-slack-bot that actively monitors reactions added to a message and determine its popularity by counting the reactions of the “heart” emoji.

Here’s a visual representation of how your Slackbot should work.

```mermaid
sequenceDiagram
participant my-slack-bot
participant Slack Server (Socket Mode)
participant User


my-slack-bot->>Slack Server (Socket Mode): Connect
Note right of my-slack-bot: Establish WebSocket connection


Slack Server (Socket Mode)->> my-slack-bot : Handshake
Note left of Slack Server (Socket Mode): Establish Socket Mode connection

Slack Server (Socket Mode)->> my-slack-bot : Sends "hello" event
Note left of Slack Server (Socket Mode): Confirms successful connection





User-->>Slack Server (Socket Mode): Adds emoji to a message.


Slack Server (Socket Mode)->>my-slack-bot: Sending "reaction_added" payload


Note left of my-slack-bot: Event received by Slackbot
``` 

## Background context
[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a communication protocol that enables full-duplex, bidirectional data exchange between a client and a server over a single, long-lived connection. Unlike HTTP, which relies on the request-response model, WebSocket is ideal for scenarios where real-time, interactive and low-latency communication is necessary.


```mermaid
sequenceDiagram
Client -->> Server: Initiate WebSocket Connection
Server -->> Client: WebSocket Response
Server -->> Client: WebSocket Response
Server -->> Client: WebSocket Response
Server -->> Client: WebSocket Response
```

In Slack, WebSocket is employed as part of its [Socket Mode](https://api.slack.com/apis/connections/socket) feature to facilitate real-time notifications between Slack's servers and third-party applications or bots.  Socket Mode simplifies Slack app development by eliminating complex infrastructure challenges faced with HTTP, offering simpler and more feature driven solutions for app developers.


The [Slack Event API](https://api.slack.com/apis/connections/events-api) is a tool that lets developers receive real-time notifications of specific events in a Slack workspace. By subscribing to event types like messages, reactions, and user presence changes, this API enhances automation within the Slack platform, making it a powerful resource for building custom integrations and chatbots.



## Define AsyncAPI Version, API Information, and Server

You start your AsyncAPI document by specifying the AsyncAPI version and essential information about your Slackbot API which includes details such as the `title`, `version` and `description`.

The `ws` server section allows you to define the protocol and specify information about the URLs your application will use, such as  `host`, `pathname`, and `description`.

<Remember title="Note">
The WebSocket URL is generated  by invoking the [apps.connections.open](https://api.slack.com/methods/apps.connections.open) method from Slack’s API. You use the authorization tokens obtained during the Slack Bot configuration to generate this URL.
</Remember>

```
asyncapi: '3.0.0'
info:
  title: SlackBot API
  version: '1.0.0'
  description:  |
    The SlackBot App manages popular messages in a workspace by monitoring message reaction data from Slack's Event API.
    
servers:
  ws:
    host: wss.slack.com/
    pathname:  ticket=$ticketId&app_id=$appId      
    protocol: ws
    description: "Websocket URL generated to communicate with Slack"

```


## Define Operations and Channels
The  `operation` property, is all about defining specific tasks your application can perform. Essentially, it's how your Slackbot interacts with Slack.

In this example, we make use of two operations. The `helloListenerOperation` keeps an eye out for the message sent by the Slack server when a WebSocket connection is successfully established. On the other hand, the `reactionListener` is focused on the reaction_added event type.

Your Slackbot is designed to be notified of events within your workspace. It does this by subscribing to a specific event type making use of Slack's Event API.  So in this case the `action` property in both the operations is set to receive events.

Now, moving on to the `channels` section. The `address` specifies where the channel is tuned in to receive messages while the `messages`  property  defines the structure of the event it's set up to handle.

```
channels:
  reactionListener:
    address: /
    messages:
      reactionListener:
        $ref: '#/components/messages/reactionListenerMessage'
  
  helloListener:
    address: /
    messages:
      helloListener:
        $ref: '#/components/messages/helloListenerMessage'

operations:
  helloListenerOperation:
    action: receive
    channel:
      $ref: "#/channels/helloListener"

  reactionListenerOperation:
    action: receive
    channel: 
      $ref: "#/channels/reactionListener"
```

## Step 3: Define Messages and Schemas

In the context of your Slackbot, it actively monitors two events. The first is the "hello" event, received upon successfully securing a WebSocket connection. The second is the "reaction_added" event type, triggered whenever a user reacts to a message using an emoji.

Your AsyncAPI document needs to be very clear on the type of event it is expected to receive. Here's where the `messages` component steps in. Using the `payload` property, you can specify what these events should look like, their structure, and what content they carry.

```
components:
  messages:
    reactionListenerMessage:
      summary: "Action triggered when channel receives a new event of type reaction-added"
      payload:
        $ref: '#/components/schemas/reactionPayload'
    
    helloListenerMessage:
      summary: "Action triggered when a successful WebSocket connection is established."
      payload:
        $ref: '#/components/schemas/helloPayload'

  schemas:
    reactionPayload:
      type: object
      properties:
        user:
          type: string
          description: ID of the user who performed this event
        reaction:
          type: string
          description: The only reaction that we need is a heart emoji
          const: "heart"
        item_user:
          type: string
          description: ID of the user that created the original item that has been reacted to
        item:
          type: object
          properties:
            channel:
              type: string
              description: Channel information of original message
            ts:
              type: string
              description: Timestamp information of original message.
        event_ts:
          type: string
          description: Timestamp of reaction

    helloPayload:
      type: object
      properties:
        type:
          type: string
          description: A hello string confirming WS connection
          const: "hello"
        connection_info:
          type: object
          properties:
            app_id:
              type: string
        num_connections:
          type: integer
        debug_info:
          type: object
          properties:
            host:
              type: string
            started:
              type: string
            build_number:
              type: integer
            approximate_connection_time:
              type: integer
```
And that brings us to what the `payload` attribute does. It specifies the name, format, and description of all expected properties, and can even set constant values that must be followed during schema validation.
For example, in `reactionPayload` schema definition, any API message received from this channel must follow the constant value for the "reaction" property which is clearly defined as “heart”.

The const value feature ensures that the data exchanged through your API complies with your specified constants, helping to maintain data integrity and accuracy.

And there you have it! Putting these blocks together gives you your AsyncAPI document all ready to go.

```
asyncapi: '3.0.0'
info:
  title: MySlackBot API
  version: '1.0.0'
  description:  |
    The SlackBot App manages popular messages in a workspace by monitoring message reaction data from Slack's Event API.
    
servers:
  ws:
    host: wss://wss-primary.slack.com/
    pathname: link/?ticket=13748dac-b866-4ea7-b98e-4fb7895c0a7f&app_id=fe684dfa62159c6ac646beeac31c8f4ef415e4f39c626c2dbd1530e3a690892f
    protocol: wss
    description: "Websocket URL generated to communicate with Slack"

channels:
  reactionListener:
    address: /
    messages:
      reactionListener:
        $ref: '#/components/messages/reactionListenerMessage'
  
  helloListener:
    address: /
    messages:
      helloListener:
        $ref: '#/components/messages/helloListenerMessage'

operations:
  helloListenerOperation:
    action: receive
    channel:
      $ref: "#/channels/helloListener"

  reactionListenerOperation:
    action: receive
    channel: 
      $ref: "#/channels/reactionListener"

components:
  messages:
    reactionListenerMessage:
      summary: "Action triggered when channel receives a new event of type reaction-added"
      payload:
        $ref: '#/components/schemas/reactionPayload'
    
    helloListenerMessage:
      summary: "Action triggered when a successful WebSocket connection is established."
      payload:
        $ref: '#/components/schemas/helloPayload'

  schemas:
    reactionPayload:
      type: object
      properties:
        user:
          type: string
          description: ID of the user who performed this event
        reaction:
          type: string
          description: The only reaction that we need is a heart emoji
          const: "heart"
        item_user:
          type: string
          description: ID of the user that created the original item that has been reacted to
        item:
          type: object
          properties:
            channel:
              type: string
              description: Channel information of original message
            ts:
              type: string
              description: Timestamp information of original message.
        event_ts:
          type: string
          description: Timestamp of reaction

    helloPayload:
      type: object
      properties:
        type:
          type: string
          description: A hello string confirming WS connection
          const: "hello"
        connection_info:
          type: object
          properties:
            app_id:
              type: string
        num_connections:
          type: integer
        debug_info:
          type: object
          properties:
            host:
              type: string
            started:
              type: string
            build_number:
              type: integer
            approximate_connection_time:
              type: integer
```




## Summary
In this tutorial, you were introduced to a practical application of WebSocket protocols within an AsyncAPI document. In our future tutorials, we'll dive deeper into more advanced concepts and explore the extensive features of AsyncAPI. 

