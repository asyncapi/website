---
title: 'Context concept'
weight: 60
---

## Overview

AsyncAPI CLI provides functionality called `context`. It's purpose is to help to work with AsyncAPI CLI in large projects where you do not have just one service exposing AsyncAPI document, but multiple.

Event driven architecture involves multiple actors, subscribers and publishers. One time you want to validate document **A** and the other time you want to generate models from document **B**. Every time you do it, you need to provide to AsyncAPI CLI the location of the AsyncAPI document, which might be time consuming. You can workaround it with aliases in bash profiles or with other solutions but it is better to use `context` feature, as you can then store it in your repository and share with other team members.

In short it means that for example instead of writing `asyncapi validate /some/folder/my-asyncapi.yml` you can create a context called `myasync` that will be an alias for and point to `/some/folder/my-asyncapi.yml`. This way next time you use the CLI you can do `asyncapi validate myasync`.

## Context File location

You can have a global context for your workstation, and a project specific context.

If your use case is that you work with multiple repositories, you might want to use a global context. The `.asyncapi-cli` context file is then located in your home directory. You can also store your custom `.asyncapi-cli` file in your project with custom configuration. This way when you run `asyncapi config context add` inside your project, the new context is added to the context file under your project.

## How to add context to a project

### Manually
  - Create file `.asyncapi-cli` containing [minimal empty context file](#minimalEmptyContextFile) in:
    - current directory
    - root of current repository
    - user's home directory

### Using CLI's `init` command

`asyncapi config context init [CONTEXT-FILE-PATH]`

Where `[CONTEXT-FILE-PATH]` instructs CLI what directory should the file `.asyncapi-cli` containing [minimal empty context file](#minimalEmptyContextFile) be created in:
  - current directory: `asyncapi config context init .` (default)
  - root of current repository: `asyncapi config context init ./`
  - user's home directory: `asyncapi config context init ~`
  
(if `[CONTEXT-FILE-PATH]` is omitted, empty context file is created in current directory)

Make use of newly created `.asyncapi-cli` by executing command:

`asyncapi config context add [CONTEXT-NAME] [SPEC-FILE-PATH]`

### Setup example in a real project

Below you can see an example of context setup for [Event Driven Flight status notification service](https://github.com/amadeus4dev-examples/amadeus-async-flight-status/tree/ff433b6d320a3a6a2499976cbf0782353bc57c16) of the [Amadeus Airline Platform](https://amadeus.com/en/industries/airlines/airline-platform), with multiple microservices and their AsyncAPI documents.

```bash
# One-time initialization of '.asyncapi-cli' file
(main)$ asyncapi config context init
Initialized context /amadeus-async-flight-status/.asyncapi-cli

# Adding first context
(main)$ asyncapi config context add subscriber subscriber/asyncapi.yaml
Added context "subscriber".
You can set it as your current context: asyncapi config context use subscriber
You can use this context when needed by passing subscriber as a parameter: asyncapi validate subscriber

# Adding more contexts
(main)$ asyncapi config context add notifier notifier/asyncapi.yaml
Added context "notifier".
You can set it as your current context: asyncapi config context use notifier
You can use this context when needed by passing notifier as a parameter: asyncapi validate notifier

(main)$ asyncapi config context add monitor monitor/asyncapi.yaml
Added context "monitor".
You can set it as your current context: asyncapi config context use monitor
You can use this context when needed by passing monitor as a parameter: asyncapi validate monitor

# Setting monitor as default context
(main)$ asyncapi config context use monitor
monitor is set as current

# Now you do not even have to remember the context name, and default 'monitor/asyncapi.yaml' will be validated
(main)$ asyncapi validate
File monitor/asyncapi.yaml is valid but has (itself and/or referenced documents) governance issues.
monitor/asyncapi.yaml
  1:1       warning  asyncapi-defaultContentType      AsyncAPI document should have "defaultContentType" field.
  1:1       warning  asyncapi-id                      AsyncAPI document should have "id" field.
  1:1       warning  asyncapi2-tags                   AsyncAPI object should have non-empty "tags" array.
  1:11  information  asyncapi-latest-version          The latest version of AsyncAPi is not used. It is recommended update to the "2.6.0" version.  asyncapi
  2:6       warning  asyncapi-info-contact            Info object should have "contact" object.                                                     info
 19:15      warning  asyncapi2-operation-operationId  Operation should have an "operationId" field defined.                                         channels.flight/update.subscribe
 26:13      warning  asyncapi2-operation-operationId  Operation should have an "operationId" field defined.                                         channels.flight/queue.publish
✖ 7 problems (0 errors, 6 warnings, 1 info, 0 hints)

# You can now use context name when running AsyncAPI commands, no need to remember file location like 'notifier/asyncapi.yaml'
(main)$ asyncapi validate notifier
File notifier/asyncapi.yaml is valid but has (itself and/or referenced documents) governance issues.
notifier/asyncapi.yaml
  1:1       warning  asyncapi-defaultContentType      AsyncAPI document should have "defaultContentType" field.
  1:1       warning  asyncapi-id                      AsyncAPI document should have "id" field.
  1:1       warning  asyncapi2-tags                   AsyncAPI object should have non-empty "tags" array.
  1:11  information  asyncapi-latest-version          The latest version of AsyncAPi is not used. It is recommended update to the "2.6.0" version.  asyncapi
  2:6       warning  asyncapi-info-contact            Info object should have "contact" object.                                                     info
 18:13      warning  asyncapi2-operation-operationId  Operation should have an "operationId" field defined.                                         channels.flight/update.publish
✖ 6 problems (0 errors, 5 warnings, 1 info, 0 hints)

# Switch default context 
(main)$ asyncapi config context use notifier
notifier is set as current

# List all contexts
(main)$ asyncapi config context list
monitor: monitor/asyncapi.yaml
notifier: notifier/asyncapi.yaml
subscriber: subscriber/asyncapi.yaml
```

## Context File structure

### Fixed Fields

Field Name | Type | Description
---|:---:|---
current | `string` | An optional string value representing one of context names, which is used as default in CLI. Default means you can run CLI commands without providing context name, like `asyncapi validate`, and it will run against the default - `current` - context.
store | [Store Object](#storeObject) | **REQUIRED**. Map of filesystem paths to target AsyncAPI documents.

### <a name="storeObject"></a>Store Object

Map of filesystem paths to target AsyncAPI documents.

**Patterned Fields**

Field Pattern | Type | Description
---|:---:|---
\{contextName\} | `string` | An optional string value representing filesystem path to the target AsyncAPI document.

### <a name="minimalEmptyContextFile"></a>Minimal Empty Context File
Raw JSON:
```
{
  "store": {}
}
```
Stringified JSON:
```
{"store":{}}
```

### Context File Example

Example of a context file for [Event Driven Flight status notification service](https://github.com/amadeus4dev-examples/amadeus-async-flight-status/tree/ff433b6d320a3a6a2499976cbf0782353bc57c16) of the [Amadeus Airline Platform](https://amadeus.com/en/industries/airlines/airline-platform), with multiple microservices and their AsyncAPI documents:
```
{
  "current": "monitor",
  "store": {
    "monitor": "monitor/asyncapi.yaml",
    "notifier": "notifier/asyncapi.yaml",
    "subscriber": "subscriber/asyncapi.yaml"
  }
}
```

## More context related CLI options

All commands for managing contexts are available under `asyncapi config context` [CLI commands group](usage#asyncapi-config-context).
