---
title: Variables in URL
weight: 135
---

# Dynamic URL variables

Event-driven architecture benefits from a defined base URL and rules for URL variables. This approach simplifies the management of multiple API endpoints, handling various server configurations and environments.

URL variables are placeholders for values that you can replace during runtime. This enables you to construct dynamic URLs with query parameters and additional information, enhancing the flexibility and maintainability of your API specifications.

This article assumes that you have a basic understanding of AsyncAPI. If you need more information, refer to the [Event-Driven Architectures](https://www.asyncapi.com/docs/tutorials/getting-started/event-driven-architectures).

## Add dynamic variables to the server URL

To add variables to the URL using AsyncAPI between two servers, you can use the `server.url` field along with the `components.serverVariables` field to allow reusable variables across multiple servers.

### Servers section:

Define the servers section in your AsyncAPI document, and include the base URLs for your API servers. Use placeholders enclosed in curly braces {} to represent the variables in the server URL. For example:

```yaml
servers:
 production:
  url: 'https://{domain}.example.com:{port}/v1'
  description:
    Production server staging: url: 'https://{domain}.example.com:{port}/v1'
    description: Staging server
```

### Components serverVariables section

Define the components.serverVariables section in your AsyncAPI document. For each variable used in the server URLs, provide a default value and an optional description:

```yaml
components:
  serverVariables:
    domain:
      default: 'api'
      description:
        The domain of the API server port:
          default: '8080'
          description: The port of the API server
```

### Define domain and port variables

Both servers will use the components.serverVariables definitions for the domain and port variables. If you need to change the values of these variables, you can update their default values in the components.serverVariables section, and the changes will be reflected in both servers' URLs.

Here's the complete AsyncAPI document with the server URL variables:

```yaml
asyncapi: '2.0.0'
info:
  title: Example API
  version: '1.0.0'
  servers:
    production:
      url: 'https://{domain}.example.com:{port}/v1'
      description: Production server
      staging:
        url: 'https://{domain}.example.com:{port}/v1'
        description: Staging server
        components:
          serverVariables:
            domain:
              default: 'api'
              description: The domain of the API server
              port:
                default: '8080'
                description: The port of the API server channels:# ...channel definitions...
```
