---
title: 'HttpApiKey Authentication'
weight: 90
---

## Getting Started with HttpAPIKey Authentication

This guide will walk you through how to implement authentication using the `httpApiKey` security scheme in Glee.

Below is a sample `asyncapi.yaml` for a server with security requirements and the `HttpApiKey` security scheme:

```yaml
## Server AsyncAPI Schema
asyncapi: 3.0.0
info:
  title: AsyncAPI IMDB Server
  version: 1.0.0
  description: This app is a dummy server that streams the trending/upcoming anime.
servers:
  trendingAnimeServer:
    host: 'localhost:8081'
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/apiKey'

      ...

components:
  securitySchemes:
    apiKey:
      type: httpApiKey
      name: api_key
      in: query

```

A sample `asyncapi.yaml` for a client that implements some of the requirements of the server above:

```yaml
## Client AsyncAPI Schema
servers:
  trendingAnime:
    host: localhost:8081
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/apiKey'
  testwebhook:
    host: localhost:9000
    protocol: ws
x-remoteServers:
  - trendingAnime

  ...

components:
  securitySchemes:
    apiKey:
      type: httpApiKey
      name: api_key
      in: query

```

The `httpApiKey` can be located in either the header or query parameter.

The client `asyncapi.yaml` file **does not need to implement all the security requirements of the server; it only needs to implement the ones it uses, like *httpApiKey* here.**

### Client Side

Following the client `asyncapi.yaml` file above, create a file named `trendingAnime.ts` in the `auth` directory, as this is the server that has the security property. 

```bash
touch auth/trendingAnime.ts
```

When using the `HttpApiKey` security scheme, it is important to pass the parameters as follows:

```js
export async function clientAuth({ parsedAsyncAPI, serverName }) {
  return {
    apiKey: process.env.APIKEY
  }
}
```

`apiKey` should be the name of the security requirement as specified in your `asyncapi.yaml` file, and its value should be a string.

### Server Side

From the server `asyncapi.yaml` file above, create a file named `trendingAnimeServer.ts` in the `auth` directory, as this is the server that has the security property. 

```bash
touch auth/trendingAnimeServer.ts
```

On the server side, you can retrieve the values as follows:

```js

export async function serverAuth({ authProps, done }) {
  authProps.getHttpAPIKeys('api_key')
  
  done(true)
}

```

So, `getHttpAPIKeys(name)` takes a name parameter to specify the name of the httpApiKey that is desired. Then it returns an object containing the `httpApiKey` value that is sent from the client.
