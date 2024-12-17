---
type: Engineering
title: "The journey of documenting a Socket.IO API (Pt 2)"
date: 2021-11-04T10:00:00+01:00
cover: /img/posts/socketio-part2/cover.webp
tags:
   - Specification
   - Socket.IO
   - Protocol
   - Asynction
authors:
   - name: Dimitrios Dedoussis
     photo: /img/avatars/dedoussis.webp
     link: https://twitter.com/dedoussis
     byline: Senior Software Engineer at Babylon & Maintainer of Asynction
---

> This post originally appeared on [https://dedouss.is](https://dedouss.is/posts/2021-07-14-documenting-socketio-part-2.html)

In [the opening part of this series](/blog/socketio-part1) we outlined the basics of [Socket.IO](https://socket.io) and discussed the importance of documenting Socket.IO APIs. Now it’s time to bring [AsyncAPI](https://www.asyncapi.com/) into play.

In this post we’re going to cover:

- [A modelling exercise, in which Socket.IO semantics are mapped to AsyncAPI structures](#modelling-the-socketio-protocol-using-asyncapi)
- [A tutorial involving the creation of an AsyncAPI specification given an existing Socket.IO API](#in-practice)
- [Asynction, a Socket.IO server framework driven by the AsyncAPI specification](#asynction)

## Modelling the Socket.IO protocol using AsyncAPI

Don’t let the title of this section intimidate you. This modelling exercise ended up being relatively straightforward and I think it makes a great example of how AsyncAPI was designed to fit any event-driven protocol. If you are not interested in the thought process behind this exercise, you may jump straight to the [Summary](#summary) paragraph of this section, which presents the solution.

I will approach this problem by traversing the AsyncAPI object structure, attempting to map each of the objects to a semantic of the Socket.IO client API.

The root object of the specification is the [AsyncAPI Object](https://www.asyncapi.com/docs/specifications/v2.2.0#A2SObject). The fields of this object that require special attention are **channels** and **servers**.

### Channels

The [Channels Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelsObject) is a map structure that relates a channel path (relative URI) to a [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject).

```yaml
channels:
  /: {} # Channel Item Object
  /admin: {} # Channel Item Object
```

Channels are addressable components where messages/events flow through. The specification suggests that a server may support multiple channel instances enabling an application to separate its concerns. This sounds very much like the definition of the Socket.IO [namespace](https://socket.io/docs/v4/namespaces/index.html). Namespaces are indeed addressable components that follow the relative URI convention. Since Socket.IO supports multiplexing, a client may emit messages to multiple namespaces over a single shared connection. However, it could also force a separate connection per namespace (using the [`forceNew` option](https://socket.io/docs/v4/client-initialization/#forceNew)). Thus, a Socket.IO namespace could either be a virtual or physical channel.

Given that connections are established on the namespace level, the [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject) is the only object of the specification that MAY include **bindings**. For a Socket.IO API, the [Channel Bindings Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelBindingsObject) should only contain the **ws** field, in which one can specify the handshake context (HTTP headers and query params) that a client should provide when connecting to that particular channel/namespace.

```yaml
channels:
  /:
    publish: {} # Operation object - Ignore this for now
    subscribe: {} # Operation object - Ignore this for now
    bindings:
      ws:
        query:
          type: object
          properties:
            token:
              type: string
          required: [token]
```

Since a single connection (and thus binding) is going to be used across multiple channels, there is no need to repeat the same **bindings** object under each channel/namespace. We can introduce the convention of always including bindings under the main (`/`) namespace but omitting them under the custom ones. At this point I would also like to propose the following bonus semantic: If a custom namespace includes bindings, then the client should always [force a new connection](https://socket.io/docs/v4/client-initialization/#forceNew) when connecting to it.

You have probably noticed that I chose to stick to the [WebSockets Channel Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#channel-binding-object) as the only possible binding that a Socket.IO API may define. One could ask why not use an [HTTP Channel Binding](https://github.com/asyncapi/bindings/blob/master/http/README.md#channel) object alongside the WebSockets one, since the protocol could also be implemented via HTTP long-polling. There are 2 answers to this question:

1. The current latest version of the [AsyncAPI bindings specifications](https://github.com/asyncapi/bindings) does not allow HTTP bindings to be defined at the channel level.
1. The HTTP long-polling implementation of Socket.IO is essentially a pseudo WebSocket. It is implemented in such a way to resemble the WebSocket implementation. The same HTTP headers and query params are sent to the server no matter the transport mechanism.

Hence, it is safe to use the ws bindings even for the HTTP long-polling fallback. However, in an ideal world, we would have AsyncAPI supporting SocketIO bindings through an explicit **socketio** field. In fact, I have created [a github issue](https://github.com/asyncapi/bindings/issues/74) to pitch this proposal.

Along with **bindings**, the [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject) includes the **publish** and **subscribe** fields, in which one defines the operations that a namespace supports. The **publish** [Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject) lists all the possible events that the client may emit (`socket.emit`), while the **subscribe** operation defines the events that the client may listen to (`socket.on`).

A Socket.IO event can be expressed using the [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject), where the **name** field describes the **eventName** and the **payload** field describes the schema of the **args** that the client passes as part of the **socket.emit** invocation: `socket.emit(eventName[, …args][, ack])`. For **subscribe** events, **payload** defines the structure of the arguments that the event handler callback expects: `socket.on(eventName, (...args) => {})`.

The structure of the payload value depends on the number of arguments expected:

<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Sender-side code</th>
      <th>Payload value structure</th>
      <th>AsyncAPI Message Object</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>No args expected</td>
      <td><inlineCode>{`socket.emit("hello")`}</inlineCode></td>
      <td>n/a — Payload field should be omitted</td>
      <td><CodeBlock showLineNumbers={false}>{`name: hello`}</CodeBlock></td>
    </tr>
    <tr>
      <td>Single arg expected</td>
      <td><inlineCode>{`socket.emit("hello", {foo: “bar”})`}</inlineCode></td>
      <td>Any <a href="https://json-schema.org/understanding-json-schema/reference/type.html">type</a> other than <a href="https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation">tuple</a></td>
      <td>
        <CodeBlock showLineNumbers={false}>{`name: hello
payload:
  type: object
  properties:
    foo:
      type: string`}
        </CodeBlock>
      </td>
    </tr>
    <tr>
      <td>Multiple args expected</td>
      <td><inlineCode>{`socket.emit("hello", {foo: “bar”}, 1)`}</inlineCode></td>
      <td><a href="https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation">Tuple type</a></td>
      <td>
        <CodeBlock showLineNumbers={false}>{`name: hello
payload:
  type: array
  prefixItems:
  - type: object
      properties:
        foo:
          type: string
  - type: number`}
        </CodeBlock>
      </td>
    </tr>
  </tbody>
</table>

To account for multiple events ([Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject)s) per namespace, the **message** field of each [Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject) allows the **oneOf** array structure. For example, in the message of the publish operation of the `/admin` namespace, the **oneOf** array lists all the available **eventName** and **args** payload pairs that a client can pass to the `adminNamespace.emit` call:

```yaml
channels:
  /admin:
    publish:
      message:
        oneOf:
          - $ref: "#/components/messages/MessageOne"
          - $ref: "#/components/messages/MessageTwo"
```

Now, let’s move on to the acknowledgement semantics of the protocol: The basic unit of information in the Socket.IO protocol is the packet. There are 7 distinct [packet types](https://github.com/socketio/socket.io-protocol#packet-types). The payloads of the publish and subscribe Message Objects described above correspond to the `EVENT` and `BINARY_EVENT` packet types. These are essentially the packets that are transmitted when the Socket.IO sender invokes the **emit** API function of the Socket.IO library (regardless of implementation). In turn, the Socket.IO event receiver handles the received event using the **on** API function of the Socket.IO library. As part of the **on** handler, the receiver may choose to return an acknowledgement of the received message. This acknowledgement is conveyed back to the sender via the `ACK` and `BINARY_ACK` packet types. The ack data is passed as input to the callback that the message sender has provided through the **emit** invocation.

<Figure
  className="text-center"
  widthClass="w-7/12"
  src="/img/posts/socketio-part2/socketio-ack-sequence-diagram.webp"
  caption="Socket.IO ack sequence diagram"
/>

In order to express the above semantics, the Message Object (eventName and args payload pair) should be linked to an optional acknowledgement object. Since the specification in its current form does not support such a structure, I am proposing the following [Specification Extension](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions):

- [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject)s MAY include the `x-ack` field. The value of this field SHOULD be a [Message Ack Object](#message-ack-object).
- [Components Object](https://www.asyncapi.com/docs/specifications/v2.2.0#componentsObject) MAY include the `x-messageAcks` field. The value of this field should be of type: `Map[string, Message Ack Object | Reference Object]`.

#### Message Ack Object

| Field Name | Type                                                                              | Description                                                                                                                                                            |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args       | [Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject) | Schema of the arguments that are passed as input to the acknowledgement callback function. In the case of multiple arguments, use the array type to express the tuple. |

In the case of a **publish** message, the `x-ack` field informs the client that it should expect an acknowledgement from the server, and that this acknowledgement should adhere to the agreed schema. Likewise, for **subscribe** messages the `x-ack` field encourages the client to send a structured acknowledgement, for each message it receives.

### Servers

The [Servers Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serversObject) is – surprise surprise – a map of Server Objects. Each [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject) contains a **url** field from which the client may infer the custom path to the Socket.IO server. This custom path should then be provided via the **path** option upon the [initialisation of the Socket.IO connection manager](https://socket.io/docs/v4/client-api/#io-url-options), alongside the **url** arg. The **protocol** field of the [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject) is also required, and specifies the scheme part of that **url** arg. Its value should equal any of the **ws**, **wss**, **http** or **https** protocols. For a Socket.IO client, it does not really matter whether the scheme is http or ws, due to the upgrade mechanism. Thus, for Socket.IO APIs, the only purpose of the **protocol** field is to indicate the use (or absence) of SSL.

### Summary

We made it to the end of the modelling exercise the outcome of which is the following table, relating Socket.IO semantics to AsyncAPI structures.

| Socket.IO                                                                                                                                                                   | AsyncAPI                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Namespace](https://socket.io/docs/v4/namespaces/index.html)                                                                                                                | [Channel](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsChannel) (described through the [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject))                                                                                                                                                                                   |
| [IO options](https://www.google.com/url?q=https://socket.io/docs/v4/client-api/%23io-url-options&sa=D&source=editors&ust=1626260158636000&usg=AOvVaw3Jm-RtRjuNphtaCN-54p4L) | [WebSockets Channel Binding](https://github.com/asyncapi/bindings/blob/master/websockets/README.md#channel-binding-object)                                                                                                                                                                                                                                                               |
| `namespaceSocket.emit(eventName[, …args][, ack])`                                                                                                                           | [Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject) defined under the **publish** field of a [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject). The available **eventName** & **args** pairs for this **emit** invocation are listed under the **message** field, through the **oneOf** array structure.              |
| `namespaceSocket.on(eventName, callback)`                                                                                                                                   | [Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject) defined under the **subscribe** field of a [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.2.0#channelItemObject). The available **eventName** & **callback** argument pairs for this **on** invocation are listed under the **message** field, through the **oneOf** array structure. |
| Event                                                                                                                                                                       | [Message](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsMessage) (described through the [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject))                                                                                                                                                                                            |
| **eventName**                                                                                                                                                                 | The **name** field of the [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject))                                                                                                                                                                                                                                                                             |
| Event **args**                                                                                                                                                                | The **payload** field of the [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject)                                                                                                                                                                                                                                                                           |
| **ack**                                                                                                                                                                       | The `x-ack` field of the [Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject). Requires an [extension of the specification](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions). The field may be populated for both **publish** and **subscribe** messages.                                                                         |
| Custom path (**path** option)                                                                                                                                                 | The **url** field of the [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject)                                                                                                                                                                                                                                                                                 |
| Use of TLS (regardless of transport mechanism)                                                                                                                              | The **protocol** field of the [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject)                                                                                                                                                                                                                                                                            |

## In practice

With the modelling exercise out of the way, I’m now going to guide you through the process of creating an AsyncAPI spec from scratch given an existing Socket.IO API. For the purposes of this simple tutorial, let’s use [this minimal chat application](https://socket.io/demos/chat/), which is one of the get-started demos featured in the Socket.IO website.

Below is the source of our Socket.IO server:

```javascript
// Setup basic express server
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Chatroom
let numUsers = 0;

io.on("connection", (socket) => {
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data,
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", (username, cb) => {
    if (addedUser) {
      cb({ error: "User is already added" });
      return;
    }

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers,
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
    });
    cb({ error: null });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username,
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username,
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers,
      });
    }
  });
});

// Admin

io.of("/admin").on("connection", (socket) => {
  let token = socket.handshake.query.token;
  if (token !== "admin") socket.disconnect();

  socket.emit("server metric", {
    name: "CPU_COUNT",
    value: require("os").cpus().length,
  });
});
```

I’ve slightly tweaked the original source located at [https://github.com/socketio/socket.io/tree/master/examples/chat](https://github.com/socketio/socket.io/tree/master/examples/chat) to include acknowledgments and bindings, so that I can showcase the full spectrum of the AsyncAPI specification.

Let’s start by defining the version of the specification as well as the info object which provides metadata about the service:

```yaml
asyncapi: 2.2.0

info:
  title: Socket.IO chat service
  version: 1.0.0
  description: |
    This is one of the get-started demos listed in the socket.io website: https://socket.io/demos/chat/
```

Moving on to the servers section, where one should provide connectivity information for all the instances of their service. In the case of our simple chat application, there is only one demo server accessible at [socketio-chat-h9jt.herokuapp.com](https://socketio-chat-h9jt.herokuapp.com/):

```yaml
servers:
  demo:
    url: socketio-chat-h9jt.herokuapp.com/socket.io
    protocol: wss
```

Things get a bit more interesting when it comes to channels. Skimming through the server code we find 2 namespace instances (default and /admin), which means that the channel mapping should consist of 2 entries:

```yaml
channels:
  /: {}
  /admin: {}
```

Within each namespace connection block, there are multiple `socket.on`, and `socket.emit` references. For each unique reference, we need to append a Message Object under the publish and subscribe operations respectively:

```yaml
channels:
  /:
    publish:
      message:
        oneOf:
          - $ref: "#/components/messages/NewMessage"
          - $ref: "#/components/messages/Typing"
          - $ref: "#/components/messages/StopTyping"
          - $ref: "#/components/messages/AddUser"
    subscribe:
      message:
        oneOf:
          - $ref: "#/components/messages/NewMessageReceived"
          - $ref: "#/components/messages/UserTyping"
          - $ref: "#/components/messages/UserStopTyping"
          - $ref: "#/components/messages/UserJoined"
          - $ref: "#/components/messages/UserLeft"
          - $ref: "#/components/messages/LogIn"
  /admin:
    subscribe:
      message: # No need to use `oneOf` since there is only a single event
        $ref: "#/components/messages/ServerMetric"
```

From the server code, we can also see that the connection handler of the admin namespace applies some very sophisticated authorization based on the `token` query parameter. The spec should hence document that the API requires the presence of a valid token query param upon the handshake:

```yaml
channels:
  /:
    publish:
      # ...
    subscribe:
      # ...
  /admin:
    subscribe:
      # ...
    bindings:
      $ref: "#/components/channelBindings/AuthenticatedWsBindings"
```

Putting everything together into a single document:

```yaml
asyncapi: 2.2.0

info:
  title: Socket.IO chat demo service
  version: 1.0.0
  description: |
    This is one of the get-started demos presented in the socket.io website: https://socket.io/demos/chat/

servers:
  demo:
    url: socketio-chat-h9jt.herokuapp.com/socket.io
    protocol: wss

channels:
  /:
    publish:
      message:
        oneOf:
          - $ref: "#/components/messages/NewMessage"
          - $ref: "#/components/messages/Typing"
          - $ref: "#/components/messages/StopTyping"
          - $ref: "#/components/messages/AddUser"
    subscribe:
      message:
        oneOf:
          - $ref: "#/components/messages/NewMessageReceived"
          - $ref: "#/components/messages/UserTyping"
          - $ref: "#/components/messages/UserStopTyping"
          - $ref: "#/components/messages/UserJoined"
          - $ref: "#/components/messages/UserLeft"
          - $ref: "#/components/messages/LogIn"
  /admin:
    subscribe:
      message: # No need to use `oneOf` since there is only a single event
        $ref: "#/components/messages/ServerMetric"
    bindings:
      $ref: "#/components/channelBindings/AuthenticatedWsBindings"

components:
  messages:
    NewMessage:
      name: new message
      payload:
        type: string
    Typing:
      name: typing
    StopTyping:
      name: stop typing
    AddUser:
      name: add user
      payload:
        type: string
      x-ack: # Documents that this event is always acknowledged by the receiver
        args:
          type: object
          properties:
            error:
              type: [string, "null"]
    NewMessageReceived:
      name: new message
      payload:
        type: object
        properties:
          username:
            type: string
          message:
            type: string
    UserTyping:
      name: typing
      payload:
        type: object
        properties:
          username:
            type: string
    UserStopTyping:
      name: stop typing
      payload:
        type: object
        properties:
          username:
            type: string
    UserJoined:
      name: user joined
      payload:
        type: object
        properties:
          username:
            type: string
          numUsers:
            type: integer
    UserLeft:
      name: user left
      payload:
        type: object
        properties:
          username:
            type: string
          numUsers:
            type: integer
    LogIn:
      name: login
      payload:
        type: object
        properties:
          numUsers:
            type: integer
    ServerMetric:
      name: server metric
      payload:
        type: object
        properties:
          name:
            type: string
          value:
            type: number

  channelBindings:
    AuthenticatedWsBindings:
      ws:
        query:
          type: object
          properties:
            token:
              type: string
          required: [token]
```

The modified server source code is pushed at [https://github.com/dedoussis/asyncapi-socket.io-example](https://github.com/dedoussis/asyncapi-socket.io-example), along with the above AsyncAPI spec, which can be viewed using the [AsyncAPI playground](https://playground.asyncapi.io/?url=https://raw.githubusercontent.com/dedoussis/asyncapi-socket.io-example/main/asyncapi.yaml).

Note that there is no point in documenting the [reserved events](https://socket.io/docs/v4/emit-cheatsheet/#Reserved-events) since all Socket.IO APIs support these by default.

## Asynction

In parallel to this exercise I have been developing [Asynction](https://github.com/dedoussis/asynction), a Socket.IO python framework that is driven by the AsyncAPI specification. Asynction is built on top of Flask-Socket.IO and inspired by Connexion. It guarantees that your API will work in accordance with its documentation. In essence, Asynction is to AsyncAPI and Flask-SocketIO, what Connexion is to OpenAPI and Flask.

In [this example](https://github.com/dedoussis/asynction/tree/main/example), I forked the minimal chat application that we documented above and re-implemented the server in python, using Asynction. Be mindful of the `x-handler` and `x-handlers` extensions that have been introduced to relate AsyncAPI entities (such as message or channel objects) to python callables (event handlers).

You may find extensive documentation of Asynction at: [https://asynction.dedouss.is](https://asynction.dedouss.is)

The framework is still at a beta stage, so please get in touch before using it in a production setup.

Any piece of feedback would be much appreciated.

## The end

For any questions, comments, or corrections, feel free to reach out to me at [dimitrios@dedouss.is](mailto:dimitrios@dedouss.is).

_A special shout out to [derberq](https://twitter.com/derberq), [quetzalliwrites](https://x.com/quetzalliwrites), and the wider AsyncAPI community for being particularly helpful and responsive._ 🙇

> Photo by <a href="https://unsplash.com/photos/A4iL43vunlY">Matt Howard</a> on <a href="https://unsplash.com/photos/A4iL43vunlY">Unsplash</a>
