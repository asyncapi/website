---
title: 'sns'
weight: 25
---

# SNS Bindings

This document defines how to describe SNS-specific information on AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.1.0`.


<a name="server"></a>

## Server Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="channel"></a>

## Channel Binding Object

This object contains information about the channel representation in SNS.

We represent an AsyncAPI Channel with a Topic in SNS. The bindings here allow definition of a topic within SNS. We provide properties on the binding that allow creation of a topic in infrastructure-as-code scenarios. Be aware that although the binding offers that flexibility, it may be more maintainable to specify properties such as SNS Access Control Policy outside of AsyncAPI.

SNS supports many optional properties. To mark a channel as SNS, but use default values for the channel properties, just use an empty object {}. 

### Fields

|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingObjectName"></a>`name` | string | **Required.** The name of the topic. Can be different from the channel name to allow flexibility around AWS resource naming limitations.|
| <a name="channelBindingObjectFifo"></a>`ordering` | [ordering](#ordering)| **Optional.** By default, we assume an unordered SNS topic. This field allows configuration of a FIFO SNS Topic.  |
| <a name="channelBindingObjectPolicy"></a>`policy` |[policy](#policy) | **Optional.** The security policy for the SNS Topic |
| <a name="channelBindingObjectTags"></a>`tags` |Object | **Optional.** Key-value pairs that represent AWS tags on the topic. |
|<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string | **Optional**, defaults to `latest`. The version of this binding.|

### Schemas

#### Ordering
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingFifoObjectChannelType"></a>`type` | string | **Required.** Defines the type of SNS Topic. Can be either `standard` or `FIFO`. |
| <a name="channelBindingContentBasedDeduplication"></a>`contentBasedDeduplication` | boolean | **Optional.** Whether the de-duplication of messages should be turned on. Defaults to `false`|

#### Policy
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingPolicyObjectPolicyStatements"></a>`statements` | [[Statement](#statement)] | **Required.** An array of Statement objects, each of which controls a permission for this topic |

#### Statement
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingPolicyStatementObjectEffect"></a>`effect` | string |**Required.** Either "Allow" or "Deny"|
| <a name="channelBindingPolicyStatementObjectPrincipal"></a>`principal` | string or array of string |**Required.** The AWS account or resource ARN that this statement applies to|
| <a name="channelBindingPolicyStatementObjectAction"></a>`action` | string or array of string |**Required.** The SNS permission being allowed or denied e.g. sns:Publish|

##### Examples

Just use defaults

```yaml
channels:
  user-signedup:
    description:  A user has signed up to our service
    bindings:
      sns: {} 
```

Minimal definition, just policy

```yaml
channels:
  user-signedup:
    description:  A user has signed up to our service
    bindings:
      sns:
        policy:
          statements: 
          - effect : Allow
            principal: *
            action: SNS:Publish
```

<a name="operation"></a>

## Operation Binding Object

This object contains information operation binding in SNS.

We represent SNS producers via a **subscribe** Operation Object. In simple cases this may not require configuration, and can be shown as an empty SNS Binding Object i.e. {} if you need to explicitly indicate how a producer publishes to the channel.

We represent SNS consumers via a **publish** Operation Object. These consumers need an SNS Subscription that defines how they consume from SNS i.e. the protocol that they use, and any filters applied.

The SNS binding does not describe the receiver.If you wish to define the receiver, add a **publish** Operation Binding Object for that receiver. For example, if you send message to an SQS queue from an SNS Topic, you would add a protocol of 'sqs' and an Identifier object for the queue. That identifier could be an ARN of a queue defined outside of the scope of AsyncAPI, but if you wanted to define the receiver you would use the name of a queue defined in an SQS Binding on the **publish** Operation Binding Object.

We support an array of consumers via the **consumers** field. This allows you to represent multiple protocols consuming an SNS Topic in one file. You may also use it for multiple consumers with the same protocol, instead of representing each consumer in a separate file.

### Fields

| Field Name | Type | Applies To | Description |
|---|:---:|:---:|---|
| <a name="operationBindingObjectTopic"></a>`topic` | [identifier](#identifier) |Publish, Subscribe| **Optional.** Often we can assume that the SNS Topic is the channel name-we provide this field in case the you need to supply the ARN, or the Topic name is not the channel name in the AsyncAPI document.|
| <a name="operationBindingObjectConsumers"></a>`consumers` | [[Consumer](#consumer)] |Publish| **Required.** The protocols that listen to this topic and their endpoints.|
| <a name="operationBindingObjectDeliveryPolicy"></a>`deliveryPolicy` | [deliveryPolicy](#delivery-policy) |Subscribe| **Optional.** Policy for retries to HTTP. The field is the default for HTTP receivers of the [SNS Topic](https://docs.aws.amazon.com/sns/latest/api/API_CreateTopic.html) which may be overridden by a specific consumer.|
|<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` | string |Publish, Subscribe| **Optional**, defaults to `latest`. The version of this binding.|

