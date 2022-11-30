---
title: February 2021 at AsyncAPI
date: 2021-03-16T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/february-2021-at-asyncapi-cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: We are getting close to joining a foundation. We started a few new initiatives. We are busy. In other words, this is a good time to join us and drive things together.
---

> Read [January 2021 at AsyncAPI](/blog/january-2021-at-asyncapi) for the update from January.

I enjoy monthly status over weekly one. It is not that I'm just happy I have more time for other things. Content size did not change. I think people do have other things to do than following AsyncAPI only :sweat_smile: Life in open-source runs slower, at least when you look at it from the outside. I have an impression, that more people pay attention to the status when it is once a month. I wonder what your view is on that.

## Open governance model aka charter ready for the review

Is an "open governance model" the same as a "charter"? No. Charter is a boring legal document that describes many rules that need to be followed when being under a foundation. One of the things the charter tackles is the general rules on how the project will operate and be governed. 

I think the most important thing to write here is that the AsyncAPI charter is a reality. It finally arrived and is ready for review. In the special blog post, we also explained what governance model we envision for the AsyncAPI Initiative in more human-friendly words. This content was released and communicated on Tuesday, 9th of March, and we will wait for your feedback until the 23rd of March. It looks like we will kick off April under the umbrella of the foundation :crossed_fingers:

