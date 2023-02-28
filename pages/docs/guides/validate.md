---
title: "Validate AsyncAPI documents"
description: In this guide, you'll learn multiple ways to validate AsyncAPI documents.
weight: 120
---

## Introduction
This guide teaches multiple ways to validate AsyncAPI documents. 

## Validate AsyncAPI documents
Validating an AsyncAPI document can mean one of two things: 
- Validation against the specification.
- Validation against the best practices or company governance rules also known as linting.

### Validate against specification
Validating against the specification ensures that every content of the document is written in accordance with the AsyncAPI specification. Several tool options exist for validating against the specification: _AsyncAPI Studio_, _AsyncAPI CLI_, and _Parsers_.

#### AsyncAPI Studio validation 
[AsyncAPI Studio](https://studio.asyncapi.com/) provides a visual and easy way to validate your AsyncAPI documents against the specification. (It uses the [AsyncAPI JavaScript parser](https://github.com/asyncapi/parser-js) behind the scenes to perform syntax checks and validate documents.)

Errors in your document are highlighted with a red underline, showing which lines are invalid. The `Diagnostics` section also provides feedback, allowing you to further troubleshoot with detailed error messages. When a document is invalid, it provides the following error: `Empty or invalid document please fix errors / define AsyncAPI document`.

#### AsyncAPI CLI validation 
The following [AsyncAPI CLI](https://github.com/asyncapi/cli#installation) command validates AsyncAPI documents in your local computer or in CI/CD automation:

 ```
 asyncapi validate asyncapi.yaml
 ```

<Remember>

You can also open AsyncAPI Studio from the CLI by running the command `asyncapi start studio`.

</Remember>

#### Parsers (code) validation 
AsyncAPI provides official [JavaScript](https://github.com/asyncapi/parser-js) and [Go](https://github.com/asyncapi/parser-go) parsers for validating AsyncAPI documents. 

<Remember>
Official parsers use <a href='https://github.com/asyncapi/spec-json-schemas/'>JSON Schema</a> created for AsyncAPI specification. JSON Schema is not enough to fully validate AsyncAPI documents. Learn more about <a href='https://github.com/asyncapi/spec-json-schemas#custom-validation-needs'>custom JSON Schemas validation needs</a>. Official JavaScript parser supports and validates these special needs.

Take it into account if you're thinking about writing your own parser using official JSON Schema.
</Remember>

### Validation against best practices or company governance rules
Now let's discuss options for validating against best practices or company governance rules, also known as **linting**. When various teams use AsyncAPI, you want to ensure they follow the same rules and are consistent across the organization. It is not enough to validate AsyncAPI documents against official specification rules. 

<Remember>

Let's discuss an example. While the `summary` property is optional in an AsyncAPI document, you could choose to require it for your organization. You would then implement a solution that enables you to enforce internal rules on AsyncAPI documents' providers.

</Remember>

One way this can be done is by using **Spectral**, an API linting tool which has a built-in [custom ruleset properties](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets) with [AsyncAPI rules](https://meta.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules) for the AsyncAPI specification. It also enables you to define company-specific rules that you can use internally.  

To get started:
1. Install [Spectral](https://meta.stoplight.io/docs/spectral/b8391e051b7d8-installation). 
2. Create a file named `.spectral.yaml` to begin writing your API description and document rules. 
    Example:
    ```js
    {
      "formats": ["asyncapi2"],
      "extends": "spectral:asyncapi",
      "rules": {
        // add your own rules here
      }
    }
    ```

3. Create and add your own custom ruleset:
 ```js
    {
      "formats": ["asyncapi2"],
      "extends": "spectral:asyncapi",
      "rules": {
        // add your own rules here
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

4. After setting up Spectral and creating custom rules following steps 1 - 3, validate your AsyncAPI document using this Spectral CLI command:

  ```
    spectral lint asyncapi.yaml
  ```

---

## Additional resources
- [AsyncAPI **Studio READme**](https://github.com/asyncapi/studio#readme)
- [AsyncAPI **CLI READme**](https://github.com/asyncapi/cli#readme)
- [AsyncAPI **JavaScript Parsers READme**](https://github.com/asyncapi/parser-js#readme) 
- [AsyncAPI **Go Parsers READme**](https://github.com/asyncapi/parser-go#readme) 
