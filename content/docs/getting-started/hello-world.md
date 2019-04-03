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

<pre class="language-yaml line-numbers" data-line="1,2"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

The first line of the specification starts with the document type (AsyncAPI) and the version (2.0.0) as a recommended practice.

The second line identifies the application and is both required and unique. In a real environment using 'urn:com:mycompany:hello-world-app' is preferred rather than 'hello-world-app', for example.

<pre class="language-yaml line-numbers" data-line="3-9"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

The 'channels' section of the specification houses all of the mediums where messages flow through. For example, some systems use 'topic, 'event name' or 'routing key'. Different kinds of information flow through each channel similar to the analogy of TV channels.

In our example, we only have one channel called `hello`. The sample app subscribes to this channel to receive "hello {name}" messages.

<pre class="language-yaml line-numbers" data-line="4-7"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

You can read the highlighted lines as "this is the **payload** of the **message** your app is **subscribed** to on the «**hello**» channel".

<pre class="language-yaml line-numbers" data-line="7-9"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

The 'payload' object defines how the message must be structured. In this example, the message must be a string and match the given regular expression in the format "hello {name}" string.

## Conclusion

We've seen how to define our simple Hello World app but, **how do we send a message to our Hello World application?**

Go to the next chapter to [learn more about the `servers` property](/docs/servers).
