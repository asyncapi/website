---
title: "AsyncAPI & WebSocket A Match Made from Heaven?"
date: 2025-01-10T06:00:00+01:00
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



Recently, while building a collaborative drawing web application with WebSocket for one of my livestreams, I discovered just how efficient it is to document a WebSocket server using the AsyncAPI specification in a spec-first approach. But what exactly do I mean by “spec-first”? 🤔

## What Do I Mean by Spec-First?
![API spec first diagram](/img/diagrams/spec-first.webp)

The spec-first API development approach involves designing the API using an API specification _before_ implementing it. This method offers significant advantages, such as reducing the time needed to build the actual API, improving communication with stakeholders, and producing higher-quality APIs overall. But let’s save the deep dive into spec-first for another time and get back on track! 😄

## So Why WebSocket and AsyncAPI Instead of OpenAPI?

![Asyncapi-OpenAPI](/img/diagrams/asyncapi-openapi.webp)

OpenAPI isn’t ideal for my use case because it’s specifically designed for REST APIs. WebSocket, on the other hand, differs significantly from traditional HTTP. It provides a two-way communication channel over a single Transmission Control Protocol (TCP) connection, which OpenAPI doesn’t support.

In simpler terms, unlike REST APIs, where you must send a request to receive a response, maintaining a connection similar to a WebSocket would require repeatedly pinging the server at intervals (a process known as polling). WebSocket does the opposite. It keeps the connection open between server and client, allowing the server to send data to the client without waiting for a request.

So, why would I use OpenAPI for that? Now you see why AsyncAPI is the better fit. Since WebSocket enables an event-driven connection between client and server, we need an API specification that supports this kind of interaction—and that’s where AsyncAPI comes in.

Let’s explore why combining AsyncAPI with WebSocket is such a powerful approach.

## The Intersection
As I mentioned earlier, `WebSocket enables an event-driven connection between client and server`, meaning it operates asynchronously. AsyncAPI offers a standardized way to define these asynchronous APIs, making it a perfect match. This combination enhances real-time application development by ensuring consistent, reliable message formats and enabling instant, bidirectional data exchange between client and server.

Now, let’s dive deeper into this powerful intersection! 🐬

### Clear and Concise Message Format and Event Types

Defining your WebSocket API with AsyncAPI allows you to leverage AsyncAPI’s schema definitions, ensuring a structured and consistent approach to handling data exchange across WebSocket connections. This reduces misunderstandings about message formats and event types, creating a smoother, more reliable communication flow.

### Message Schema Validation

AsyncAPI allows your WebSocket API to validate real-time messages against predefined schemas at runtime, helping to catch errors early in the development stage. This approach promotes better data consistency across your application.

### Improved Architectural Planning

If, like me, you enjoy designing your API before implementation, using AsyncAPI with your WebSocket API supports an API-first approach. It enables you to thoughtfully design your API and identify message patterns early on, making it easier and faster to plan for scaling.

### Leveraging the Tooling Ecosystem
![AsyncAPI Ecosystem](/img/diagrams/ecosystem.webp)
As the industry standard for defining asynchronous APIs, AsyncAPI enables a robust ecosystem of tools, some of which is maintained by the AsyncAPI initiative. This includes capabilities like generating code in multiple languages, creating deployment-ready documentation, and setting up mock servers for development with tools like Microcks.

Now that you've seen some of the powerful things this intersection creates, let's take a look at the key concepts in AsyncAPI for our WebSocket API. 

## Key Concepts in AsyncAPI for WebSocket

If you've used WebSocket before, you’re likely familiar with the term **channel** (sometimes referred to as “topics” or “paths”), right? If not, here’s a quick overview: channels in WebSocket act as specific routes within the WebSocket connection, enabling messages to be sent and received across different sections of the connection.

For instance, if we have channels named `general` and `members`, messages can be sent and received on either of these channels independently. So, if I want to receive messages specifically from the `members` channel, I just need to listen to that channel, and I’ll get all incoming messages tagged for it. Channels help organize communication within a WebSocket, making it easy to manage different types of messages effectively.

Now let's look at what channels looks like in an AsyncAPI document. 

### Channels

The AsyncAPI channels allows us to establish a bidirectional communication between message senders and receivers.

Channels in AsyncAPI are primarily based on a simple idea, Senders send messages with different contents to be addressed to different channels, and receivers subscribe to these channels to receive these messages. But AsyncAPI channels are more than just a message highway, they are made up of a number of different elements that works together to make communication between senders and receivers smooth. Some of these components includes,

