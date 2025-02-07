---

title: 'Glee Installation Guide'
weight: 30

---

### Preparing for Installation

Before starting with Glee, ensure that NPM, Node.js, and the [AsyncAPI CLI](https://github.com/asyncapi/cli) are already set up on your system.

> Need help installing AsyncAPI CLI? Check out the [CLI Installation Guide](https://www.asyncapi.com/docs/tools/cli/installation).

### Starting with Glee

Creating a new Glee application can be approached in three distinct ways:
  * [Begin with an existing AsyncAPI document](#initialize-with-an-asyncapi-document).
  * [Use a predefined template](#start-with-a-template).
  * [Opt for Manual Installation](#manual-installation) (recommended for advanced users keen on understanding Glee's inner workings).

### Initialize with an AsyncAPI Document
If you already have an AsyncAPI specification file, you can jumpstart your project by using the `-f` or `--file` flag to specify the file path. The CLI will leverage this to set up your project.

```sh
asyncapi new glee -f asyncapi.yaml
```

This command generates all necessary files. Just open the project in your editor, and start integrating your authentication and business logic.

### Start with a Template

For those without a custom AsyncAPI file and looking to experiment, starting with a template is an excellent choice. These are simple Glee projects that the AsyncAPI CLI can generate for you.

Use the `-t` or `--template` flag to specify the template name. Currently, two templates are available:

1) **default**: Responds with a string upon receiving a string.
2) **tutorial**: Designed for [this tutorial](https://www.asyncapi.com/docs/tutorials/generate-code).

To initiate a project with the default template:

```sh
asyncapi new glee -t default
```

After installation, follow these steps:

```
Next steps:

  cd project
  npm install --ignore-scripts
  npm run dev

Feel free to open the project in your preferred editor and start customizing it.
```

Refer to our Getting Started guide for further assistance during customization.

### Manual Installation

For a hands-on setup, start by creating a new directory, e.g., `myapp`, and structure it as follows:

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

Inside this new folder, initialize and install Glee:

```js
npm init -y
npm install @asyncapi/glee
```

Edit your `package.json` to include the following scripts:

```js
{
  "scripts": {
    "docs": "glee docs",
    "dev": "glee dev",
    "start": "glee start",
  }
}
```

These scripts serve different development stages:

- `glee docs`: Generates your project documentation.
- `glee dev`: Starts a local development server, building your project in a development-friendly environment.
- `glee start`: Launches your project for production use.

#### Setting up `asyncapi.yaml` and Required Directories

Craft an `asyncapi.yaml` file capable of receiving a "hello \{name\}" message via WebSocket (`ws`) protocol on the `hello` channel. Define the operation ID as `onHello`, indicating the function to be called, and set the payload type to string for publishing on that channel.

```yaml
# AsyncAPI Specification for Hello, Glee!
asyncapi: 3.0.0
info:
  title: 'Hello, Glee!'
  version: 1.0.0
servers:
  websockets:
    host: 0.0.0.0:3000
    protocol: ws
channels:
  hello:
    address: hello
    messages:
      hello:
        $ref: '#/components/messages/hello'
operations:
  onHello:
    action: receive
    channel:
      $ref: '#/channels/hello'
  SendHello:
    action: send
    channel: 
      $ref: "#/channels/hello"
components:
  messages:
    hello:
      payload:
        type: string
```

Create a function `onHello.js` in `myapp/functions`:

```js
export default async function (event) {  
  return {
    send: [{
      server: "websockets",
      channel: "hello",
      payload: `Hello from Glee! You said: "${event.payload}".`
    }]
  }
}
```

#### Launching the Development Server

- Execute `npm run dev` to start the server.
- Connect to `ws://localhost:3000/hello` and send a WebSocket request like `{"john"}`.