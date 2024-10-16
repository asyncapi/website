---
title: 'Authentication Functions'
weight: 70
---

# Getting Started with Authentication Functions

Authentication in Glee can be implemented using authentication functions. These functions are files that export one or both of the following Node.js functions: `clientAuth` and `serverAuth`:

```js
/* websocket.js */

export async function serverAuth({ authProps, done }) {
  // Server authentication logic
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  // Client authentication logic
}
```

Glee searches for authentication files in the `auth` directory by default. However, this can be configured using the [glee config file](env-vars-config). The authentication file's name should match the targeted server for which the authentication logic is intended.

## Supported Authentication Values in the asyncapi.yaml File

AsyncAPI supports a variety of authentication formats as specified in its [documentation](https://www.asyncapi.com/docs/reference/specification/v3.0.0#securitySchemeObject). Glee, however, supports the following authentication schemas:

- userPassword
- http ("bearer")
- httpApiKey
- Oauth2

Below is an example of a `asyncapi.yaml` file for a **server** with security requirements and a `userPassword` security scheme:

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
      - $ref: '#/components/securitySchemes/userPass'

  ...

components:
  securitySchemes:
    userPass:
      type: userPassword
```

Here's an example for a **client** that implements some requirements of the server mentioned above:

```yaml
## Client AsyncAPI Schema
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

Glee can function as both a server and a client. Hence, the need for both `serverAuth` and `clientAuth` functions arises. Glee acts as a client when the server name is included in the `x-remoteServers` property in the `asyncapi.yaml` file.

When Glee operates as a client, it can connect to a Glee server. Conversely, as a server, it accepts connections from other Glee clients. Thus, a Glee application can accept connections from clients while also sending requests to other Glee servers.

If a security requirement is specified in the `asyncapi.yaml` file, and Glee acts as a server, the `serverAuth` function should be implemented. If Glee acts as a client, then `clientAuth` should be implemented. If Glee is used as both client and server, both functions are necessary.

## Server Authentication in Glee

The `serverAuth` function takes an argument that can be destructured as follows:

| Attribute  | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| done       | The function that signals the server to proceed.                |
| authProps  | The authentication parameters received from the client.         |
| serverName | The name of the server/broker emitting the event.               |
| doc        | The parsed AsyncAPI schema.                                     |

#### done() Function

The `done()` parameter in the `serverAuth` function signals to the broker/server what action to take next, based on the boolean value passed.

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

- Authentication Result (Boolean): `true` for success, `false` for failure.

Passing `true` to the `done` parameter indicates that authentication has succeeded, and the server/broker can proceed to allow the client to connect. Conversely, if `false` is passed, the server will reject the client, indicating failed authentication.

The `done()` call should always be the last in the `serverAuth` function, as Glee will not execute any logic beyond this call.

#### authProps

The `authProps` parameter includes methods for the server to retrieve authentication parameters from the client. The current available methods are as follows:

```js
export async function serverAuth({ authProps, done }) {
  // Some network request
  authProps.getOauthToken()
  authProps.getHttpAPIKeys('api_key')
  authProps.getToken()
  authProps.getUserPass()

  done(false)
}
```

| Method                 | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `getOauthToken()`      | Returns the OAuth authentication parameter.                                                      |
| `getHttpAPIKeys(name)` | Returns the HttpAPIKeys parameter with the specified name from either headers or query parameter |
| `getToken()`           | Returns the HTTP bearer token parameter.                                                         |
| `getUserPass()`        | Returns username and password parameters.                                                        |

## Client Authentication in Glee

The `clientAuth` function also takes an argument that can be destructured as follows:

| Attribute      | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| parsedAsyncAPI | The parsed AsyncAPI schema.                                                           |
| serverName     | The server/broker's name from which the authentication parameters are being sent.     |

### Possible Authentication Parameters

The code snippet below illustrates the possible authentication parameters:

```js
export async function clientAuth({ serverName }) {
  return {
    token: process.env.TOKEN,
    oauth: process.env.OAUTH2,
    apiKey: process.env.APIKEY,
    userPass: {
      user: process.env.USER,
      password: process.env.PASSWORD,
    },
  }
}
```

The names of the authentication parameters should match **the names specified in the `asyncapi.yaml` file**.

| Auth Type                             | Values                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------- |
| HTTP bearer (JWT)                     | Value should be a JWT string.                                          |
| OAuth2                                | Value should be a string.                                              |
| httpApiKey in headers or query params | Value should be a string.                                              |
| userPass                              | Value should be an object with the user and password as properties.    |