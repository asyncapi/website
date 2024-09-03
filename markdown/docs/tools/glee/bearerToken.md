---
title: 'HTTP Authentication (Bearer Token)'
weight: 80
---

## Getting Started with Bearer Token Authentication

Bearer Token authentication is one of the most popular forms of authentication and is widely used due to its perceived security. This guide will walk you through how to implement bearer token authentication in Glee.

Below is a sample `asyncapi.yaml` for a server with security requirements and a user password security scheme:

```yaml
## Server AsyncAPI Schema
asyncapi: 3.0.0
info:
  title: AsyncAPI IMDB Server
  version: 1.0.0
  description: This app is a dummy server that streams trending/upcoming anime.
servers:
  trendingAnimeServer:
    host: 'localhost:8081'
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/token'

      ...

components:
  securitySchemes:
    token:
      type: http
      scheme: bearer
      bearerFormat: JWT

```

A sample `asyncapi.yaml` for a client that implements some of the requirements of the server above:

```yaml
## Client AsyncAPI Schema
servers:
  trendingAnime:
    host: localhost:8081
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/token'
  testwebhook:
    host: localhost:9000
    protocol: ws
x-remoteServers:
  - trendingAnime

  ...

components:
  securitySchemes:
    token:
      type: http
      scheme: bearer
      bearerFormat: JWT

```

The Client `asyncapi.yaml` file **doesn't need to implement all the security requirements of the server; it only needs to implement the ones it uses, like *http (bearer token)* here.**

### Client Side

Following the client `asyncapi.yaml` file above, create a file named `trendingAnime.ts` in the `auth` directory, since that is the server that has the security property. 

```bash
touch auth/trendingAnime.ts
```

When using the `bearer` security scheme, pass the parameters as follows:

```js
export async function clientAuth({ parsedAsyncAPI, serverName }) {
  return {
    token: process.env.TOKEN
  }
}
```

Glee will utilize the `token` for server authentication, employing it in the header with the format: `Authorization: Bearer \{token\}`.

### Server Side

From the server `asyncapi.yaml` file above, create a file named `trendingAnimeServer.ts` in the `auth` directory, since that is the server that has the security property. 

```bash
touch auth/trendingAnimeServer.ts
```

On the server side, you can retrieve the values as follows:

```js

export async function serverAuth({ authProps, done }) {
  authProps.getToken()
  // Your authentication logic here...
  done(true || false)
}

```

So, `getToken()` returns a string containing the token sent from the client.