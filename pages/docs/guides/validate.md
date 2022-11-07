---
title: "Validate AsyncAPI Documents"
description: In this guide, you'll learn multiple ways to validate AsyncAPI documents.
weight: 120
---

# Introduction
When people talk about AsyncAPI validation, sometimes they mean completely different things: **validation of AsyncAPI documents** or **validation of messages in runtime** _(message validation against schemas provided in the AsyncAPI document)_. 

This guide is about validating AsyncAPI documents to make sure they are correct. 

# Create AsyncAPI documents
To validate an AsyncAPI document, you first need to have one. If you did not create one for your app yet, you can easily do so by using the [AsyncAPI CLI](https://github.com/asyncapi/cli#installation).

Generate a sample `asyncapi.yaml` file (AsyncAPI document) with the following CLI command: 

```
asyncapi new --example=default-example.yaml --no-tty
```

# Validate AsyncAPI documents
Validating an AsyncAPI document can mean one of two things: 
1. Validation against the specification.
2. Validation against the best practices or company governance rules.

## Validate against specification
Let's discuss options for validating against the specification. 

This ensures that every content of the document is written in accordance with the AsyncAPI specification.

There are several tool options you may select for validating against the specification: _AsyncAPI Studio_, _AsyncAPI CLI_, and _Parsers_.

### AsyncAPI Studio validation 
[AsyncAPI Studio](https://github.com/asyncapi/studio#readme) provides a visual and easy way to validate your AsyncAPI documents against the specification. 

It uses the [AsyncAPI JavaScript parser](https://github.com/asyncapi/parser-js) behind the scenes to perform syntax checks and validate documents.

Errors in your document are highlighted with a red underline, showing which lines are invalid. The console also provides feedback, allowing you to further troubleshoot with detailed error messages.

When a document is invalid, it provides the following error: `Empty or invalid document please fix errors / define AsyncAPI document`.

### AsyncAPI CLI validation 
The following [AsyncAPI CLI](https://github.com/asyncapi/cli#installation) command validates AsyncAPI documents in your local computer or in automation:

 ```
 asyncapi validate asyncapi.yaml

 ```

> You can also open the AsyncAPI Studio from the CLI by running the command `asyncapi start studio`

### Parsers (code) validation 
AsyncAPI provides official [JavaScript](https://github.com/asyncapi/parser-js) and [Go](https://github.com/asyncapi/parser-go) parsers for validating the JSON schema in your AsyncAPI documents. 

<Remember>
If you do not run your schemas through the parsers, the JSON schemas alone cannot complete the entire validation. 

Learn more about [custom JSON Schemas validation needs](https://github.com/asyncapi/spec-json-schemas#custom-validation-needs).
</Remember>

## Validation against best practices or company governance rules
Now let's discuss options for validating against best practices or company governance rules also known as **linting**.

When AsyncAPI is used by various teams, you want to make sure they follow the same rules and are consistent across the organization. It is not enough to validate AsyncAPI documents against official specification rules. 

An example would be that officially, `summary` property is optional, but in your organization, you want to make sure that it is always provided. You need a solution that enables you to enforce internal rules on AsyncAPI documents' providers.

One way this can be done is by using **Spectral**, an API linting tool which has a built-in [custom ruleset properties](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets) with [AsyncAPI rules](https://meta.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules) for the AsyncAPI specification. It also enables you to define company-specific rules that you can use internally.  

To get started:
1. Install [Spectral](https://meta.stoplight.io/docs/spectral/b8391e051b7d8-installation). 
2. Create a file named `.spectral.yaml` to begin writing your API description and document rules. 

Example:

```
{
  "formats": ["asyncapi2"],
  "extends": "spectral:asyncapi",
  "rules": {
    // add your own rules here
  }
}
```

3. Create and add your own custom ruleset:

```
{
  "formats": [
    "asyncapi2"
  ],
  "extends": "spectral:asyncapi",
  "rules": {
    //add your rules here
    "valid-document-version": {
      "message": "Version must match 2.x.x",
      "severity": "hint",
      "given": "$.info",
      "then": [
        {
          "field": "version",
          "function": "defined"
        },
        {
          "field": "version",
          "function": "pattern",
          "functionOptions": {
            "match": "^[0-9]+$"
          }
        }
      ]
    }
  }
}
```
4. After setting up spectral and creating custom rules in accordance with steps 1 - 3, you can validate your AsyncAPI document by using the spectral cli command below.

```
spectral lint asyncapi.yaml
```

---

## Additional resources
- [AsyncAPI **Studio READme**](https://github.com/asyncapi/studio#readme)
- [AsyncAPI **CLI READme**](https://github.com/asyncapi/cli#readme)
- [AsyncAPI **JavaScript Parsers READme**](https://github.com/asyncapi/parser-js#readme) 
- [AsyncAPI **Go Parsers READme**](https://github.com/asyncapi/parser-go#readme) 
