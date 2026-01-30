---
title: 'kafka'
weight: 18
---

# Kafka Bindings

This document defines how to describe Kafka-specific information on AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.5.0`.


<a name="server"></a>

## Server Binding Object

This object contains information about the server representation in Kafka.

##### Fixed Fields

Field Name | Type | Description | Applicability [default] | Constraints
---|:---:|:---:|:---:|---
`schemaRegistryUrl` | string (url) | API URL for the Schema Registry used when producing Kafka messages (if a Schema Registry was used) | OPTIONAL | -
`schemaRegistryVendor` | string | The vendor of Schema Registry and Kafka serdes library that should be used (e.g. `apicurio`, `confluent`, `ibm`, or `karapace`) | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified
<a name="serverBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. | OPTIONAL [`latest`]

##### Example

```yaml
servers:
  production:
    bindings:
      kafka:
        schemaRegistryUrl: 'https://my-schema-registry.com'
        schemaRegistryVendor: 'confluent'
        bindingVersion: '0.5.0'
```


<a name="channel"></a>

## Channel Binding Object

This object contains information about the channel representation in Kafka (eg. a Kafka topic).

##### Fixed Fields

Field Name |                       Type                       |                                               Description                                               | Applicability [default] | Constraints
---|:------------------------------------------------:|:-------------------------------------------------------------------------------------------------------:|:-----------------------:|---
<a name="channelBindingObjectTopic"></a>`topic` |                      string                      |                            Kafka topic name if different from channel name.                             |        OPTIONAL         | -
<a name="channelBindingObjectPartitions"></a>`partitions` |                     integer                      | Number of partitions configured on this topic (useful to know how many parallel consumers you may run). |        OPTIONAL         | Must be positive
<a name="channelBindingObjectReplicas"></a>`replicas` |                     integer                      |                              Number of replicas configured on this topic.                               |        OPTIONAL         | MUST be positive
<a name="channelBindingObjectTopicConfiguration"></a>`topicConfiguration` | [TopicConfiguration Object](#topicConfiguration) |                   Topic configuration properties that are relevant for the API.                    |       OPTIONAL       | -
<a name="channelBindingObjectBindingVersion"></a>`bindingVersion` |                      string                      |                   The version of this binding. If omitted, "latest" MUST be assumed.                    |   OPTIONAL [`latest`]   | -


This object MUST contain only the properties defined above.

##### Example

```yaml
channels:
  user-signedup:
    bindings:
      kafka:
        topic: 'my-specific-topic-name'
        partitions: 20
        replicas: 3
        topicConfiguration:
          cleanup.policy: ["delete", "compact"]
          retention.ms: 604800000
          retention.bytes: 1000000000
          delete.retention.ms: 86400000
          max.message.bytes: 1048588
        bindingVersion: '0.5.0'
```
<a name="topicConfiguration"></a>
## TopicConfiguration Object

This objects contains information about the API relevant topic configuration in Kafka.

Field Name |  Type   |                                                                             Description                                                                              | Applicability [default] | Constraints
---|:-------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------:|---
<a name="topicConfigurationCleanupPolicy"></a>`cleanup.policy` |  array  |                            The [`cleanup.policy`](https://kafka.apache.org/documentation/#topicconfigs_cleanup.policy) configuration option.                          |        OPTIONAL         | array may only contain `delete` and/or `compact`
<a name="topicConfigurationRetentionMs"></a>`retention.ms` | long |                               The [`retention.ms`](https://kafka.apache.org/documentation/#topicconfigs_retention.ms) configuration option.                                    |        OPTIONAL         | see kafka documentation
<a name="topicConfigurationRetentionBytes"></a>`retention.bytes` | long |                       The [`retention.bytes`](https://kafka.apache.org/documentation/#topicconfigs_retention.bytes) configuration option.                                                           |        OPTIONAL         | see kafka documentation
<a name="topicConfigurationDeleteRetentionBytes"></a>`delete.retention.ms` | long |             The [`delete.retention.ms`](https://kafka.apache.org/documentation/#topicconfigs_delete.retention.ms) configuration option.                                               |        OPTIONAL         | see kafka documentation
<a name="topicConfigurationMaxMessageBytes"></a>`max.message.bytes` | integer |                    The [`max.message.bytes`](https://kafka.apache.org/documentation/#topicconfigs_max.message.bytes) configuration option.                                      |        OPTIONAL         | see kafka documentation
<a name="topicConfigurationConfluentKeySchemaValidation"></a>`confluent.key.schema.validation`  | boolean |                    It shows whether the schema validation for the message key is enabled. Vendor specific config.                                      |        OPTIONAL         | -
<a name="topicConfigurationConfluentKeySubjectNameStrategy"></a>`confluent.key.subject.name.strategy` | string |                    The name of the schema lookup strategy for the message key. Vendor specific config.                                     |        OPTIONAL         | Clients should default to the vendor default if not supplied.
<a name="topicConfigurationConfluentValueSchemaValidation"></a>`confluent.value.schema.validation` | boolean |                    It shows whether the schema validation for the message value is enabled. Vendor specific config.                                      |        OPTIONAL         | -
<a name="topicConfigurationConfluentValueSubjectNameStrategy"></a>`confluent.value.subject.name.strategy` | string |                    The name of the schema lookup strategy for the message value. Vendor specific config.                                      |        OPTIONAL         | Clients should default to the vendor default if not supplied.

This object MAY contain the properties defined above including optional additional properties.

##### Example

```yaml
topicConfiguration:
  cleanup.policy: ["delete", "compact"]
  retention.ms: 604800000
  retention.bytes: 1000000000
  delete.retention.ms: 86400000
  max.message.bytes: 1048588
  confluent.key.schema.validation: true
  confluent.key.subject.name.strategy: "TopicNameStrategy"
  confluent.value.schema.validation: true
  confluent.value.subject.name.strategy: "TopicNameStrategy"
