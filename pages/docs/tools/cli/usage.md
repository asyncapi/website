---
title: 'Usage'
weight: 40
---

The AsyncAPI CLI makes it easier to work with AsyncAPI documents.

To get **help**, run this command in your terminal:

```sh
asyncapi --help
```

It should print something similar to this:

```sh
All in one CLI for all AsyncAPI tools

USAGE
  $ asyncapi [COMMAND]

TOPICS
  config    CLI config settings
  generate  Generate models and template
  start     Start AsyncAPI studio

COMMANDS
  config    access configs
  diff      find diff between two AsyncAPI files
  optimize  optimizes your AsyncAPI file by removing unused components, re-using duplicates etc.
  new       creates a new AsyncAPI file
  start     starts a new local instance of Studio
  validate  validate an AsyncAPI file
  generate    generate all kinds of stuff
    models       generate all the typed models for the message payloads defined in the AsyncAPI file
      typescript    generate the models for TypeScript
      csharp        generate the models for C#
      golang        generate the models for Go
      java          generate the models for Java
      javascript    generate the models for JavaScript
      dart          generate the models for Dart
      rust          generate the models for Rust
      kotlin        generate the models for Kotlin
      php           generate the models for PHP
      cplusplus     generate the models for C++
    fromTemplate    generate whatever you want using templates compatible with AsyncAPI Generator
```
