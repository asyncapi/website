---
title: 'pulsar'
weight: 23
---

# Pulsar Bindings
This document defines how to describe Apache Pulsar specific information with AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.1.0`.

<a name="server"></a>
## Server Binding Object

This object contains information about the server representation in Pulsar.

##### Fixed Fields

Field Name | Type | Required | Description | Default value |
---|:---:|:---:|:---|:---|
`tenant` | String | No | The pulsar tenant. If omitted, "public" MUST be assumed. | `public` |
`bindingVersion` | String | No | The version of this binding. If omitted, "latest" MUST be assumed. | `latest` |

##### Example

```yaml
servers:
  production:
    bindings:
      pulsar:
        tenant: contoso
        bindingVersion: '0.1.0'
```

<a name="channel"></a>
## Channel Binding Object
This object contains information about the channel representation in Pulsar

##### Fixed Fields

Field Name | Type | Required | Description | Default value |
---|:---:|:---:|:---|:---|
`namespace` | String | Yes |  The namespace the channel is associated with. | N/A |
`persistence` | String | Yes | Persistence of the topic in Pulsar. It MUST be either `persistent` or `non-persistent`. | N/A |
`compaction`| Integer | No | Topic compaction threshold given in Megabytes. | N/A |
`geo-replication` | String[] | No | A list of clusters the topic is replicated to. | N/A |
`retention` | [Retention Definition Object](#retention-definition-object) | No | Topic retention policy.  | N/A |
`ttl` | Integer | No |  Message time-to-live in seconds. | N/A |
`deduplication` | Boolean | No | Message deduplication. When true, it ensures that each message produced on Pulsar topics is persisted to disk only once. | N/A |
`bindingVersion` | String | No | The version of this binding. If omitted, "latest" MUST be assumed. | `latest` |

<a name="retention-definition-object"></a>
### Retention Definition Object
The `Retention Definition Object` is used to describe the Pulsar [Retention](https://pulsar.apache.org/docs/cookbooks-retention-expiry/) policy.

Field Name | Type | Required | Description | Default value |
---|:---:|:---:|:---|:---|
`time`|Integer| No | Time given in Minutes. | `0` |
`size`|Integer| No |Size given in MegaBytes. | `0` |

##### Example

```yaml
channels:
  user-signedup:
    bindings:
      pulsar:
        namespace: 'staging'
        persistence: 'persistent'
        compaction: 1000
        geo-replication:
          - 'us-east1'
          - 'us-west1'
        retention:
          time: 7
          size: 1000
        ttl: 360
        deduplication: false
        bindingVersion: '0.1.0'
```

<a name="operation"></a>
## Operation binding fields
This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="message"></a>
## Message binding fields
This object MUST NOT contain any properties. Its name is reserved for future use.