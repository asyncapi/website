---
title: AsyncAPI CLI
weight: 1
---

## Install CLI Using NPM and Node
To use the AsynAPI CLI tool, you must have Node.js version 10 or higher and NPM installed on your PC. To check if you already have Node installed, run this in your terminal:

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

If you don’t have Node.js or NPM installed, [install both with this package manager](https://nodejs.org/en/download/package-manager/).

After installing Node.js and NPM, run the following command to install the AsyncAPI CLI globally on your PC:
```sh
npm install -g @asyncapi/cli
```

## Install CLI on MacOS
There are two ways to install the AsyncAPI CLI on your MacOS:

### Using `brew`
To install the AsyncAPI CLI using `brew` package manager, run the following commands in your terminal:
```sh
# Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install AsyncAPI CLI
brew install asyncapi
```

### Using `pkg`
Every release of the AsyncAPI CLI has its own MacOS dedicated `pkg` file that enables you to install the CLI tool as a MacOS application. 
To download the latest release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.pkg
```

All AsynAPI CLI releases are listed [here](https://github.com/asyncapi/cli/releases).
After downloading the Async CLI, you can install it by running this in your terminal:
```sh
sudo installer -pkg asyncapi.pkg -target /
```

## Install CLI on Linux
The mode of installing AsyncAPI CLI tool on your Linux operating system depends on the Linux distro you are using.

### Debian Based Distros
For Debian based distros, you can install the AsycAPI CLI using the `dpkg` package manager for debian.
To download the latest release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb
```

All AsynAPI CLI releases are listed [here](https://github.com/asyncapi/cli/releases)

### Other Distros
For other Linux distros, you can install the AsyncAPI CLI using the archive `tar.gz` file. To download the latest release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.tar.gz
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.tar.gz
```

All releases of the CLI archived files are listed [here](https://github.com/asyncapi/cli/releases).

Untar the archive file by running this command in your terminal:
```sh
tar -xzf asyncapi.tar.gz
```

The step above will create an `AsynAPI` directory in the current path. To run the CLI from anywhere, you will have to create a `symlink`. If the current path you are on is `/usr/local/bin` for example, you will have to create the `symlink` in the `/usr/local/bin` directory by following these steps:
```sh
# cd into the unarchived directory
cd asyncapi

# get the absolute path
pwd

# Create a symlink
ln -s <absolute-path>/bin/asyncapi /usr/local/bin/asyncapi

# The "asyncapi" command should be available to be used
asyncapi
```

## Usage
AsyncAPI CLI makes it easier to work with AsyncAPI files. There has a well-documented help command if you need one. To get help, run this command in your terminal:
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