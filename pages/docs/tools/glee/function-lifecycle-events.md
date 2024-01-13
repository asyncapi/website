---
title: Function and Lifecycle events
weight: 40
---

# Functions

Glee relies on functions to execute your business logic. Functions are files that export a default async Node.js function:
```js
/* onHello.js */
export default async function (event) {
  // Your business logic here...
}
```

Functions take a single argument, which is the event received from a broker or a client, depending which kind of API you're building. The `event` argument has the following shape:

|Attribute|Description|
|----|----|
|payload|The payload/body of the received event.
|headers|The headers/metadata of the received event.
|channel|The name of the channel/topic from which the event was read.
|serverName|The name of the server/broker from which the event was received.

Functions may return an object to tell Glee what to do next. For instance, the following example greets the user back:
```js
/* onHello.js */
export default async function (event) {
  return {
    reply: [{
      payload: 'Greetings! How is your day going?'
    }]
  }
}
```

|Attribute|Type|Description|
|---|---|---|
|send|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send when the processing of the inbound event has finished. All clients subscribed to the given channel/topic will receive the message.
|reply|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send as a reply when the processing of the inbound event has finished. This is useful when the target of your message is the sender of the inbound event. Note, however, that this only works when you're running Glee as a server. For example, using `reply` when receiving a WebSocket message is fine and the reply will exclusively go to the client that sent the message. However, if you're receiving a message from an MQTT broker, `reply` will work exactly the same way as `send` above, and will send the message to all the clients subscribed to the given channel/topic.
##### Anatomy of an outbound message
|Attribute|Type|Description|
|---|---|---|
|payload|string|The payload/body of the message you want to send.
|headers|object&lt;string,string&gt;|The headers/metadata of the message you want to send.
|channel|string|The channel/topic you want to send the message to. Defaults to `event.channel`, i.e., the same channel as the received event.
|server|string|The server/broker you want to send the message to. Defaults to `event.serverName`, i.e., the same server as the received event.
## How does Glee know which function it should execute?
Glee reads your `asyncapi.yaml` file and searches for all the `receive` actions containing an `operations` attribute field. The `operations` field serves as a mechanism to bind a given operation to a specific function file. For instance, given the folowing AsyncAPI definition:
```yaml
...
operations:
  onHello: # operation ID
    action: receive
    channel:
      $ref: '#/channels/hello'
      ...
```

Glee maps the `onHello` operation to the `functions/onHello.js` file.

# Lifecycle Events

Glee lets you bind incoming messages to functions. However, sometimes we need to be proactive and be the first ones to send a message, not necessarily as a reaction to another message. Use cases can be very diverse: from sending a message to announce our client is connected to sending a message every few seconds or minutes.

To subscribe to a lifecycle event, create a file under the `lifecycle` directory. It must have the following shape:
```js
export default async function ({
  glee,
  serverName,
  server,
  connection,
}) {
  // Your business logic here...
}

export const lifecycleEvent = 'onConnect'
```

Each file in the `lifecycle` directory must export a default async function and the `lifecycleEvent` field, which is the [name of the event](#list-of-events) you want to subscribe to. Optionally, your function can return an object following exactly the same syntax as described above in the functions definition.

## List of events

|Event|Description|
|---|---|
|onConnect|A connection with a broker has been established.
|onReconnect|Glee reconnected to a broker.
|onDisconnect|A connection with a broker has been closed.
|onServerReady|Your Glee server is now ready to accept connections.
|onServerConnectionOpen|A client has opened a connection with your Glee server.
|onServerConnectionClose|A client has closed the connection with your Glee server.

All of them take a single argument which contains information about the event:

|Attribute|Description
|---|---|
|glee|A reference to the Glee app.
|serverName|The name of the server where the event happened.
|server|The AsyncAPI definition of the server where the event happened.
|connection|The connection where the event happened.

## Restricting the lifecycle event

In some cases it's useful to restrict the lifecycle event to a specific server or set of servers. To do that, add a line like the following to your lifecycle file:
```js
export const servers = ['mosquitto']
```

The above example makes Glee fire the lifecycle event only if it's coming from the `mosquitto` server.

Additionally, you may want to restrict the lifecycle event by channel/topic. To do that, add a line like the following to your lifecycle file:
```js
export const channels = ['user/signedup']
```

The above example makes Glee fire the lifecycle event only if the connection has the channel `user/signedup` listed as one of its channels.
Glee maps the `onHello` operation to the `functions/onHello.js` file.
