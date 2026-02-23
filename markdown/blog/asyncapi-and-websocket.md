---
title: "AsyncAPI & WebSocket A Match Made from Heaven?"
date: 2026-02-22T06:00:00+01:00
type: Engineering
tags:
  - Specification
  - EDA
  - Websocket
cover: /img/posts/asyncapi-websocket.webp
authors:
  - name: Azeez Elegbede
    photo: /img/avatars/ace.webp
    link: https://www.linkedin.com/in/acebuild/
---



Recently, while building a collaborative drawing web application with WebSocket for one of my livestreams, I discovered just how efficient it is to document a WebSocket server using the AsyncAPI specification in a spec-first approach. But what exactly do I mean by “spec-first”?

![API spec first diagram](/img/diagrams/spec-first.webp)

The spec-first API development approach involves designing the API using an API specification _before_ implementing it. This method offers significant advantages, such as reducing the time needed to build the actual API, improving communication with stakeholders, and producing higher-quality APIs overall. But let’s save the deep dive into spec-first for another time and get back on track!

## Why WebSocket and AsyncAPI Instead of OpenAPI?

![Asyncapi-OpenAPI](/img/diagrams/asyncapi-openapi.webp)

OpenAPI isn’t ideal for my use case because it’s specifically designed for REST APIs. WebSocket, on the other hand, differs significantly from traditional HTTP. It provides a two-way communication channel over a single Transmission Control Protocol (TCP) connection, which OpenAPI doesn’t support.

In simpler terms, unlike REST APIs, where you must send a request to receive a response, maintaining a connection similar to a WebSocket would require repeatedly pinging the server at intervals (a process known as polling). WebSocket does the opposite. It keeps the connection open between server and client, allowing the server to send data to the client without waiting for a request.

So, why would I use OpenAPI for that? Now you see why AsyncAPI is the better fit. Since WebSocket enables an event-driven connection between client and server, we need an API specification that supports this kind of interaction, and that’s where AsyncAPI comes in.

Let’s explore why combining AsyncAPI with WebSocket is such a powerful approach.

## The Intersection

As I mentioned earlier, `WebSocket enables an event-driven connection between client and server`, meaning it operates asynchronously. AsyncAPI offers a standardized way to define these asynchronous APIs, making it a perfect match. This combination enhances real-time application development by ensuring consistent, reliable message formats and enabling instant, bidirectional data exchange between client and server.

Now, let’s dive deeper into this powerful intersection!

### Clear and Concise Message Format and Event Types

Defining your WebSocket API with AsyncAPI allows you to leverage AsyncAPI's schema definitions, ensuring a structured and consistent approach to handling data exchange across WebSocket connections. This reduces misunderstandings about message formats and event types, creating a smoother, more reliable communication flow.

Consider a real-world example from a chat application. Here's how you'd define a message schema in AsyncAPI:

```yaml
components:
  messages:
    chatMessage:
      name: ChatMessage
      title: Chat Message
      summary: A user message sent in the chat
      description: Represents a message exchanged between users in a real-time chat application
      payload:
        type: object
        properties:
          messageId:
            type: string
            format: uuid
            description: Unique identifier for this message
          senderId:
            type: string
            description: ID of the user sending the message
          senderName:
            type: string
            description: Display name of the sender
          content:
            type: string
            maxLength: 1000
            description: The actual message text
          timestamp:
            type: string
            format: date-time
            description: When the message was sent
        required:
          - messageId
          - senderId
          - senderName
          - content
          - timestamp
```

Notice how each field has a clear purpose, defined type, and specific constraints. This structured approach prevents confusion about what data should be in each message and how it should be formatted, something that would be much harder to maintain without a specification.


### Message Schema Validation

