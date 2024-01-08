---
title: 'Authentication functions'
weight: 70
---

# Getting started with Authentication functions

Authentication in Glee can be done using authentication functions. Authentication functions are files that export either one or both of the `clientAuth` and `serverAuth` Node.js functions:

```js
/* websocket.js */

export async function serverAuth({ authProps, done }) {
  //server auth logic
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  //client auth logic
}
```

Glee looks for authentication files in the `auth` directory by default but it can be configured using [glee config file](env-vars-config).
The name of the authentication file should be the name of the targeted server that the authentication logic should work for.

## Supported Authentication Values in asyncapi.yaml file

AsyncAPI currently supports a variety of authentication formats as specified in the [documentation](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject), however Glee supports the following authentication schemas.

- userPassword
- http ("bearer")
- httpApiKey
- Oauth2

A sample `asyncapi.yaml` for a **server** with security requirements and a `userPassword` security schemes is shown below:

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
      - $ref: '#/components/securitySchemes/userPass'

  ...

components:
  securitySchemes:
    userPass:
      type: userPassword

```

A sample `asyncapi.yaml` for a **client** that implements some of the requirements of the server above is as follows:

```yaml
##client asyncAPI schema
servers:
  trendingAnime:
    host: localhost:8081
    protocol: http
    security:
      - $ref: '#/components/securitySchemes/userPass'
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

Glee can act as both a server and a client. So the need for `serverAuth` and `clientAuth`. Glee acts as a client when the server name is included in the `x-remoteServers` property in the `asyncapi.yaml` file.

When Glee acts as a client, it can connect to a Glee server, and when Glee acts as a server it accepts connections from other Glee clients. Hence a Glee application can both accept connections from clients while also sending requests to other Glee applications (servers) at the same time.

When a security requirement is specified in the `asyncapi.yaml` file and Glee acts as a server, the `serverAuth` function should be implemented, if Glee acts as a client then the `clientAuth` function should be implemented. If Glee is being used as both client and server, then it should have both the `clientAuth` and `serverAuth` functions.

## Server Authentication in Glee

The `serverAuth` function takes an argument that can be destructured as follows

| Attribute  | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| done       | The done function that tells the server to proceed.             |
| authProps  | The authentication parameters recieved from the client.         |
| serverName | The name of the server/broker from which the event was emitted. |
| doc        | The parsedAsyncAPI schema                                       |

#### done() function

The `done()` parameter in the `serverAuth` function allows the broker/server to know what to do next depending on the boolean value you pass to it.

```js
/* websocket.js */

export async function serverAuth({ authProps, done }) {
  if (isValidUser(authProps)) {
    done(true);
  } else {
    done(false);
  }
}
```
**Parameters for done():**

*Authentication Result (Boolean): true for success, false for failure.*

When `true` is passed to the done parameter, the server/broker knows to go ahead and allow the client to connect, which means authentication has succeeded. However if the `done` parameter is called with `false` then the server knows to throw an error message and reject the client, which means authentication has failed.

`done()` should always be the last thing called in a `serverAuth` function, Glee won't execute any logic beyond the `done()` call.

#### authProps

`authProps` implements a couple of methods that allows the server to retrieve the authentication parameters from the client, below are the current available methods;

```js
export async function serverAuth({ authProps, done }) {
  //some network request

  authProps.getOauthToken()
  authProps.getHttpAPIKeys('api_key')
  authProps.getToken()
  authProps.getUserPass()

  done(false)
}
```

| Method                 | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `getOauthToken()`      | returns the oauth authentication parameter                                                       |
| `getHttpAPIKeys(name)` | returns the HttpAPIKeys parameter with the specified name from either headers or query parameter |
| `getToken()`           | returns the http bearer token parameter                                                          |
| `getUserPass()`        | returns username and password parameters                                                         |

## Client Authentication in Glee

The `clientAuth` function also takes an argument, and it's argument can be destructured as follows

| Attribute      | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| parsedAsyncAPI | The parsedAsyncAPI schema.                                                            |
| serverName     | The name of the server/broker from with the authentication parameters are being sent. |

### Possible authentication parameters

The possible authentication parameters are shown in the code snippet below:

```js
export async function clientAuth({ serverName }) {
  return {
    token: process.env.TOKEN,
    oauth: process.env.OAUTH2,
    apiKey: process.env.APIKEY,
    userPass: {
      user: process.env.user,
      password: process.env.password,
    },
  }
}
```

The name of the authentication parameters should be the same as **the names specified in the `asyncapi.yaml` file.**

| auth type                             | values                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------- |
| http bearer (JWT)                     | Value should be a JWT string                                           |
| Oauth2                                | The value should should be a string                                    |
| httpApiKey in headers or query params | The value should be a string                                           |
| userPass                              | The value should be an object with the user and password as properties |
