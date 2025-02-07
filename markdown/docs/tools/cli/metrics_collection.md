---
title: 'Metrics Collection'
weight: 70
---

# Metrics collection guideline

AsyncAPI **anonymously** tracks command executions to improve the specification and tools, ensuring no sensitive data reaches our servers. It aids in comprehending how AsyncAPI tools are used and adopted, facilitating ongoing improvements to our specifications and tools.

Even though metrics collection is enabled by default, you can always [disable tracking](#how-to-disable-tracking) if you want to.

## What we collect
We are collecting the following metrics:

- `asyncapi_adoption.action.invoked`:
With this metric we are tracking the command executed on the CLI as soon as the command is invoked, so it has already been executed but not finished yet. We just want to know which commands are used, regardless they have failed or succeeded.

Example of the data collected by this metric when the `validate` command has been executed:
```
asyncapi_adoption.action.invoked        COUNTER { action: 'validate' }  1
```

- `asyncapi_adoption.action.finished`:
This metric tracks the command executed once it has already finished, carrying the result of the execution and some metadata based on the AsyncAPI document in place.

Example for `validate` command successfully executed and finished:
```
asyncapi_adoption.action.finished       COUNTER {
  validation_result: 'valid',
  success: true,
  asyncapi_version: '2.6.0',
  asyncapi_servers: 2,
  asyncapi_channels: 4,
  asyncapi_messages: 3,
  asyncapi_operations_send: 3,
  asyncapi_operations_receive: 1,
  asyncapi_schemas: 52,
  action: 'validate'
  }       1
```

## Where the data is stored
We are making use of [New Relic API](https://docs.newrelic.com/docs/apis/intro-apis/introduction-new-relic-apis/#rest-api) to send the metrics collected to _New Relic_ servers, where they are stored, and finally visualized on the AsyncAPI website.

Metrics won't be collected in CI environments, or when the "CI" env variable is set up to "true".

The analytics config file will be store by default at your home directory. In case you prefer to change the file path then you should set the `ASYNCAPI_METRICS_CONFIG_PATH` env var to any specific path value when running any command. For instance:
````
ASYNCAPI_METRICS_CONFIG_PATH=/tmp/.asyncapi-analytics asyncapi config analytics --status
````

## How to disable tracking
To disable tracking, please run the following command:  
`asyncapi config analytics --disable`

Once disabled, if you want to enable tracking back again then run:  
`asyncapi config analytics --enable`

In case you do not know the current status of analytics, then you can append the "--status" flag to be aware of it:
`asyncapi config analytics --status`

Remember that keeping this tracking enabled will help AsyncAPI community to provide better specifications and tools in the future.