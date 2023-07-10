---
title: Home
weight: 159
---

By defining and connecting to servers in AsyncAPI, you can effectively describe the communication infrastructure of your event-driven system and ensure seamless message exchange between different components.

## Define the server

Define the servers in your AsyncAPI specification file. The servers section is used to describe the servers that your API connects to. Here's an example of how to define a server in AsyncAPI:
servers:

```yaml
url: mqtt://test.mosquitto.org
protocol: mqtt
description: Test MQTT server
```

In this example, we define a server with the URL mqtt://test.mosquitto.org, using the MQTT protocol, and provide a description for the server.

## Define server reference

Add the server reference to your channels or components in the AsyncAPI specification. You can specify the server for each channel or component by using the x-server extension field.

Here's an example of how to add a server reference to a channel:

```yaml
channels:
myChannel:
publish:
x-server: mqttServer
message:
$ref: '#/components/messages/myMessage'
```

In this example, we specify the server reference mqttServer for the myChannel channel.

Repeat the above steps for each server you want to connect to in your AsyncAPI specification.
Once you have defined and added the servers in your AsyncAPI specification, you can use tools like code generators or frameworks that support AsyncAPI to generate client or server code based on your specification.
