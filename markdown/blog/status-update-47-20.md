---
title: "Happy Birthday AsyncAPI (week 47, 2020)"
date: 2020-11-18T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-47/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## Happy Birthday AsyncAPI

On 18.11.2017 Fran Mendez exclaimed "Eureka” and created AsyncAPI. The story is more complicated than that, but it is not a time for a history lesson, so let us keep it simple :smile:

Yes, AsyncAPI is 3 years old :beers:

This is what [they](https://raisingchildren.net.au/babies/development/development-tracker-3-12-months/3-4-months) say about kids at age 3:

> Around this age, your baby loves to move and will probably start rolling from tummy to back. When you give him tummy time, he might lift his head high or push up on his hands. He might even sit up with some support behind and on each side of his body.

That is about it. We do not want to just sit, relax, and enjoy lunch anymore. ** It's time for us to start moving, exploring, and not stopping but making a stand in the industry**. We have great years ahead of us. Trust me. Soon you'll learn that work on AsyncAPI will lift off to another level.

<img src="https://media.giphy.com/media/Xw6yFn7frR3Y4/giphy.gif" />

Join us during these strange pandemic times in asynchronous remote celebration, whenever and wherever you can.

## Generator 1.0 And Other Goodies

Following the recent [1.0 release of the AsyncAPI Parser](https://www.asyncapi.com/blog/status-update-43-20) we came to the point we could release the first major release of [the AsyncAPI Generator](https://github.com/asyncapi/generator/) too. 

Feel free to congratulate us by giving a :star: to [the project](https://github.com/asyncapi/generator/stargazers). This is the moment to join us and think with us about the 2.0 release and all the goodies we can add to it.

Try out the project by following :point_down: instructions:
<GeneratorInstallation />

### Generator GitHub Action 1.0

Yes, our official [GitHub Action for Generator](https://github.com/marketplace/actions/generator-validator-converter-and-others-all-in-one-for-your-asyncapi-docs) already uses the latest Generator and is released under v1. 

```yaml
- name: Generating HTML from my AsyncAPI document
  uses: asyncapi/github-action-for-generator@v1
  with:
    template: '@asyncapi/html-template@0.15.4'  #In case of template from npm, because of @ it must be in quotes
    filepath: docs/api/my-asyncapi.yml
    parameters: baseHref=/test-experiment/ sidebarOrganization=byTags #space separated list of key/values
    output: generated-html
```

[The AsyncAPI Playground](https://playground.asyncapi.io/) is up to date with the latest generator. 

### Writing Own Generator Template Ain't Easy

Writing a template compatible with the AsyncAPI Generator is not an easy task that you can complete in one day. To write a template that generates docs or code, you need to have not only decent knowledge about AsyncAPI specification but also the features of the Generator:

- How do I extract data from the spec file?
- What template engine powers Generator and how to use it?
- How can I add optional features to the template?

There is a lot of it. We wanted to make it easy for you. We created a [GitHub Template](https://github.com/asyncapi/template-for-generator-templates) that showcases all features available in the Generator. It contains:
- A template that generates class diagram showing relations between schemas
- Detailed readme which explains all the features and where are they used in the template

To try out the template, run :point_down: commands:
```
# Install the AsyncAPI Generator if you do not have it yet
npm install -g @asyncapi/generator

# Run generation
ag https://raw.githubusercontent.com/asyncapi/generator/v1.0.1/test/docs/dummy.yml https://github.com/asyncapi/template-for-generator-templates -o output

# Open the result of the generation
open output/index.html
```

<Figure
  src="/img/posts/status-update-47/diagram.webp"
  caption="Figure 1: Schema consumed by the template and the resulting diagram"
/>

## React Component and Web Component

### New Npm Scope

Since the 0.16.2 release, we changed the npm scope of the component and now use the official **asyncapi** one. That means you should update your dependencies and from now on use **@asyncapi/react-component**.

[![Edit asyncapi-react-component-in-action](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/asyncapi-react-component-in-action-wvdy2)

### Web Component

Since the 0.17.5 release, we are now automatically publishing also the @asyncapi/web-component to npm. Given that it depends on the React component, it will always follow the same version number. This is all possible thanks to work done by amazing [Hesyar Uzuner](https://github.com/hesyar), [Claude Gex](https://github.com/gexclaude), [Maciej Urbańczyk](https://github.com/magicmatatjahu).

Now it should be easier for you to use this component in non-React projects. That is, for example, how you would use it in a plain HTML:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>AsyncAPI Web Component Demo</title>
    <script src="https://unpkg.com/@asyncapi/web-component@0.17.5/lib/asyncapi-web-component.js" defer></script>
    <script>
        var schema = {
            url: "https://raw.githubusercontent.com/asyncapi/asyncapi/master/examples/simple-asyncapi.yml"
        };

        window.onload = function() {
            document.getElementById("asyncapi").schema = schema;
        }
    </script>
</head>

<body>

    <asyncapi-component id="asyncapi" cssImportPath="https://unpkg.com/@asyncapi/react-component@0.17.5/lib/styles/fiori.css"></asyncapi-component>

</body>

</html>
```

There is also a sample project where you can see how this Web component plays together with Angular.

[![Edit asyncapi-web-component-in-action](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/asyncapi-web-component-in-action-l652x)

We already have [some ideas](https://github.com/asyncapi/asyncapi-react/issues/191) on how to improve DX for the component. Try it on your own and let us know what you think.

### Examples Rendering

Since the 0.16.0 release, the component supports examples provided in the AsyncAPI document on a Message Object level. These examples are treated with priority over others. You can try it out in [the React component playground](https://asyncapi.github.io/asyncapi-react/).

<Figure
  src="/img/posts/status-update-47/react-playground.webp"
  caption="Figure 2: View of the AsyncAPI React playground where you can see sample AsyncAPI document with example in Message Object, and how the React component renders it."
/>

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 10th of November, 4PM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/459).

The next meeting is scheduled for next [Tuesday, 24th of November, 8AM UTC](https://everytimezone.com/s/2088528d). 

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/462). At the moment, there is nothing on the agenda, so you can easily sneak your topic in. 

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

## Some Good Read Resources

- [What Is AsyncAPI and How Does It Differ from OpenAPI](https://ergonotes.com/what-is-asyncapi-and-how-does-it-differ-from-openapi/)
- [How Microcks Can Speed-Up Your AsyncAPI Adoption - Part 1](https://www.asyncapi.com/blog/microcks-asyncapi-part1) by [Laurent Broudoux](https://twitter.com/lbroudoux)
- [Is Hacktoberfest Good For Maintainers?](https://www.asyncapi.com/blog/hacktoberfest-summary-2020) by [Lukasz Gornicki](https://twitter.com/derberq)

> Cover photo by <a href="https://unsplash.com/@will_myers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Will Myers</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
