---
weight: 1
sidebar-title: How to contribute to Modelina
sidebar-category: Contributing
sidebar-category-weight: 300
---


# Contributing to Modelina

First of all, thank you 🙇🏾‍♀️ for considering contributing to the Modelina SDK library; we can use all the help we can get!

This contribution guide is an extension to the core contributing guide that can be found [here](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md). Please make sure you go through that beforehand. 🙂👍🏽

## Acceptance criteria and process

Even though we love contributions, we need to maintain a certain standard of what can be merged into the codebase. 

The below sections provide information about our acceptance criteria, based on the type of contribution you make.

### Fixing bugs 

The Acceptance Criteria for _fixing any bug_ means that you should be able to reproduce the error using tests that will fail, unless a fix is implemented.

### New features

The Acceptance Criteria for _adding new features_ requires a few things in order to be accepted. This ensures all features are well described and implemented before being released.

1. **Not all feature requests from the community (or maintainers!) are accepted:** Even though you are welcome to create a new feature without an issue, it might be rejected and turn out to be a waste of your time. We don't want that to happen, so make sure to create an issue first and wait to see if it's accepted after community discussion of the proposal.
1. **When creating tests for your new feature, aim for as high coverage numbers as possible:** When you run the tests (`npm run test`), you should see a `./coverage/lcov-report/index.html` file being generated. Use this to see in depth where your tests are not covering your implementation.
1. **No documentation, no feature:** If a user cannot understand a new feature, that feature basically doesn't exist! Remember to make sure that any and all relevant [documentation](./) is consistently updated.
    - New features such as new presets, generators or inputs, etc, need associated use case documentation along side [examples](../examples). This is not only to showcase the feature, but to ensure it will always work. Checkout our [adding examples](#-adding-examples) doc for more information on how to do this.

### Adding Examples
The Acceptance Criteria Process for _adding examples_ is not only something we use to showcase features, but also to ensure those features always work. _(This is important since it is picked up by [our CI system](#What-does–the-CI-system-do-when-I-create-a-PR).)_

Adding examples is quite straight forward, so don't feel shy! Here's how to do it:
1. Duplicate the [TEMPLATE folder](https://github.com/asyncapi/modelina/tree/master/examples/TEMPLATE) and rename it to something that makes sense for your feature. If you can't think of anything, feel free to go with your first thought, since we can always discuss it in the PR afterwards.
1. Rename the following [package configuration](https://github.com/asyncapi/modelina/blob/1e71b3b2cab6bc2c277001fcafe7e1b8ed175ce9/examples/TEMPLATE/package.json#L2) to the same name as your directory.
1. Adapt [this source code example](https://github.com/asyncapi/modelina/blob/1e71b3b2cab6bc2c277001fcafe7e1b8ed175ce9/examples/TEMPLATE/index.ts) to reflect your use case.
1. Adapt [this testing file](https://github.com/asyncapi/modelina/blob/1e71b3b2cab6bc2c277001fcafe7e1b8ed175ce9/examples/TEMPLATE/index.spec.ts#L4) for your use case. In most cases, it could be as simple as changing the title of the test!
1. Add your example to our overall list of [examples](https://github.com/asyncapi/modelina/blob/master/examples/README.md).

Aaaand you are done! :tada: 

## FAQs
Below are some of the typical questions we've received about contributing to Modelina.

### Can I solve issues not labeled "good first issue"?

Absolutely!

Regular issues are generally not that well described in terms of what needs to be accomplished and require some internal knowledge of the library internals.

If you find an issue you would like to solve, ping one of the maintainers to help you get started. Some issues may require a higher level of effort to solve than might be easily described within the issue, so don't feel shy to chat with us about individual issues. 😀


### What does the CI system do when I create a PR?
Because the CI system is quite complex, we've designed it so that individual contributors don't need to understand in depth details. 

That said, here is a general rundown on what's triggered by each PR:

- We inherit all [AsyncAPI core GitHub workflows](https://github.com/asyncapi/.github/tree/master/.github/workflows), including the most important one:
    - [A standard PR workflow](https://github.com/asyncapi/.github/blob/master/.github/workflows/if-nodejs-pr-testing.yml) which ensures that the following commands need to succeed: `npm run test`, `npm run lint`, and `npm run generate:assets`.
- [BlackBox testing](https://github.com/asyncapi/modelina/tree/master/test/blackbox) has its [own workflow](https://github.com/asyncapi/modelina/blob/master/.github/workflows/blackbox-testing.yml) which ensures that all supported inputs generate syntactically correct outputs to any of the output languages. This check takes a while (usually +5 minutes). Generally, you don't need to worry about this one, unless the code were to suddenly generate syntactically incorrect code (we will guide you if this happens). 
- [Coverall](https://github.com/asyncapi/modelina/blob/master/.github/workflows/coverall.yml) ensures we get test coverage statistics in each PR, thus ensuring we see how it affects overall test coverage. It creates a comment on the PR with the coverage status.
- [SonarCloud](https://sonarcloud.io/dashboard?id=asyncapi_generator-model-sdk) runs a code analysis to ensure no bugs, security concerns, code smells, or duplicated code blocks. Make sure you address any concerns found by this bot, because it generates a comment to the PR if it finds any issue.

At the end of the day, sometimes checks just fail, based on weird dependency problems. If any test failures occur that don't look like a problem you can fix, simply tag one of the maintainers. We're there to help! :smile: