---
title: 'mqtt'
weight: 20
---

# MQTT Bindings

This document defines how to describe MQTT-specific information on AsyncAPI.

It applies to all versions of MQTT, although specific binding fields may only apply to particular versions.

<a name="version"></a>

## Version

Current version is `0.2.0`.




<a name="server"></a>

## Server Binding Object

This object contains information about the server representation in MQTT.

##### Fixed Fields

Field Name | Type | MQTT Versions | Description
---|:---:|:---:|---|
<a name="serverBindingObjectClientId"></a>`clientId` | string | 3, 5 | The client identifier.
<a name="serverBindingObjectCleanSession"></a>`cleanSession` | boolean | 3, 5 | Whether to create a persistent connection or not. When `false`, the connection will be persistent. This is called **clean start** in MQTTv5.
<a name="serverBindingObjectLastWill"></a>`lastWill` | object | 3, 5 | Last Will and Testament configuration. `topic`, `qos`, `message` and `retain` are properties of this object as shown below.
<a name="serverBindingObjectLastWillTopic"></a>`lastWill.topic` | string | 3, 5 | The topic where the Last Will and Testament message will be sent.
<a name="serverBindingObjectLastWillQoS"></a>`lastWill.qos` | integer | 3, 5 | Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.
<a name="serverBindingObjectLastWillMessage"></a>`lastWill.message` | string | 3, 5 | Last Will message.
<a name="serverBindingObjectLastWillRetain"></a>`lastWill.retain` | boolean | 3, 5 | Whether the broker should retain the Last Will and Testament message or not.
<a name="serverBindingObjectKeepAlive"></a>`keepAlive` | integer | 3, 5 | Interval in seconds of the longest period of time the broker and the client can endure without sending a message.
<a name="serverBindingObjectSessionExpiryInterval"></a>`sessionExpiryInterval` | integer \| [Schema Object][schemaObject] \| [Reference Object][referenceObject] | 5 | Interval in seconds or a *Schema Object* containing the definition of the interval.  The broker maintains a session for a disconnected client until this interval expires.
<a name="serverBindingObjectMaximumPacketSize"></a>`maximumPacketSize` | integer \| [Schema Object][schemaObject] \| [Reference Object][referenceObject] | 5 | Number of bytes or a *Schema Object* representing the maximum packet size the client is willing to accept.
<a name="serverBindingObjectBindingVersion"></a>`bindingVersion` | string | | The version of this binding. If omitted, "latest" MUST be assumed. |

This object MUST contain only the properties defined above.

##### Examples

```yaml
servers:
  production:
    bindings:
      mqtt:
        clientId: guest
        cleanSession: true
        lastWill:
          topic: /last-wills
          qos: 2
          message: Guest gone offline.
          retain: false
        keepAlive: 60
        sessionExpiryInterval: 600
        maximumPacketSize: 1200
        bindingVersion: 0.2.0
```
```yaml
servers:
  production:
    bindings:
      mqtt:
        sessionExpiryInterval:
          type: integer
          minimum: 30
          maximum: 1200
        maximumPacketSize:
          type: integer
          minimum: 256
        bindingVersion: 0.2.0
```

<a name="channel"></a>

## Channel Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="operation"></a>

## Operation Binding Object

This object contains information about the operation representation in MQTT.

##### Fixed Fields

Field Name | Type | Applies To | MQTT Versions | Description
---|:---:|:---:|:---:|---
<a name="operationBindingObjectQoS"></a>`qos` | integer | Publish, Subscribe | 3, 5 | Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).
<a name="operationBindingObjectRetain"></a>`retain` | boolean | Publish | 3, 5 | Whether the broker should retain the message or not.
<a name="operationBindingObjectMessageExpiryInterval"></a>`messageExpiryInterval`  | integer \| [Schema Object][schemaObject] \| [Reference Object][referenceObject]| Publish | 5 | Interval in seconds or a *Schema Object* containing the definition of the lifetime of the message. 
<a name="operationBindingObjectBindingVersion"></a>`bindingVersion` | string |  | |  The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

##### Examples

```yaml
channels:
  user/signup:
    publish:
      bindings:
        mqtt:
          qos: 2
          retain: true
          messageExpiryInterval: 60
          bindingVersion: 0.2.0
```
```yaml
channels:
  user/signup:
    publish:
      bindings:
        mqtt:
          messageExpiryInterval:
            type: integer
            minimum: 30
            maximum: 300
          bindingVersion: 0.2.0
```
```yaml
channels:
  user/signup:
    subscribe:
      bindings:
        mqtt:
          qos: 2
          bindingVersion: 0.2.0
```

<a name="message"></a>

## Message Binding Object

This object contains information about the message representation in MQTT.

##### Fixed Fields

Field Name | Type | MQTT Versions | Description
---|:---:|:---:|---
<a name="messageBindingObjectPayloadFormatIndicator"></a>`payloadFormatIndicator` | integer | 5 | Either: **0** (zero): Indicates that the payload is unspecified bytes, or **1**: Indicates that the payload is UTF-8 encoded character data. |
<a name="messageBindingObjectCorrelationData"></a>`correlationData` | [Schema Object][schemaObject] \| [Reference Object][referenceObject] | 5 | Correlation Data is used by the sender of the request message to identify which request the response message is for when it is received.
<a name="messageBindingObjectContentType"></a>`contentType` | string | 5 | String describing the content type of the message payload. This should not conflict with the `contentType` field of the associated AsyncAPI Message object.
<a name="messageBindingObjectResponseTopic"></a>`responseTopic` | URI string \| [Schema Object][schemaObject] \| [Reference Object][referenceObject] | 5 | The topic (channel URI) for a response message.
<a name="messageBindingObjectBindingVersion"></a>`bindingVersion` | string | | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

##### Examples

```yaml
channels:
  user/signup:
    subscribe:
      message:
        bindings:
          mqtt:
            contentType: "application/json"
            correlationData:
              type: string
              format: uuid
            bindingVersion: 0.2.0
```
```yaml
channels:
  userSignup:
    address: user/signup
    messages:
      userSignup:
        bindings:
          mqtt:
            payloadFormatIndicator: 1
            contentType: "application/json"
            correlationData:
              type: string
              format: uuid
            responseTopic:
              type: string
              pattern: "response/client/([a-z1-9]+)"
            bindingVersion: 0.2.0
```

[schemaObject]: https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject
[referenceObject]: https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#referenceObject

