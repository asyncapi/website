---
title: 'Http Authentication(Bearer Token)'
weight: 80
---

## Getting started with Bearer Token authentication

Bearer Token authentication is one of the most popular forms of authentication and is widely used because of its percieved security. This guide will walk through how to implement bearer token authentication in Glee.

A sample `asyncapi.yaml` for a server with security requirements and user password security scheme is shown below:

```yaml
##server asyncAPI schema
asyncapi: 3.0.0
info:
  title: AsyncAPI IMDB server
  version: 1.0.0
  description: This app is a dummy server that would stream the trending/upcoming anime.
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
##client asyncAPI schema
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

**The Client asyncapi.yaml file does't need to implement all the security requirements in the server, it only needs to implement the ones that it uses like &*http (bearer token)* here.**

### Client Side

Following the client `asyncapi.yaml` file above, create a file named `trendingAnime.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnime.ts
```

When using the `bearer` security scheme, it is important that you pass the parameters as follows:

```js
export async clientAuth({ parsedAsyncAPI, serverName }) {
  return {
    token: process.env.TOKEN
  }
}
```

Glee will utilize the `token` for server authentication, employing it in the header with the format: Authorization: Bearer {token}.

### Server side

From the server `asyncapi.yaml` file above, create a file named `trendingAnimeServer.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnimeServer.ts
```

On the server side, you can retrieve the values as follows

```js

export async serverAuth({ authProps, done }) {
  authProps.getToken()
  // your authentication logic here...
  done(true|false)
}

```

`getToken()` return a string which contains the token that was sent from the client.



