---
title: Kickstarting Your Journey with Glee
weight: 10
---

## Welcome to Glee

[Glee](https://github.com/asyncapi/glee) introduces a refreshing approach to building server-side applications, emphasizing a spec-first methodology. This means your journey begins with defining the API specification (AsyncAPI) before writing a single line of application logic. Here's how Glee enhances your development experience:

- **Always Updated Documentation**: Glee aligns your codebase with the AsyncAPI definition, ensuring your API documentation is constantly updated and reflective of your application's current capabilities.
- **Developer Centricity**: With Glee, your focus remains on the business logic. Leave the concerns of performance, scalability, and resilience to Glee, as it equips your application to be production-ready from the get-go.
- **Schema Validation**: Glee rigorously checks incoming payloads against the schema outlined in your AsyncAPI document. Any discrepancies result in an error, maintaining the integrity and reliability of your server's data processing.

Before you dive into Glee, let's explore its application structure and understand what makes Glee unique.

## Application structure

Glee expects your project to have some files and folders with special names. When you run `asyncapi new glee`, [AsyncAPI CLI](https://github.com/asyncapi/cli) generates a boilerplate application structure by creating a new folder and populating an initial set of files as shown below. You can continue working in this default structure, adding new components, as described throughout the documentation of asyncapi cli.

```
├─ functions          (required)
│  ├─ onHello.js
│  └─ ...
├─ lifecycle          (optional)
│  ├─ onConnect.js
│  └─ ...
├─ .env               (optional)
├─ asyncapi.(yaml | yml | json)      (required)
├─ glee.config.js     (optional)
├─ package.json       (required)
```

|File/Directory|Description|
|---|---|
|functions|**Required.** This directory contains all the functions that Glee must execute when it receives a message from the server. Each file must export a default async function.
|lifecycle|This directory contains application lifecycle functions. These functions will be executed when certain events happen in the application. E.g., `onConnect`, `onServerReady`, `onDisconnect`, etc.
|.env|The environment variables of your application. **DO NOT PUT SECRETS HERE**.
|asyncapi.(yaml or json or yml)|**Required.** The [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest) file defines your API. Make sure all the `receive` operations have a name that matches a file name (excluding the extension) in the `functions` directory.
|glee.config.js| The Glee [configuration file](./env-vars-config.md).
|package.json|**Required.** The Node.js package definition file. Make sure you include `@asyncapi/glee` as a dependency and add two scripts: `dev` and `start`. They should be running `glee dev` and `glee start` respectively.

To understand the structure in a broader way, please refer to the associated page's links. 