AsyncAPI allows your WebSocket API to validate real-time messages against predefined schemas at runtime, helping to catch errors early in the development stage. With the production-ready [AsyncAPI Validator](https://www.npmjs.com/package/asyncapi-validator/), you can automatically validate your WebSocket messages against your AsyncAPI document.

However, there's an important detail: by default, JSON Schema (which AsyncAPI uses under the hood) allows additional properties. This means the validator would reject the `chatMessage` above if a required field is missing, but it would accept a message with extra properties not defined in your schema.

To prevent unexpected properties from slipping through, add `additionalProperties: false` to your message payload:
```yaml
payload:
  type: object
  properties:
    messageId:
      type: string
      format: uuid
    # ... other properties
  required:
    - messageId
    - senderId
    - senderName
    - content
    - timestamp
  additionalProperties: false
```

Now your validator enforces that only the properties you've defined are accepted, ensuring strict schema compliance across your system.


### Improved Architectural Planning

Using AsyncAPI with your WebSocket API supports a spec-first approach where your AsyncAPI document becomes the single source of truth. Both your client and server implementations derive from this specification, ensuring they never drift apart.

Rather than treating your specification as an afterthought to satisfy documentation requirements, it becomes the foundation for how you build your API. This enables faster prototyping, testing, and implementation, significantly reducing time to market.

![AsyncAPI Ecosystem](/img/diagrams/ecosystem.webp)

As the industry standard for defining asynchronous APIs, AsyncAPI unlocks a robust ecosystem of tools maintained by the AsyncAPI Initiative. You can generate production-ready code in multiple languages, create deployment-ready documentation automatically, and set up mock servers for development with tools like [Microcks](https://microcks.io/), all directly from your specification.

Now that you've seen the power of this approach, let's explore the key concepts in AsyncAPI for building WebSocket APIs.

## Key Concepts in AsyncAPI for WebSocket

If you've used WebSocket before, you're likely familiar with **channels**, sometimes called `topics` or `paths`. Channels are specific routes within a WebSocket connection that organize how messages flow. For example, with channels named `general` and `members`, you can send and receive messages independently on each one. If you only want messages from the `members` channel, you simply listen to that channel and ignore the rest.

### [Channels](https://www.asyncapi.com/docs/concepts/channel)

AsyncAPI channels establish bi-directional communication between message senders and receivers. They're more than just message highways, they're composed of several elements that work together:

- **Address**: An optional string specifying the channel's location (topic name, routing key, event type, or path)
- **Title**: A friendly, descriptive name for the channel
- **Messages**: The list of message types that can be sent and received on this channel
- **Bindings**: WebSocket-specific configuration that customizes connection details

### [Messages](https://www.asyncapi.com/docs/concepts/message)

In an event-driven system, **data exchange** is everything. AsyncAPI provides a structured, consistent way to define this exchange across WebSocket connections.

A **message** is the asset by which information flows between senders and receivers via channels. Messages are flexible and can represent events, commands, requests, or responses. Basically whatever your system needs.

Each message consists of:

- **Name**: A descriptive identifier for the message
- **Summary**: A brief overview of the message's purpose
- **Description**: Detailed explanation of what the message contains
- **Payload**: The structured properties and required fields for the message

### Operations

An **operation** defines the specific actions that can occur within a channel, essentially telling you whether your application will _send_ or _receive_ messages. This clarity is crucial for understanding message flow.

Each operation includes:

- **Action**: Either `send` (app sends a message) or `receive` (app expects to receive a message)
- **Channel**: The specific channel where the operation happens(from the list of defined channels in your AsyncAPI specification)
- **Reply**: Specifies the expected response message in request-reply operations (optional)
- **Title**: A descriptive name for the operation
- **Summary**: A quick overview of what the operation does
- **Description**: Detailed explanation of the operation's purpose

Together, these three concepts (Channels, Messages, Operations) give you complete control over message flow and make AsyncAPI a powerful tool for building scalable event-driven systems.

## The Complete Breakdown

Now that we've explored the key concepts, let's build a complete AsyncAPI document for a simple chat application step by step.

### Step 1 - Defining Basic Information About Our WebSocket API

First, we provide essential information about our API, including server details for client connections.
```yaml
asyncapi: "3.1.0"

info:
  title: Simple Chat API
  version: 1.0.0
  description: A real-time chat API using WebSocket protocol

servers:
  development:
    host: localhost:8787
    description: Development WebSocket broker
    protocol: wss
```

### Step 2 - Defining Our WebSocket Channel

AsyncAPI channels enable bidirectional communication. Let's define our chat channel:
```yaml
channels:
  chat:
    address: /
    title: Chat channel
```

We'll define messages separately in components to keep the channel definition clean and reusable.

### Step 3 - Creating Reusable Message Components

Components hold reusable objects for different aspects of your AsyncAPI specification. They only take effect when explicitly referenced elsewhere. Let's define our chat message:
```yaml
components:
  messages:
    chat:
      description: A message sent in the chat room
      payload:
        type: object
        properties:
          messageId:
            type: string
            format: uuid
            description: Unique identifier for the message
          senderId:
            type: string
            description: ID of the user sending the message
          content:
            type: string
            maxLength: 1000
            description: The message content
          timestamp:
            type: string
            format: date-time
            description: Time when the message was sent
        required:
          - messageId
          - senderId
          - content
          - timestamp
```

### Step 4 - Adding Messages to Your Channel

Now link the component message to your channel:
```yaml
channels:
  chat:
    address: /
    title: Chat channel
    messages:
      chatMessage:
        $ref: '#/components/messages/chat'
```

### Step 5 - Defining Operations

Operations specify what actions can happen in a channel. Let's create a `send` operation:
```yaml
operations:
  sendMessage:
    summary: Send a chat message
    description: Allows users to send messages to the chat room
    action: send
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/chatMessage'
```

**Important:** The messages you reference in an operation must be available in that channel's messages. If you reference a message that doesn't exist in the channel, validation will fail.

Now add a receive operation so clients can receive messages:
```yaml
operations:
  sendMessage:
    # ... send operation from above
    
  getMessage:
    summary: Receive chat messages
    description: Allows users to receive messages from the chat room
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/chatMessage'
```

### Step 6 - Reusing Messages for Multiple Operations

Let's add user join/leave notifications. First, define a new message component:
```yaml
components:
  messages:
    chat:
      # ... existing chat message
    status:
      description: User join/leave notification
      payload:
        type: object
        properties:
          userId:
            type: string
            description: ID of the user
          type:
            type: string
            enum:
              - join
              - leave
            description: Whether the user joined or left
          timestamp:
            type: string
            format: date-time
        required:
          - userId
          - type
          - timestamp
```

Add this message to your channel:
```yaml
channels:
  chat:
    address: /
    title: Chat channel
    messages:
      chatMessage:
        $ref: '#/components/messages/chat'
      userStatus:
        $ref: '#/components/messages/status'
```

Then define operations that use the same message:
```yaml
operations:
  sendMessage:
    # ... existing operations
    
  userJoin:
    summary: User join notification
    description: Notifies when a user joins the chat room
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/userStatus'
      
  userLeave:
    summary: User leave notification
    description: Notifies when a user leaves the chat room
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/userStatus'
```

Both operations reuse the same `userStatus` message, reducing redundancy.

### Step 7 - Securing Your API

AsyncAPI supports various security schemes (API Key, OAuth2, HTTP authentication, etc.). Let's add API key authentication:
```yaml
components:
  securitySchemes:
    apiKeyHeader:
      type: httpApiKey
      in: header
      name: X-API-Key
      description: API key passed in header
```

Apply the security scheme to your server:
```yaml
servers:
  development:
    host: localhost:8787
    description: Development WebSocket broker
    protocol: ws
    security:
      - $ref: '#/components/securitySchemes/apiKeyHeader'
```

The security property is an array because you can require multiple schemes, only one needs to be satisfied for authorization.

### Step 8 - Adding Protocol-Specific Bindings

Bindings let you add WebSocket-specific configuration. For example, if you want users to connect to multiple chat rooms with a single connection, use query parameters instead of creating separate connections for each room:
```yaml
channels:
  chat:
    address: /
    bindings:
      ws:
        query:
          type: object
          properties:
            roomIds:
              type: string
              description: Comma-separated list of room IDs
              pattern: ^[a-zA-Z0-9,-]+$
          additionalProperties: false
```

Now users can connect once to `/?roomIds=room1,room2,room3` and exchange messages across all rooms on a single connection.

> Notice `additionalProperties: false`, this ensures your system only accepts the `roomIds` query parameter and rejects any unexpected properties.

### Step 9 - The Complete Document

Here's your finished AsyncAPI document bringing everything together:
```yaml
asyncapi: 3.1.0
info:
  title: Simple Chat API
  version: 1.0.0
  description: A real-time chat API using WebSocket protocol

servers:
  production:
    host: chat.example.com
    protocol: ws
    description: Production server
    security:
      - $ref: '#/components/securitySchemes/apiKeyHeader'

channels:
  chat:
    address: /
    bindings:
      ws:
        query:
          type: object
          properties:
            roomIds:
              type: string
              description: Comma-separated list of room IDs
              pattern: ^[a-zA-Z0-9,-]+$
          additionalProperties: false
    
    messages:
      chatMessage:
        $ref: '#/components/messages/chat'
      userStatus:
        $ref: '#/components/messages/status'

operations:
  sendMessage:
    action: send
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/chatMessage'
    summary: Send a chat message
    description: Allows users to send messages to the chat room

  getMessage:
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/chatMessage'
    summary: Receive chat messages
    description: Allows users to receive messages from the chat room

  userJoin:
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/userStatus'
    summary: User join notification
    description: Notifies when a user joins the chat room

  userLeave:
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/userStatus'
    summary: User leave notification
    description: Notifies when a user leaves the chat room

components:
  messages:
    chat:
      description: A message sent in the chat room
      payload:
        type: object
        properties:
          messageId:
            type: string
            format: uuid
            description: Unique identifier for the message
          senderId:
            type: string
            description: ID of the user sending the message
          content:
            type: string
            maxLength: 1000
            description: The message content
          timestamp:
            type: string
            format: date-time
            description: Time when the message was sent
        required:
          - messageId
          - senderId
          - content
          - timestamp
    
    status:
      description: User join/leave notification
      payload:
        type: object
        properties:
          userId:
            type: string
            description: ID of the user
          type:
            type: string
            enum:
              - join
              - leave
          timestamp:
            type: string
            format: date-time
        required:
          - userId
          - type
          - timestamp

  securitySchemes:
    apiKeyHeader:
      type: httpApiKey
      in: header
      name: X-API-Key
      description: API key passed in header
```

### What You Can Do With This Document

With your AsyncAPI specification complete, the spec-first approach unlocks powerful capabilities:

- **Generate Documentation:** Tools like [AsyncAPI Studio](https://studio.asyncapi.com/) let you visualize and interact with your API definition in your browser. You can also generate and download markdown documentation or a deployable HTML website directly from your specification.

- **Generate Code:** The [AsyncAPI CLI](https://www.asyncapi.com/tools/cli) transforms your specification into production-ready code in multiple languages. Generate client or server implementations, data models, and more, reducing development time and inconsistencies.

- **Contract Testing:** Tools like [Microcks](https://microcks.io/) let you test and mock your API directly from your specification, ensuring your implementation matches your design before going live.

Install the [AsyncAPI CLI](https://www.asyncapi.com/tools/cli) and try generating documentation with: ```asyncapi generate fromTemplate ./asyncapi.yaml @asyncapi/html-template@3.0.0 --use-new-generator```

Or preview your specification live in [AsyncAPI Studio](https://studio.asyncapi.com/?url=https://gist.githubusercontent.com/AceTheCreator/1651bd1fa1eed947441e5828d357ac4f/raw/475484a530044d734bb847ae17048fd6b20dcad2/gistfile1.txt).

## Conclusion

Documenting your WebSocket API with AsyncAPI brings clarity and structure to API design and management. By standardizing message formats, channels, and operations, AsyncAPI simplifies building scalable, consistent, and reliable event-driven systems.

AsyncAPI's structured approach equips teams with a collaborative framework that enhances efficiency and reduces friction, making it essential in modern API development.

### References

- [Livestream](https://www.youtube.com/watch?v=22LFOLeF9Lk): Building a chat application with AsyncAPI
- [Blog post](https://www.asyncapi.com/blog/websocket-part1): WebSocket and AsyncAPI deep dive
- [AsyncAPI Slack](https://www.asyncapi.com/slack-invite/): Join the community