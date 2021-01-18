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
cover: /img/posts/react-as-generator-engine/react-as-generator-engine.webp
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



## How it works

The process of creating content from React components consists of two main process: transpile and rendering.

The SDK has a custom transpiler which ensures that any directory are transpiled using [Rollup](https://www.npmjs.com/package/rollup). Rollup helps bundling all dependencies and transpile them into CommonJS modules. This is required because this library will be used through NodeJS (by AsyncAPI Generator) which does not understand these new modules natively and we do not want to limit the developer in which syntax they prefer nor how they want to separate code.

Also, SDK has its own reconciler. It traverses through each element in the template structure and transforms it into a pure string. Additionally, prop `children` is also converted to a regular string and stored in the `childrenContent` prop, which is appended to each component.

Unfornatelly we have some restrictions:

- React hooks is not allowed.
- HTML tags at the moment is not supported.
- React internal components like `Fragments`, `Suspense` etc. are skipped.

## How to start using



## Comparison with Nunjucks

If you don't know, the existing templates developers were forced (if they used our Generator) to write in [Nunjucks](https://mozilla.github.io/nunjucks/). It's a templating language, heavily focused on string literals, filters (similar to bash pipes), partials called macros.

Below are some examples comparing rendering the same text with Nunjucks and React.

### Using helper functions

### Make reusable parts

## Resources

To check React in templates in action, please see follow resources: 

- [`generator-react-sdk`](https://github.com/asyncapi/generator-react-sdk) - official repository includes React renderer.
- [`template-for-generator-templates`](https://github.com/asyncapi/template-for-generator-templates) template showcases features of [the AsyncAPI Generator](https://github.com/asyncapi/generator), including the React renderer. It shows how to write templates, reusable parts (components), what are the recommended patterns. It has simple and complex examples.
- [`markdown-template`](https://github.com/asyncapi/markdown-template) is written using React. It generates documentation into a Markdown file.

## Summary


