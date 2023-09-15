---
title: 'Installation guide'
weight: 30
---

## Node and npm

To use the AsyncAPI CLI tool, you must install NPM and Node.js version 10 or higher. To check if you already have both installed, run the following commands in your terminal:

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
## Docker

Install [Docker](https://docs.docker.com/get-docker/) first, then use docker to build the image using the following command :
``` 
docker build -t asyncapi/cli:latest . 
``` 
and run the image using the following command :

```bash
docker run --rm -it \
--user=root \
-v [ASYNCAPI SPEC FILE LOCATION]:/app/asyncapi.yml \
-v [GENERATED FILES LOCATION]:/app/output \
asyncapi/cli [COMMAND HERE]

# Example that you can run inside the cli directory after cloning this repository. First, you specify the mount in the location of your AsyncAPI specification file and then you mount it in the directory where the generation result should be saved.
docker run --rm -it \
   --user=root \
   -v ${PWD}/test/integration/fixtures/asyncapi_v1.yml:/app/asyncapi.yml \
   -v ${PWD}/output:/app/output \
   asyncapi/cli generate fromTemplate -o /app/output /app/asyncapi.yml @asyncapi/html-template --force-write
```
Note: Use ``` ` ``` instead of `\` for Windows.


## Mac
There are two ways to install the AsyncAPI CLI on your macOS: using the `brew` package manager or `pkg` files.

### brew

To install the AsyncAPI CLI using the `brew` package manager, run the following commands in your terminal:
```sh
# Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install AsyncAPI CLI
brew install asyncapi
```

### pkg

Every release of the AsyncAPI CLI has two macOS dedicated `pkg` file that enables you to install the CLI tool as a macOS application for x64 as well as arm64 architecture.
To download the latest CLI release, run this command in your terminal:
```sh
# For x64
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x64.pkg

# For arm64
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.arm64.pkg
```

To download a specific CLI release, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.pkg
```

<Remember>
Follow this link for all <a href="https://github.com/asyncapi/cli/releases">AsyncAPI CLI releases</a>.
</Remember>

After downloading the AsyncAPI CLI, install it via the following command:

```sh
sudo installer -pkg asyncapi.pkg -target /
```

## Windows 
For Windows just install the appropriate installer and simply follow the default installation steps to complete the installation process.

Download [asyncapi.x64.exe](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x64.exe) for 64-bit Windows and download [asyncapi.x86.exe](https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x86.exe) for 32-bit Windows.

## Linux
Selecting the appropriate AsyncAPI CLI installation method on a Linux operating system depends on your Linux distro.

### Debian based distros

For Debian based distros, you can install the AsycAPI CLI using the `dpkg` package manager for Debian.
```sh
curl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb
```

To download a specific release of the CLI, run this command in your terminal:
```sh
curl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb
```

### Other distros
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

The step above will create an `AsyncAPI` directory in the current path. To run the CLI from anywhere, you must create a `symlink`. If the current path you are on is `/user/local/bin`, for example, you must create the `symlink` in the `/user/local/bin` directory by following these steps:
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
