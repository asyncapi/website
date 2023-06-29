---
title: Introduction to Glee, A spec first framework
date: 2023-06-28T4:52:19+05:30
type: Engineering
canonical: https://souvikns.com/blog/AsyncAPI/Introduction-to-glee
tags: ['guide']
cover: /img/posts/glee-banner.webp
authors:
  - name: Souvik De
    photo: /img/avatars/souvikns.webp
    link: https://twitter.com/souvik_ns
    byline: AsyncAPI Maintainer
excerpt: Glee is a powerful spec-first framework that streamlines the process of building server-side applications. By integrating your code with the spec, Glee takes care of the heavy lifting involved in creating and managing connections, allowing you to focus on the business logic that truly matters.
---

For the last year, I have been working full-time on AsyncAPI, where I have actively taken part in building a new framework called [glee](https://github.com/asyncapi/glee). This is the first of many to come blogs where I will be talking about glee, and all the cool stuff we can build with it. In this blog, I will just introduce glee and give a broad overview of how to get started and keep up with glee's development.

# Introduction 

[Glee](https://github.com/asyncapi/glee) is a powerful spec-first framework that streamlines the process of building server-side applications. By integrating your code with the spec, Glee takes care of the heavy lifting involved in creating and managing connections, allowing you to focus on the business logic that truly matters.

 - It makes sure your code, specification and documentation are synchronized, glee eliminates the possibility to stray from the spec, which compels you to embrace a spec-first methodology, ensuring that your API is always entirely defined and coherent. When your API evolves it does so along with the specification and documentation.

 - Glee simplifies the process of creating and maintaining connections, allowing you to concentrate solely on developing code that meets your business needs. By handling performance, scalability, resilience, and all other aspects necessary for production-readiness, Glee frees you from the burden of managing these technicalities, enabling you to focus on delivering a high-quality application that meets the demands of your users.


# Getting Started With Glee

Let's create a simple WebSocket API using glee to understand its magic. We will create a simple WebSocket server that receives a current time from the client and then send a "good morning", "good evening" or "good night" respectively.

### Setting up a glee project.

To work with Glee, you must install NPM and NodeJs version 10 or higher. To check if you have both installed, run the following commands in your terminal. 

```bash
# check if node is installed
node -v
# or
node --version

# check if NPM is installed
npm -v
# or
npm --version

```

If you don't have any of the above tools missing go ahead and install them.



#### Create glee project 

We recommend creating a new Glee app using our official [CLI](https://github.com/asyncapi/cli) which sets up everything automatically. (You don't need to create an empty directory. create-glee-app will make one for you.) To create a project, run:

```bash

asyncapi new glee 

```

> To install AsyncAPI CLI either use [npm](https://www.npmjs.com/package/@asyncapi/cli) or install binaries for your operating system from https://github.com/asyncapi/cli/releases 


Once the process is complete you should have a new Glee app ready for development and see these files that were made.

<center>

![Glee File Structure](/img/posts/glee-introduction/glee-file-structure.webp)

</center>



#### Define our Spec for our API.

Glee being a spec-first framework, development starts with defining your API spec. For our case we will define our API:


```yaml:asyncapi.yaml
asyncapi: 2.1.0
info:
  title: Greet Bot
  version: 0.1.0
servers:
  websockets:
    url: ws://0.0.0.0:3000
    protocol: ws
channels:
  greet:
    publish:
      operationId: onGreet
      message:
        $ref: '#/components/messages/time'
    subscribe:
      message:
        $ref: '#/components/messages/greet'
components:
  messages:
    time:
      payload:
        type: object
        properties:
          currentTime:
            type: number
          name:
            type: string
    greet:
      payload:
        type: string
```

This will be the Specification that defines our API, in our case, it is very simple, as we will be sending a name and the time of the day, and our API will greet us accordingly. 

One thing to note here is the `operationId`, this is needed and is a crucial part of glee, as this is how we will be connecting our business logic with our spec, `operationId` is the name of the function that will be called every time a certain operation occurs. In our case whenever `/greet` channel received a message. 

#### Define our operation function.

Now for our case, we will be adding a file `functions/onGreet.js` and writing up the logic for parsing our time and sending a response.

```js:functions/onGreet.js
export default async function (event) {
  const { name, time } = event.payload
  const t = new Date(time)
  const curHr = t.getHours()
  let response = ''
  if (curHr < 12) {
    response = `Good Morning ${name}`
  } else if (curHr < 18) {
    response = `Good Afternoon ${name}`
  } else {
    response = `Good Evening ${name}`
  }
  return {
    reply: [
      {
        payload: response,
      },
    ],
  }
}
```

Every file in the functions folder acts as a handler to develop business logic for glee, every file should export an async function that receives an event parameter, where you have access to payload and server details. 


#### Running and testing your application 

We will not execute the application and carry out testing with Postman to ensure that it is functioning as intended. 

Now to run your glee application, just run:

```bash
npm run dev
# or 
npm run start
```

Then open Postman and checkout the endpoint: 

![postman](/img/posts/glee-introduction/postman-glee-greet.webp)


# Conclusion

So this is how easy it is to build a WebSocket API using Glee. You can check out the example code [here](https://github.com/Souvikns/greet-bot).

Glee is rapidly evolving and aims to support a variety of protocols, and while it is still in development, it currently has stable support for MQTT and WebSocket. As a team, we are eager to gather feedback from users like you to help us improve glee and make it even better. If you are interested in trying out glee, we would greatly appreciate it if you could take the time to test it out and share your thoughts about your experience with us. Your feedback will be invaluable in helping us identify areas for improvement and making glee more user-friendly and effective. The best way to communicate with us is through [GitHub Issues](https://github.com/asyncapi/glee/issues).

