---
title: 'linkedin' 
weight: 11
---

# Linkedin Extension
This document defines how to use `linkedin` extension in AsyncAPI documents.

## Overview 
This extension allows you to provide the Linkedin username of the account representing the team/company of the API.

## Version
Current version is `0.1.0`.

## Extension Definition

### Type: String

URL of the Linkedin Profile of the user or company.

## Extension Location 

This extension can be used in the following locations:
- [Info Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#infoObject)

## Example

```yaml
asyncapi: '3.0.0'
info
  title: AsyncAPI Initiative Example
  version: '1.0.0'
  x-linkedin: https://www.linkedin.com/company/asyncapi
```