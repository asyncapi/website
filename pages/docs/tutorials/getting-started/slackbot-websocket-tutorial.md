---
title: Building a SlackBot with AsyncAPI and WebSocket
description: In this tutorial, you'll learn how to create an AsyncAPI document designed for a Slack application that operates in Socket Mode
weight: 80
---

## Introduction
In this tutorial, you will learn how to generate an AsyncAPI document designed for a Slack application that operates in Socket Mode. Our aim is to help you grasp a real-world application of AsyncAPI with the WebSocket protocol.

Consider a scenario where you are in charge of maintaining a highly active Slack workspace. You want an easy way to keep track of the popular messages across all the channels but doing this manually would be a difficult task. To simplify this process, we're going to build a Slackbot with some specific features.

- **Event Subscription:** Your Slackbot is designed to be notified of events within your workspace. It does this by subscribing to a specific event type making use of Slack's Event API.
- **Event Type:** In the context of your Slackbot, it actively listens for the "reaction_added" event type. This event is triggered each time a user reacts to a message using an emoji.
- **Popularity Indicator:** The bot will now specifically look at the count of the “heart” emoji to indicate the popularity of the message.
- **Communication Protocol:** Slack employs a WebSocket URL as a means of communication with your application. 

## Background context
[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a communication protocol that enables full-duplex, bidirectional data exchange between a client and a server over a single, long-lived connection. Unlike HTTP, which relies on the request-response model, WebSocket is ideal for scenarios where real-time, interactive, and low-latency communication is necessary.

In Slack, WebSocket is employed as part of its [Socket Mode](https://api.slack.com/apis/connections/socket) feature to facilitate real-time notifications between Slack's servers and third-party applications or bots. Socket Mode makes it easier to create Slack apps without dealing with complex infrastructure issues. Building these apps using HTTP had challenges when working from certain environments. With Socket Mode, this becomes simpler and more feature-rich for app developers.

The [Slack Event API](https://api.slack.com/apis/connections/events-api) is a tool that lets developers receive real-time notifications of specific events in a Slack workspace. By subscribing to event types like messages, reactions, and user presence changes, third-party apps can react to these events instantly. This API enhances automation and interactivity within the Slack platform, making it a powerful resource for building custom integrations and chatbots.

## Create AsyncAPI document

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

channels:
  reactionListener:
    address: /
    messages:
      reactionListener:
        $ref: '#/components/messages/reactionListener'

operations:
  reactionListener:
    action: receive
    channel: 
      $ref: "#/channels/reactionListener"

components:
  messages:
    reactionListener:
      summary: "Action triggered when channel receives a new event of type reaction-added"
      payload:
        $ref: '#/components/schemas/reactionPayload'

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
```

Let’s take a closer look - 

```
servers:
  ws:
    host: wss.slack.com/
    pathname: ticket={ticketId}&app_id={appId}
    protocol: ws
    description: "Websocket URL generated to communicate with Slack"
```

In the ws server section, we refer to the WebSocket URL generated at runtime by invoking the [apps.connections.open](https://api.slack.com/methods/apps.connections.open) method from Slack’s API. Authorization tokens, obtained during the Slackbot configuration, are used to generate this URL.

```
operations:
  reactionListener:
    action: receive
    channel: 
      $ref: "#/channels/reactionListener"
```
The `reactionListener` operation defines how the Slackbot interacts with Slack. In this use case, it's configured to **receive** events from Slack through the app's event subscription.

```
channels:
  reactionListener:
    address: /
    messages:
      reactionListener:
        $ref: '#/components/messages/reactionListener'
```
"The `operation` property links us to the `channel` section, offering additional details. The reactionListener channel is established to receive events from Slack. The `address` specifies where the channel is tuned to while the `messages`  property  is used to define the structure of the events it's set up to handle.

```
components:
  messages:
    reactionListener:
      summary: "Action triggered when channel receives a new event of type reaction-added"
      payload:
        $ref: '#/components/schemas/reactionPayload'
```
Within the `components` section, we specify the message structure for reactionListener. This structure is composed of key-value pairs, and the payload section details how an event should look when received by the Slackbot.

```
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
```
And that brings us to the `payload` property. This property strictly defines the structure of the event using AsyncAPI schemas. It contains the property name, format type and description. 

The AsyncAPI document also allows you to set specific constant values that must be adhered to. In this schema definition, any API message received from this channel must follow the constant value for the "reaction" property which is clearly defined as “heart”.

This feature ensures that the data exchanged through your API complies with your specified constants, helping to maintain data integrity and accuracy.


## Summary

This tutorial introduced you to the practical application of WebSocket protocols within an AsyncAPI document. We used a practical example to build a Slack App that effectively worked with Slack's Event API in Socket Mode. In our future tutorials, we'll dive deeper into more advanced concepts and explore the extensive features of AsyncAPI. 
