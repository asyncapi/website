---
title: 'amqp'
weight: 11
---

# AMQP 0-9-1 Bindings

This document defines how to describe AMQP-specific information on AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.3.0`.


<a name="server"></a>

## Server Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.




<a name="channel"></a>

## Channel Binding Object

This object contains information about the channel representation in AMQP.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="channelBindingObjectIs"></a>`is` | string | Defines what type of channel is it. Can be either `queue` or `routingKey` (default).
<a name="channelBindingObjectExchange"></a>`exchange` | Map[string, any] | When `is`=`routingKey`, this object defines the exchange properties.
<a name="channelBindingObjectExchangeName"></a>`exchange.name` | string | The name of the exchange. It MUST NOT exceed 255 characters long.
<a name="channelBindingObjectExchangeType"></a>`exchange.type` | string | The type of the exchange. Can be either `topic`, `direct`, `fanout`, `default` or `headers`.
<a name="channelBindingObjectExchangeDurable"></a>`exchange.durable` | boolean | Whether the exchange should survive broker restarts or not.
<a name="channelBindingObjectExchangeAutoDelete"></a>`exchange.autoDelete` | boolean | Whether the exchange should be deleted when the last queue is unbound from it.
<a name="channelBindingObjectExchangeVHost"></a>`exchange.vhost` | string | The virtual host of the exchange. Defaults to `/`.
<a name="channelBindingObjectQueue"></a>`queue` | Map[string, any] | When `is`=`queue`, this object defines the queue properties.
<a name="channelBindingObjectQueueName"></a>`queue.name` | string | The name of the queue. It MUST NOT exceed 255 characters long.
<a name="channelBindingObjectQueueDurable"></a>`queue.durable` | boolean | Whether the queue should survive broker restarts or not.
<a name="channelBindingObjectQueueExclusive"></a>`queue.exclusive` | boolean | Whether the queue should be used only by one connection or not.
<a name="channelBindingObjectAutoDelete"></a>`queue.autoDelete` | boolean | Whether the queue should be deleted when the last consumer unsubscribes.
<a name="channelBindingObjectQueueVHost"></a>`queue.vhost` | string | The virtual host of the queue. Defaults to `/`.
<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

##### Example

```yaml
channels:
  userSignup:
    address: 'user/signup'
    bindings:
      amqp:
        is: routingKey
        exchange:
          name: myExchange
          type: topic
          durable: true
          autoDelete: false
          vhost: /
        bindingVersion: 0.3.0
```

```yaml
channels:
  userSignup:
    address: 'user/signup'
    bindings:
      amqp:
        is: queue
        queue:
          name: my-queue-name
          durable: true
          exclusive: true
          autoDelete: false
          vhost: /
        bindingVersion: 0.3.0
```

<a name="operation"></a>

## Operation Binding Object

This object contains information about the operation representation in AMQP.

##### Fixed Fields

Field Name | Type | Applies To Action | Description
---|:---:|:---:|---
<a name="operationBindingObjectExpiration"></a>`expiration` | integer | `receive`, `send` | TTL (Time-To-Live) for the message. It MUST be greater than or equal to zero.
<a name="operationBindingObjectUserId"></a>`userId` | string | `receive`, `send` | Identifies the user who has sent the message.
<a name="operationBindingObjectCC"></a>`cc` | [string] | `receive`, `send` | The routing keys the message should be routed to at the time of publishing.
<a name="operationBindingObjectPriority"></a>`priority` | integer | `receive`, `send` | A priority for the message.
<a name="operationBindingObjectDeliveryMode"></a>`deliveryMode` | integer | `receive`, `send` | Delivery mode of the message. Its value MUST be either 1 (transient) or 2 (persistent).
<a name="operationBindingObjectMandatory"></a>`mandatory` | boolean | `receive` | Whether the message is mandatory or not.
<a name="operationBindingObjectBCC"></a>`bcc` | [string] | `receive` | Like [cc](#operationBindingObjectCC) but consumers will not receive this information.
<a name="operationBindingObjectTimestamp"></a>`timestamp` | boolean | `receive`, `send` | Whether the message should include a timestamp or not.
<a name="operationBindingObjectAck"></a>`ack` | boolean | Subscribe | Whether the consumer should ack the message or not.
<a name="operationBindingObjectBindingVersion"></a>`bindingVersion` | string | `receive`, `send` | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

##### Example

```yaml
operations:
  userSignup:
    channel: 
      $ref: '#/channels/userSignup'
    bindings:
      amqp:
        expiration: 100000
        userId: guest
        cc: ['user.logs']
        priority: 10
        deliveryMode: 2
        mandatory: false
        bcc: ['external.audit']
        timestamp: true
        ack: false
        bindingVersion: 0.3.0
```


<a name="message"></a>

## Message Binding Object

This object contains information about the message representation in AMQP.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="messageBindingObjectContentEncoding"></a>`contentEncoding` | string | A MIME encoding for the message content.
<a name="messageBindingObjectMessageType"></a>`messageType` | string | Application-specific message type.
<a name="messageBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

```yaml
channels:
  userSignup:
    address: 'user/signup'
    messages:
      userSignupMessage:
        bindings:
          amqp:
            contentEncoding: gzip
            messageType: 'user.signup'
            bindingVersion: 0.3.0
```
