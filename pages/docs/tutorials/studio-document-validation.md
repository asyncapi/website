---
title: "Validate AsyncAPI document with Studio"
description: This tutorial will teach you how to validate AsyncAPI documents using the AsyncAPI Studio tool.
weight: 120
---

## Introduction
This tutorial will teach you how to validate AsyncAPI documents using the [AsyncAPI Studio tool](https://studio.asyncapi.com/).

You will start with a broken AsyncAPI document and troubleshoot via console errors step-by-step until we end up with a valid AsyncAPI document. This process will illustrate how to identify [`REQUIRED` properties in AsyncAPI documents](https://www.asyncapi.com/docs/reference/specification/latest#A2SObject).

## Background context
An AsyncAPI document is a file that defines and annotates the different components of a specific Event-Driven API. The format of the file must be JSON or YAML. You can use this document to generate both documentation and code.

The AsyncAPI Studio tool allows you to develop an AsyncAPI document, validate it, preview it, convert it to the latest version, and visualize event flows.

<Remember>

If you did not follow the previous tutorial and do not have an `asyncapi.yaml` file ready, then generate one using `asyncapi new --example=tutorial.yml --no-tty` command.

</Remember>

Now let's experiment with an invalid file to see how errors are displayed and how to make that file valid again.

## Copy invalid AsyncAPI document
Let's pretend we have an invalid AsyncAPI document.

1. Open [Studio](https://studio.asyncapi.com/).

<Remember>

You can also skip the step below by clicking on New File in Studio and opening the Invalid Example template in the tutorials section.

</Remember>

2. Copy and paste the below invalid AsyncAPI document:

```yaml
asyncapi: '1.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message:
        name: LightMeasured
        payload:
          type: object
          properties:
            id:
              type: integer
              minimum: true
              description: Id of the streetlight.
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.
            sentAt:
              type: integer
              format: date-time
              description: Date and time when the message was sent.
 ``` 
 
## Troubleshoot Studio errors
Let's fix the errors one by one until we end up with a valid AsyncAPI document.
 
1. You can see the error message on the screen: `Empty or invalid document. Please fix errors/define AsyncAPI document.`

2. Open diagnostics, you can see more information related to your errors.

3. Fix the incorrect AsyncAPI specification number to `2.5.0`.
 
```yaml
asyncapi: '2.5.0'
info:
  title: Account Service
  version: 1.0.0
  ```
<Remember>
Notice how <b>description</b> property is missing; that doesn't make the AsyncAPI document invalid, but it's always better to include.
</Remember>

4. Read the next error: `must be number`. Fix the `minimum` by changing it to: `0`.

```yaml
          properties:
            id:
              type: integer
              minimum: 0
``` 
5. You see three errors:
- must be equal to one of the allowed values
- must be array
- must match a schema in `anyOf`

`anyOf` means it should match any one the above schemas then it is valid.

Now let's fix this error by changing the type to `string`

```yaml
            sentAt:
              type: string
              format: date-time
              description: Date and time when the message was sent.
```

6. Congratulations! You identified and fixed all the errors, and now have a valid AsyncAPI document.

## Summary
This tutorial taught us how to validate an AsyncAPI document using the AsyncAPI Studio tool. We also learned to troubleshoot an invalid AsyncAPI document by following the error message directions in diagnostics. In doing so, we learned how to identify `REQUIRED` properties in all AsyncAPI documents.

## Next steps
Now that you have completed this tutorial, go ahead to learn [generate AsyncAPI messages (events)](https://asyncapi.com/docs/tutorials/generate-code) which you will be sending to your application.

You may also enjoy reading our [AsyncAPI document validation guide](https://asyncapi.com/docs/guides/validate).

---