Please take your time to:
- Read [Finding a Good Open Governance Model for AsyncAPI](/blog/governance-motivation) to understand our motivation
- Check out [this](https://github.com/asyncapi/.github/pull/37) pull request with the charter

## Code generators activities

We had some significant traffic in the area of code generation templates in February.

### PHP

[Emiliano Zublena](https://github.com/emilianozublena) joined the AsyncAPI community big time by starting with donating [a new template for PHP](https://github.com/asyncapi/asyncapi-php-template). It is not yet released under **@asyncapi** scope on npm, but you can already play with it by using the AsyncAPI Generator with a direct GitHub link like:

```bash
ag https://bit.ly/asyncapi https://github.com/asyncapi/asyncapi-php-template -o output`
```

### Go

We merged the initial pull request to the [Go template](https://github.com/asyncapi/go-template). The initial contributor was not able to continue working on the template, but the foundation was there. [Emiliano Zublena](https://github.com/emilianozublena) and [Takumi Sueda](https://github.com/puhitaku) will try to help to drive forward template development. This template is not yet released as we need to get some feedback from the community first. Give it a try with:

```bash
ag https://bit.ly/asyncapi https://github.com/asyncapi/go-template -o output
```
Let us know what you think in the GitHub issues section. Thank you, [Jacob Poston](https://github.com/jposton96a) for your initial hard work on the template!

### TypeScript and NATS

[Jonas Lagoni](https://github.com/jonaslagoni/) regularly extends and polishes [the TypeScript template for NATS](https://github.com/asyncapi/ts-nats-template). It reached 0.3 release and is the first template that is already using a new AsyncAPI SDK for data types generation. Please go and check it out.

## AsyncAPI CLI to rule them all

We always wanted to have a single CLI to do all the things related to AsyncAPI. In other words, one CLI to validate, generate, edit, create, and others. So far, we had a CLI for the AsyncAPI generator, and recently one of our community members, [Jorge Aguiar Martín](https://twitter.com/jotamusik), referred us to his CLI for AsyncAPI validation.

We all agreed that instead of working separately on different CLIs, it is better to work together on one CLI that everyone will love. The project kicked off! A repository has been created and we already discuss details on how the CLI interface should look like. [Join](https://github.com/asyncapi/cli/issues/1) the discussion.

## Event gateway

Sounds big? It is :smiley:

An excellent engineer joined AsyncAPI, [Sergio Moya](https://twitter.com/smoyac/status/1361289838075539461). We felt like we need to start something big that should be built independently from any vendor together with the AsyncAPI community. The project got kicked off, and it is the best time to join. Have a look at the dedicated repository and our plans for [the Everest? AsyncAPI Gate? or maybe Eventide?](https://github.com/asyncapi/event-gateway) :smiley:

Share your use cases. Please help us understand what you need. Sergio prepared an issue template that [helps with that](https://github.com/asyncapi/event-gateway/issues/new?assignees=&labels=use+case&template=use_case.md&title=%5BUSECASE%5D+).

## Domain model generation

As mentioned in [the blog post about January](/blog/january-2021-at-asyncapi#next-major-feature-is-data-model-generation), February was all about data model generation that we wanted to use to speed up templates development for code generation. The library is [ready](https://github.com/asyncapi/generator-model-sdk), and we started trying it out. You can try it out too, and you do not even need our AsyncAPI Generator. It is a generic library and you only need a JSON Schema Draft 7 or an AsyncAPI document.

```js
import { TypeScriptGenerator } from '@asyncapi/generator-model-sdk';

const DESCRIPTION_PRESET = {
  interface: {
    property({ property, content }) {
      const desc = property.getFromSchema('description');
      if (desc) {
        return `// ${desc}\n${content}`;
      }
      return content;
    }
  }
}

const options = {
  modelType: 'interface',
  presets: [DESCRIPTION_PRESET],
}

const generator = new TypeScriptGenerator(options);

const schema = {
  $id: "Address",
  type: "object",
  properties: {
    street_name:    { type: "string" },
    city:           { type: "string", description: "City description" },
    house_number:   { type: "number" },
    marriage:       { type: "boolean", description: "Status if marriage live in given house" },
    pet_names:      { type: "array", items: { type: "string" } },
  },
  required: ["street_name", "city", "state", "house_number", "state"],
};

const interfaceModels = await generator.generate(schema);

// generated interfaceModels[0].result should have the following shape:
export interface Address {
  streetName: string;
  // City description
  city: string;
  houseNumber: number;
  // Status if marriage live in given house
  marriage?: boolean;
  petNames?: Array<string>;
}
```

## Community continues to grow

In February we reached 1600 followers on Twitter.

<TwitterTweetEmbed
  tweetId='1362016089207635968'
  options={{
    cards: 'hidden',
    width: 500,
    align: 'center'
  }}
/>

A great thing to see is that the community from [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:6769647615823945728/) grew to 900, and our news shared there also get more visibility.

We are very noisy :sweat_smile:

## Other features

- Thanks to the support of [Daniel CHU](https://www.linkedin.com/in/daniel-chu-dc/) —who joined us during last Hacktoberfest— now the JavaScript parser also validates the examples of server variables. For more details, check out the [1.4](https://github.com/asyncapi/parser-js/releases/tag/v1.4.0) release.
- Once again, thanks to [Ludovic Dussart](https://twitter.com/ldussart) from Ineat Lab, we have additional features, these time in HTML and Markdown template. Thanks to the new **version** parameter, you can overwrite the version of the application specified in the AsyncAPI file under **info.version**. Useful in CI/CD when your service version is not maintained in the AsyncAPI file but pom.xml or package.json
- Thanks to [Mike Ralphson](https://twitter.com/PermittedSoc), we have a new **frontMatter** parameter in the Markdown template. It lets you specify an external file with a custom front-matter that should be included in the resulting Markdown during generation. Very useful for static site generators' users.

  ```bash
  # 1. Get AsyncAPI Generator
  npm install -g @asyncapi/generator

  # 2. Create a file with frontmatter
  cat > ssg.yml << EOF
  title: AsyncAPI Documentation
  layout: asyncapi
  permalink: /asyncapi-docs
  EOF

  # 3, Generate Markdown file that includes the frontmatter
  ag https://bit.ly/asyncapi @asyncapi/markdown-template -o output -p frontMatter=ssg.yml

  # 4. Check out the output
  cat output/asyncapi.md
  ```
- [Maciej Urbanczyk](https://www.linkedin.com/in/maciej-urba%C5%84czyk-909547164/) and [I](https://twitter.com/derberq) (I mean me :smiley:) pushed some features to the AsyncAPI Generator:
  - It supports the latest Node.js 15 and npm 7
  - You can now install generator templates globally. For more details, read [this](https://github.com/asyncapi/generator/#global-templates-installed-with-yarn-or-npm) new section in the readme.
  - It is now much easier to generate multiple files using the new React render engine. For more details, read [this](https://github.com/asyncapi/generator/blob/master/docs/react-render-engine.md) or have a look at it [here](https://github.com/asyncapi/template-for-generator-templates/blob/master/template/schemas/schema.js#L10)
  - Some parts of templates can be written in TypeScript. For more details, read [this](https://github.com/asyncapi/generator/blob/master/docs/typescript-support.md). We still cannot use TS in main template code. For more details read [this](https://github.com/asyncapi/generator-react-sdk/issues/3).

Check out all the [releases](https://github.com/asyncapi/generator/releases)

## Good learning resources

- Read this important [10 FAQs About Event-Driven APIs](https://duckster.medium.com/10-faqs-about-event-driven-apis-50ee9c94bbb8) from [Dakshitha Ratnayake](https://twitter.com/techieducky)
- Great summary from Nordic APIs and [Vyom Srivastava](https://www.linkedin.com/in/vyomsrivastava/) on [8+ AsyncAPI Documentation Generators](https://nordicapis.com/8-asyncapi-documentation-generators/)
- Fran Mendez was a part of Postman's live stream. Learn how to get from zero to AsyncAPI in just about 1h 30min. I hope it can be done faster, and Fran was just having too much small talk with Kevin and Kin :sweat_smile:
<YouTube id="g2pqCIhXQ3k" />

> Photo by <a href="https://unsplash.com/@dnevozhai?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Denys Nevozhai</a> on <a href="https://unsplash.com/">Unsplash</a>
