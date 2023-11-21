---
title: Getting Started
weight: 80
---

## Introduction

[Glee](https://github.com/asyncapi/glee) is a spec-first framework that helps you build server-side applications. That means it operates on the principle of defining the API specification (AsyncAPI) before diving into the actual implementation of the application logic. It leverages that principle to make you more productive:

- Glee ensures your code and AsyncAPI definition are on par, eliminating the problem of outdated documentation. By having both the code and the AsyncAPI definition in sync, you can ensure that the API documentation is always up to date, accurate, and reflects the current state of the application. Glee takes care of this automatically for you.
- Glee lets you focus on what matters and handles the rest for you. You only write the code for your business use-case. Glee takes care of performance, scalability, resilience, and everything you need to make your application production-ready.
- Glee validates the schema of the payload that it receives, if it doesn't conform to the schema that is defined in the AsyncAPI document, it throw an error telling user that the server received an invalid payload.

Now, before you get started with a glee project, let's take a high level view of Application structure what glee resonates with.

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
|asyncapi.(yaml or json or yml)|**Required.** The [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest) file defines your API. Make sure all the `publish` operations have an assigned `operationId` that matches a file name (excluding the extension) in the `functions` directory.
|glee.config.js| The Glee configuration file.
|package.json|**Required.** The Node.js package definition file. Make sure you include `@asyncapi/glee` as a dependency and add two scripts: `dev` and `start`. They should be running `glee dev` and `glee start` respectively.

To understand the structure in a broader way, please refer to the associated page's links. 

### Let's create a glee project to simplify the app structure

We will consider a simple WebSocket API using glee to understand its magic. We will create a simple WebSocket server that receives a current time from the client and then send a "good morning", "good evening" or "good night" respectively.

To setup a project, you should follow our installation page on how to setup glee on your environment.

We recommend creating a new Glee app using our official CLI which sets up everything automatically. (You don't need to create an empty directory. create-glee-app will make one for you.) To create a project, run: `asyncapi new glee`

Once the process is completed, you should have a new Glee app ready for development and see these files that were made.

![glee_structure](/assets/glee_struct.png)

#### Define our Spec for our API

Glee being a spec-first framework, development starts with defining your API spec. To know more details into it, you can follow glee template to understand it step by step. For our case we will define our API:

```yaml
asyncapi: 3.0.0
info:
  title: Greet Bot
  version: 0.1.0
servers:
  websockets:
    host: 0.0.0.0:3000
    protocol: ws
channels:
  greet:
    publish:
      operationId: onGreet
      message:
        $ref: '#/components/messages/time'
    subscribe:
      message:
        $ref: '#/components/messages/greet'
components:
  messages:
    time:
      payload:
        type: object
        properties:
          currentTime:
            type: number
          name:
            type: string
    greet:
      payload:
        type: string

```

This will be the Specification that defines our API, in our case, it is very simple, as we will be sending a name and the time of the day, and our API will greet us accordingly.

One thing to note here is the `operationId`, this is needed and is a crucial part of glee, as this is how we will be connecting our business logic with our spec, `operationId` is the name of the function that will be called every time a certain operation occurs. In our case whenever `/greet` channel received a message.

#### Define our operation function

Now for our case, we will be adding a file `functions/onGreet.js` and writing up the logic for parsing our time and sending a response.

```javascript
export default async function (event) {
  const { name, time } = event.payload
  const t = new Date(time)
  const curHr = t.getHours()
  let response = ''
  if (curHr < 12) {
    response = `Good Morning ${name}`
  } else if (curHr < 18) {
    response = `Good Afternoon ${name}`
  } else {
    response = `Good Evening ${name}`
  }
  return {
    reply: [
      {
        payload: response,
      },
    ],
  }
}

```

Every file in the functions folder acts as a handler to develop business logic for glee, every file should export an async function that receives an event parameter, where you have access to payload and server details.

#### Running and testing your application

We will execute the application and carry out testing with Postman to ensure that it is functioning as intended.

Now to run your glee application, just run:

```
npm run dev
# or 
npm run start
```
To send a WebSocket request with a payload e.g. `{"name":"john", "time": "1567906535"}` to `ws://localhost:3000/greet`, open Postman and checkout the endpoint:

![glee_response](/assets/glee_resp.png)

So, this is how easy it is to build a WebSocket API using Glee. You can also check out the example code [here](https://github.com/Souvikns/greet-bot).