[![AsyncAPI Banner and Logo](./public/img/logos/github-repobanner-website.png)](https://www.asyncapi.com)

--- 
## Overview 

This folder contains the test code of AsyncAPI website : 

- It's powered by [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

-It utilises [Cypress/react] to provide some additional functionalites to Cypress . 

## Requirements 
Use the following tools to set up the project:
- [Cypress] (This is installed as a dev-dependency).

## Run tests locally 

Assuming you have all the necessary website dependencies installed: 

1. Run it and check on the Cypress Graphical User Interface 
```bash
    npm cypress open 
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