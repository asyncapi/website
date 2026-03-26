---
title: 'nats'
weight: 22
---

# NATS Bindings

This document defines how to describe NATS-specific information on AsyncAPI.

<a name="version"></a>

## Version

Current version is `0.1.0`.

<a name="server"></a>

## Server Binding Object
This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="channel"></a>

## Channel Binding Object
This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="operation"></a>

## Operation Binding Object

Field Name | Type | Description
---|:---:|---
| <a name="operationBindingObjectQueue"></a>`queue` | string | Defines the name of the queue to use. It MUST NOT exceed 255 characters. |
| <a name="operationBindingObjectBindingVersion"></a>`bindingVersion` | string | The version of this binding. If omitted, "latest" MUST be assumed. |

<a name="Message"></a>
## Message Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.
