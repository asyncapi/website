---
title: 'ibmmq'
weight: 16
---

# IBM MQ Bindings

This document defines how to describe IBM MQ specific information with AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.1.0`.

## Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this bindings specification are to be interpreted as described in IETF [RFC2119](https://www.ietf.org/rfc/rfc2119.txt).

## AsyncAPI considerations

This specification binding requests that the AsyncAPI specification reserve the IBM MQ protocol to allow connections to queue manager endpoints to be defined within the server object.

AsyncAPI Object Fixed Field Name | Reserved Value for IBM MQ Protocol | Description
---|:---|:---
<a name="serverObjectProtocolFieldValueIbmmq"></a>`server.protocol` | ibmmq | IBM MQ protocol.
<a name="serverObjectProtocolFieldValueIbmmqSecure"></a>`server.protocol` | ibmmq-secure | IBM MQ protocol over TLS.

## URI scheme considerations

For the purposes of establishing an IBM MQ binding for use within AsyncAPI, this document defines the URI scheme `ibmmq://` consisting of components and generic URI syntax as specified in [RFC3986](https://tools.ietf.org/html/rfc3986)

### Defining an IBM MQ queue manager endpoint in the server object `url` field

When defining an IBM MQ `url` for a queue manager endpoint, the `ibmmq://` URI scheme MUST be used. IBM MQ URIs are defined using the following components.

URI Component | IBM MQ reference | Applicability | Description |
---|:---|:--|:--
<a name="uriObjectScheme"></a>`scheme` | `ibmmq://` | REQUIRED | The URI scheme used to represent an IBM MQ endpoint. 
<a name="uriObjectAuthority>"></a>`authority` | `<hostname or ipAddress>:port` | REQUIRED | The network IP address or hostname and port of the queue manager endpoint. |
<a name="uriObjectQueueManager>"></a>`path` | `queueManager` | OPTIONAL | The queue manager name. If no queue manager name is specified this segment is left undefined, for example `ibmmq://hostname:{port}//CHANNEL.NAME`
<a name="uriObjectChannelName>"></a>`path` | `mqChannelName` | REQUIRED | The `SVRCONN` channel to use for communication with an IBM MQ queue manager. When connecting to a queue manager, IBM MQ partitions this communication into logical channels.

URI `query` or `fragment` components MUST NOT be used within the `ibmmq://` scheme. Path components that contain characters reserved by RFC2936 such as `/` MUST be percent encoded as defined in [Section 2.2 of RFC2936](https://tools.ietf.org/html/rfc3986#section-2.2). `port` MUST be specified as part of the authority component in the `ibmmq://` scheme.


### Defining IBM MQ queue manager endpoints with the AsyncAPI Server Object

This section defines the convention for how IBM MQ queue manager endpoints are encoded within the AsyncAPI Server Object fields. A `groupId` field has been made available on the IBM MQ AsyncAPI server binding object to allow server objects to be defined as a related collection. This is necessary to group, or cluster, IBM MQ queue manager endpoints within the AsyncAPI specification and where a Client Channel Definition Table ([CCDT](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.con.doc/q132905_.html)) reference is not appropriate.
     
       
##### Example of two possible MQ servers defined using ibmmq url syntax 
```yaml
servers:
  production1:
    url: ibmmq://qmgr1host:1414/qm1/DEV.APP.SVRCONN
    protocol: ibmmq
  production2:
    url: ibmmq://qmgr2host:1414/qm2/DEV.APP.SVRCONN
    protocol: ibmmq
```

##### Example of single MQ server defined using ibmmq url syntax and with no queue manager name specified
```yaml
servers:
  production:
    url: ibmmq://qmgr1host:1414//DEV.APP.SVRCONN
    protocol: ibmmq
```

## Defining an IBM MQ queue manager endpoint CCDT in the `url` field
When defining a connection to IBM MQ, a CCDT connection file can be specified. The server url will specify the location of the file with additional information contained within the server binding to specify its usage. 

##### Example using an IBM MQ CCDT file url 

```yaml
servers:
  production1:
    url: 'http://my-ccdt-json-file'
    protocol: ibmmq
  production2:
    url: 'file://myccdt.json'
    protocol: ibmmq
```   

<a name="server"></a>

## Server Binding Object

This object contains server connection information about the IBM MQ server, referred to as an IBM MQ queue manager. This object contains additional connectivity information not possible to represent within the core AsyncAPI specification.

##### Fixed Fields


Field Name | Type | Description | Applicability \[default\] | Constraints
---|:---:|---|:---|:---
<a name="serverObjectGroupId>"></a>`groupId` | string | Defines a logical group of IBM MQ server objects. This is necessary to specify multi-endpoint configurations used in high availability deployments. If omitted, the server object is not part of a group. | OPTIONAL | MUST NOT be specified for URI Scheme `http://` or `file://`
<a name="serverObjectCCDTQueueManager"></a>`ccdtQueueManagerName` | string | The name of the IBM MQ queue manager to bind to in the CCDT file. | OPTIONAL [`*`] | MUST NOT be specified for URI Scheme `ibmmq://`
<a name="serverObjectCipherSpec"></a>`cipherSpec` | string | The recommended cipher specification used to establish a TLS connection between the client and the IBM MQ queue manager. More information on SSL/TLS cipher specifications supported by IBM MQ can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.dev.doc/q113220_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`ANY`] | MUST NOT be specified for protocol `ibmmq` or URI Scheme `file://` or `http://` 
<a name="serverObjectMultiEndpointServer:"></a>`multiEndpointServer` | boolean | If `multiEndpointServer` is `true` then multiple connections can be workload balanced and applications should not make assumptions as to where messages are processed. Where message ordering, or affinity to specific message resources is necessary, a single endpoint (`multiEndpointServer` = `false`) may be required. | OPTIONAL [`false`] | MUST NOT be specified for URI Scheme `file://` or `http://`
<a name="serverObjectEndpointHeartBeatInterval"></a>`heartBeatInterval` | integer | The recommended value (in seconds) for the heartbeat sent to the queue manager during periods of inactivity. A value of zero means that no heart beats are sent. A value of `1` means that the client will use the value defined by the queue manager. More information on heart beat interval can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q108450_.html) in the IBM MQ Knowledge Center. | OPTIONAL [`300`] | MUST be `0-999999`
<a name="serverBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -

