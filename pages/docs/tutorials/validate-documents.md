---
title: "Studio AsyncAPI document validation"
description: This tutorial will teach us how to validate AsyncAPI documents using the AsyncAPI Studio tool.
weight: 120
---

# Introduction
This tutorial will teach you how to validate AsyncAPI documents using the [AsyncAPI Studio tool](https://studio.asyncapi.com/).

We will start with a broken AsyncAPI document and troubleshoot via console errors step-by-step until we end up with a valid AsyncAPI document. This process will illustrate how to identify [`REQUIRED` properties in AsyncAPI documents](https://www.asyncapi.com/docs/reference/specification/v2.5.0#A2SObject).

# Background context
An AsyncAPI document is a file that defines and annotates the different components of a specific Event-Driven API. The format of the file must be JSON or YAML. You can use this document to generate both documentation and code.

The AsyncAPI Studio tool allows you to develop an AsyncAPI document, validate it, preview it, convert it to the latest version, and visualize event flows.

# Copy invalid AsyncAPI document
Let's pretend we have an invalid AsyncAPI document.

1. Open [Studio](https://studio.asyncapi.com/).

2. Navigate to the left side bar and click on **new file**.

3. Copy and paste the below invalid AsyncAPI document:

```yaml
asyncapi: '2.7.0'
info:
  title: Account Service
  version: 1.0.0
  
channels:
  user/signedup:
    subscribe:
      message:
        $ref: 'UsersSignedUp'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
 ``` 

# Troubleshoot Studio console errors
Let's fix the errors one by one until we end up with a valid AsyncAPI document.

1. In Studio, open the **visualizer** found on the left-side menu.
 
2. Read the error message on the visualizer preview screen: `Empty or invalid document. Please fix errors/define AsyncAPI document.`

3. Open the console box that says `PROBLEMS`, so you can read all console errors.

4. Fix the incorrect AsyncAPI specification number to `2.4.0`.
 
```yaml
asyncapi: '2.4.0'
info:
  title: Account Service
  version: 1.0.0
  ```

<Remember>
Notice how <b>description</b> property is missing; that doesn't make the AsyncAPI document invalid, but it's always better to include.
</Remember>

5. Read the next studio console error: `Error downloading https://studio.asyncapi.com/UserSignedUp HTTP ERROR 404`.


6. Fix the `$ref` by changing it to: `'#/components/messages/UserSignedUp'`.

```yaml
channels:
  user/signedup:
    subscribe:
      message:
        $ref: 'UserSignedUp'
```

This allows the consumer applications to subscribe to the _user/signedup_ channel and receive `userSignUp` messages. 

<Remember>
The <b>channels</b> section is used to describe the event names your API will be publishing and/or subscribing to.
</Remember>

7. Congratulations! You identified and fixed all the errors, and now have a valid AsyncAPI document.

# Summary
This tutorial taught us how to validate an AsyncAPI document using the AsyncAPI Studio tool. We also learned to troubleshoot an invalid AsyncAPI document by following the console error message directions. In doing so, we learned how to identify `REQUIRED` properties in all AsyncAPI documents.

# Next steps
Now that you've completed this tutorial, go ahead to learn how to [validate messages/events]() which you will be sending to your application.
---

<DocsButton
  suggestions={[
    {
      href: '/docs/tutorials/generate-code',
      title: 'Generate code',
      type:'back',
    },
    {
      href: '/docs/tutorials/validate-events',
      title: 'Messages/events validation',
      type:'next',
    }
  ]}
/>
