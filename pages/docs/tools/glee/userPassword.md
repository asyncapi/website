---
title: 'Username and Password Authentication'
weight: 100
---

## Getting started with username and password authentication

User and password authentication is one of the most basic forms of authentication. This guide will walk through how to implement username and password authentication in Glee.

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
      - $ref: '#/components/securitySchemes/userPass

  ...

components:
  securitySchemes:
    userPass:
      type: userPassword

```

A sample `asyncapi.yaml` for a client that implements some of the requirements of the server above is as follows:

```yaml
##client asyncAPI schema
servers:
  trendingAnime:
    host: localhost:8081
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/userPass
  testwebhook:
    host: localhost:9000
    protocol: ws
x-remoteServers:
  - trendingAnime

  ...

components:
  securitySchemes:
    userPass:
      type: userPassword

```

**The Client asyncapi.yaml file does not need to implement all the security requirements in the server, it only needs to implement the ones that it uses like *userPassword* here.**

### Client Side

Following the client `asyncapi.yaml` file above, create a file named `trendingAnime.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnime.ts
```

When using the `userPassword` security scheme, it is important that you pass the parameters as follows:

```js
export async clientAuth({ parsedAsyncAPI, serverName }) {
  return {
    userPass: {
      user: process.env.user,
      password: process.env.password,
    },
  }
}
```

`userPass` should be the name of the security requirement as specified in your `asyncapi.yaml` file, then pass `user` and `password` as it's properties


### Server side

From the server `asyncapi.yaml` file above, create a file named `trendingAnimeServer.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnimeServer.ts
```

On the server side, you can retrieve the values as follows

```js

export async serverAuth({ authProps, done }) {
  authProps.getUserPass()
  
  done(true)
}

```

So, `getUserPass()` returns an object containing the username and password that is sent from the client.
