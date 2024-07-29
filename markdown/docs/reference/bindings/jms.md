---
title: 'jms'
weight: 17
---

# JMS Bindings

This document defines how to describe JMS-specific information on AsyncAPI.

<a name="version"></a>
## Versions

The version of this bindings specification is `0.0.1`.
This is also the `bindingVersion` for all binding objects defined by this specification.
In any given binding object, `latest` MAY alternatively be used to refer to the currently latest published version of this bindings specification.

## Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this bindings specification are to be interpreted as described in IETF [RFC2119](https://www.ietf.org/rfc/rfc2119.txt).



## Protocol

These bindings use the `jms` [protocol](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#definitionsProtocol) in AsyncAPI documents to denote connections to and interactions with JMS message brokers.

JMS is not technically a protocol, rather it is an API. A JMS Provider implements the JMS API and may define a protocol for implementing JMS API operations. Regardless, for the purposes of AsyncAPI we can treat it like a "protocol" to enable AsyncAPI definitions that are somewhat portable between various JMS Providers. If necessary, the user is free to combine this binding with other bindings that implement a JMS Provider (e.g. [Apache Pulsar](https://github.com/asyncapi/bindings/tree/master/pulsar), [Amazon SQS](https://github.com/asyncapi/bindings/tree/master/sqs), [IBM MQ](https://github.com/asyncapi/bindings/tree/master/ibmmq), etc.) to detail JMS Provider specific configuration.

**NOTE** that from protocol version 3.0, this binding is compatible with [Jakarta Messaging](https://jakarta.ee/specifications/messaging).

## Server Object

The fields of the standard [Server Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#serverObject) are constrained and interpreted as follows:

Server Object Field Name | Values for JMS Protocol | Description
---|:---|:---
<a name="serverObjectProtocolFieldValueJMS"></a>`protocol`               | `jms`                                                 | **REQUIRED**. MUST be `jms` for the scope of this specification.
<a name="serverObjectUrlFieldValueJMS"></a>`url`                         | e.g., `jms://host:port`       | **REQUIRED**. MUST be a URL containing the hostname and port of a JMS Broker.
<a name="serverObjectProtocolVersionFieldValueJMS"></a>`protocolVersion` | e.g., `3.1`                                                   | **OPTIONAL**, defaults to `3.1`. If present MUST be the version indicator of the JMS API. Valid values are `1.0`, `1.0.1`, `1.0.1a`, `1.0.2`, `1.0.2a`, `1.0.2b`, `1.1`, `2.0`, `2.0a`, `2.1`, or `3.0`, `3.1.`.


<a name="server"></a>

## Server Binding Object

The JMS [Server Binding Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#server-bindings-object) is defined by a [JSON Schema](json_schemas/server.json), which defines these fields:

Field Name | Type | Description
---|:---:|---
<a name="serverBindingObjectJMSConnectionFactory"></a>`jmsConnectionFactory` | string | **REQUIRED**. The classname of the [ConnectionFactory](https://docs.oracle.com/javaee/7/api/javax/jms/ConnectionFactory.html) implementation for the JMS Provider.
<a name="serverBindingObjectJMSProperties"></a>`properties` | [Schema Array](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaArray) | **OPTIONAL**. Additional properties to set on the JMS ConnectionFactory implementation for the JMS Provider.
<a name="serverBindingObjectJMSClientID"></a>`clientID` | string | **OPTIONAL**. A client identifier for applications that use this JMS connection factory. If the Client ID Policy is set to 'Restricted' (the default), then configuring a Client ID on the [ConnectionFactory](https://docs.oracle.com/javaee/7/api/javax/jms/ConnectionFactory.html) prevents more than one JMS client from using a connection from this factory.
<a name="serverBindingObjectBindingVersion"></a>`bindingVersion` | string | **OPTIONAL**, defaults to `latest`. The version of this binding.

### Examples

The following example shows a `servers` object with a server binding object for `jms` with JMS specific properties:

```yaml
servers:
  production:
    url: jms://my-activemq-broker:61616
    protocol: jms
    protocolVersion: '1.1'
    description: The production ActiveMQ broker accessed via JMS.
    bindings:
      jms:
        # JMS protocol specific server details
        jmsConnectionFactory: org.apache.activemq.ActiveMQConnectionFactory
        properties:
          - name: disableTimeStampsByDefault
            value: false
        clientID: my-application-1
```


<a name="channel"></a>
## Channel Binding Object

The JMS [Channel Binding Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#channel-bindings-object) is defined by a [JSON Schema](json_schemas/channel.json), which defines these fields:

Field Name | Type | Description
---|:---:|---
<a name="channelBindingObjectDestination"></a>`destination`       | string | **OPTIONAL**, defaults to the channel name. The destination (queue) name for this channel. SHOULD only be specified if the channel name differs from the actual destination name, such as when the channel name is not a valid destination name according to the JMS Provider.
<a name="channelBindingObjectDestinationType"></a>`destinationType`          | string | **OPTIONAL**, defaults to `queue`. The type of destination, which MUST be either `queue`, or `fifo-queue`. SHOULD be specified to document the messaging model (point-to-point, or strict message ordering) supported by this channel.
<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | **OPTIONAL**, defaults to `latest`. The version of this binding.

### Examples

The following example shows a `channels` object with two channels, the second having a channel binding object for `jms`:

```yaml
channels:
  user.signup:
    description: This application receives command messages from this channel about users to sign up.
    bindings:
      jms:
        destination:     user-sign-up
        destinationType: fifo-queue
        bindingVersion:  '0.0.1'
    publish:
      #...
```



<a name="operation"></a>

## Operation Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.



<a name="message"></a>

## Message Binding Object

The JMS [Message Binding Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#message-bindings-object) is defined by a [JSON Schema](json_schemas/message.json), which defines these fields:

Field Name | Type | Description
---|:---:|---
<a name="messageBindingObjectHeaders"></a>`headers`               | [Schema Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject) | **OPTIONAL**. A Schema object containing the definitions for JMS specific headers (so-called protocol headers). This schema MUST be of type `object` and have a `properties` key. Examples of JMS protocol headers are `JMSMessageID`, `JMSTimestamp`, and `JMSCorrelationID`.
<a name="messageBindingObjectBindingVersion"></a>`bindingVersion` | string | **OPTIONAL**, defaults to `latest`. The version of this binding.

Note that application headers must be specified in the [`headers` field of the standard Message Object](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#messageObjectHeaders) and are set as [Message Properties](https://docs.oracle.com/javaee/7/api/javax/jms/Message.html#Message%20Properties) of the JMS Message; how they are transmitted is defined by the JMS Provider and need not be considered here.
In contrast, protocol headers such as `JMSMessageID` must be specified in the [`headers` field of the message binding object](#messageBindingObjectHeaders) and are transmitted in the [`headers` section of the JMS message](https://docs.oracle.com/javaee/7/api/javax/jms/Message.html#Message%20Headers).

### Examples

The following example shows a `message` object with both application specific headers, and a message binding object for `jms` with JMS specific headers:

```yaml
message:
  messageId: my-message-1
  bindings:
    jms:
      headers:
        # JMS protocol specific message headers
        required:
          - JMSMessageID
      properties:
        JMSMessageID:
          name: JMSMessageID
          description: A unique message identifier. This may be set by your JMS Provider on your behalf.
          type: string
        JMSReplyTo:
          name: JMSReplyTo
          description: The queue or topic that the message sender expects replies to.
          type: string
  headers:
    # Application specific message headers
    required:
      - MyToken
      - MyOperationID
    properties:
      MyToken:
        name: MyToken
        description: Some sort of identificaton token for the publishing application.
        type: string
      MyOperationID:
        name: MyOperationID
        description: Some sort of unique identifier for the application operation to perform.
        type: string
```