- **Address**: An optional string that specifies the channel's address. This could be a topic name, routing key, event type, or path.
- **Title**: A friendly, descriptive title for the channel.
- **Messages**: The list of message types that can be sent to this channel, ready to be received by any subscriber at any time.
- **Bindings**: A set of WebSocket-specific info that customizes the connection details.

Now that we've seen what makes up a websocket channel in AsyncAPI, let's take a look at the next key concept which is messages. 

### Messages

I mean, really—what’s the point of it all? Don’t worry, this isn’t an existential crisis! 😄

I’m talking about **data exchange**! In an event-driven system, exchanging messages is at the core of everything we’re building. AsyncAPI helps us create a structured, consistent approach to handling this exchange across WebSocket connections.

In AsyncAPI, a **message** is the key mechanism by which information flows between senders and receivers via channels. And since messages are flexible, they can support all kinds of interaction patterns such as events, commands, requests, or responses.

Just like channels, websocket messages in AsyncAPI are also made up of various elements such as:

- **Name:**  A friendly, descriptive name for the message.
- **Summary:** A short summary of what the message is about.
- **Description:** A verbose explanation of the message.
- **Payload:** The structured and verbose required properties for your message.

Now let's take a look at another key concept which is called operations

### Operations

Operations are one of my favorite parts of the AsyncAPI specification—and for good reason! They were part of the latest additions to the spec, making it possible to re-use a channel in ways that weren’t possible before.

In AsyncAPI, an **operation** defines the specific actions that can occur within a channel. Basically, it tells you if your application will be _sending_ or _receiving_ a message in that channel, making message flow clear and structured.

Operations are made up of a few important elements:

- **Action**: Using `send` or `receive` keywords, `send` indicates the app will send a message to the channel, while `receive` means the app expects to receive a message.
- **Channel**: The specific channel where the operation will happen.
- **Reply:** The definition of the reply in a request-reply operation.  
- **Title**: A friendly, descriptive name for the operation.
- **Summary**: A quick summary of what the operation is all about.
- **Description**: A more detailed explanation of the operation’s purpose.

With operations, you get more control and clarity over message flow within each channel, making AsyncAPI even more powerful for building event-driven systems!

These three concepts are integral when documenting our websocket server using AsyncAPI. 

## The Complete Breakdown

Now that we’ve seen how AsyncAPI can streamline real-time communication and simplify managing WebSocket channels, let's take a closer look at what a complete AsyncAPI document would look like for a simple chat application, using the key concepts we've outlined.

Now let's take a closer look at what a complete asyncapi document looks like for a simple chat application using some of the key concepts we've outlined above.

### Step 1 - Defining Basic Information About Our WebSocket API

First, we provide some essential information about our API, including the server details for client connections.

```yaml
asyncapi: "3.0.0"

info:
  title: A simple chat application
  version: 1.0.0
  description: A simple real-time chat API using WebSocket protocol

servers:
  development:
    host: localhost:8787
    description: Development Websocket broker.
    protocol: wss
```

### Step 2 - Defining Our WebSocket Channel

As we mentioned earlier, AsyncAPI channels enable bidirectional communication between senders and receivers. Let’s define our channel below:

```yaml
channels:
  chat:
    address: /
    title: Users channel
```

Notice we haven’t included message details yet. To keep things organized, we’ll use **components** to define reusable messages and then reference them in our channel.

### Step 3 - Creating a component

Components in AsyncAPI helps holds a set of reusable objects for different aspect of the AsyncAPI specification. When you define an object in a component, it won't have any effect on your API unless the object has been explicitly referenced from another properties outside the component object. 

Just like the rest of the key concepts i mentioned earlier, components also have a set of required elements that can be defined such as the following:

- **Messages:** An Object that holds reusable message objects
- **Channels:** An object that holds reusable channel objects
- **Operations:** An object to hold reusable operation objects
- **SecuritySchemes:** An object that holds reusable security scheme objects
- **Schemas:** and object to hold reusable schema object. 

Now, because we want our **chat** channel to not look overwhelming and difficult to read, we are going to create our message in the component object. 

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

This message structure includes required fields like `messageId`, `senderId`, `content`, and `timestamp`. Now, let’s link it to our channel.
### Step 4 - Adding Messages to Our Channel and Referencing Components

To make the `chat` message available in our channel, we’ll add it to the channel's `messages` section and reference our defined component.

```yaml
channels:
  chat:
    address: /
    title: Users channel
     messages:
       chatMessage:
         $ref: '#/components/messages/chat'
```

