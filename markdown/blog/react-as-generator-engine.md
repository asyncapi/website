---
title: "Simplify code generation with React"
date: 2021-01-26T00:07:00+01:00
type: Engineering
tags:
  - Code Generation
  - Docs Generation
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

React permanently changed the way how developers write web-apps. Personally, we love React and knew it would solve many pain points we faced with Nunjucks. Therefore in the last [cycle](https://github.com/asyncapi/shape-up-process/issues/1) we integrated it as a template rendering engine into our [Generator](https://github.com/asyncapi/generator). This post is a short introduction for developers who write or plan to write templates for AsyncAPI specification using React. It also includes a comparison with the default Nunjucks renderer.

## Getting started

Your React template requires [@asyncapi/generator-react-sdk](https://github.com/asyncapi/generator-react-sdk) as a dependency. You need it to access the **File** component required as a root component responsible for rendering a file. Furthermore, it provides some common components to make your development easier, like **Text** or **Indent**.	

Let's consider a basic React template file as the one below called **MyTemplate.js**:

<CodeBlock language="javascript" highlightedLines={[5,6,7]}>
{`import { File, Text } from "@asyncapi/generator-react-sdk";\n
export default function({ asyncapi, params, originalAsyncAPI }) {
  return (
    <File name="asyncapi.md">
      <Text>Some text that should render as is</Text>
    </File>
  );
}`}
</CodeBlock>

The exported default function returns the **File** component as a root component that the [Generator](https://github.com/asyncapi/generator) uses to figure out what file it should generate. In the example above, we overwrite the default functionality of saving the file as **MyTemplate.js**, and we set **asyncapi.md** as the filename. Using the **Text** component, we specify what content should be rendered inside the file. The content of the resulting file is: `Some text that should render as is\n`. Notice the **\n** character at the end. It is automatically added after the **Text** component.

> For further information about components and their props, see the [Generator React SDK](https://github.com/asyncapi/generator-react-sdk).	 

The [Generator](https://github.com/asyncapi/generator) doesn't use React renderer by default. You need to specify in the template configuration that your template is based on React. For that, change the **renderer** field of **generator** object inside the template's **package.json** file:

```json
{
  ...
  "generator": {
    "renderer": "react",
    ...
  }
}
```

You can find more information about the Generator configuration [here](https://github.com/asyncapi/generator/blob/master/docs/configuration-file.md).	 

## How it works

The process of creating content from React components consists of two steps: transpile and render.	 

The SDK has a custom transpiler which ensures that any directory in template's **template** folder are transpiled using [Rollup](https://www.npmjs.com/package/rollup). Rollup helps bundling all dependencies and transpile them into CommonJS modules. This is required because this library will be used through NodeJS (by AsyncAPI Generator) which does not understand these new modules natively and we do not want to limit the developer in which syntax they prefer nor how they want to separate code.

Also, SDK has its own reconciler. It traverses through each element in the template structure and transforms it into a pure string. Prop `children` is always converted to a regular string and stored in the `childrenContent` prop in each component. Check the below example, to see how it works. In addition, you can also see how to apply the composition to templates using components:

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

There are some restrictions:

- React hooks feature is not allowed.
- HTML tags are not supported.
- React internal components like `Fragments`, `Suspense`, and others are skipped.

## Comparison with Nunjucks

The AsyncAPI generator still uses [Nunjucks](https://mozilla.github.io/nunjucks/) as a default render engine. It's a templating language, heavily focused on string literals, filters (similar to bash pipes), and partials called macros.	

The next sections compare how you can accomplish certain things in Nunjucks and React. For more complex examples, see the [template-for-generator-templates](https://github.com/asyncapi/template-for-generator-templates) repository with examples based on React and compare those with [nunjucks](https://github.com/asyncapi/template-for-generator-templates/tree/nunjucks) branch.

### Creating reusable parts

It may sound obvious, but when writing any code, even a template, a programmer wants to create reusable parts that separate repeating logic.

In Nunjucks, you can reuse parts of the template using **macros**, in React, using **components**. Imagine that you are writing a template that produces Markdown content. You need to create a reusable macro/component that renders a list from an array of strings.

Using Nunjucks you can write the code below:

```njk
{% macro list(data, type = "-") %}
{% for item in data %}
{{type}} {{item}}
{% endfor %}
{% endmacro %}

{% from "partials/list.njk" import list %}
{{ list(["one", "two", "three"]) }}
```

Using React you can write the code below:

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

Looking at both examples we see that in Nujucks we operate on string literals, it means that when passing data to a macro, you always need to know what type of data the macro takes. In React we operate on JS objects/variables. By this, your IDE should always inform you what value, of what type, you must pass to component. Additionally, you must place Nunjucks's macro inside the **partials** folder of the template. Using React, you can put your components wherever you want.

### Using third party packages

Using helper functions from third-party packages, in Nunjucks you must apply them as [filters](https://github.com/asyncapi/generator/blob/master/docs/nunjucks-render-engine.md#filters). For example, you want to use one function from [Underscore.string](https://github.com/esamattis/underscore.string) library like **cleanDiacritics**, which replaces diacritic characters with closest ASCII equivalents. To do this, you must create a function inside **filters** folder to convert the function to Nunjucks's filter:

```js
// filters/cleanDiacritics.js
const cleanDiacritics = require('underscore.string/cleanDiacritics');
const filter = module.exports;
filter.cleanDiacritics = cleanDiacritics;
```

And then you can use this function inside your template/macro:

```njk
{{ Urbańczyk | cleanDiacritics }} # will be Urbanczyk
```

The main problem with this solution is that it creates an unnecessary boilerplate - you must create a function in a separate file. Another problem is that you operate on the name of this helper function which means you must always remember what filters you have included in your template.

In opposite, in React you can use `Underscore.string` directly in your template:

```js
import cleanDiacritics from 'underscore.string/cleanDiacritics';  

function MyComponent() {
  return cleanDiacritics('Urbańczyk'); // will be Urbanczyk
}
```

It is worth mentioning that when using packages in this way, you always operate on the reference to the function, not on its name, so you know what functions you have in the file's scope.

## Cons & Pros

Like any solution, React has its advantages as well as disadvantages.

### Advantages

- Using React, you use JS directly. You don't need to learn custom Nunjuck's syntax, only how React works under the hood.
- It provides better debugging functionality that is not possible with Nunjucks.
- It provides better error stack traces.
- Better tools support development. You write templates in JavaScript, you use a reference to functions/variables, and therefore your IDE can tell you what you can use in a given scope.	
- Provides better support for separating code into more manageable chunks/components. You don't need to create **partials** folder. You can create React component wherever you want, also next to the template's source code.
 - You can easily test your components. It is difficult with Nunjucks. You can split template file into separate chunks and test them in separate test cases.

### Disadvantages

- Common pain when writing templates with React is related to indentations and new lines. However, we have several helpers in SDK to make your life easier, like [`Indent`](https://github.com/asyncapi/generator-react-sdk/blob/master/src/components/Indent.tsx) or [`Text`](https://github.com/asyncapi/generator-react-sdk/blob/master/src/components/Text.tsx) components.
- Some people don't like to mix logic inside template files, so probably React won't be friendly for them.
- HTML tags at the moment are not supported. The developer must write them as a string literal, like [here](https://github.com/asyncapi/template-for-generator-templates/blob/main/components/ListChannels.js#L18).

## Resources

We use React render engine already in three official AsyncAPI templates:

- [template-for-generator-templates](https://github.com/asyncapi/template-for-generator-templates) template showcases features of [the AsyncAPI Generator](https://github.com/asyncapi/generator), including the React renderer. It shows how to write templates, reusable parts (components), what are the recommended patterns. It has simple and complex examples. You can also check how the same things could be done using Nunjucks in [this](https://github.com/asyncapi/template-for-generator-templates/tree/nunjucks) branch.
- [markdown-template](https://github.com/asyncapi/markdown-template) is written using React. It generates documentation into a Markdown file.
- [ts-nats-template](https://github.com/asyncapi/ts-nats-template/) is re-written using React to generate a TypeScript NATS client.

If you want to check the source code of React renderer, go to the [official repository](https://github.com/asyncapi/generator-react-sdk).

## Summary

There is a long way ahead of us to stabilize React as a render engine. We know about problems that make it unpleasant to write templates using React, such as indents or new lines, but we will work on that. Additionally, we have a couple of improvements on our list that will allow things like [File Templates](https://github.com/asyncapi/generator-react-sdk/issues/10) to be simplified in the Generator. We also plan to support [TypeScript](https://github.com/asyncapi/generator-react-sdk/issues/3).

We are waiting for your feedback.

Happy coding!

> Cover photo is from [`Drunken Master`](https://www.imdb.com/title/tt0080179/) movie.
