---
title: "Adding security"
weight: 150
---

In production environments, your API may have to access a message broker that's protected by some auth mechanisms. 

Auth mechanism examples:
* User & password
* Certificates
* API keys
* OAuth 2

If you're using AsyncAPI to define an API that connects to a message broker, you'll probably use user/password or certificates. Traditionally, message brokers are infrastructure pieces that serve an internal purpose, and they're not exposed to the public. That's why their security mechanisms are also simpler than what we're used to with REST APIs. However, AsyncAPI also helps you define your HTTP streaming APIs, and therefore, it supports more sophisticated mechanisms like OAuth2 or OpenID. 

Continuing with the `hello world` application example, let's learn how to define a simple security scheme (mechanism) for it.

<CodeBlock highlightedLines={[10,11]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
servers:
  production:
    host: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
    security:
      - type: userPassword
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        $ref: '#/components/messages/hello-msg'
  goodbye:
    address: 'goodbye'
    messages:
      sayGoodbyeMessage:
        $ref: '#/components/messages/goodbye-msg'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'
  receiveGoodbye:
    action: 'receive'
    channel:
      $ref: '#/channels/goodbye'
components:
  messages:
    hello-msg:
      payload:
        type: object
        properties:
          name:
            type: string
          sentAt:
            $ref: '#/components/schemas/sent-at'
    goodbye-msg:
      payload:
        type: object
        properties:
          sentAt:
            $ref: '#/components/schemas/sent-at'
  schemas:
    sent-at:
      type: string
      description: The date and time a message was sent.
      format: datetime`}
</CodeBlock>

The example above shows how to specify that your server (a RabbitMQ broker) requires a user and a password to establish a connection. Let's break this down.

There's a property in the server object called `security`. It's an array and can contain multiple security mechanisms. You chose to specify only one mechanism which is `userPassword`.

A best practice is to put security details inside the `components.securitySchemes` section as it enables reusability across multiple servers. Below, you can see the same example, but this time, under server security, you see that `$ref` links to more security details located under the `user-password` object in `securitySchemes`.

<CodeBlock highlightedLines={[10,11,53,54,55]}>
{`asyncapi: 3.0.0
info:
  title: Hello world application
  version: '0.1.0'
servers:
  production:
    host: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
    security:
      - $ref: "#/components/securitySchemes/user-password"
channels:
  hello:
    address: 'hello'
    messages:
      sayHelloMessage:
        $ref: '#/components/messages/hello-msg'
  goodbye:
    address: 'goodbye'
    messages:
      sayGoodbyeMessage:
        $ref: '#/components/messages/goodbye-msg'
operations:
  receiveHello:
    action: 'receive'
    channel:
      $ref: '#/channels/hello'
  receiveGoodbye:
    action: 'receive'
    channel:
      $ref: '#/channels/goodbye'
components:
  messages:
    hello-msg:
      payload:
        type: object
        properties:
          name:
            type: string
          sentAt:
            $ref: '#/components/schemas/sent-at'
    goodbye-msg:
      payload:
        type: object
        properties:
          sentAt:
            $ref: '#/components/schemas/sent-at'
  schemas:
    sent-at:
      type: string
      description: The date and time a message was sent.
      format: datetime
  securitySchemes:
    user-password:
      type: userPassword`}
</CodeBlock>

<Remember title="Hint">

Learn more about the several kinds of <Link href="/docs/reference/specification/v2.5.0#securitySchemeObject"><span className="text-teal-600 font-medium hover:underline cursor-pointer">security schemes</span></Link>.

</Remember>

## Conclusion

You can now define what security mechanisms your application needs to connect to the server. You've also seen how to require a user and a password, which is the most common use case.

At this point, you know AsyncAPI well enough to create a simple `Hello world application`. However, real use cases are more complicated than that. The following tutorials can teach you how to create real-world use cases from zero to production.
