---
title: Google Summer of Code 2023
weight: 160
---

# Status: Completed 
The summary of the program can be found at https://github.com/orgs/asyncapi/discussions/997

## Timeline

- January 23: Organization applications open
- February 7: Accepted GSoC Organizations announced
- February 22 - March 20: Potential GSoC contributors discuss application ideas with mentoring organizations
- March 20 - April 4: GSoC contributor application period
- May 17 - June 7: Accepted GSoC Contributor projects announced
- May 29: Contributors work on their Google Summer of Code projects
- August 28 - September 4: Mentors submit final GSoC contributor evaluations (standard coding period)
- September 5: Initial results of Google Summer of Code 2023 announced

## Accepted Project Ideas
| No | Project Idea | Mentor/s | Category | Mentee/s |
| --- | --- | --- | --- | --- |
| 1 | [Authentication and Authorization support for websocket adapters: Glee](https://github.com/asyncapi/glee) | @Souvikns @KhudaDad414 | Engineering | @oviecodes |
| 2 | [Automate listing of members of technical steering committee: Community](https://github.com/asyncapi/community) |  @derberg | Engineering | @14Richa |
| 3 | [Introduce UI tests and refactoring in the website: Website](https://github.com/asyncapi/website) |  @akshatnema @imabp | Engineering | @reachaadrika |
| 4 | [Add "Autofix" feature for common linting errors (w/ spectral): Vs-code Extension](https://github.com/asyncapi/vs-asyncapi-preview) |  @ivangsa  | Engineering | @Savio629 |


## Proposed Project Ideas


## 1) Authentication and Authorization support for websocket adapters: Glee

In particular, Glee allows users to create WebSocket servers, which necessitates the implementation of secure and reliable authentication and authorization mechanisms. This ensures that only authorized parties can access and use the WebSocket servers, thereby enhancing the overall security and privacy of the communication channels.

**Mentors**: 
@Souvikns @KhudaDad414

**Project Repo**

[https://github.com/asyncapi/glee](https://github.com/asyncapi/glee)


**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

**Technical skills required**

Typescript, Node.js, websocket, EDA basics


## 2) Automate listing of members of technical steering committee: Community

Our [open governance model](https://github.com/asyncapi/.github/blob/master/CHARTER.md) introduces a TSC that consists of all the CODEOWNERS that want to use their right to have a vote in TSC decisions making process.

We need a bot/github action that will read VOTERS files from all repos, maintain single list, and put it on the website

Description
get a github action that reacts on any push to master and checkes if voters file was edited. Then reads it and add/remove/modify a voter in the list stored on the website
get a github action that on a PR level validates modification in VOTERS file and blocks PR in case VOTERS cannot be added to TSC list as they are affiliated with the company that already reached the limit of representation
decide on structure of VOTERS file
get a mechanism that collects more details about TSC members (social accounts, hire availability, etc)

Learn more here https://github.com/asyncapi/.github/issues/210

**Mentors**: 
@derberg @KhudaDad414 

**Project Repo:** 
https://github.com/asyncapi/.github

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 3) Introduce UI tests and refactoring in the website: Website

We need automation tests to run on the PR level which checks the overall build and codebase of the changes made in the PR. It should cover all the aspects of testing the website and the scripts running inside it. The idea of this project is not only to add UI tests, but also to refactor some parts in code to effectively create tests on it.

What are UI tests?
User Interface testing, also known as UI testing or GUI testing, tests the application’s visual elements to validate proper functionality and expected performance. It ensures that UI functions and application components have no defects, such as icons, radio buttons, text boxes, toolbars, color, fonts, checkboxes, windows, and menus. The primary aspects of UI testing are functionality, performance, usability, compliance, and visual design of the software application to make sure the application works successfully and satisfactorily.

Why do we need this?
We do need these tests because of following reasons:

- we have no tests to test the components and the functions inside it.
- more and more scripts are added to the repository
- no tests, means nothing forces us to write clearer and testable small functions.
- soon website maintenance/contribution will become hard as more and more addition of code will make Duplication and inconsistency inside the codebase.


Learn more here https://github.com/asyncapi/website/issues/1090

**Mentors**: 
@akshatnema
@imabp

**Project Repo:** 
https://github.com/asyncapi/website

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour


## 4) Add "Autofix" feature for common linting errors (w/ spectral): Vs-code Extension

AsyncAPI-Preview + Spectral for VSCode form a perfect combo in terms of UX/DX for asyncapi editing:

with this extension, you can navigate and preview your API definition
while Spectral for VSCode provides inline and listed linting error for common and even custom mistakes
VSCode comes with an API for providing quick/autofixes for linting errors (see https://code.visualstudio.com/docs/editor/refactoring https://code.visualstudio.com/api/references/vscode-api#CodeActionProvider and https://github.com/microsoft/vscode-extension-samples/tree/main/code-actions-sample for an example)

The purpose of this feature is to provide auto-fix refactoring for the most common and standard spectral linting errors for asyncapi:
https://docs.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules

Learn more here https://github.com/asyncapi/vs-asyncapi-preview/issues/160

**Mentors**: 
@ivangsa 

**Project Repo:** 
https://github.com/asyncapi/vs-asyncapi-preview

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour

## 5) AsyncAPI: Add `help/{command}` endpoint: Server API

Suggested by Marc DiPasquale in Slack comment https://asyncapi.slack.com/archives/CQVJXFNQL/p1662141074739369?thread_ts=1661395911.924239&cid=CQVJXFNQL

We should create such an endpoint `help/{command}` to return instruction of given command to the user. For example `help/generate` should return available parameters such an available templates etc.

`help/{command}` is just a suggestion, we can go with other endpoint(s).

Also, what is very important, that endpoint should be done in a similar way as in our main CLI - https://github.com/asyncapi/cli#usage, so main help endpoint should return all available endpoints and particular one like `help/generate` should return details about given command.

Learn more here https://github.com/asyncapi/server-api/issues/144

**Mentors**: 
@BOLT04

**Project Repo:** 
https://github.com/asyncapi/server-api

**Expected Difficulty**:
Easy-Medium

**Expected Time Commitment**:
175 Hour