This object MUST contain only the properties defined above.

##### Example for multiple endpoints defined in the AsyncAPI configuration

```yaml
servers:
  production1:
    url: ibmmq://qmgr1host:1414/qm1/DEV.APP.SVRCONN
    protocol: ibmmq-secure
    description: Production Instance 1
    bindings:
      ibmmq: 
        groupId: PRODCLSTR1
        cipherSpec: ANY_TLS12_OR_HIGHER
        bindingVersion: 0.1.0
  production2:
    url: ibmmq://qmgr2host:1414/qm2/DEV.APP.SVRCONN
    protocol: ibmmq-secure
    description: Production Instance 2
    bindings:
      ibmmq: 
        groupId: PRODCLSTR1
        bindingVersion: 0.1.0
```

##### Example using combined strategy 

```yaml
servers:
  production:
    url: 'http://my-ccdt-json-file'
    protocol: ibmmq-secure
    description: Production MQ Instance 
    bindings:
      ibmmq:
        ccdtQueueManagerName: qm1
  test:
    url: ibmmq://qmgrtest:1414/qm2/DEV.APP.SVRCONN
    protocol: ibmmq-secure
    description: Test MQ Instance
    bindings:
      ibmmq: 
        cipherSpec: ANY_TLS12_OR_HIGHER
        bindingVersion: 0.1.0
```



<a name="channel"></a>

## Channel Binding Object

This object contains information about the channel representation in IBM MQ. Each channel corresponds to a Queue or Topic within IBM MQ. 

##### Fixed Fields

Field Name | Type | Description | Applicability [default] | Constraints
---|:---:|---|:---|:---
<a name="channelBindingObjectDestinationType"></a>`destinationType` | string | Defines the type of AsyncAPI channel.  | OPTIONAL [`topic`] | MUST be either `topic` or `queue`. For type `topic`, the AsyncAPI channel name MUST be assumed for the IBM MQ topic string unless overridden.
<a name="channelBindingObjectQueue"></a>`queue` | Map[string, any] | Defines the properties of a queue. | REQUIRED if `destinationType` = `queue` | `queue` and `topic` fields MUST NOT coexist within a channel binding
<a name="channelBindingObjectQueueObjectName"></a>`queue.`<br>`objectName`</br> | string | Defines the name of the IBM MQ queue associated with the channel. | REQUIRED | A value MUST be specified. MUST NOT exceed 48 characters in length. MUST be a valid IBM MQ queue name
<a name="channelBindingObjectisPartitioned"></a>`queue.`<br>`isPartitioned`</br> | boolean | Defines if the queue is a cluster queue and therefore partitioned. If `true`, a binding option MAY be specified when accessing the queue. More information on binding options can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q101870_.html#q101870___BIND_ON_OPEN) in the IBM MQ Knowledge Center. | OPTIONAL [`false`] | If `false`, binding options SHOULD NOT be specified when accessing the queue.
<a name="channelBindingObjectQueueExclusive"></a>`queue.`<br>`exclusive`</br> | boolean | Specifies if it is recommended to open the queue exclusively. | OPTIONAL [`false`] | - 
<a name="channelBindingObjectTopic"></a>`topic` | Map[string, any] | Defines the properties of a topic. | OPTIONAL if `destinationType` = `topic` | `queue` and `topic` fields MUST NOT coexist within a channel binding.
<a name="channelBindingObjectTopicString"></a>`topic.`<br>`string`</br>  | string | The value of the IBM MQ topic string to be used. | OPTIONAL *<br>Note: if specified, SHALL override AsyncAPI channel name.</br>* | MUST NOT exceed 10240 characters in length. MAY coexist with `topic.objectName`
<a name="channelBindingObjectTopicObjectName"></a>`topic.`<br>`objectName`</br>  | string | The name of the IBM MQ topic object. | OPTIONAL *<br>Note: if specified, SHALL override AsyncAPI channel name.</br>*| MUST NOT exceed 48 characters in length. MAY coexist with `topic.string`
<a name="channelBindingObjectTopicDurablePermitted"></a>`topic.`<br> `durablePermitted`</br> | boolean | Defines if the subscription may be durable. | OPTIONAL [`true`] | -
<a name="channelBindingObjectTopicLastMsgRetained"></a>`topic.`<br>`lastMsgRetained`</br> | boolean | Defines if the last message published will be made available to new subscriptions. | OPTIONAL [`false`] | -
<a name="channelBindingObjectMaxMsgLength"></a>`maxMsgLength` | integer | The maximum length of the physical message (in bytes) accepted by the Topic or Queue. Messages produced that are greater in size than this value may fail to be delivered. More information on the maximum message length can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.adm.doc/q085520_.html#q085520___maxmsgl) in the IBM MQ Knowledge Center. | OPTIONAL [negotiated on IBM MQ channel]| MUST be  `0-104,857,600` bytes (100 MB).
<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | -


