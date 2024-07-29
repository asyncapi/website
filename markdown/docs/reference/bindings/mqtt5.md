---
title: 'mqtt5'
weight: 21
---

# MQTT 5 Bindings

This document defines how to describe MQTT 5-specific information on AsyncAPI.

# **Deprecation Warning**: MQTT version 5 specific bindings are deprecated in favor of [MQTT bindings](../mqtt/README.md) that are not version specific.

<a name="version"></a>

## Version

Current version is `0.2.0`.


<a name="server"></a>

## Server Binding Object

This object contains information about the server representation in MQTT5.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="serverBindingObjectSessionExpiryInterval"></a>`sessionExpiryInterval` | [Schema Object][schemaObject] \| [Reference Object](referenceObject) \| integer | Session Expiry Interval in seconds or a Schema Object containing the definition of the interval.
<a name="serverBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed.

This object MUST contain only the properties defined above.

##### Example

```yaml
servers:
  production:
    bindings:
      mqtt5:
        sessionExpiryInterval: 60
        bindingVersion: 0.2.0
```
```yaml
servers:
  production:
    bindings:
      mqtt5:
        sessionExpiryInterval:
          type: integer
          minimum: 100
        bindingVersion: 0.2.0
```

<a name="channel"></a>

## Channel Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.



<a name="operation"></a>

## Operation Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.




<a name="message"></a>

## Message Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

[schemaObject]: https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#schemaObject
[referenceObject]: https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#referenceObject
