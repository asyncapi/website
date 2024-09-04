---
title: Configuring Environment Variables and Configuration File
weight: 50
---

## Environment Variables

Glee provides several environment variables that allow you to tailor your application's behavior to fit specific needs:

|Variable|Purpose|Example Usage|
|--------|-------|-------------|
|GLEE_SERVER_NAMES|Specifies a list of servers to initialize at startup, separated by commas.|`GLEE_SERVER_NAMES=websockets,mosquitto`|
|GLEE_SERVER_CERTS|Indicates server-specific certificate files in a `${serverName}:${pathToCertificateFile}` format, separated by commas.|`GLEE_SERVER_CERTS=mosquitto:mosquitto.org.crt`|
|GLEE_SERVER_VARIABLES|Sets server variables in a `${serverName}:${serverVariable}:${value}` format, separated by commas.|`GLEE_SERVER_VARIABLES=websockets:namespace:public`|

### Handling Multiple .env Files
Glee supports loading variables from `.env.local` directly into `process.env`. This feature is handy for keeping secrets out of your repository during development. You can also set environment-specific defaults in `.env.development` or `.env.production`.

`.env.local` takes precedence over other `.env*` files.

Switch between `development` and `production` environments by setting the `NODE_ENV` variable accordingly.

## Customizing Glee Settings

While Glee comes with defaults for ease of use, you may want to customize settings for specific needs. This is where `glee.config.js` comes into play.

### The Glee Config File

`glee.config.js` is a JavaScript file exporting an asynchronous function, structured as follows:

```js
export default async function () {
  // Configuration details go here...
}
```

This function should return an object with configurable properties:

```js
export default async function () {
  return {
    glee: {},
    websocket: {},
    cluster: {},
    http: {}
  }
}
```

For example, a typical `glee.config.js` might look like this:

```js
export default async function () {
  return {
    glee: { // Core Glee configurations
      lifecycleDir: './lifecycle',
      functionsDir: './functions',
      asyncapiFilePath: './asyncapi.json',
      logs: { // Adjust default logging behavior
        incoming: 'channel-only', // Logs only the channel, not the message payload
        outgoing: 'none', // Disables outgoing logs
      }
    },
    docs: {
      enabled: true, // Toggles documentation generation
      folder: 'docs', // Destination folder for docs
      template: '@asyncapi/markdown-template' // Specifies the documentation template
    },
    ws: {
      server: {
        httpServer: customServer, // Custom HTTP server
        adapter: "native", // Defaults to 'native', can be 'socket.io' or a custom adapter
        port: process.env.PORT, // Server port
      }
    },
    cluster: {
      adapter: "redis", // Cluster adapter, default is Redis
      name: "cluster", // Cluster name
      url: "redis://localhost:6379", // URL for the cluster server (Redis in this case)
    },
    http: {
      server: {
        httpServer: customServer, // Custom HTTP server
        adapter: 'native', 
        port: process.env.PORT, // Server port
      },
    }
  };
}
```

In the return statement, configure the following options:

#### Core Glee Configurations
These settings are specific to Glee itself.

|Field|Default|Purpose|
|--|--|--|
|glee.gleeDir|`.glee`|Determines the Glee directory for compiled sources.|
|glee.lifecycleDir|`lifecycle`|Specifies the path to [lifecycle events](./lifecycle-events.md).|
|glee.functionsDir|`functions`|Designates the path to [functions](./functions.md).|
|glee.asyncapiFilePath|`asyncapi.(yaml \| yml \| json)`|Path to your AsyncAPI file.|
|glee.logs|default|Configures logging for incoming and outgoing messages.|
|glee.logs.incoming|"all"|Options: `channel-only`, `none`.|
|glee.logs.outgoing|"all"|Options: `channel-only`, `none`.|

#### Documentation Configuration
|Field|Purpose|
|--|--|
|docs.enabled|Enables or disables documentation generation.|
|docs.folder|Specifies the output directory for documentation.|
|docs.template|Determines the AsyncAPI template for docs generation.|

#### WebSocket Server Configuration
|Field|Purpose|
|--|--|
|ws.server|WebSocket server-specific settings.|
|ws.server.adapter|Selects the WebSocket server adapter: `native`, `socket.io`, or a custom one.|
|ws.server.httpServer|A custom HTTP server instance.|
|ws.server.port

|The port for the WebSocket server.|

#### Cluster Configuration
|Field|Purpose|
|--|--|
|cluster.adapter|Chooses the cluster communication adapter (default: Redis Pub/Sub).|
|cluster.name|The cluster's name.|
|cluster.url|URL of the server used by the cluster adapter.|

#### HTTP Server Configuration
|Field|Purpose|
|--|--|
|http.server|HTTP server-specific settings.|
|http.server.adapter|Selects the HTTP server adapter.|
|http.server.port|The port for the HTTP server.|
