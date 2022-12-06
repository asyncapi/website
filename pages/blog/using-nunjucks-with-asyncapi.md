---
title: 'Nunjucks templating explained on the basis of AsyncAPI specification'
date: 2020-03-03T08:00:00+01:00
type: Engineering
tags:
  - Nunjucks
cover: /img/posts/nunjucks-asyncapi-cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
---

> **Edit 14.04.2021**

In this post, I explain how you can use Nunjucks to template information extracted from an AsyncAPI file. I also write how you can make it even easier using Nunjucks inside the AsyncAPI Generator. Now, we also have a [React-based](https://github.com/asyncapi/generator/blob/master/docs/react-render-engine.md) render engine inside the generator, and it is far more developer-friendly. I encourage you to try it out. 

Specifications exist for a reason. Among other things, they help to bring quality, consistency, and standardize a given area. They are a great use case for templating engines. You can prepare a template that generates something from any document that follows a particular specification. You can generate whatever you want, docs, code, and diagrams. The sky is the limit.

Templating is a vast topic that is impossible to cover in a single post. In JavaScript alone, there is a zoo of different [templating engines](https://colorlib.com/wp/top-templating-engines-for-javascript/). This is why I focus here only on one engine for JavaScript, which is [Nunjucks](https://mozilla.github.io/nunjucks/). Why? Soon you'll figure that out.

> **tl;dr**
> In case you don't want to read and prefer to jump right into code. Go to this CodeSandbox project, but keep in mind you'll miss the important context and explanation.
> [![Edit learning-nunjucks](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/learning-nunjucks-wis89?fontsize=14&hidenavigation=1&theme=dark)

## What is AsyncAPI?

![](/img/posts/nunjucks-asyncapi.webp)

[AsyncAPI](https://www.asyncapi.com/) is a specification that you use to create machine-readable definitions of your event-driven APIs:

- It focuses on the application from the API user perspective. You describe what the user can do with the API, subscribe or publish to it.
- It is protocol-agnostic so that you can use it for APIs using Kafka or MQTT, and many others.
- It supports many different schema formats, so you can describe messages payload schema in a format that you already use like, for example, Avro.

## What is Nunjucks?

![](/img/posts/nunjucks-nunjucks.webp)

[Nunjucks](https://mozilla.github.io/nunjucks/) is a templating engine for JavaScript, inspired by [Jinja](https://palletsprojects.com/p/jinja/). It has many nifty features that make templating really nice:

- Variables declaration
- Built-in filters
- Way to create custom filters
- Chaining filters
- Includes
- Macros

## Nunjucks basics by example

All examples shown in this post can be explored in action in below CodeSandbox project.

<iframe src="https://codesandbox.io/embed/learning-nunjucks-wis89?autoresize=1&codemirror=1&fontsize=14&theme=dark" className="w-full h-64 border-0 rounded overflow-hidden" title="learning-nunjucks" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" />

In this learning project, I created a simple Express app that handles super short documentation generated from the AsyncAPI file. It is just a small sample of things that you can get from AsyncAPI using Nunjucks.

I picked Nunjucks here for a reason. AsyncAPI community maintains [a tool for generating](https://github.com/asyncapi/generator/) different things from the specification document, and it is using Nunjucks as a templating engine. This basically means, use my CodeSandbox to experiment with Nunjucks, but if you plan to build some serious template for AsyncAPI, do it with the [generator](https://github.com/asyncapi/generator/) or reuse existing templates.

### Variables declaration

You can declare inside the template a variable, that helps you in cases like loops. Their great use case is the same as in programming. If you have a value that you use more than once, assign it to a variable.

I used it to keep the name of the API:

```html
{% set apiName = asyncapi.info().title() %}
```

Then I could use it multiple times, for example in these sentences:

```html
<!-- Sentence 1 -->
The {{ apiName }} is licensed under {{ asyncapi.info().license().name() }}.

<!-- Sentence 2 -->
<p>
  Here you can find a list of channels to which you can publish and
  <strong>{{ apiName }}</strong> is subscribed to:
</p>
```

### Built-in filters

Unlike other engines, Nunjucks comes with many built-in helpers, called filters. There are around 40 different. You can for example easily make a value all uppercase:

```html
<!-- server.protocol() value comes as all lowercase -->
using {{ server.protocol() | upper }} protocol
```

### Creating custom filters

Built-in filters are awesome, but sometimes you need to create your filters. In my example, I had to build a filter that helps me to modify the `server.url()` value.

In the AsyncAPI document, you can specify a server that the application uses to publish and consume messages from. In the URL, you are allowed to use variables like this: `test.mosquitto.org:{port}`. Such a variable can be described with different levels of detail. You can provide a default value and even an enum of values.

In my example, instead of a URL like `test.mosquitto.org:{port}`, I wanted to get a fixed URL with a proper port number taken from the document:

```js
//replace is performed only if there are variables in the URL and they are declared for a server
function replaceVariablesWithValues(url, serverVariables) {
  const urlVariables = getVariablesNamesFromUrl(url);
  const declaredVariables = urlVariables.filter((el) =>
    serverVariables.hasOwnProperty(el[1])
  );

  if (urlVariables.length !== 0 && declaredVariables.length !== 0) {
    let value;
    let newUrl = url;

    urlVariables.forEach((el) => {
      value = getVariableValue(serverVariables, el[1]);

      if (value) {
        newUrl = newUrl.replace(el[0], value);
      }
    });
    return newUrl;
  }
  return url;
}

function getVariablesNamesFromUrl(url) {
  let result = [],
    array;
  const regEx = /{([^}]+)}/g;

  while ((array = regEx.exec(url)) !== null) {
    result.push([array[0], array[1]]);
  }

  return result;
}

function getVariableValue(object, variable) {
  const keyValue = object[variable]._json;

  if (keyValue) return keyValue.default || (keyValue.enum && keyValue.enum[0]);
}
```

Such a filter is very handy to use, the same as the built-in filters. You can additionally enrich its context. Take a look below where you can see that my filter gets not only `server.url()` value as a context but also `server.variables()`:

```html
{{ server.url() | replaceVariablesWithValues(server.variables()) }}
```

### Chaining filters

Built-in filters, custom filters...that is not all. Chaining of the filters is like an icing on the cake.

![](/img/posts/nunjucks-cherry.webp)

The same case with URL. The URL after replacing variables with values, I want to transform it into a clickable element and make it part of the DOM. All of it made easy thanks to chaining:

```html
{{ server.url() | replaceVariablesWithValues(server.variables()) | urlize | safe
}}
```

### Includes

You can share static parts of the template. This allows you to decrease the size of templates and make maintenance easier. My example here is not very complex, and I've added it to the template to make the point that it is possible:

```html
<!-- content of space.html file -->
<hr />
<br />
```

I can include it as many times as I want across the templates like this:

```html
{% include "space.html" %}
```

### Macros

You can share not only static but also dynamic parts of the template. What does it mean? Let's take an HTML list as an example. From the syntax/structure perspective, it always looks the same, but the displayed values of the list are different. Macros are here to help you out to define a list element once. It is like a mixture of the include and a filter.

In the AsyncAPI document, I have a case where I want to list all the channels that the application uses. Actually, I want to have two lists: one list that has channels where the application is subscribed (`publish` operation) to receive messages and the other one where the application publishes (`subscribe` operation) messages to.

First you define a macro:

```html
{% macro listEl(value) %}
<li><strong>{{ value }}</strong></li>
{% endmacro %}
```

Then you can import macros in your template:

```html
{% import "macros.html" as helpers %}
```

You call macros like you typically call functions:

```html
{{ helpers.listEl(channelName) }}
```

## Conclusion

Don't build tools from scratch if there are others already available, and they are open for contributions. Trying something from scratch, as I did with the templating CodeSandbox for AsyncAPI, makes sense only for learning purposes.

Keep in mind that [AsyncAPI](https://www.asyncapi.com/) is an open community. We do not work on the specification only, but tools too. Join us on [Slack](https://www.asyncapi.com/slack-invite/) and help us build awesome tools or [donate](https://opencollective.com/asyncapi).

Take time to look into the [parser-js](https://github.com/asyncapi/parser-js/). I used it in my CodeSandbox to parse the AsyncAPI document to pass it to templates as a context.
