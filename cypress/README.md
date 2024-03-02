[![AsyncAPI Banner and Logo](./public/img/logos/github-repobanner-website.png)](https://www.asyncapi.com)

--- 
## Overview 

This folder contains the test code of AsyncAPI website : 

- It's powered by [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

- It utilises [Cypress/react] to provide some additional functionalites to Cypress . 

- Unlike traditional testing tools, Cypress operates directly within the browser, providing real-time feedback as tests execute. This allows developers to see the application's behavior as tests run and pinpoint issues more effectively.

- Component testing in Cypress refers to the practice of testing individual components of a web application in isolation. 
These tests can help ensure that components function as expected and interact correctly with other parts of the application.

- End-to-end (E2E) testing in Cypress involves testing an entire web application from start to finish to ensure that all its components, interactions, and workflows function correctly as a cohesive whole. E2E tests simulate user behavior and interactions, providing a comprehensive validation of the application's functionality.

## Requirements 
Use the following tools to set up the project:
- [Cypress] (This is installed as a dev-dependency).

## Run tests locally 

Assuming you have all the necessary website dependencies installed: 

1. Run it and check on the Cypress Graphical User Interface 
```bash
    npm run cy:open
```
(You can check out the tests and their outputs on the Cypress Window)

2. Run it on your local CLI  
```bash
    npm run test 
```

## Cypress Folder structure
```text
  ├── downloads                   # Any necessary downloads for the tests 
  ├── fixtures                    # Stores all the mock data files used in various tests 
  ├── plugins                     # Used to create additional functionalities in Cypress(if required)
  ├── support                     # Main skeleton for the Cypress tests , Custom commands can be added here
  ├── test                       # Source for the entire testing suite
  ├── utils                      # Necessary Reusable Code and components for writing tests.
  file
```

## Add your own tests 

To add your own tests follow the following steps : 

1. Navigate to the "test" folder  . 

2. Add tests in the respective testing folder.
For eg : Include tests for "scripts" in the scripts folder . 
For creating a new component , create a new folder with the same name as component is named in the code . 

3. Create testing files using extension "cy.js"
