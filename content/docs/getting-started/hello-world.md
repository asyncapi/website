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

Let's get into the details of what we have here:

<pre class="language-yaml line-numbers" data-line="1,2"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

The first line tells us this is an AsyncAPI document and it's using version 2.0.0 of the specification. This line doesn't have to be the first one but it's a recommended practice.

The second line is an identifier for our application. It is mandatory and must be unique so, when doing real stuff, don't use `hello-world-app` but instead something more "unique" like `urn:com:mycompany:hello-world-app`.

<pre class="language-yaml line-numbers" data-line="3-9"><code>asyncapi: '2.0.0'
id: hello-world-app
channels:
  hello:
    subscribe:
      message:
        payload:
          type: string
          pattern: '^hello .+$'</code></pre>

And here is the `channels` section. A channel is the medium where the messages flow through. In some systems this is known as `topic`, `event name` or `routing key`. Like in TV channels, you may receive different kind of information on each one.

In our example, we only have one channel called `hello`. Our app is subscribing to this channel to receive "hello {name}" messages.

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

And last but not least, the `payload` object defines how our message would have to look like. In our case, it must be a string and match the given regular expression. In other words, it must be a "hello {name}" string.

## Conclusion

We've seen how to define our simple Hello World app but, **how do we send a message to our Hello World application?**

Go to the next chapter to [learn more about the `servers` property](/docs/servers).