### Schemas

#### Consumer

| Field Name | Type | Description |
|---|:---:|---|
| <a name="operationBindingObjectProtocol"></a>`protocol` | string | **Required.** The protocol that this endpoint receives messages by. Can be `http`, `https`, `email`, `email-json`, `sms`, `sqs`, `application`, `lambda` or `firehose` |
| <a name="operationBindingObjectEndpoint"></a>`endpoint` |[identifier](#identifier)| **Required.** The endpoint messages are delivered to. |
| <a name="operationBindingObjectFilterPolicy"></a>`filterPolicy` | object | **Optional.** Only receive a subset of messages from the channel, determined by this policy. |
| <a name="operationBindingObjectFilterPolicyScope"></a>`filterPolicyScope` | string | **Optional.** Determines whether the FilterPolicy applies to MessageAttributes (default) or MessageBody. |
| <a name="operationBindingObjectRawMessageDelivery"></a>`rawMessageDelivery` | boolean | **Required.** If *true* AWS SNS attributes are removed from the body, and for SQS, SNS message attributes are copied to SQS message attributes. If *false* the SNS attributes are included in the body. |
| <a name="operationBindingObjectRedrivePolicy"></a>`redrivePolicy` | [redrivePolicy](#redrive-policy) | **Optional.** Prevent poison pill messages by moving un-processable messages to an SQS dead letter queue. |
| <a name="operationBindingObjectDeliveryPolicy"></a>`deliveryPolicy` | [deliveryPolicy](#delivery-policy) | **Optional.** Policy for retries to HTTP. The parameter is for that [SNS Subscription](https://docs.aws.amazon.com/sns/latest/api/API_Subscribe.html) and overrides any policy on the [SNS Topic](https://docs.aws.amazon.com/sns/latest/api/API_CreateTopic.html). |
| <a name="channelBindingObjectDisplayName"></a>`displayName` | string |**Optional.** The display name to use with an SMS subscription |


#### Delivery Policy
|Field Name | Type | Description|
|---|:---:|---|
| <a name="channelBindingDeliveryPolicyObjectMinDelayTarget"></a>`minDelayTarget` | integer | **Optional.** The minimum delay for a retry in seconds |
| <a name="channelBindingDeliverPolicyObjectMaxDelayTarget"></a>`maxDelayTarget` | integer | **Optional.** The maximum delay for a retry in seconds |
| <a name="channelBindingDeliveryPolicyObjectNumRetries"></a>`numRetries` | integer | **Optional.** The total number of retries, including immediate, pre-backoff, backoff, and post-backoff retries |
| <a name="channelBindingDeliveryPolicyObjectNumNoDelayRetries"></a>`numNoDelayRetries` | integer | **Optional.** The number of immediate retries (with no delay) |
| <a name="channelBindingDeliveryPolicyObjectNumMinDelayRetries"></a>`numMinDelayRetries` | integer | **Optional.** The number of immediate retries (with delay) |
| <a name="channelBindingDeliveryPolicyObjectNumMaxDelayRetries"></a>`numMaxDelayRetries` | integer | **Optional.** The number of post-backoff phase retries, with the maximum delay between retries |
| <a name="channelBindingDeliveryPolicyObjectBackoffFunction"></a>`backoffFunction` | string, one of: arithmetic, exponential, geometric or linear | **Optional.** The algorithm for backoff between retries |
| <a name="channelBindingDeliveryPolicyObjectMaxReceivesPerSecond"></a>`maxReceivesPerSecond` | integer | **Optional.** The maximum number of deliveries per second, per subscription |

#### Identifier
|Field Name | Type | Description|
|---|:---:|---|
|<a name="identifierObjectUrl"></a>`url` |string| **Optional.** The endpoint is a URL  |
|<a name="identifierObjectEmail"></a>`email` |string| **Optional.** The endpoint is an email address |
|<a name="identifierObjectPhone"></a>`phone` |string| **Optional.** The endpoint is a phone number|
|<a name="identifierObjectArn"></a>`arn` |string| **Optional.** The target is an [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). For example, for SQS, the identifier may be an ARN, which will be of the form: ["arn:aws:sqs:{region}:{account-id}:{queueName}"](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)|
|<a name="identifierObjectName"></a>`name` |string| **Optional.** The endpoint is identified by a name, which corresponds to an identifying field called 'name' of a binding for that protocol on this **publish** Operation Object. For example, if the protocol is 'sqs' then the name refers to the name field **sqs** binding. We don't use $ref because we are referring, not including. |

We provide an Identifer Object to support providing the identifier of an externally defined endpoint for this SNS *publication* to target, or an endpoint on another binding against this Operation Object (via the name field). 

#### Redrive Policy

|Field Name | Type | Description|
|---|:---:|---|
| <a name="redrivePolicyObjectDeadLetterQueue"></a>`deadLetterQueue` |[Identifier](#identifier)| **Required.** The SQS queue to use as a dead letter queue (DLQ). Note that you may have a Redrive Policy to put messages that cannot be delivered to an SQS queue, even if you use another protocol to consume messages from the queue, so it is defined at the level of the SNS Operation Binding Object in a Consumer Object (and is applied as part of an [SNS Subscription](https://docs.aws.amazon.com/sns/latest/dg/sns-create-subscribe-endpoint-to-topic.html)). The SQS Binding describes how to define an SQS Binding that supports defining the target SQS of the Redrive Policy. |
| <a name="redrivePolicyObjectMaxReceiveCount"></a>`maxReceiveCount` |integer| **Optional.** The number of times a message is delivered to the source queue before being moved to the dead-letter queue. Defaults to 10. |

### Examples

#### SNS to SQS Pub-Sub

[<img src="/img/docs/SNS-SQS-Pub-Sub.png" height = "400" width="600"/>](SNS-SQS-Pub-Sub.png)

We are producing to an SNS channel

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
          consumers:
            - protocol: sqs
              endpoint:
                name: myQueue
              rawMessageDelivery: false
```

We are consuming an SNS channel, using an SQS queue. A separate file specifies the producer, and has the SNS Bindings for the channel. For this reason we do not repeat the SNS binding information for the channel here, to avoid duplicated definitions diverging. Instead we just define the **publish** Operation Binding.

In this version, the SQS queue is defined elsewhere, and we just reference via its ARN. It is worth noting that this couples the specification to the AWS *region* and *account*, which are part of the ARN, and if we moved  the queue to a new region or account was this specification would need to be updated to reflect that.


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
                arn: arn:aws:sqs:us-west-2:123456789012:UserSignedUpQueue
              rawMessageDelivery: true  
```

We are consuming an SNS channel, using an SQS queue. A separate file specifies the producer, and has the SNS Bindings for the channel. For this reason we do not repeat the SNS binding information for the channel here, to avoid duplicated definitions diverging. Instead we just define the **publish** Operation Binding.

In this version, the SQS queue is defined in this file, and we reference it by name. For brevity that definition is not shown here. See the SQS Binding Object for more. 

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
              name: user-signedup-queue # refers to a queue defined in this file, but not shown in this example
            rawMessageDelivery: true  
            filterPolicy:
              reason: 
                anything-but: password-reset
            redrivePolicy:
              deadLetterQueue:
                name: user-signedup-queue-dlq # refers toa queue defined in this file, but not show in this example
```

#### SNS to HTTP Pub Sub

[<img src="/img/docs/SNS-HTTP.png" height = "400" width="600"/>](SNS-HTTP.png)

We are producing to an SNS channel. 

In this version, we define a default delivery policy for any HTTP based consumers

```yaml
channels:
  user-signedup:
    description:  A user has signed up for our service
    bindings:
      sns:
        policy:
          statements: 
          - effect : Allow
            principal: *
            action: SNS:Publish 
    subscribe:
      operationId: sendMessage
      description: send messages to the topic
      bindings:
        sns:
          deliveryPolicy:
            minDelayTarget: 1
            maxDelayTarget: 60
            numRetries: 50
            numNoDelayRetries: 3
            numMinDelayRetries: 2
            numMaxDelayRetries: 35
            backoffFunction: exponential
            maxReceivesPerSecond: 10
```

We are consuming an SNS channel, using an HTTP endpoint, which is defined in this AsyncAPI file. For brevity we do not show an http endpoint here. The delivery policy here is defined for the http consumer and overrides any policy set by the producer

```yaml
channels:
  user-signedup:
    description:  A user has signed up for our service
    bindings:
      sns: {}    # Indicates that the channel is an SNS Topic, but assumes defined by producer
    publish:
      operationId: receiveMessage
      description: receive messages from the topic
      bindings:
        sns:
        - protocol: http
          endpoint:
            url: http://login.my.com/user/new
          filterPolicy:
            reason: 
              anything-but: password-reset
          filterPolicyScope: MessageBody
          deliveryPolicy:
            minDelayTarget: 1
            maxDelayTarget: 120
            numRetries: 30
            numNoDelayRetries: 3
            numMinDelayRetries: 2
            numMaxDelayRetries: 25
            backoffFunction: exponential
            maxReceivesPerSecond: 20
          redrivePolicy:
            deadLetterQueue:
              name: user-signedup-queue-dlq # refers toa queue defined in this file, but not show in this example
```

<a name="message"></a>

## Message Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.
