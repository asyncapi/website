---
title: "Hello world"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 101
---

Let's define an application that's capable of receiving a "hello {name}" message.

```yaml
asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
```

Let's get into the details of the sample specification:

{{<code "yaml" "1,2">}}
asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

The first line of the specification starts with the document type (AsyncAPI) and the version (2.0.0). This line doesn't have to be the first one but it's a recommended practice.

The second line identifies the application and is both required and unique. In a real environment using 'urn:com:mycompany:hello-world-app' is preferred rather than 'hello-world-app', for example.

{{<code "yaml" "3-9">}}
asyncapi: '2.0.0'
id: hello-world-app
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

{{<code "yaml" "4-7">}}
asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
{{</code>}}

You can read the highlighted lines as "this is the **payload** of the **message** your app is **subscribed** to on the «**hello**» channel".

{{<code "yaml" "7-9">}}
asyncapi: '2.0.0'
id: hello-world-app
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

Go to the next chapter to [learn more about the `servers` property](/docs/servers).
