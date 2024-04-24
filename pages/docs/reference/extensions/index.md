---
title: 'Overview' 
weight: 10
---

## What's an extension?

Extension is a mechanism in AsyncAPI that enables you to add custom fields to AsyncAPI document. You can define your own extensions, use them only for your use case inside your company. You can also share your extensions with others. This way an extension that is adopted by others can one day become core part of AsyncAPI specification.


#### Usage in an AsyncAPI document
AsyncAPI extensions are those that are preceded by `x-`, for example `x-linkedin`. They can be placed in the AsyncAPI document in locations specified by documentation of given extension.

## Adding your extension to the catalog

If you'd like to add your extension to the catalog, please submit a pull request to [Extensions Catalog](https://github.com/asyncapi/extensions-catalog) repository. Make sure the extension doesn't exist already, in which case it would be better to improve the existing one so everybody benefits from it.