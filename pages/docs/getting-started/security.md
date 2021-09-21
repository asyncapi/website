---
title: "Adding security"
date: 2019-04-16T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 150
---

In production environments, your API may have to access a message broker that's protected by some auth mechanisms. Examples of these are:

* User & password
* Certificates
* API keys
* OAuth 2

If you're using AsyncAPI to define an API that connects to a message broker, you'll most probably make use of user/password or certificates. Traditionally, message brokers are infrastructure pieces that serve an internal purpose and they're not exposed to the public. That's why their security mechanisms are also simpler than what we're used to with REST APIs. However, AsyncAPI also helps you define your HTTP streaming APIs and therefore it supports more sophisticated mechanisms like OAuth2 or OpenID.

Continuing with the `hello world` application example, let's learn how to define a simple security scheme (mechanism) for it.

<CodeBlock highlightedLines={[10,11,42,43,44]}>
{`asyncapi: '2.1.0'
info:
  title: Hello world application
  version: '0.1.0'
servers:
  production:
    url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
    security:
      - user-password: []
channels:
  hello:
    publish:
      message:
        $ref: '#/components/messages/hello-msg'
  goodbye:
    publish:
      message:
        $ref: '#/components/messages/goodbye-msg'
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

The example above shows how to specify that your server (the Kafka broker) requires a user and a password to establish a connection. Let's break this down:

1. There's a new property in the server object called `security`. It's an array and can contain multiple security mechanisms. You chose to add one called "user-password". This is simply a memorable name that you give to this `security` scheme but, whatever name you choose, it must be defined in the `components/securitySchemes` section. You might have also noticed its value is an empty array. It's because some security schemes allow for extra configuration but, since this is not the case in this example, leave the array empty.
2. We've added a new section called `securitySchemes` under `components`. Inside it, you can find the definition of your `user-password` mechanism. This section makes it clear that you're speaking about a `user/password` mechanism is the `type: userPassword` in line 44.

<Remember title="Hint">

There are many more security schemes. Learn more about them <a href="/docs/specifications/2.1.0/#securitySchemeObject" className="text-teal-600 font-medium hover:underline">here</a>.

</Remember>

## Conclusion

You're now able to define what security mechanisms your application needs to connect to the server. You've seen how to define the requirement of a user and a password, which is the most common use case.

At this point, you know AsyncAPI well enough to create a simple `Hello world application`. However, real use cases are more complicated than that. Next tutorials can teach you how to create real-world use cases, from zero to production.

<ChapterSuggestions
  suggestions={[
    {
      href: '/docs/tutorials/streetlights',
      title: 'Streetlights Tutorial',
      description: 'Real-world IoT example using AsyncAPI.',
      linkText: 'Go to the streetlights tutorial',
    }
  ]}
/>
