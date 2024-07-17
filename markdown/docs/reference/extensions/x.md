---
title: 'x' 
weight: 12
---

# Twitter/X Extension
This document defines how to use `x` extension in AsyncAPI documents.

## Overview 
This extension allows you to provide the Twitter/X username of the account representing the team/company of the API.

## Version
Current version is `0.1.0`.

## Extension Definition

### Type: String

Name of the Twitter/X username.

## Extension Location 

This extension can be used in the following locations:
- [Info Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#infoObject)

## Example

```yaml
asyncapi: '3.0.0'
info
  title: Strretlights Kafka API
  version: '1.0.0'
  x-x: StreetLightData
```
