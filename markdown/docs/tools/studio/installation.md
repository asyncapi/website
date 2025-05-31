---
title: 'Installation Guide'
weight: 30
---

AsyncAPI Studio is available both as an online service and as a local application that you can run on your own machine. This guide will walk you through the different installation and deployment options.

## Online Service

The easiest way to use AsyncAPI Studio is through the hosted online version at:

[https://studio.asyncapi.com](https://studio.asyncapi.com)

This version requires no installation and provides all the features of AsyncAPI Studio directly in your browser.

## Local Installation

You can also run AsyncAPI Studio locally using one of the following methods:

### Using Node.js

Prerequisites:
- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/installation) (preferred) or npm

1. Clone the repository:
   ```sh
   git clone https://github.com/asyncapi/studio.git
   cd studio
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Start the development server:
   ```sh
   pnpm run studio
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Using Docker

If you prefer to use Docker, AsyncAPI Studio provides a Docker image that you can easily run:

1. Pull the latest Docker image:
   ```sh
   docker pull asyncapi/studio:latest
   ```

2. Run the container:
   ```sh
   docker run -p 80:80 asyncapi/studio
   ```

3. Open your browser and navigate to:
   ```
   http://localhost
   ```

Alternatively, you can build the Docker image yourself:

```sh
git clone https://github.com/asyncapi/studio.git
cd studio
docker build -f apps/studio/Dockerfile -t asyncapi/studio .
docker run -p 80:80 asyncapi/studio
```

#### Docker Compose Example

For more complex deployments, you can use Docker Compose. Create a file named `docker-compose.yml` with the following content:

```yaml
version: '3'
services:
  studio:
    image: asyncapi/studio:latest
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_GA_TRACKING_ID=your-ga-id
```

Then run:

```sh
docker-compose up -d
```
This will start AsyncAPI Studio in detached mode, making it accessible at http://localhost:8080.

Use `docker logs` to troubleshoot issues

### Using the AsyncAPI CLI

You can also start AsyncAPI Studio locally using the [AsyncAPI CLI](../cli/):

1. Install the AsyncAPI CLI globally:
   ```sh
   npm install -g @asyncapi/cli
   ```

2. Use the `start studio` command:
   ```sh
   asyncapi start studio
   ```

3. A browser window should automatically open with AsyncAPI Studio running locally.

## Production Build

If you want to build AsyncAPI Studio for production deployment:

1. Clone the repository:
   ```sh
   git clone https://github.com/asyncapi/studio.git
   cd studio
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Build for production:
   ```sh
   pnpm run build:studio
   ```

The build artifacts will be stored in the `apps/studio/.next` directory and can be served using any static file server or deployment platform.

## System Requirements

- **Browser**: Latest versions of Chrome, Firefox, Safari, or Edge
- **For local development**:
  - Minimum 2GB RAM
  - 1GB of free disk space
  - Node.js v18 or higher