---
title: 'sqs'
weight: 27
---

# SQS Bindings

This document defines how to describe SQS-specific information on AsyncAPI.

SQS can be used both stand-alone as a point-to-point and paired with SNS and as a publish-subscribe channel (where SQS is the endpoint that SNS delivers messages to). For this reason we define a Queue schema, and reference that schema from both a Channel Binding Object and a **publish** Operation Binding Object. 

For point-to-point scenarios, use the Channel Binding Object, as producers send to the queue and consumers receive from it directly.

For publish-subscribe scenarios, use as a **publish** Operation Binding Object, as the producer sends to SNS and the consumer receives via SQS.

<a name="version"></a>

## Version

Current version is `0.2.0`.

<a name="server"></a>

## Server Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="channel"></a>

## Channel Binding Object 

Use the Channel Binding Operation for Point-to-Point SQS channels.

There are three likely scenarios for use of the Channel Binding Object:

- One file defines both publish and subscribe operations, for example if we were implementing the work queue pattern to offload work from an HTTP API endpoint to a worker process. In this case the channel would be defined on the Channel Object in that single file. 
- The producer and consumer both have an AsyncAPI specification file, and the producer is raising an event, for example interop between microservices, and the producer 'owns' the channel definition and thus has the SQS Binding on its Channel Object. 
- The producer and consumer both have an AsyncAPI specification file, and the consumer receives commands, for example interop between microservices, and the consumer 'owns' the channel  definition and thus has the SQS Binding on its Channel Object. 

An SQS queue can set up a Dead Letter Queue as part of a Redelivery Policy. To support this requirement, the Channel Binding Object allows you to define both a Queue Object to use as the Channel or target in a *publish* Operation and a Dead Letter Queue. You can then refer to the Dead letter Queue in the Redrive Policy using the Identifier Object and setting the *name* field to match the *name* field of your Dead Letter Queue Object. (If you define the DLQ externally, the Identifier also supports an ARN). 

