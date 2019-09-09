---
title: "Reusing schemas"
date: 2019-04-15T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 140
---

{{% notice %}}
This article is about version 2.0.0-rc1 of the specification. Please note that documentation and tooling support are minimum or inexistent yet. We're working hard
to update everything to version 2.0.0 as soon as possible. Thanks for your patience.
{{% /notice %}}

To illustrate how schema reusability works on AsyncAPI, we're going to enhance the [Hello world publisher application](/docs/getting-started/publishing) to make it, say, a bit less "hello world":

{{<code lang="yaml" lines="19-26">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
channels:
  hello:
    publish:
      message:
        $ref: '#/components/messages/hello-msg'
components:
  messages:
    hello-msg:
      payload:
        type: object
        properties:
          name:
            type: string
          sentAt:
            type: string
            description: The date and time a message was sent.
            format: datetime
{{</code>}}

The payload is now a JSON object instead of a raw string. This object must contain the properties "name" and "sentAt". We'll use the name to know who we have to say hello to, and "sentAt" to register the date and time our application sent the message. An example of a valid object would be:

{{<code lang="json">}}
{
  "name": "Jess",
  "sentAt": "2018-11-13T20:20:39+00:00"
}
{{</code>}}

{{%hint%}}
Are you new to JSON Schema? Check out their guide {{%link "https://json-schema.org/understanding-json-schema/basics.html" %}}Understanding JSON Schema{{%/link%}}.
{{%/hint%}}

We updated our publisher to send a JSON object. Since the subscriber application is pointing to this definition, there's no need to change it on the subscriber side. Reusability at its best.

However, it looks like the `sentAt` property is going to appear on every message. To keep it simple, we only have a message (hello-msg) but in real-world environment you'll have more than one and most probably across different channels too. Say, for instance, we want to add a "goodbye" message:

{{<code lang="yaml" lines="15-18,31-38">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
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
            type: string
            description: The date and time a message was sent.
            format: datetime
    goodbye-msg:
      payload:
        type: object
        properties:
          sentAt:
            type: string
            description: The date and time a message was sent.
            format: datetime
{{</code>}}

As you can see, the definition is almost the same as the one for `hello-msg`. The only difference is that the `goodbye-msg` message doesn't have a "name" property. However, it the definition of `sentAt` is repeated, so let's reuse this schema:

{{<code lang="yaml" lines="28,34,35-39">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycompany.com
    protocol: amqp
    description: This is "My Company" broker.
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
{{</code>}}

As we did with messages in the previous chapter, we moved the definition of the `sentAt` property to components > schemas > sent-at, and referenced it from the `hello-msg` and `goodbye-msg` messages.

## Conclusion

Schema reusability is possible inside the same document and across multiple ones too. Move schema definitions to the components section and then use "$ref" to point to them wherever you need them.

On the next chapter, you'll learn how to add security to your API.

{{%next-chapter url="/docs/getting-started/security"%}}