```

<a name="operation"></a>

## Operation Binding Object

This object contains information about the operation representation in Kafka (eg. the way to consume messages)

##### Fixed Fields

Field Name | Type | Description | Applicability [default] | Constraints
---|:---:|:---:|:---:|---
<a name="operationBindingObjectGroupId"></a>`groupId` | [Schema Object][schemaObject] \| [Reference Object](referenceObject) | Id of the consumer group. | OPTIONAL | -
<a name="operationBindingObjectClientId"></a>`clientId` | [Schema Object][schemaObject] \| [Reference Object](referenceObject) | Id of the consumer inside a consumer group. | OPTIONAL | -
<a name="operationBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed. | OPTIONAL [`latest`] | -

This object MUST contain only the properties defined above.

##### Example

```yaml
channels:
  user-signedup:
operations:
  userSignup:
    action: receive
    bindings:
      kafka:
        groupId:
          type: string
          enum: ['myGroupId']
        clientId:
          type: string
          enum: ['myClientId']
        bindingVersion: '0.5.0'
```


<a name="message"></a>

## Message Binding Object

This object contains information about the message representation in Kafka.

##### Fixed Fields

Field Name |  Type   |                                                                             Description                                                                              | Applicability [default] | Constraints
---|:-------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------:|---
<a name="messageBindingObjectKey"></a>`key` | [Schema Object][schemaObject] \| [Reference Object](referenceObject) \| [AVRO Schema Object](https://avro.apache.org/docs/current/spec.html) | The message key. **NOTE**: You can also use the [reference object](referenceObject) way. | OPTIONAL | -
<a name="messageBindingObjectSchemaIdLocation"></a>`schemaIdLocation` | string | If a Schema Registry is used when performing this operation, tells where the id of schema is stored (e.g. `header` or `payload`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level
<a name="messageBindingObjectSchemaIdPayloadEncoding"></a>`schemaIdPayloadEncoding` | string | Number of bytes or vendor specific values when schema id is encoded in payload (e.g `confluent`/ `apicurio-legacy` / `apicurio-new`). | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level
<a name="messageBindingObjectSchemaLookupStrategy"></a>`schemaLookupStrategy` | string | Freeform string for any naming strategy class to use. Clients should default to the vendor default if not supplied. | OPTIONAL | MUST NOT be specified if `schemaRegistryUrl` is not specified at the Server level
<a name="messageBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed. | OPTIONAL [`latest`] | -

This object MUST contain only the properties defined above.

This example is valid for any Confluent compatible schema registry. Here we describe the implementation using the first 4 bytes in payload to store schema identifier.

```yaml
channels:
  test:
    address: test-topic
    messages:
      testMessage:
        bindings:
          kafka:
            key:
              type: string
              enum: ['myKey']
            schemaIdLocation: 'payload'
            schemaIdPayloadEncoding: '4'
            bindingVersion: '0.5.0'
```

This is another example that describes the use if Apicurio schema registry. We describe the `apicurio-new` way of serializing without details on how it's implemented. We reference a [specific lookup strategy](https://www.apicur.io/registry/docs/apicurio-registry/2.2.x/getting-started/assembly-using-kafka-client-serdes.html#registry-serdes-concepts-strategy_registry) that may be used to retrieve schema Id from registry during serialization.

```yaml
channels:
  test:
    address: test-topic
    messages:
      testMessage:
        bindings:
          kafka:
            key:
              type: string
              enum: ['myKey']
            schemaIdLocation: 'payload'
            schemaIdPayloadEncoding: 'apicurio-new'
            schemaLookupStrategy: 'TopicIdStrategy'
            bindingVersion: '0.5.0'
```

[schemaObject]: https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.15#schemaObject
[referenceObject]: https://www.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.15#referenceObject
