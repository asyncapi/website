---
title: 'googlepubsub'
weight: 14
---

# Google Cloud Pub/Sub Bindings

This document defines how to describe Google Cloud Pub/Sub specific information with AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.2.0`.

<a name="channel"></a>

## Channel Binding Object

The `Channel Bindings Object` is used to describe the Google Cloud Pub/Sub specific
[Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/create) details with AsyncAPI.

Field Name | Type | Description
---|---|---
`bindingVersion`|String|The current version is `0.2.0`
`labels`|Object|An object of key-value pairs _(These are used to categorize Cloud Resources like Cloud Pub/Sub Topics.)_
`messageRetentionDuration`|String|Indicates the minimum duration to retain a message after it is published to the topic _(Must be a valid [Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).)_
`messageStoragePolicy`|[Message Storage Policy Object](#message-storage-policy-object)|Policy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored
`schemaSettings`|[Schema Settings Object](#schema-settings-object)|Settings for validating messages published against a schema

<a name="message-storage-policy-object"></a>

### Message Storage Policy Object

The `Message Storage Policy Object` is used to describe the Google Cloud Pub/Sub
[MessageStoragePolicy](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#MessageStoragePolicy)
Object with AsyncAPI.

Field Name | Type | Description
---|---|---
`allowedPersistenceRegions`|String[]|A list of IDs of GCP regions where messages that are published to the topic may be persisted in storage

<a name="schema-settings-object"></a>

### Schema Settings Object

The `Schema Settings Object` is used to describe the Google Cloud Pub/Sub
[SchemaSettings](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#SchemaSettings) Object with
AsyncAPI.

Field Name | Type | Description
---|---|---
`encoding`|String|The encoding of the message _(Must be one of the possible [Encoding](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#encoding) values.)_
`firstRevisionId`|String|The minimum _(inclusive)_ revision allowed for validating messages
`lastRevisionId`|String|The maximum _(inclusive)_ revision allowed for validating messages
`name`|String|The name of the schema that messages published should be validated against _(The format is `projects/{project}/schemas/{schema}`.)_

<a name="channel-binding-example"></a>

### Example

```yaml
# ...
channels:
  topic-avro-schema:
    address: projects/your-project/topics/topic-avro-schema
    bindings:
      googlepubsub:
        schemaSettings:
          encoding: json
          name: projects/your-project/schemas/message-avro
# ...
  topic-proto-schema:
    address: projects/your-project/topics/topic-proto-schema
    bindings:
      googlepubsub:
        messageRetentionDuration: 86400s
        messageStoragePolicy:
          allowedPersistenceRegions:
          - us-central1
          - us-central2
          - us-east1
          - us-east4
          - us-east5
          - us-east7
          - us-south1
          - us-west1
          - us-west2
          - us-west3
          - us-west4
        schemaSettings:
          encoding: binary
          name: projects/your-project/schemas/message-proto
# ...
```

<a name="message"></a>

## Message Binding Object

The `Message Binding Object` is used to describe the Google Cloud Pub/Sub specific
[PubsubMessage](https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage) details, alongside with pertintent
parts of the Google Cloud Pub/Sub
[Schema](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.schemas#Schema)
Object, with AsyncAPI.

Field Name | Type | Description
---|---|---
`bindingVersion`|String|The current version is `0.2.0`
`attributes`|Object|Attributes for this message _(If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription.)_
`orderingKey`|String|If non-empty, identifies related messages for which publish order should be respected _(For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering).)_
`schema`|[Schema Definition Object](#schema-definition-object)|Describes the schema used to validate the payload of this message

<a name="schema-definition-object"></a>

### Schema Definition Object

The `Schema Definition Object` is used to describe the Google Cloud Pub/Sub
[Schema]([Schema](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.schemas#Schema)) Object with AsyncAPI.
While some of this information could be, or is, described using native AsyncAPI, for consistency it makes sense to
provide this information here at all times, especially for cases where AsyncAPI does not natively support describing
payloads using a supported Google Cloud Pub/Sub schema format like Protobuf.

Field Name | Type | Description
---|---|---
`name`|String|The name of the schema

<a name="message-binding-example"></a>

### Example

```yaml
# ...
components:
  messages:
    messageAvro:
      bindings:
        googlepubsub:
          schema:
            name: projects/your-project/schemas/message-avro
      contentType: application/json
      name: MessageAvro
      payload:
        schema:
          fields:
          - name: message
            type: string
          name: Message
          type: record
        schemaFormat: application/vnd.apache.avro+yaml;version=1.9.0
    messageProto:
      bindings:
        googlepubsub:
          schema:
            name: projects/your-project/schemas/message-proto
      contentType: application/octet-stream
      name: MessageProto
      payload:
        schema: |
          syntax = "proto3";

          message Message {
            required string message = 1;
          }
        schemaFormat: application/vnd.google.protobuf;version=3
# ...
```

<a name="operation"></a>

## Operation Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="server"></a>

## Server Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.
