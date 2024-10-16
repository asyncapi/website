---

title: Building Your First Glee Application
weight: 20

---

#### Crafting Your API Specification

Let's start with a straightforward WebSocket API using Glee. Imagine a WebSocket server that receives the current time from a client and responds with a greeting like "good morning", "good evening", or "good night" based on the time provided.

In Glee, which is a spec-first framework, the journey begins with defining your API specification. If you're unfamiliar with what an API spec is or how to create one, we recommend going through the tutorials available [here](https://www.asyncapi.com/docs/tutorials) before proceeding. For this project, here's how we define our API:

```yaml
asyncapi: 3.0.0
info:
  title: Greet Bot
  version: 1.0.0
servers:
  websockets:
    host: localhost:3000
    protocol: ws
channels:
  greet:
    address: /greet
    messages:
      greet:
        payload:
          type: string
      time:
        payload:
          type: object
          properties:
            currentTime:
              type: number
            name:
              type: string
operations:
  receiveTime:
    action: receive
    channel:
      $ref: '#/channels/greet'
    messages:
      - $ref: "#/channels/greet/messages/time"
  sendGreet:
    action: send
    channel:
      $ref: '#/channels/greet'
    messages:
      - $ref: "#/channels/greet/messages/greet"
```

Store this in a file named `asyncapi.yml`.

This spec shows that our app can perform two operations on a single channel: receiving time and sending a greeting. We've used JSON Schema to define what `time` and `greet` messages look like.

Note the `operations` section. It's essential in Glee, linking your business logic to your spec. For instance, `receiveTime` is the function invoked when the `/greet` channel receives a message.

> Tip: Including a `send` operation isn't mandatory but is recommended for validating outgoing messages against your spec.

### Initiating Your Glee Project

For ease and efficiency, start your Glee app with our CLI, which automates the setup. In your `asyncapi.yml` file's directory, execute: `asyncapi new glee --name GreetBot --file asyncapi.yml`

It will prompt you with a list of server names and let you select which servers you want Glee to create a server for. select the `websockets` and continue.

Then, navigate to your application's folder and install the dependencies:

```shell
cd GreetBot
npm install --ignore-scripts
```

You now have a Glee app scaffolded and ready for development.

#### Implementing the Operation Function

Navigate to `functions/receiveTime.js` and input the logic to analyze the time and generate the appropriate response.

```ts
import { GleeFunction } from '@asyncapi/glee';

const receiveTime: GleeFunction = async (event) => {
  const { name, time } = event.payload;
  const t = new Date(time);
  const curHr = t.getHours();
  let response = '';
  if (curHr < 12) {
    response = `Good Morning, ${name}!`;
  } else if (curHr < 18) {
    response = `Good Afternoon, ${name}!`;
  } else {
    response = `Good Evening, ${name}!`;
  }
  return {
    send: [
      {
        server: 'websockets',
        channel: 'greet',
        payload: response,
      },
    ],
  };
};

export default receiveTime;
```

> Note: Want to know more about functions? [Click Here!](./function-lifecycle-events.md)

Each file in the `functions` directory is a handler where you can craft your business logic. Every handler should export an asynchronous function that takes an `event` parameter, giving you access to the payload and server details.

#### Running and Evaluating Your App

To launch and test the app's functionality, follow these steps:

Run your Glee application using:

```
npm run dev
# or 
npm run start
```

To test, open a WebSocket connection to `ws://localhost:3000/greet` in Postman and send `{"name":"John","time":"1567906535"}`. Watch as your Glee app responds appropriately.