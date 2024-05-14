---
title: 'Introduction'
weight: 20
---


The AsyncAPI CLI is a command-line tool that provides a set of commands for working with AsyncAPI documents. AsyncAPI is a specification for describing asynchronous APIs, which allows developers to define the structure of messages exchanged between different parts of their applications. The AsyncAPI CLI simplifies creating, validating, bundling, and manipulating AsyncAPI documents, making it easier to work with asynchronous APIs.

## Features

The AsyncAPI CLI offers the following key features:

* Creation: New AsyncAPI documents can be created from scratch using the CLI, which is useful when starting a new project or creating a new version of an existing API.

* Validation: AsyncAPI documents can be quickly and easily validated using the [AsyncAPI Parser](https://github.com/asyncapi/parser-js), which ensures that the documents conform to the AsyncAPI specification and catches errors early in the development process.

* Conversion: The AsyncAPI CLI can convert AsyncAPI documents from one version to another, which is helpful for migrating APIs to a newer version of the AsyncAPI specification.

* Difference: The AsyncAPI CLI can be used to find the differences between two AsyncAPI documents, which helps compare different versions of an API or identify changes made to an API.
  
* Generation: The AsyncAPI CLI leverages AsyncAPI libraries like [Generator](https://github.com/asyncapi/generator) and [Modelina](https://github.com/asyncapi/modelina), which allow you to generate various types of documentation, applications, and models in different programming languages. This feature can save significant time and effort when creating new APIs.

* Optimize: Using [Optimizer](https://github.com/asyncapi/optimizer/), the AsyncAPI CLI can be used to optimize an AsyncAPI specification file which can optimize the structure of the AsyncAPI document to make it smaller and without repetition.

* Start: The AsyncAPI CLI can be used to start [AsyncAPI Studio](https://studio.asyncapi.com/) locally, which the user can use to view, edit, and test AsyncAPI documents.
  
To summarize, the AsyncAPI CLI offers the following features and process flow, as shown in the diagram below:

```mermaid
graph TD;
A[AsyncAPI Document]
B[Creation]
J[Studio - Editor]
I[Optimization]
D[Validation]
C[Generation]
F[Apps/Docs]
G[Models]
H[Diff]
K[Bundling]
E[Conversion]
A-->B;
A-->D;
A-->C;
C-->F
C-->G
A-->H;
A-->I;
A-->J;
A-->E;
A-->K;
```

## CLI flow

The following flowchart illustrates the process flow of the AsyncAPI CLI:

```mermaid
graph TD;
A[Start] --> B[User runs the AsyncAPI CLI]
B --> C[User issues a command]
C --> D[CLI processes the command and runs the corresponding operation]
D --> |Is the operation successful?| E{Yes}
D --> |Is the operation recoverable?| F{Yes}
E --> G[CLI returns the results of the operation to the user]
F --> |Operation Error| H[CLI displays an error message and suggests possible next steps]
G --> J[User receives the results]
H --> I[User follows suggested steps to recover]
I --> C[User reissues the corrected command]
J[User terminates the AsyncAPI CLI] --> K[End]
```

This flowchart shows the high-level process that occurs when using the AsyncAPI CLI. The user starts by running a command (such as `validate`, `generate`, or `start`), which the CLI processes. The CLI then performs the corresponding operation (such as validating or generating an AsyncAPI document) and returns the results to the user. If an error occurs, the CLI displays an error message and suggests possible next steps for the user.
