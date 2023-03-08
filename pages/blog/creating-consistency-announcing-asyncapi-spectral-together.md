---
title: "Governance for Asynchronous APIs: Announcing AsyncAPI & Spectral – Together!"
date: 2022-05-25T16:00:00+02:00
type: Community
tags: 
  - API Governance 
cover: /img/posts/creating-consistency-announcing-asyncapi-spectral-together/cover.webp
authors:
  - name: Jakub Rozek
    photo: /img/avatars/jrozek.webp
    link: https://rozek.tech/
    byline: Senior Software Engineer at Stoplight
excerpt: | 
 The collaboration between Stoplight’s open-source linting tool, Spectral, and AsyncAPI will be a game-changer for creating more consistency in your API program. Check out what comes with the release of the AsyncAPI ruleset!
---

The collaboration between Stoplight’s open-source linting tool, Spectral, and AsyncAPI is going to be a game changer for creating more consistency in your API program. Check out what comes with the release of the AsyncAPI ruleset!

Consistency is a top concern for companies across the globe.

At Stoplight, we’re seeking to help your organization achieve consistency. We believe that API descriptions should be
treated the same way as code. APIs should have style guides with rules, and be reviewed to ensure they are descriptive,
readable, and concise for the developers who use them. Developer experience is, after all, another top concern for
companies.

So, we created our open-source JSON linting tool Spectral. It promotes standards with the flexibility for custom rule
creation to validate and lint any JSON.

For example, while an AsyncAPI or OpenAPI document might be entirely valid, it could be missing important fields like
descriptions for parameters or have other problematic design issues. Spectral can warn about possible improvements to
ensure API definitions can reach their full potential, without needing to have special code owners review every change
to the documents.

Although Spectral is mostly referenced in the context of OpenAPI, AsyncAPI has been an integral
part of Spectral for quite some time now. In fact, last month our Spectral AsyncAPI ruleset celebrated its
second anniversary.

## Why AsyncAPI?

