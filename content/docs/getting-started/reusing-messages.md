---
title: "Reusing messages"
date: 2019-04-15T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 130
---

{{% notice %}}
This article is about version 2.0.0-rc1 of the specification. Please note that documentation and tooling support are minimum or inexistent yet. We're working hard
to update everything to version 2.0.0 as soon as possible. Thanks for your patience.
{{% /notice %}}

When defining the APIs of a producer and a consumer, we soon realize there's —at least— one thing that is repeated: the messages. In this chapter, you'll learn how to reuse message definitions so you don't have to maintain multiple copies of the same thing (with the problems it can carry.)

Let's start with the publisher application. Instead of copying the definition above and pasting it over on the subscriber, let's use the "components" section as follows:

{{<code lang="yaml" lines="15-20">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycomapny.com
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
        type: string
        pattern: '^hello .+$'
{{</code>}}

The "components" section is an object that holds reusable parts of an AsyncAPI definition. We moved the definition of the message there and assigned it a name: "hello-msg". Why assigning a name? Check out line 14 of the definition:

{{<code lang="yaml" lines="14">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-publisher'
info:
  title: Hello world publisher application
  version: '0.1.0'
servers:
  - url: broker.mycomapny.com
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
        type: string
        pattern: '^hello .+$'
{{</code>}}

The "$ref" property allows us to indicate that our message is not here but, instead, it's defined in the URL provided. The URL is a JSON Pointer and reads as follow:

1. The `#` (pound) symbol means the definition is in this same document.
2. `/components` means the definition is placed in the components section, which is at the root of the document (notice the `/`).
3. `/components/messages` means the definition is placed in the messages section inside components.
4. `/components/messages/hello-msg` means the definition of the message can be finally found inside `hello-msg` inside the messages section.

{{%hint%}}
JSON Pointer is an IETF standard. Curious to know more about it? Check out {{%link "https://tools.ietf.org/html/rfc6901" %}}RFC 6901{{%/link%}}.
{{%/hint%}}

While this is cool for reusing messages inside the same document, it doesn't solve our problem when we want to reuse messages across AsyncAPI documents. Or does it? Check this out:

{{<code lang="yaml" lines="14">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
servers:
  - url: broker.mycomapny.com
    protocol: amqp
    description: This is "My Company" broker.
channels:
  hello:
    subscribe:
      message:
        $ref: 'https://helloworldapp.com/publisher.yaml#/components/messages/hello-msg'
{{</code>}}

Assuming the AsyncAPI file for the publisher can be found at `https://helloworldapp.com/publisher.yaml`, and going back to the subscriber application —the initial hello world application— we just need to change a single line to indicate that the message is defined in the publisher application. That way, you only have the definition in one place and reuse it all over.

{{%remember%}}
We made the subscriber message definition point to the one on the publisher. This is cool to keep it simple as an example but, on the long term, it creates coupling between the documents. {{%link "https://medium.com/asyncapi/organizing-your-asyncapi-documents-12bccecd9ced" %}}Read this article{{%/link%}} if you want to learn a better way of organizing your AsyncAPI documents.
{{%/remember%}}

## Conclusion

Message reusability is possible inside the same document and across multiple ones. Move definitions to the components section and then use "$ref" to point to them wherever you need them.

On the next chapter, you'll learn how to reuse schemas.

{{%next-chapter url="/docs/getting-started/reusing-schemas"%}}
