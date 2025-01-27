---
title: GitHub Action for CLI
weight: 50
---

This action exposes the [AsyncAPI CLI](https://github.com/asyncapi/cli). It allows you to generate documentation, validate AsyncAPI documents, convert between different AsyncAPI versions and much more. The source code of the action can be found [here](https://github.com/asyncapi/cli/tree/master/github-action)

## Inputs

### `cli_version`

Version of the AsyncAPI CLI you wish to use. You can find all available versions [here](https://github.com/asyncapi/cli/releases). Recommended leave it out of the inputs and use the default value.

**Default** points to the`latest` version.

> [!TIP]
> We recommend to default to `latest` version. This way there is no overhead with the script updating the CLI version. As it takes a lot of time to update the CLI version, we recommend to update it only when you need to use another one for compatibility reasons.

### `command`

Command that you wish to run. You can find all available commands Available commands are:
- `generate` - generates documentation from AsyncAPI document
- `validate` - validates AsyncAPI document
- `optimize` - optimizes AsyncAPI document
- `convert` - converts AsyncAPI document to another version
- `custom` - allows you to run any command that is available in the AsyncAPI CLI. You can find all available commands [here](https://www.asyncapi.com/docs/tools/cli/usage).

**Default** points to `generate` command.

> [!IMPORTANT]
> In case you want to use `custom` command, you need to pass an array of commands to the [`custom_command`](#custom_command) input. Although passing command is not required, it is recommended to pass it to avoid any issues later on.
> For example, if you want to run `asyncapi bundle ./asyncapi.yaml --output final-asyncapi.yaml` you need to pass `"bundle ./asyncapi.yaml --output final-asyncapi.yaml" to the `custom_command` input.

### `custom_command`

In case you want to use `custom` command you need to pass the command that you want to run in this input. You can find all available commands [here](https://www.asyncapi.com/docs/tools/cli/usage). 

**Default** points to '' (empty string).

Sample usage:

```yaml
- name: Generating HTML from my AsyncAPI document
  uses: asyncapi/cli@v2.16.0# You can use any version you want
  with:
    custom_command: bundle ./asyncapi.yaml --output final-asyncapi.yaml
```

> [!CAUTION]
> You have to pass the whole command as a string including the parameters and the command itself.
> It will run like this: `asyncapi <custom_command>`


### `filepath`

Path to the AsyncAPI document that you want to process.   

**Default** expects the AsyncAPI document to be in the root of the repository and named `asyncapi.yaml`.

### `template`

Template for the generator. Official templates are listed here https://github.com/asyncapi/generator#list-of-official-generator-templates. You can pass template as npm package, url to git repository, link to tar file or local template.

**Default** points to `@asyncapi/markdown-template@0.10.0` template.

> [!TIP]
> We recommend to always specify the version of the template to not encounter any issues with the action in case of release of the template that is not compatible with given version of the generator.

### `language`

Specifies the language to be used for the generated models. The value must be a valid language name supported by [modelina](https://github.com/asyncapi/modelina). 

**Default** is not set.

> [!WARNING]
> Either `language` or `template` must be set else an error will be thrown. 
> The action will return an error if the language is not supported by [modelina](https://github.com/asyncapi/modelina).

### `output`

Path to the output directory. Can be used for `generate` and `convert` commands.

**Default** points to `output` directory in the root of the repository.

### `parameters`

The command that you use might support and even require specific parameters to be passed to the CLI for the generation. You can find all available parameters [here](https://www.asyncapi.com/docs/tools/cli/usage).

**Default** points to '' (empty string).

> [!NOTE]
> For template parameters, you need to pass them as `-p <template_parameters>` as can be seen in CLI documentation.


## Example usage

> [!WARNING]
> Using `docker://asyncapi/github-action-for-cli` will not work as expected. This is because the GitHub Actions runner does not pass params to the docker image correctly. This is why we recommend to use `asyncapi/cli` instead.
> However, you don't need to worry as it won't build the image every time. It will pull it from Docker Hub as it is already built there.

### Basic

In case all defaults are fine for you, just add such step:

```yaml
- name: Generating Markdown from my AsyncAPI document
  uses: asyncapi/cli@v2.16.0 # You can use any version you want
```

### Using all possible inputs

In case you do not want to use defaults, you for example want to use different template:

```yaml
- name: Generating HTML from my AsyncAPI document
  uses: asyncapi/cli@v2.16.0 # You can use any version you want
  with:
    command: generate
    filepath: ./docs/api/asyncapi.yaml
    template: "@asyncapi/html-template@0.9.0" #In case of template from npm. Or can use a link.
    output: ./generated-html
    parameters: "-p baseHref=/test-experiment/ sidebarOrganization=byTags"
```
> [!IMPORTANT]
> Note the usage of `-p` in `parameters` input. This is required for template parameters, unlike previous versions of this action as the action includes other commands than just `generate`.

### Example workflow with publishing generated HTML to GitHub Pages

In case you want to validate your asyncapi file first, and also send generated HTML to GitHub Pages this is how full workflow could look like:

```yaml
name: AsyncAPI documents processing

on:
  push:
    branches: [ master ]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
    #"standard step" where repo needs to be checked-out first
    - name: Checkout repo
      uses: actions/checkout@v2
      
    #In case you do not want to use defaults, you for example want to use different template
    - name: Generating HTML from my AsyncAPI document
      uses: asyncapi/cli@v2.16.0 # You can use any version you want
      with:
        template: '@asyncapi/html-template@0.9.0'  #In case of template from npm, because of @ it must be in quotes
        filepath: docs/api/my-asyncapi.yml
        parameters: -p baseHref=/test-experiment/ sidebarOrganization=byTags #space separated list of key/values
        output: generated-html
      
    #Using another action that takes generated HTML and pushes it to GH Pages
    - name: Deploy GH page
      uses: JamesIves/github-pages-deploy-action@3.4.2
      with:
        ACCESS_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        BRANCH: gh-pages
        FOLDER: generated-html
```

### Example workflow for generating models

In case you want to use models generated from your AsyncAPI document, you can use this action to generate them and then use them in your workflow. This is how full workflow could look like:

```yaml

name: AsyncAPI documents processing

on:
  push:
    branches: [ master ]

jobs:
  generate-models:
    runs-on: ubuntu-latest
    steps:
    #"standard step" where repo needs to be checked-out first
    - name: Checkout repo
      uses: actions/checkout@v2
      
    - name: Generating models from my AsyncAPI document
      uses: asyncapi/cli@v2.16.0 # You can use any version you want
      with:
        command: generate
        filepath: docs/api/my-asyncapi.yml
        language: typescript
        output: generated-models
```

### Example workflow for validating AsyncAPI document changes

In case you want to validate your AsyncAPI document changes, you can use this action to validate them and then use them in your workflow. This is how full workflow could look like:

```yaml
name: Validate AsyncAPI document

on:
  pull_request:
    branches: [ master ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
    #"standard step" where repo needs to be checked-out first
    - name: Checkout repo
      uses: actions/checkout@v2
      
    - name: Validating AsyncAPI document
      uses: asyncapi/cli@v2.16.0 # You can use any version you want
      with:
        command: validate
        filepath: docs/api/my-asyncapi.yml
```

## Local dry run

Use following commands to run and test github action locally:

1. Build docker image of github action for cli

  ```bash
    npm run action:docker:build
  ```

2. Execute docker image with proper arguments

  ```bash
    docker run -e GITHUB_WORKSPACE="" --workdir /action  -v "/home/{user}/path/to/repo":"/action" asyncapi/github-action-for-cli  "" "generate" "github-action/test/asyncapi.yml" "@asyncapi/markdown-template@0.10.0" "" "output" "" ""
  ```

Make sure to change the path of the repo and user in the command.

## Troubleshooting

You can enable more log information in GitHub Action by adding `ACTIONS_STEP_DEBUG` secret to repository where you want to use this action. Set the value of this secret to `true` and you''ll notice more debug logs from this action.