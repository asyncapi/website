---
weight: 1
sidebar-title: Working on Modelina
sidebar-category: Contributing
sidebar-category-weight: 200
---

# Development
These are some of the development guidelines and help to setup the library for development.

## Docker
A [Dockerfile](../Dockerfile) is provided and can be used for running test suites or any other command.
You can either build the image and run the needed commands manually or rather use any of the following npm scripts:

- `npm run docker:build` builds the docker image with the tag `asyncapi/modelina` (the rest of the scripts run this one as well).
- `npm run docker:test` runs the main test suite.
- `npm run docker:test:blackbox` runs the BlackBox test suite.

## Environment setup

To setup the environment follow these steps:
1. Setup the project by first installing the dependencies `npm install`
2. Make sure the tests pass by running `npm run test` script
    - You can update snapshots by running `npm run test -- -u`
3. Make sure code is well formatted and secure `npm run lint`

## BlackBox testing
We have several BlackBox tests that are run separately from the `npm run test` script. Please refer to the [BlackBox documentation](../test/blackbox) for further information.