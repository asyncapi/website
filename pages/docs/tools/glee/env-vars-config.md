---
title: Environment variables and Configuration file
weight: 50
---

# Environment Variables

Glee provides a few environment variables for you to customize the Glee application's behavior according to your specific requirements:
|Variable|Description|Example|
|---|---|---|
|GLEE_SERVER_NAMES|A comma-separated list of the servers to load on startup.|`GLEE_SERVER_NAMES=websockets,mosquitto`
|GLEE_SERVER_CERTS|A comma-separated list of `${serverName}:${pathToCertificateFile}`. These are the certificates to use when establishing the connection to the given server.|`GLEE_SERVER_CERTS=mosquitto:mosquitto.org.crt`
|GLEE_SERVER_VARIABLES|A comma-separated list of `${serverName}:${serverVariable}:${value}`. These are the values to use for each server variable.|`GLEE_SERVER_VARIABLES=websockets:namespace:public`

## Configuring Glee

Glee comes with sensible defaults so you don't have to worry about configuration. However, sometimes you may want to change the behavior or customize Glee in different ways. For that purpose, you can use the `glee.config.js` file.

### The configuration file

Glee's config file is a JavaScript file that exports an async function. Something like this:

```js
export default async function () {
  // More stuff here...
}
```

This function must return an object with the following shape:

```js
export default async function () {
  return {
    glee: {},
    kafka: {},
    websocket: {},
    mqtt: {},
    cluster: {},
    http: {}
  }
}

```

Here is an example of a `glee.config.js` file for reference:

```js
export default async function () {
  return {
    glee: { // Glee core configurations
      lifecycleDir: './lifecycle',
      functionsDir: './functions',
      asyncapiFilePath: './asyncapi.json',
      logs: { // you can change the defualt behaviour of glee which logs everything by default.
        incoming: 'channel-only', // only logs the channel not message payload.
        outgoing: 'none', //log nothing.
      }
    },
    docs: {
      enabled: true, // Enable/Disable documentation generation
      folder: 'docs', // Folder where you want the output of your docs to reside.
      template: '@asyncapi/markdown-template' // Type of template you want to use.
    }
    ws: {
      server: {
        httpServer: customServer, // A custom HTTP server of your own.
        adapter: "native", // Default. Can also be 'socket.io' or a reference to a custom adapter.
        port: process.env.PORT,
      }
    },
    cluster: {
      adapter: "redis",
      name: "cluster", // Default. Name of your cluster.
      url: "redis://localhost:6379", // Server URL used by adapter for clustering
    },
    mqtt: {
      auth: ({serverName, parsedAsyncAPI}) => {
        if (serverName === 'mqtt') {
          return {
            cert: async () => fs.readFileSync('./cert')
            clientId: '123',
            username: 'user1'
            password: 'pass12'
          }
        }
      }
    },
    http: {
      server: {
        httpServer: customServer, // A custom HTTP server of your own.
        adapter: 'native', 
        port: process.env.PORT,
      },
      client: {
        auth: {
          token: process.env.TOKEN
        },
        query: {
          foo: 'bar'
        },
        body: {
          foo: 'bar'
        }
      }
    }
  };
}
```
Inside the return statement, you can specify the following options:
#### Glee Core Configurations
These configurations apply to Glee itself, rather than any specific protocol.
|Field|Default|Description|
|--|--|--|
|glee.gleeDir|`.glee`|Sets the Glee directory. Your sources will be compiled here.|
|glee.lifecycleDir|`lifecycle`|Path to the directory that stores your [lifecycle events](./lifecycle-events.md).|
|glee.functionsDir|`functions`| Path to the directory that stores your [functions](./functions.md).|
|glee.asyncapiFilePath|`asyncapi.(yaml \| yml \| json)`| Path to your AsyncAPI file. |
|glee.logs|  | glee logs channel and payload by default. you can change this behaviour for incoming and outgoing messages. |
|glee.logs.incoming| "all" | supported values are `channel-only` and `none`. |
|glee.logs.outgoing| "all" | supported values are `channel-only` and `none`. |
#### Generating Documentation
|Field|Description|
|--|--|
|docs.enabled|This flag enables/disables the docs generation functionality.
|docs.folder|The dedicated folder you want your generated docs to reside.
|docs.template|The AsyncAPI template you wanna use for generating your documentation.
#### Websocket Server
|Field|Description|
|--|--|
|ws.server|Websocket server-specific configurations|
|ws.server.adapter| The Glee adapter to use for the WebSocket server. Defaults to a "native" WebSocket implementation. Other allowed values are `socket.io` (to use the [Socket.IO](https://socket.io/) Glee adapter) or a reference to a custom adapter.|
|ws.server.httpServer|  A custom HTTP server of your own. E.g., an [Express](https://expressjs.com/en/4x/api.html) server or any object that implements the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) interface.   |
|ws.server.port| The port to use when binding the WebSocket server. This is useful when your server is behind a proxy and the port exposed for consumption is not the same as the port your application should be bound to. Defaults to the port specified in the selected AsyncAPI server.|
#### Cluster
|Field|Description|
|--|--|
|cluster.adapter| The Glee cluster adapter to use for communication between instances. Defaults to Redis Pub/Sub ("redis"). Can be a reference to a custom adapter.|
|cluster.name|The name of the cluster. Defaults to "cluster".|
|cluster.url|The url of the server to be used by the adapter. In case of "redis" adapter, it's the url of the Redis server.|
#### MQTT
|Field|Description|
|---|---|
|mqtt.auth| MQTT authentication configuration|
|mqtt.auth.cert| Client certificate
|mqtt.auth.clientId| MQTT client Id for authentication
|mqtt.auth.username| username parameter
|mqtt.auth.password| password parameter
#### Kafka
|Field|Description|
|---|---|
|kafka.auth| Kafka authentication configuration|
|kafka.auth.key | Kafka Broker Key
|kafka.auth.cert| Client certificate
|kafka.auth.clientId| Kafka client Id for authentication
|kafka.auth.rejectUnauthorized | Boolean flag for accepting the valid SSL certificates
|kafka.auth.username| The username to use during authentication.
|kafka.auth.password| The password to use during authentication.
#### HTTP Server
|Field|Description|
|--|--|
|http.server|HTTP server-specific configurations|
|http.client|HTTP client-specific configurations|
|http.server.adapter| The Glee adapter to use for the HTTP server. Defaults to a "native" HTTP implementation.|
|websocket.server.port| The port to use when binding the HTTP server. This is useful when your server is behind a proxy and the port exposed for consumption is not the same as the port your application should be bound to. Defaults to the port specified in the selected AsyncAPI server.|
|http.client.auth| Authentication/Authorization configuration for the client|
|http.client.auth.token| HTTP Authentication header|
|http.client.query| Query object for the client to send|
|http.client.body| Body object for the client to send
#### Auth Config
Most clients like `ws`,`kafka`, and `mqtt` have auth fields that are used for passing auth parameters. All these configurations can be an object or a function that returns the specific object defined by each protocol.

```js
export default async function() {
  ws: {
    client: {
      auth: {
        token: process.env.TOKEN
      }
    }
  },
  mqtt: {
    auth: ({serverName, parsedAsyncAPI}) => {
      if (serverName === 'mqtt') {
        return {
          cert: fs.readFileSync('./cert', 'utf-8')
        }
      }
    }
  }
}
```