### Fields
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingObjectQueue"></a>`queue` | [Queue](#queue)| **Required.** A definition of the queue that will be used as the channel. |
| <a name="channelBindingObjectDLQ"></a>`deadLetterQueue` | [Queue](#queue)| **Optional.** A definition of the queue that will be used for un-processable messages. |
|<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.|

### Schemas

#### Queue
|Field Name | Type | Description|
|---|:---:|---|
| <a name="queueObjectName"></a>`name` | string | **Required.** The name of the queue. When an [SNS Operation Binding Object]() references an SQS queue by name, the identifier should be the one in this field.|
| <a name="fifoQueue"></a>`fifoQueue` | boolean | **Required.**  Is this a FIFO queue? |
| <a name="deduplicationScope"></a>`deduplicationScope` | string | **Optional.**  Specifies whether message deduplication occurs at the message group or queue level. Valid values are `messageGroup` and `queue`. **This property applies only to high throughput for FIFO queues.** |
| <a name="fifoThroughputLimit"></a>`fifoThroughputLimit` | string | **Optional.**  Specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are `perQueue` and `perMessageGroupId`. **The `perMessageGroupId` value is allowed only when the value for DeduplicationScope is `messageGroup`. Setting both these values as such will enable high throughput on a FIFO queue. As above, this property applies only to high throughput for FIFO queues.** |
| <a name="queueObjectDeliveryDelay"></a>`deliveryDelay` | integer | **Optional.** The number of seconds to delay before a message sent to the queue can be received. Used to create a *delay queue*. Range is 0 to 15 minutes. Defaults to 0. |
| <a name="queueObjectVisbilityTimeout"></a>`visibilityTimeout` |integer| **Optional.** The length of time, in seconds, that a consumer locks a message - hiding it from reads - before it is unlocked and can be read again. Range from 0 to 12 hours (43200 seconds). Defaults to 30 seconds. |
| <a name="queueObjectRecieveMessageWaitTime"></a>`receiveMessageWaitTime` |integer| **Optional.** Determines if the queue uses [short polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) or [long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html). Set to zero (the default) the queue reads available messages and returns immediately. Set to a non-zero integer, long polling waits the specified number of seconds for messages to arrive before returning.  |
| <a name="queueObjectMessageRetentionPeriod"></a>`messageRetentionPeriod` |integer| **Optional.** How long to retain a message on the queue in seconds, unless deleted. The range is 60 (1 minute) to 1,209,600 (14 days). The default is 345,600 (4 days). |
| <a name="queueObjectRedrivePolicy"></a>`redrivePolicy` | [Redrive Policy](#redrive-policy) | **Optional.** Prevent poison pill messages by moving un-processable messages to an SQS dead letter queue.|
| <a name="queueObjectPolicy"></a>`policy` |[Policy](#policy) | **Optional.** The security policy for the SQS Queue | 
| <a name="queueObjectTags"></a>`tags` |Object | **Optional.** Key-value pairs that represent AWS tags on the queue. |

#### Identifier
|Field Name | Type | Description|
|---|:---:|---|
|<a name="identifierObjectArn"></a>`arn` |string| **Optional.** The target is an [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). For example, for SQS, the identifier may be an ARN, which will be of the form: ["arn:aws:sqs:{region}:{account-id}:{queueName}"](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)|
|<a name="identifierObjectName"></a>`name` |string| **Optional.** The endpoint is identified by a name, which corresponds to an identifying field called 'name' of a binding for that protocol on this **publish** Operation Object. For example, if the protocol is 'sqs' then the name refers to the name field **sqs** binding|

#### Policy
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingPolicyObjectPolicyStatements"></a>`Statements` | [Statement](#statement) | **Required.** An array of Statement objects, each of which controls a permission for this queue. |

#### Redrive Policy
|Field Name | Type | Description|
|---|:---:|---|
| <a name="redrivePolicyObjectDeadLetterQueue"></a>`deadLetterQueue` |[Identifier](#identifier)| The SQS queue to use as a dead letter queue (DLQ) |
| <a name="redrivePolicyObjectMaxReceiveCount"></a>`maxReceiveCount` |integer| **Optional.** The number of times a message is delivered to the source queue before being moved to the dead-letter queue. Default is 10. | 

#### Statement
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingPolicyStatementObjectEffect"></a>`effect` | string |**Required.** Either "Allow" or "Deny"|
| <a name="channelBindingPolicyStatementObjectPrincipal"></a>`principal` | string or array of string |**Required.** The AWS account or resource ARN that this statement applies to|
| <a name="channelBindingPolicyStatementObjectAction"></a>`action` | string or array of string |**Required.** The SQS permission being allowed or denied e.g. sqs:ReceiveMessage |


<a name="operation"></a>

## Operation Binding Object

### SQS Point-To-Point

Because we have defined Queue as part of the Channel Binding Binding object, we do not require Binding information for the **publish** Operation Object of the **subscribe** Operation Object. You can use an empty Queue object ({}) to denote the Binding on the Operation Object, if you want to indicate the protocol used to send or receive for generation purposes such as Infrastructure As Code.

### SNS to SQS Pub-Sub

Use the Operation Binding Object when SQS is listening to an SNS Topic. In this case we need to define both an SQS Operation Binding Objects on the receiver **publish** Operation Object to represent the queue definition and we need to define an SNS Operation Binding Object to define the Subscription to SNS that makes your queue a receiver of that endpoint.

Assuming you have separate AsyncAPI specifications for the producer and the consumer, we would assume the following bindings would appear for an SNS producer and an SQS consumer.

Producer: SNS Channel Binding Object, SNS **subscribe** Operation Binding Object [if required]
Consumer: SNS **publish** Operation Binding Object, SQS **publish** Operation Binding Object

- We assume that the SNS binding information only needs to be present in the producer file (although defining it in both is allowable) and any infrastructure as code dependencies can recognize this.


On an Operation Binding Object we support an array of Queue objects. Members of this array may be Queue Objects that define the *endpoint* field required by an [SNS Operation Object]() delivering by the SQS protocol or Queue Objects that define the Dead Letter Queue used by either the Redrive Policy of the SNS Subscription (see the SNS Binding Object) or the [Redrive Policy of the SQS Queue](#redrive-policy). The name of the Queue Object is used by an Identifier field on either the *endpoint* field of the SNS Operation Object of *deadLetterQueue* on the Redrive Policy to identify the required member of this array.
 

### Fields
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingObjectQueue"></a>`queues` | [[Queue](#queue)]| **Required.** Queue objects that are either the *endpoint* for an SNS Operation Binding Object, or the *deadLetterQueue* of the SQS Operation Binding Object |
|<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.|

### Examples

#### SQS Point-To-Point

[<img src="/img/docs/SQS-Point-To-Point.png" height = "400" width="600"/>](SQS-Point-To-Point.png)

In this example, we are using SQS for a point-to-point channel. For this example, we assume that we are defining two microservices that communicate over a shared SQS channel, with the consumer receiving events over that channel and the producer owning the channel definition.

The producer file would look like this:

```yaml
channels:
  user-signedup:
    bindings:
      sqs:
        queue:
          name: user-signedup-queue
          fifoQueue: false
          receiveMessageWaitTime: 4
          redrivePolicy:
            deadLetterQueue:
              name: user-signedup-dlq
          policy:
            statements: 
            - effect : Allow
              principal: *
              action: Sqs:SendMessage
            - effect : Allow
              principal: *
              action: Sqs:ReceiveMessage
        deadLetterQueue: 
          name: user-signedup-dlq 
          messageRetentionPeriod: 1209600 
	        fifoQueue: false
    subscribe:
      operationId: sendMessage
      description: sends messages when a user has signed up
      bindings:
        sqs: {}

```
In this case we can minimize duplicated information by omitting the binding in our specification, and assume it is picked up from the producer file. We can use an empty object to indicate the SQS Binding on the **publish** Operation Object, if need a marker for generation, otherwise we could omit the Operation Binding Object.

```yaml
channels:
  user-signedup:
   publish:
      operationId: receiveMessage
      description: receives a messages when a user has signed up
      bindings:
        sqs: {}

```

#### SNS to SQS Pub-Sub

[<img src="/img/docs/SNS-SQS-Pub-Sub.png" height = "400" width="600"/>](SNS-SQS-Pub-Sub.png)

In this example, we are using SNS for the channel, and SQS to receive from SNS. 


The producer files looks like this (see the [SNS Binding]() for more).

```yaml
channels:
  user-signedup:
    description:  A user has signed up for our service
    binding :
      sns: {}     # Indicates that the channel is an SNS Topic
    subscribe:
      operationId: sendMessage
      description: send messages to the topic
      bindings:
        sns:
          policy:
            statements: 
            - effect : Allow
              principal: *
              action: SNS:Publish
```

And the consumer file would look like this. Note that for simplicity, we choose not to repeat the SNS Binding on the Consumer as it does not 'own' the channel.


```yaml
channels:
  user-signedup:
    description:  A user has signed up for our service
    publish:
      operationId: receiveMessage
      description: receive messages from the topic
      bindings:
        sns:
          consumers:
          - protocol: sqs
            endpoint:
            name: user-signedup-queue
            rawMessageDelivery: true  
            filterPolicy:
              attributes:
                reason: 
                  anything-but: password-reset
            redrivePolicy:
              deadLetterQueue:
              name: user-signedup-queue-dlq
        sqs:
          queues:
          - name: user-signedup-queue
            fifoQueue: false
            receiveMessageWaitTime: 4
            policy:
              statements: 
              - effect : Allow
                principal: *
                action: Sqs:SendMessage
              - effect : Allow
                principal: *
                action: Sqs:ReceiveMessage 
          - name: user-signedup-dlq 
            messageRetentionPeriod: 1209600 
            fifoQueue: false
```

<a name="message"></a>

## Message Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.
