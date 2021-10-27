---
weight: 1
sidebar-title: Usage
sidebar-category: Getting Started
sidebar-category-weight: 100
---

# Usages
Modelina can be used in many different contexts and has many features, all depending on the output language. This document will walk you through you the library's basic usages.

For more advanced use-cases, please check out the [advanced document](./advanced.md).

For more specific integration options, please check out the [integration document](./integration.md).

<!-- toc is generated with GitHub Actions do not remove toc markers -->

<!-- toc -->

- [Understanding the output format](#understanding-the-output-format)
- [Generate models from AsyncAPI documents](#generate-models-from-asyncapi-documents)
- [Generate models from JSON Schema documents](#generate-models-from-json-schema-documents)
- [Generate models from Swagger 2.0 documents](#generate-models-from-swagger-20-documents)
- [Generate Go models](#generate-go-models)
- [Generate C# models](#generate-c%23-models)
- [Generate Java models](#generate-java-models)
- [Generate TypeScript models](#generate-typescript-models)
- [Generate JavaScript models](#generate-javascript-models)

<!-- tocstop -->

## Understanding the output format
TODO 

## Generate models from AsyncAPI documents

When providing an AsyncAPI document, the library iterates the entire document and generate models for all defined messages. If any other kind of iteration is wanted, feel free to create a [feature request](https://github.com/asyncapi/modelina/issues/new?assignees=&labels=enhancement&template=enhancement.md).

There are two ways to generate models for an AsyncAPI document.

- [Generate from a parsed AsyncAPI document](../examples/asyncapi-from-parser)
- [Generate from a pure JS object](../examples/asyncapi-from-object)

The library expects the `asyncapi` property for the document to be set in order to understand the input format.

The message payloads, since it is a JSON Schema variant, is [interpreted as a such](./interpretation_of_JSON_Schema.md).

## Generate models from JSON Schema documents

There is one way to generate models for a JSON Schema document.

- [Generate from a pure JS object](../examples/json-schema-draft7-from-object)

We support both draft-4, draft-6, and draft-7 documents.

The library expects the `$schema` property for the document to be set in order to understand the input format. By default, if no other inputs are detected, it defaults to `JSON Schema draft 7`. The process of interpreting a JSON Schema to a model can be read [here](./interpretation_of_JSON_Schema.md).

## Generate models from Swagger 2.0 documents
When providing an AsyncAPI document, Modelina iterates the entire document and generate models for all defined `body` parameters and responses. If any other kind of iteration is wanted, feel free to create a [feature request](https://github.com/asyncapi/modelina/issues/new?assignees=&labels=enhancement&template=enhancement.md).

There are one way to generate models from a Swagger 2.0 document

- [Generate from a pure JS object](../examples/swagger2.0-from-object)

The Swagger input processor expects that the property `swagger` is defined in order to know it should be processed.

The response payload and `body` parameters, since it is a JSON Schema variant, is [interpreted as a such](./interpretation_of_JSON_Schema.md).


## Generate Go models
TODO 

## Generate C# models
TODO 

## Generate Java models
TODO 

## Generate TypeScript models
TypeScript is one of the many output languages we support. Check out this [basic example for a live demonstration](../examples/generate-typescript-models) and the following [TypeScript documentation for more advanced use-cases](./languages/TypeScript.md).

## Generate JavaScript models
JavaScript is one of the many output languages we support. Check out this [basic example for a live demonstration](../examples/generate-javascript-models)