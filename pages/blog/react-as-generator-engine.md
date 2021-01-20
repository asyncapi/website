---
title: "Speed your template development with React"
date: 2021-01-25T00:07:00+01:00
type: Engineering
featured: true
tags:
  - Tools
  - Generator
  - Templating
  - React
  - Nunjucks
cover: /img/posts/react-as-generator-engine.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
    byline: AsyncAPI Core Team Member
  - name: Maciej Urbańczyk
    photo: /img/avatars/maciejurbanczyk.webp
    link: https://github.com/magicmatatjahu
    byline: AsyncAPI Core Team Member
---

React permanently changed the way how developers write web-apps. Personally, we love React and knew it would solve many pain points we where faced with Nunjucks. Therefore in the last [cycle](https://github.com/asyncapi/shape-up-process/issues/1) we integrated it as a template rendering engine into our [Generator](https://github.com/asyncapi/generator). This post is a short introduction for developers who write/want to write templates for AsyncAPI specification using React. It also includes a comparison to the default Nunjucks renderer.

## Getting started

Your React template always require [`@asyncapi/generator-react-sdk`](https://github.com/asyncapi/generator-react-sdk) as a dependency. `@asyncapi/generator-react-sdk` is required to access the `File` component which is required as a root component for a file to be rendered. Furthermore it provides some common components to make your development easier, like `Text` or `Indent`.

Let's consider a basic React template as the one below called `MyTemplate.js`:

```js
import { File, Text } from "@asyncapi/generator-react-sdk";

export default function({ asyncapi, params, originalAsyncAPI }) {
  return (
    <File name="asyncapi.md">
      <Text>Some text that should render as is</Text>
    </File>
  );
}
```

The exported default function returns a `File` component as a root component which the [Generator](https://github.com/asyncapi/generator) uses to figure out what file should be generated. In our case we overwrite the default functionality of saving the file as `MyTemplate.js` but instead use the filename `asyncapi.md`. It is then specified that we should render `Some text that should render as is\n` within that file. Notice the `\n` character at the end, this is something that is automatically added after the `Text` component.

For further information about components, props etc. see the [Generator React SDK](https://github.com/asyncapi/generator-react-sdk).

Using React you must also inform the [Generator](https://github.com/asyncapi/generator) which renderer you want use. For that, change the `renderer` field of `generator` object inside template's `package.json` file:

```json
{
  ...
  "generator": {
    "renderer": "react",
    ...
  }
}
```

More info about `generator` configuration's object is [here](https://github.com/asyncapi/generator/blob/master/docs/authoring.md#configuration-file).

## How it works

The process of creating content from React components consists of two main process: transpile and rendering.

The SDK has a custom transpiler which ensures that any directory are transpiled using [Rollup](https://www.npmjs.com/package/rollup). Rollup helps bundling all dependencies and transpile them into CommonJS modules. This is required because this library will be used through NodeJS (by AsyncAPI Generator) which does not understand these new modules natively and we do not want to limit the developer in which syntax they prefer nor how they want to separate code.

Also, SDK has its own reconciler. It traverses through each element in the template structure and transforms it into a pure string. Additionally, prop `children` is also converted to a regular string and stored in the `childrenContent` prop, which is appended to each component. Check below example, to understand this part (you can also see how to make composition using components):

```js
import { Text, Indent, IndentationTypes, render } from '@asyncapi/generator-react-sdk';

class ClassComponent extends React.Component {
  constructor(props) { 
    super(props);
  }

  render() {
    // In `childrenContent` prop is stored `text wrapped by custom component\n\n`.
    // The content of the `children` prop is transformed to string and saved to the `childrenContent` prop.
    return this.props.childrenContent;
  }
}

function FunctionComponent() {
  return (
    <Indent size={3} type={IndentationTypes.TABS}>
      indented text
      <ClassComponent>
        <Text newLines={2}>
          text wrapped by custom component
        </Text>
      </ClassComponent>
    </Indent>
  );
}

// content will be `\t\t\tindented text text wrapped by custom component\n\n`
const content = render(<FunctionComponent />);
```

Unfornatelly we have some restrictions:

- React hooks is not allowed.
- HTML tags at the moment is not supported.
- React internal components like `Fragments`, `Suspense` etc. are skipped.

## Comparison with Nunjucks

If you don't know, the existing templates developers were forced (if they used our Generator) to use [Nunjucks](https://mozilla.github.io/nunjucks/). It's a templating language, heavily focused on string literals, filters (similar to bash pipes) and partials called macros.

Below are some examples comparing doing those same things in Nunjucks and React. If you want check another, more complex, examples please see the updated [`template-for-generator-templates`](https://github.com/asyncapi/template-for-generator-templates) repository and the corresponding old [Nunjucks](https://github.com/asyncapi/template-for-generator-templates/tree/nunjucks) branch.

### Make reusable parts

It may sound trivial, but when writing any code, even a template, a programmer wants to create reusable parts that will separate the given, very frequent repeating logic.

As we mentioned, in Nunjucks partials are called macros, in React reusables are called `components` (we follow with React's nomenclature). Imagine that you are writing a template that produces a Markdown content. You need to create a reusable macro/component that will be able to render a list based on given an array of strings.

For example, using Nunjucks you can write something like:

```njk
{% macro list(data, type = "-") %}
{% for item in data %}
{{type}} {{item}}
{% endfor %}
{% endmacro %}

{% from "partials/list.njk" import list %}
{{ list(["one", "two", "three"]) }}
```

In React we can write it in this way:

```js
function List({ list = [], type = "-" }) {
  return list.map(item => `${type} ${item}\n`);
}

// use `List` component in another component
export function SimpleList() {
  return (
    <List list={["one", "two", "three"]} />
  );
}
```

Looking at both examples we see that in Nujucks we operate on string literals, it means that when passing data to a macro, you always need to know what type of data the macro takes. In React we operate on JS objects/variables. By this, your IDE should always inform you what value, of what type, you must pass to component. Also, Nunjucks's macro should be created inside `.partials` folder of template. Using React, you can create component whenever you want.

### Using third party packages

Using helper functions from third party packages, in Nunjucks you must apply them as [filters](https://github.com/asyncapi/generator/blob/master/docs/authoring.md#filters). For example, you want to use one function from [`Lodash`](https://lodash.com/) library like `lowerCase`. To do this, you must create a function inside `filters` folder to convert the function to Nunjucks's filter:

```js
// filters/lowerCase.js
const _ = require('lodash');  
const filter = module.exports;
filter.lowerCase = _.lowerCase;
```

And then you can use this function inside your template/macro:

```njk
{{ AsyncAPI rocks! | lowerCase }}
```

The main problem in this solution is that it creates unnecessary boilerplate - you must create function in the separate file. Another problem is that you operate on name of this helper function which means you must always remember which filters you have included in your template.

In opposite, in React you can use `Lodash` directly in your template:

```js
import _ from 'lodash';  

function MyComponent() {
  return _.lowerCase(`AsyncAPI rocks!`);
}
```

It is worth mentioning that when using packages in this way, you always operate on the reference to the function, not on its name, so you know what functions you have in the file's scope.

## Cons & Pros

Like any solution, React has its advantages as well as disadvantages.

We can list the advantages:

- Using React, you directly use JS. You don't need to learn custom syntax, only how React works under the hood. This is one of the problems with template engines like Nunjucks.
- It enables the possiblity of debugging your template (this is not possible with Nunjucks).
- It provides better error stack traces.
- Better tool support for development. As we mentioned, writing templates in JS, you use reference to functions/variables, and therefore your IDE can tell you what you can use in given scope.
- Provides better support for separating code into more manageable chunks/components. You don't need to create `partials` folder (like in Nunjucks) and put every partials inside it. You can create React component whenever you want, also next to the template's source code.
- Introduces testability of components which is very difficult with Nunjucks. You can split template to separate chunks and test them in separate test cases.

However, it does have disadvantages:

- Common pain when writing templates with React, will be writing indentations and new lines. We know about this problem and in the next integrations of the React in the Generator we will try to minimize this problem as much as possible. However, we have a several helpers in `@asyncapi/generator-react-sdk` package to make the life easier, like [`withIndendation`](https://github.com/asyncapi/generator-react-sdk/blob/master/src/utils/withIndendation.ts#L13) or [`withNewLines`](https://github.com/asyncapi/generator-react-sdk/blob/master/src/utils/withNewLines.ts#L8).
- Some people don't like to mix logic inside template, so probably React won't be useful and friendly in their cases.
- Unfornatelly, HTML tags at the moment is not supported. Developer must write them as string literal, like [here](https://github.com/asyncapi/template-for-generator-templates/blob/main/components/ListChannels.js#L18).

## Resources

To check React in production-ready templates, please see follow links: 

- [`template-for-generator-templates`](https://github.com/asyncapi/template-for-generator-templates) template showcases features of [the AsyncAPI Generator](https://github.com/asyncapi/generator), including the React renderer. It shows how to write templates, reusable parts (components), what are the recommended patterns. It has simple and complex examples. You can also check how this same things could be done using Nunjucks in [this](https://github.com/asyncapi/template-for-generator-templates/tree/nunjucks) branch.
- [`markdown-template`](https://github.com/asyncapi/markdown-template) is written using React. It generates documentation into a Markdown file.
- [`ts-nats-template`](https://github.com/asyncapi/ts-nats-template/) is re-written using React to generate a TypeScript NATS client.

If you want to check the source code of React renderer, please see official repository under [this](https://github.com/asyncapi/generator-react-sdk) link.

## Summary

We have a long way to stabilize React as a render engine. We know about problems that make it unpleasant to write templates using React, such as indents or new lines, but we will work on that. Additionally, we have a couple of issues that will allow things like [File Templates](https://github.com/asyncapi/generator-react-sdk/issues/10) to be simplify in our Generator. We also have a plan to support [TypeScript](https://github.com/asyncapi/generator-react-sdk/issues/3).

We are waiting for your feedback.

Happy coding!

> Cover photo is from [`Drunken Master`](https://www.imdb.com/title/tt0080179/) movie.