With our message now tied to the channel, the final step is to specify the type of operation that can be performed within this channel. This structure allows for clear, consistent message flow and easy extensibility as your API grows!

### Step 5 - Defining our chat channel Operation

The Operation part is critical to our API because it specifies what kind of action can be executed in a given channel. So now we need to create an operation for our **chat** channel and we do that by doing the following:

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

In the definition above, we created our first operation called `sendMessage` with a `send` action, that's made available in the **chat** channel.  This basically means we've just enabled connected client to `send` a message, but not any kind of message, but the `chatMessage` to the **chat** channel.

If I attempt to parse a message that isn't included in the list of messages for the **chat** channel, as shown below...

```yaml
operations:
  sendMessage:
    summary: Send a chat message
    description: Allows users to send messages to the chat room
    action: send
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/hello'
```

This will fail because in my **chat** channel, I have no such message as `hello` even if i have the `hello` message defined in my message component. 

A good thing to keep at the back of your mind when defining an operation is the list of messages you're assigning to an operation has to be available in the linked channel messages. 


Now that we've created our first operation that allows us to send message, we also need to create another operation that allows us to receive a message. And we do that by doing almost same thing as sending a message except, instead of `send` in the action, we use the `receive` action, just as seen below.

```yaml
operations:
  sendMessage:
    summary: Receive a chat message
    description: Allows users to receive messages to the chat room
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/chatMessage'
```

With this implementation, we have a fully functional AsyncAPI document, but want to go a few more steps

### Step 6 - Reusing an Existing Message Component

Let’s say we want our server to notify users whenever someone joins or leaves the chat. How would we approach this?

First, we define the new message in our components section. This message will hold information about the user joining or leaving.

```yaml
components:
  messages:
   chat:
     ...
   status:
     payload:
       type: object
       properties:
         userId:
           type: string
           description: ID of the user that joined or left
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
     
```
Here, we’ve created a new `status` message to capture details about users joining or leaving.

Next, let’s add this message to our channel, so our server can broadcast it as needed:

```yaml
channels:
  chat:
    address: /
    title: Users channel
    messages:
      chatMessage:
        $ref: '#/components/messages/chat'
      userStatus:  # newly added channel message
        $ref: '#/components/messages/status'
```

Finally, we need to define two operations within our channel: one for notifying when a user joins (`userJoin`) and another for when they leave (`userLeave`). Here’s how:

```yaml
operations:
  sendMessage:
    ...
  userJoin:
    summary: User join notification
    description: Notifies when a new user joins the chat room
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

In this setup, both `userJoin` and `userLeave` operations use the same `userStatus` message structure, saving time and reducing redundancy!

### Step 7 - Adding Authentication to Our API

Securing our API is critical, and AsyncAPI supports defining security schemes to specify the authentication methods needed to connect.

Leveraging the AsyncAPI SecurityScheme allows you to define any or many of the available types of `securityscheme`object available such as `API key` `HTTP authentication` `HTTP API Key`, `OAuth2`, and e.t.c. 

Let's see how to declare a security scheme for our websocket server using the `HTT API Key scheme`. 

To secure our WebSocket server, let’s define an API key scheme in our components:

```yaml
components:
  messages:
  ....
  securitySchemes:
    apiKeyHeader:
      type: httpApiKey
      in: header
      name: X-API-Key
      description: API key passed in header
  
```

Here, `apiKeyHeader` is our security scheme, specifying that the key should be included in the header under the name `X-API-Key`.

Now, let’s associate this security scheme with our WebSocket server so it requires authorization:

```yaml
servers:
  development:
    host: localhost:8787
    description: Development Websocket broker.
    protocol: ws
    security: # newly added line
      - $ref: '#/components/securitySchemes/apiKeyHeader' 
```

As you can see we added a security property to the development server, and one thing you can notice is i'm specifying it as an array because you can pass multiple security types in the security object, and only one of this security scheme needs to be satisfied to authorize a connection. But in our case, we only needed one so yea, let's role with that. 

### Step 8 - Providing Protocol-Specific Information

Remember when we discussed bindings in the **Channel** section? These bindings allow us to add WebSocket-specific details to customize the connection.

For instance, if we want to allow users to connect to multiple rooms simultaneously and send messages to any of them, we need an efficient approach than the traditional method. Typically, a channel with a parameter like `/{roomId}` would be created. However, this approach has a major drawback such that for every room a user is trying to join, a new connection is going to be established, which doesn't align well with our use case. Instead, we can leverage channel bindings.

Since bindings are protocol-specific, we can tailor the implementation to WebSocket. Instead of relying on parameters, we’ll extend our **chat** channel by including `roomIds` as a query parameter, as shown below:

```yaml
chat:
  address: /
  bindings:
    ws:
      query:
        type: object
        properties:
          roomIds:
            type: string
            descritpion: The unique identifier of the chat room
            pattern: ^[a-zA-Z0-9-]+$
        additionalProperties: false
