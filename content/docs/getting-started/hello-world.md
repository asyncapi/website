---
title: "Hello world"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 101
---

{{% notice %}}
This article is about version 2.0.0-rc1 of the specification. Please note that documentation and tooling support are minimum or inexistent yet. We're working hard
to update everything to version 2.0.0 as soon as possible. Thanks for your patience.
{{% /notice %}}

Let's define an application that's capable of receiving a "hello {name}" message.

```yaml
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
```

Let's get into the details of the sample specification:

{{<code lang="yaml" lines="1,2">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

The first line of the specification starts with the document type (AsyncAPI) and the version (2.0.0). This line doesn't have to be the first one but it's a recommended practice.

The second line identifies the application and is both required and unique. In a real environment using 'urn:com:mycompany:hello-world-app' is preferred rather than 'urn:hello-world-app', for example.

{{<code lang="yaml" lines="3-5">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

The "info" object contains the minimum required information about the application. It contains the title, which is a memorable name for the API, and the version. While it's not mandatory, it is strongly recommended to change the version whenever you make changes to the API.

{{<code lang="yaml" lines="6-12">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

The 'channels' section of the specification houses all of the mediums where messages flow through. For example, some systems use 'topic, 'event name' or 'routing key'. Different kinds of information flow through each channel similar to the analogy of TV channels.

In our example, we only have one channel called `hello`. The sample app subscribes to this channel to receive "hello {name}" messages.

{{<code lang="yaml" lines="7-10">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

You can read the highlighted lines as "this is the **payload** of the **message** your app is **subscribed** to on the «**hello**» channel".

{{<code lang="yaml" lines="10-12">}}
asyncapi: '2.0.0-rc1'
id: 'urn:hello-world-app'
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

The 'payload' object defines how the message must be structured. In this example, the message must be a string and match the given regular expression in the format "hello {name}" string.

## Conclusion

We've seen how to define our simple Hello World app but, **how do we send a message to our Hello World application?**

On the next chapter, you'll learn about the `servers` property.

{{%next-chapter url="/docs/getting-started/servers"%}}
