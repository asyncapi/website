---
title: "Validate AsyncAPI Documents"
description: In this guide, we'll learn multiple ways to validate AsyncAPI documents.
weight: 120
---

# Introduction
In this guide, we'll learn multiple ways to validate AsyncAPI documents. 

When people talk about AsyncAPI validation, sometimes they mean completely different things: **validation of AsyncAPI documents** or **validation of messages in runtime** _(message schemas provided in the AsyncAPI document)_.  

# Prequisites
Because this guide covers multiple options for validating AsyncAPI documents, there are different tool options you might choose to install:
- [AsyncAPI CLI](https://github.com/asyncapi/cli#installation)
- [Spectral](https://meta.stoplight.io/docs/spectral/b8391e051b7d8-installation)

# Create AsyncAPI documents
An AsyncAPI document is a machine-readable definition of your Event-Driven API that can be used to generate documentation and code. You can create an AsyncAPI document with the [AsyncAPI CLI](https://github.com/asyncapi/cli#installation).

Generate a sample `asyncapi.yaml` file (AsyncAPI document) with the following CLI command: 

```
asyncapi new --example=default-example.yaml --no-tty
```

# Validate AsyncAPI documents
Validating an AsyncAPI document requires two different pieces:
1. Validation against the specification.
2. Validation against the best practices or company governance rules.

## Validate against specification
Let's discuss options for validating against the specification. (This ensures that every content of the document is written in accordance with the AsyncAPI specification.) 

There are several tool options you may select for validating against the specification: _AsyncAPI Studio_, _AsyncAPI CLI_, and _Parsers_.

### AsyncAPI Studio validation 
[AsyncAPI Studio](https://github.com/asyncapi/studio#readme) provides a visual and easy way to validate your AsyncAPI documents against the specification. 

(It uses the [AsyncAPI JavaScript parser](https://github.com/asyncapi/parser-js) behind the scenes to perform syntax checks and validate documents.)

Errors in your document are highlighted with a red underline, showing which lines are invalid. The console also provides feedback, allowing you to further troubleshoot with detailed error messages.

When a document is invalid, it provides the following error: `Empty or invalid document please fix errors / define AsyncAPI document`.

### AsyncAPI CLI validation 
The following [AsyncAPI CLI](https://github.com/asyncapi/cli#installation) command validates AsyncAPI documents in your local computer or in automation:

 ```
 asyncapi validate asyncapi.yaml

 ```

### Parsers (code) validation 
AsyncAPI provides official [JavaScript](https://github.com/asyncapi/parser-js) and [Go](https://github.com/asyncapi/parser-go) parsers for validating the JSON schema in your AsyncAPI documents. 

<Remember>
If you do not run your schemas through the parsers, the JSON schemas alone cannot complete the entire validation. 

Learn more about [custom JSON Schemas validation needs](https://github.com/asyncapi/spec-json-schemas#custom-validation-needs).
</Remember>

## Validation against company best practices or governance
Now let's discuss options for validating against company best practices or governance.

When AsyncAPI is used by various members of the team in an organization, API management policies can be applied to your messages before they arrive to your broker.

One way this can be done is by using **Spectral**, an API linting tool which has a built-in [custom ruleset properties](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets) with [AsyncAPI rules](https://meta.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules) for the AsyncAPI specification; these help define best practices for your Event-Driven APIs. 

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

---

## Additional resources
- [AsyncAPI **Studio READme**](https://github.com/asyncapi/studio#readme)
- [AsyncAPI **CLI READme**](https://github.com/asyncapi/cli#readme)
- [AsyncAPI **JavaScript Parsers READme**](https://github.com/asyncapi/parser-js#readme) 
- [AsyncAPI **Go Parsers READme**](https://github.com/asyncapi/parser-go#readme) 
