---
title: 'Validate AsyncApi documents with CLI commands'
description: 'This tutorial will teach you how to validate AsynApi document using CLI commands'
weight: 115
---
## Introduction

<p>When it comes to APIs, validation is inevitable because it helps you keep them well-defined. Validation means testing an API to see if it meets the required functionality, performance, security, and quality standards. It is important to validate an API to ensure that it functions properly.</p>

<p>This tutorial will teach you how to validate your AsyncAPI documents using your CLI (Command Line Interface).</p>

## Background context

<p>An AsyncAPI document is a file that defines and describes the various components of a message-based or event-driven API. Event-driven APIs are a type of asynchronous API that allows consumers to subscribe to events of interest. </p>

<p>It adheres to an architecture in which events are fired or triggered. These triggers occur when a producer detects a state change caused by a user's device or an action taken by the user. The producer is an application that sense state changes and produces these changes as messages.</p>

<p>AsyncAPI document enables people or machines communicating with one another to comprehend the capabilities of an event-driven API without requiring access to the source code, documentation, or network traffic inspection.</p>

<p>The document allows developers to define the structure of their API, the format of the API, the events to which consumers can subscribe, and the response they receive when these events are triggered or an action is taken. AsyncAPI documents are represented as JSON objects that follow the JSON.</p>

## Installation Guide

<p>The AsyncAPI tool is used across all operating systems to validate AsyncAPI documents.To use the AsynAPI CLI tool, you must install NPM and a Node.js version 10 or higher. To check if you already have both installed, run the following commands in your terminal. </p>

```
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
```
npm install -g @asyncapi/cli
```
### Installation on Mac

There are two ways to install the AsyncAPI CLI on your macOS.

 - Using the ``` brew ``` package manager.
 - Using the ``` pkg ``` files

#### ``` Brew ``` installation method
To install the AsyncAPI CLI using the ```brew``` package manager, run the following commands in your terminal:
```
# Install brew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install AsyncAPI CLI

brew install asyncapi
```

#### ``` Pkg ``` installation method

<p>Every release of the AsyncAPI CLI has its own macOS dedicated pkg file that enables you to install the CLI tool as a macOS application. To download the latest CLI release, run this command in your terminal:
</p>

```
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg
```
To download a specific CLI release, run this command in your terminal:

```
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.pkg
```
Follow this link for all [AsynAPI CLI releases](https://github.com/asyncapi/cli/releases)
<p>After downloading the AsyncAPI CLI, install it via the following command:</p>

```
sudo installer -pkg asyncapi.pkg -target /
```

### Installation on Linux
<p>Selecting the appropriate AsyncAPI CLI installation method on a Linux operating system depends on your Linux distro.</p>

#### Debian based distros

For Debian based distros, you can install the AsycAPI CLI using the ```dpkg``` package manager for Debian.

```
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb
```

To download a specific release of the CLI, run this command in your terminal:

```
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb
```
#### Other distros

You can install the AsyncAPI CLI for other Linux distros using the archive ```tar.gz``` file. To download the latest release of the CLI, run this command in your terminal:

```
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.tar.gz
```
<p>Once you have downloaded the archived file, untar it by running this command in your terminal:</p>

```
tar -xzf asyncapi.tar.gz
```
The step above will create an ```AsynAPI``` directory in the current path. To run the CLI from anywhere, you must create a ```symlink```. If the current path you are on is ```/user/local/bin```, for example, you must create the ```symlink``` in the ```/user/local/bin``` directory by following these steps:

```
# cd into the unarchived directory
cd asyncapi

# get the absolute path
pwd

# Create a symlink
ln -s <absolute-path>/bin/asyncapi /user/local/bin/asyncapi

# The "asyncapi" command should be available to be used
asyncapi
```

## Summary

<p>In this tutorial, you learned how to validate AsynApi document using the cli across various operating system and different methods.</p>

<p>Installation on Mac OS can be achieved through the Brew or pkg methods; however, installation on the Linux operating system is possible depending on your Linux distro.</p>


## Next steps
After learning how to validate AsyncAPI documents with the CLI, you can move on to learning how to validate AsyncAPI documents with Studio.