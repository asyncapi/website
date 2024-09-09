---
title: Functions and Lifecycle Events
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

Functions take a single argument, which is the event received from a broker or a client, depending on the type of API you're building. The `event` argument has the following structure:

|Attribute|Description|
|---------|-----------|
|payload|The payload/body of the received event.|
|headers|The headers/metadata of the received event.|
|channel|The name of the channel/topic from which the event was read.|
|serverName|The name of the server/broker from which the event was received.|

Functions may return an object to instruct Glee on what action to take next. For instance, the following example sends a greeting message to the `development` server:
```js
/* onHello.js */
export default async function (event) {
  return {
    send: [{
      server: 'development',
      channel: 'greets',
      payload: 'Greetings! How is your day going?'
    }]
  };
}
```

|Attribute|Type|Description|
|---------|----|-----------|
|send|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send after processing the inbound event. All clients subscribed to the given channel/topic will receive the message.

##### Anatomy of an Outbound Message
|Attribute|Type|Description|
|---------|----|-----------|
|payload|string|The payload/body of the message you want to send.|
|headers|object&lt;string,string&gt;|The headers/metadata of the message you want to send.|
|channel|string|The channel/topic to which you want to send the message. Defaults to `event.channel`, i.e., the same channel as the received event.|
|server|string|The server/broker to which you want to send the message. Defaults to `event.serverName`, i.e., the same server as the received event.|

## How Does Glee Determine Which Function to Execute?
Glee reads your `asyncapi.yaml` file and looks for all the `receive` actions containing an `operations` attribute field. The `operations` field serves as a mechanism to bind a specific operation to a function file. For instance, given the following AsyncAPI definition:
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

Glee allows you to bind incoming messages to functions. However, sometimes it's necessary to initiate communication proactively, not merely as a reaction to another message. Use cases can vary widely: from sending a message to announce that our client is connected, to broadcasting messages at regular intervals.

To subscribe to a lifecycle event, create a file under the `lifecycle` directory. It must be structured as follows:
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

Each file in the `lifecycle` directory must export a default async function and the `lifecycleEvent` field, indicating the [name of the event](#list-of-events) you wish to subscribe to. Optionally, your function can return an object following the same syntax as described above in the functions definition.

## List of Events

|Event|Description|
|-----|-----------|
|onConnect|A connection with a broker has been established.|
|onReconnect|Glee reconnected to a broker.|
|onDisconnect|A connection with a broker has been closed.|
|onServerReady|Your Glee server is now ready to accept connections.|
|onServerConnectionOpen|A client has opened a connection with your Glee server.|
|onServerConnectionClose|A client has closed the connection with your Glee server.|

All of them take a single argument containing information about the event:

|Attribute|Description|
|---------|-----------|
|glee|A reference to the Glee app.|
|serverName|The name of the server where the event occurred.|
|server|The AsyncAPI definition of the server where the event occurred.|
|connection|The connection where the event occurred.|

## Restricting the Lifecycle Event

In some cases, it's useful to restrict the lifecycle event to a specific server or set of servers. To do this, add a line like the following to your lifecycle file:
```js
export const servers = ['mosquitto']
```

The above example ensures Glee fires the lifecycle event only if it originates from the `mosquitto` server.

Similarly, you may want to restrict the lifecycle event to a specific channel/topic. Add a line like this to your lifecycle file:
```js
export const channels = ['user/signedup']
```

The above example ensures Glee fires the lifecycle event only if the connection includes the channel `user/signedup`.