While OpenAPI remains one of the top specifications, AsyncAPI is growing. And each has their own [unique benefits and
challenges](https://www.asyncapi.com/blog/openapi-vs-asyncapi-burning-questions). The ability to have options gives Spectral users more flexibility for their APIs.

Spectral had primarily been an OpenAPI linter that was simply capable of working with other JSON documents. Now, by
enabling AsyncAPI rulesets, organizations can achieve the consistency they’re looking for with more flexibility.

## Introducing AsyncAPI & Spectral - Together!

The release of [AsyncAPI ruleset](https://meta.stoplight.io/docs/spectral/ZG9jOjUzNDg-async-api-rules) was more than just another feature added; it was considered a milestone. Previously,
Spectral lacked meaningful rulesets for other formats, and the number of learning resources was somewhat limited, making
the adaption of Spectral outside of OpenAPI rather minimal.

Our collaboration with AsyncAPI means that we’ve given the respective AsyncAPI maintainers write access to the Spectral
repo AsyncAPI rulesets, though here at Stoplight we will still continue to operate with PRs, and ensure these get
priority.

### The Game Changer

The introduction of support for another major API definition helped us further assess its level of importance as well as
initiated a notable shift in the way we perceived Spectral internally. Treating AsyncAPI ruleset as a first-class
citizen pushed us to entirely decouple our codebase from OpenAPI. The core purpose of Spectral (linting API definitions)
remained unchanged and still holds true, but from an engineering standpoint, it meant a shift in focus to the other
specs and a renewed attention on writing code that can be applicable everywhere.

Back in 2018 or 2019, plenty of code was oriented around OpenAPI, tests, and naming. All were focused solely on OpenAPI,
meaning rulesets themselves couldn’t be applied easily to other formats (Spectral didn’t support them previously).

With the release of [Spectral 6](https://blog.stoplight.io/api-linting-with-spectral-keeps-getting-better), that transition period wrapped up and Spectral is now more flexible than it’s ever been.

## Steps to Utilizing AsyncAPI & Spectral

Linting AsyncAPI documents is quite similar to linting OpenAPI documents, meaning
most of the information about Spectral you’ll find on the internet will apply to AsyncAPI. Together with AsyncAPI
initiative, we [maintain a Spectral ruleset](https://meta.stoplight.io/docs/spectral/ZG9jOjUzNDg-async-api-rules) containing a number of useful rules you can leverage in your workflow to help
you get started.

**Step One:**

To get started, you need to [install Spectral first](https://meta.stoplight.io/docs/spectral/docs/getting-started/2-installation.md). Note that you need to have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or
[Yarn](https://yarnpkg.com/getting-started/install) installed, running `npm install -g @stoplight/spectral-cli` or `yarn global add @stoplight/spectral-cli` is sufficient
to get Spectral. 

The CLI package bundles [@stoplight/spectral-rulesets](https://www.npmjs.com/package/@stoplight/spectral-rulesets) which
contains the actual ruleset we’ll use.
If you intend to use an older version of the AsyncAPI ruleset, you could additionally install a different version of @stoplight/spectral-rulesets.
However, it’s an optional step, and it's generally recommended to stick with the latest versions if possible.

**Step Two:**

Once you’ve got all the required dependencies installed, you can start by creating a simple ruleset. To do so,
create a file called `.spectral.json`. The following template can be used as a decent baseline:

```json
{
  // This makes sure our rules apply only to AsyncAPI documents. 
  // It might be handy in case you have other specs in the directory you intend to lint.
  "formats": ["asyncapi2"],
  // this includes the ruleset linked below
  // https://meta.stoplight.io/docs/spectral/ZG9jOjUzNDg-async-api-rules
  // Note that by default, only recommended rules are enabled. 
  // Some rules listed in the article above may not be a fit for you,
  // therefore we don’t enable them by default.
  "extends": "spectral:asyncapi",
  "rules": {
    // we can add our own rules here
  }
}
```

**Step Three:**

To better facilitate the actual demands, Spectral allows you to create your own rules. These rules will fill the gaps
and cover use cases unique to your workflow, or style guide. While a more thorough [reference regarding custom rules is
available here](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTg5-custom-rulesets#adding-rules), a basic rule could look as follows. The rule we’re about to implement will assert the presence and correctness of the version inside of the `Info` object.

```json
{
  "message": "Version must match 1.x.x",
  // one can also define description property here, 
  // which is supposed to be a markdown string
  // containing a more detailed explanation about the rule
  "severity": "error", // or warn, or info, or hint
  // any JSONPath-compliant expression
  // https://goessner.net/articles/JsonPath/
  "given": "$.info",
  "then": [
    {
      "field": "version",
      "function": "defined"
    },
    {
      "field": "version",
      "function": "pattern",
      "functionOptions": {
        "match": "^1(\\.[0-9]+){2}$"
      }
    }
  ]
}
```

**Step four:**

Now that we have a basic rule, we can insert it into the ruleset we previously created:

```json
{
  "formats": [
    "asyncapi2"
  ],
  "extends": "spectral:asyncapi",
  "rules": {
    "valid-document-version": {
      "message": "Version must match 1.x.x",
      "severity": "error",
      "given": "$.info",
      "then": [
        {
          "field": "version",
          "function": "defined"
        },
        {
          "field": "version",
          "function": "pattern",
          "functionOptions": {
            "match": "^1(\\.[0-9]+){2}$"
          }
        }
      ]
    }
  }
}
```

**Step five:**

Now that we have all the pieces together, we can run Spectral. We’ll take the [`Hello World` example from the AsyncAPI documentation](https://www.asyncapi.com/docs/getting-started/hello-world).

```yaml
# hello-world.yaml
asyncapi: 2.2.0
info:
  title: Hello world application
  version: '0.1.0'
channels:
  hello:
    publish:
      message:
        payload:
          type: string
          pattern: '^hello .+$'
```

To lint, execute the following command:

`spectral lint hello-world.yaml`

![Spectral Lint Results](/img/posts/creating-consistency-announcing-asyncapi-spectral-together/lint-results.webp)

Thanks to the built-in AsyncAPI ruleset, we receive more feedback than just the information about invalid document versions. The default configuration is usually reasonable for most, but should you want to tweak the version, please visit our [documentation](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTg5-custom-rulesets#modifying-rules) that explains everything in greater detail.

Tada! :tada:

We are looking forward to the continued collaboration with AsyncAPI and the exciting things to come. Let us know your
thoughts about what you would like to see next or visit the [API design blog](https://blog.stoplight.io/) for more insights.
