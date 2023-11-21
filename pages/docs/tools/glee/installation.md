---
title: 'Installation guide'
weight: 30
---

## Glee Installation

Before installing Glee into your project, make sure you have pre-installed NPM, NodeJs and [AsyncAPI CLI](https://github.com/asyncapi/cli) tools on your system.

### Automatic Installation

The best way to get started with Glee is by using AsyncAPI CLI, which sets up everything automatically for you. 
To create a project, run:

```sh
asyncapi new glee
```

> For more information on how to install the AsynAPI CLI, you can review the [CLI installation guide](https://www.asyncapi.com/docs/tools/cli/installation).

On installation, you'll find next steps after your project created:

```
Your project "project" has been created successfully!

Next steps:

  cd project
  npm install
  npm run dev

Also, you can already open the project in your favorite editor and start tweaking it
```

While making twists to your application, you can follow along with our getting started guide on the relevant page.

### Manual Installation

To manually create a new app, create a new folder e.g. `myapp` so the folder structure would look like below;

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

Install the required packages inside a new folder:

```js
npm init -y
npm install @asyncapi/glee
```

Open your package.json file and add the following scripts:

```js
{
  "scripts": {
    "docs": "glee docs",
    "dev": "glee dev",
    "start": "glee start",
  }
}
```

These scripts refer to the different stages of developing an application.

- `glee docs`: This script generates documentation for your project using the "Glee" documentation tool. This documentation includes information about your project's APIs, modules, and usage instructions.

- `glee dev`: This script is used for starting a development server. It launches a local development server, build your project in development mode, or perform other development-related tasks.

- `glee start`: This script is responsible for starting your project or application. It is used to launch a production-ready server or application instance.

#### Creating `asyncapi.yaml` file and other required directories

Create a yaml file that supports capable of receiving a "hello {name}" message with the protocol as `ws` and the channel name  as `hello` the hello API will subscribe to. The operationId property is `onHello` that's the name of function and the payload property is type string publishing to that channel.

```yaml
asyncapi: 3.0.0
info:
  title: Hello, Glee!
  version: 0.1.0

servers:
  websockets:
    host: 0.0.0.0:3000
    protocol: ws

channels:
  hello:
    publish:
      operationId: onHello
      message:
        $ref: '#/components/messages/hello'
    subscribe:
      message:
        $ref: '#/components/messages/hello'

components:
  messages:
    hello:
      payload:
        type: string
```

Create an operation function `onHello.js` inside `myapp/functions`:

```js
export default async function (event) {  
  return {
    reply: [{
      payload: `Hello from Glee! You said: "${event.payload}".`
    }]
  }
}
```

#### Run the Development Server

- Run `npm run dev` to start the development server.
- Connect to `ws://localhost:3000/hello` and send a WebSocket request with a payload e.g. {"john"}