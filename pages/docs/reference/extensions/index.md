---
title: 'Extensions ' 
weight: 11
---

## What's an extension?

Extensions are the mechanism AsyncAPI has to allow you use custom or protocol-specific features. Extensions follow a separate release cycle and everyone can create their own. This repository is meant to contain a list of official and community supported extensions.

> Both, JSON or YAML, are supported formats. Please, take into account that only the subset of YAML that can be translated to JSON is allowed.


#### Usage in an AsyncAPI document
AsyncAPI extensions are those that are preceded by `x-`, e.g., `x-twitter`. They can be placed in the AsyncAPI document in locations specified by documentation of given extension.

## Adding your extension to the catalog

If you'd like to add your extension to the catalog, please submit a pull request to [asyncapi/extensions-catalog](https://github.com/asyncapi/extensions-catalog) repository. Make sure the extension doesn't exist already, in which case it would be better to improve the existing one so everybody benefits from it.

## Extending unsupported features

If you need a feature not covered by the AsyncAPI specification, you can create an extension for it. Should this extension be useful to others, consider contributing it back to the AsyncAPI community. You can do this by [opening a spec issue](https://github.com/asyncapi/spec) in the AsyncAPI GitHub repository. Before contributing, review the [AsyncAPI contribution guidelines](https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md).


## Questions?

If you have questions, please submit an issue to this repository or [join our Slack workspace](https://asyncapi.com/slack-invite).