```

By adding these bindings, users can establish a connection once to the `/` address and use the same connection to join multiple rooms by simply including the list of rooms in the `roomIds` query parameter, which would look like this `/?roomIds=room1,room2,room3`. This approach allows a single connection to be used across various chat rooms, making it ideal for exchanging messages in multiple channels simultaneously.


### Step 9 - Bringing Everything together

We've finally written a complete asyncapi document for our chat application and this is what it looks like...

```yaml
asyncapi: 3.0.0
info:
  title: Simple Chat API
  version: 1.0.0
  description: A simple real-time chat API using WebSocket protocol

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
              description: The unique identifier of the chat room
              pattern: ^[a-zA-Z0-9-]+$
          additionalProperties: false
    
    messages:
      chatMessage:
        $ref: '#/components/messages/chat'
        
      userJoin:
        description: Event when a user joins the chat room
        $ref: '#/components/messages/status'
        
      userLeave:
        description: Event when a user leaves the chat room
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
      - $ref: '#/channels/chat/messages/userJoin'
    summary: User join notification
    description: Notifies when a new user joins the chat room

  userLeave:
    action: receive
    channel:
      $ref: '#/channels/chat'
    messages:
      - $ref: '#/channels/chat/messages/userLeave'
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
      payload:
        type: object
        properties:
          userId:
            type: string
            description: ID of the user status[join/leave]
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

And since we followed the spec-first approach, we can do a lot of interesting thing with this document, such as:

- **Generate Documentation:** Using our asyncapi document above, we can automatically generate rich, interactive documentation to make understanding and using our API easy for anyone. With tools like [**AsyncAPI Studio**](https://studio.asyncapi.com/), you can visualize and interact with our API, view channel information, messages, and operations, all without leaving the browser.
- **Code Generation:** Using the **[AsyncAPI CLI](https://www.asyncapi.com/tools/cli)** we can generate powerful code in any language, enabling us to transform our AsyncAPI document directly into production-ready code. This means we can generate client or server code and models, while speeding up the development process and reducing the risk of inconsistencies.
- **API Contract Testing:** Using our AsyncAPI document, we can perform some contract testing that ensures that our system remains aligned with its design, preventing unexpected behavior. With tools like [**Microcks**](https://microcks.io/), we can test and mock our API based on our AsyncAPI specification, so we're sure our API behaves as expected, even before it’s fully implemented.

After using the AsyncAPI CLI to generate an HTML template with the following command: `asyncapi generate fromTemplate ./asyncapi.yaml @asyncapi/html-template@3.0.0 --use-new-generator`, we get a fully functional production-ready website for our API documentation. This generated site provides a visually appealing and interactive way to explore our AsyncAPI definition, as shown in the screenshot below. 

![AsyncAPI preview screenshot](/img/posts/simple-chat-api.webp)

Additionally, with the help of AsyncAPI Studio, you can easily preview your AsyncAPI document in a user-friendly interface. Simply click on this [URL](https://studio.asyncapi.com/?url=https://gist.githubusercontent.com/AceTheCreator/1651bd1fa1eed947441e5828d357ac4f/raw/475484a530044d734bb847ae17048fd6b20dcad2/gistfile1.txt) to explore the document live. This makes it even more convenient to review and refine your API definition in real-time!


Putting everything we've learnt together, we have our AsyncAPI document ready to go!

## Conclusion

Documenting your WebSocket API with AsyncAPI brings clarity and structure to designing and managing your APIs. By standardized message formats, channels, and operations, AsyncAPI simplifies the process of building scalable, consistent, and reliable APIs. 

AsyncAPI's structured approach equips teams with a collaborative framework that enhances efficiency and reduces development friction, making it a cornerstone in modern API design.

### References

- For a detailed walkthrough, refer to my [livestream](https://www.youtube.com/watch?v=22LFOLeF9Lk) on building a chat application from scratch using the AsyncAPI specification. 
- Dive deeper with this [blog post](https://www.asyncapi.com/blog/websocket-part1) on using WebSocket with AsyncAPI.
- Join the conversation and connect with the AsyncAPI community in our [Slack workspace](https://www.asyncapi.com/slack-invite/).