This object MUST contain only the properties defined above.

##### Example for an IBM MQ Topic where topic string is defined by AsyncAPI channel

```yaml
channels:
  user/signedup:
```

##### Example for AsyncAPI channel mapping to an IBM MQ topic with a specified MQ Topic object

```yaml
channels:
  user/signedup:
    bindings:
      ibmmq:
        destinationType: topic
        topic:
          objectName: myTopicName
        bindingVersion: 0.1.0
```

##### Example for AsyncAPI channel mapping to an IBM MQ Queue

```yaml
channels:
  user/signedup:
    bindings:
      ibmmq:
        destinationType: queue
        queue:
          objectName: myQueueName
          exclusive: true
        bindingVersion: 0.1.0
```



<a name="operation"></a>

## Operation Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.



<a name="message"></a>

## Message Binding Object

This object contains information about the message representation in IBM MQ.

##### Fixed Fields

Field Name | Type  | Description | Applicability [default] | Constraints
---|:---:|---|:---|:---
<a name="messageBindingObjectType"></a>`type` | string |  The type of the message. | OPTIONAL [`string`] | MUST be either `string`, `jms` or `binary`
<a name="messageBindingObjectHeaders"></a>`headers` | string | Defines the IBM MQ message headers to include with this message. More than one header can be specified as a comma separated list. Supporting information on IBM MQ message formats can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097520_.html) in the IBM MQ Knowledge Center. | OPTIONAL if `type` = `binary` | `headers` MUST NOT be specified if `type` = `string` or `jms`
<a name="messageBindingObjectDescription"></a>`description` | string<sup>1</sup> | Provides additional information for application developers: describes the message type or format. | OPTIONAL | - 
<a name="messageBindingObjectExpiry"></a>`expiry` |  integer | The recommended setting the client should use for the TTL (Time-To-Live) of the message. This is a period of time expressed in milliseconds and set by the application that puts the message. `expiry` values are API dependant e.g., MQI and JMS use different units of time and default values for *`unlimited`*. General information on IBM MQ message expiry can be found on this [page](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q097490_.html) in the IBM MQ Knowledge Center. | OPTIONAL [*`unlimited`*] | `expiry` value MUST be either `zero` (*`unlimited`*) or greater than zero. 
<a name="messageBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`] | - 

This object MUST contain only the properties defined above.

### Rich Text Formatting

<sup>1</sup> The `description` field of the IBM MQ message binding object MAY include CommonMark markdown formatting. A minimum markdown syntax as described by [CommonMark 0.27](https://spec.commonmark.org/0.27/) is assumed. 

##### Example for plain text message

```yaml
channels:
  user/signup:
    publish:
      message:
        bindings:
          ibmmq:
            type: string
            bindingVersion: 0.1.0
```

##### Example for IBM MQ message using JMS

```yaml
channels:
  user/signup:
    publish:
      message:
        bindings:
          ibmmq:
            type: jms
            description: JMS stream message
            bindingVersion: 0.1.0
```

# AsyncAPI example with IBM MQ binding

##### Example for AsyncAPI user signup

```yaml
asyncapi: 2.0.0
info:
  title: Account Service
  version: 1.0.0
  description: This service is in charge of processing user signups
servers:
  production1:
    url: ibmmq://qmgr1host:1414/qm1/DEV.APP.SVRCONN
    protocol: ibmmq-secure
    description: Production Instance 1
    bindings:
      ibmmq: 
        groupId: PRODCLSTR1
        cipherSpec: ANY_TLS12_OR_HIGHER
        bindingVersion: 0.1.0
  production2:
    url: ibmmq://qmgr2host:1414/qm2/DEV.APP.SVRCONN
    protocol: ibmmq-secure
    description: Production Instance 2
    bindings:
      ibmmq: 
        groupId: PRODCLSTR1
        cipherSpec: ANY_TLS12_OR_HIGHER
        bindingVersion: 0.1.0
channels:
  user/signedup:
    bindings:
      ibmmq:
        topic:
          durablePermitted: true
        bindingVersion: 0.1.0
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedUp'
        bindings:
          ibmmq:
            type: jms
            description: JMS bytes message
            bindingVersion: 0.1.0
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
```