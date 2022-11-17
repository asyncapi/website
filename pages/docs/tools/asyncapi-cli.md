---
title: AsyncAPI CLI
weight: 1
---

# Introduction
The AsyncAPI CLI is a tool you can use to work with your AsyncAPI documents. You can use the CLI to validate AsyncAPI documents, use the Generator tool, and even create new AsyncAPI documents.

## Installation Guide
To use the AsynAPI CLI tool, you must install NPM and a Node.js version 10 or higher. To check if you already have both installed, run the following commands in your terminal:

```sh
# check if node is installed
node -v
# or
node --version

# check if NPM is installed
npm -v
# or
npm --version
```

If you don’t have Node.js or NPM installed, you can install both with this [Node.js package manager](https://nodejs.org/en/download/package-manager/).

After installing Node.js and NPM, run the following command to install the AsyncAPI CLI globally:
```sh
npm install -g @asyncapi/cli
```

### Mac
There are two ways to install the AsyncAPI CLI on your macOS: using the `brew` package manager or `pkg` files.

#### `brew` installation
To install the AsyncAPI CLI using the `brew` package manager, run the following commands in your terminal:
```sh
# Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install AsyncAPI CLI
brew install asyncapi
```

#### `pkg` installation
Every release of the AsyncAPI CLI has its own macOS dedicated `pkg` file that enables you to install the CLI tool as a macOS application. 
To download the latest CLI release, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg
```

To download a specific CLI release, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.pkg
```

<Remember>
Follow this link for all <a href="https://github.com/asyncapi/cli/releases">AsynAPI CLI releases</a>.
</Remember>

After downloading the AsyncAPI CLI, install it via the following command:

```sh
sudo installer -pkg asyncapi.pkg -target /
```

### Linux
Selecting the appropriate AsyncAPI CLI installation method on a Linux operating system depends on your Linux distro.

#### Debian based distros
For Debian based distros, you can install the AsycAPI CLI using the `dpkg` package manager for Debian.
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb
```

#### Other distros
You can install the AsyncAPI CLI for other Linux distros using the archive `tar.gz` file. To download the latest release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.tar.gz
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.tar.gz
```

Once you have downloaded the archived file, untar it by running this command in your terminal:
```sh
tar -xzf asyncapi.tar.gz
```

The step above will create an `AsynAPI` directory in the current path. To run the CLI from anywhere, you must create a `symlink`. If the current path you are on is `/user/local/bin`, for example, you must create the `symlink` in the `/user/local/bin` directory by following these steps:
```sh
# cd into the unarchived directory
cd asyncapi

# get the absolute path
pwd

# Create a symlink
ln -s <absolute-path>/bin/asyncapi /user/local/bin/asyncapi

# The "asyncapi" command should be available to be used
asyncapi
```

## Usage
The AsyncAPI CLI makes it easier to work with AsyncAPI documents.

To get **help**, run this command in your terminal:
```sh
asyncapi --help
```

It should print something like this:
```sh
All in one CLI for all AsyncAPI tools

USAGE
  $ asyncapi [COMMAND]

COMMANDS
  config    access configs
  diff      find diff between two AsyncAPI files
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
    fromTemplate    generate whatever you want using templates compatible with AsyncAPI Generator 
```

---

<DocsButton
  suggestions={[
    {
      href: '/docs/tools',
      title: 'Tools - Overview',
      type:'back',
    },
    {
      href: '/docs/guides',
      title: 'Guides - Overview',
      type:'next',
    }
  ]}
/>