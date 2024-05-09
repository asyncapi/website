---
title: 'Overview' 
weight: 10
---

## What's an extension?

Extension is a mechanism in AsyncAPI that enables you to add custom fields to an AsyncAPI document. You can define your own extensions or use them only for your use case inside your company. You can also share your extensions with others. This way an extension that is adopted by others can one day become a core part of the AsyncAPI specification.

## Usage in an AsyncAPI document
AsyncAPI extensions are those that are preceded by `x-`. (Example: `x-linkedin`) They can be placed in the AsyncAPI document in locations specified by the documentation of a given extension.

## Adding your extension to the catalog

If you'd like to add your extension to the catalog, please submit a pull request to the [Extensions Catalog](https://github.com/asyncapi/extensions-catalog) repository. Make sure the extension doesn't exist already; otherwise, it's better to improve the existing one.