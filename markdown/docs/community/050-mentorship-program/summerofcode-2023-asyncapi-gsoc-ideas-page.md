---
title: AsyncAPI GSoC Ideas Page 2023
weight: 160
---

> **Program Status: Completed**

# AsyncAPI Ideas Page: Google Summer of Code 2023

Welcome to the **AsyncAPI Ideas Page** with our proposed projects for Google Summer of Code (GSoC) 2023! If you are an interested student/contributor, please don't hesitate to contact our mentors directly to discuss project ideas.

## 1) [Authentication and Authorization support for websocket adapters: Glee](https://github.com/asyncapi/glee) ✅

In particular, Glee allows users to create WebSocket servers, which necessitates the implementation of secure and reliable authentication and authorization mechanisms. This ensures that only authorized parties can access and use the WebSocket servers, thereby enhancing the overall security and privacy of the communication channels.

- 🎯 **Outcome:** Secure and reliable authentication and authorization mechanisms for WebSocket servers in Glee.
- 🛠️ **Skills Required:** TypeScript, Node.js, WebSocket, EDA basics.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** [Souvik De](https://github.com/Souvikns) | [Khuda Dad Nomani](https://github.com/KhudaDad414)
- 👩🏿‍🏫 **Mentee:** [Ovie Okeh](https://github.com/oviecodes)
- ⏳ **Length:** 175 Hours

## 2) [Automate listing of members of technical steering committee: Community](https://github.com/asyncapi/community) ✅

Our [open governance model](https://github.com/asyncapi/.github/blob/master/CHARTER.md) introduces a TSC that consists of all the CODEOWNERS that want to use their right to have a vote in TSC decisions making process. We need a bot/GitHub action that will read VOTERS files from all repos, maintain a single list, and put it on the website.

**Key Features:**
- GitHub action that reacts on any push to master and checks if voters file was edited
- GitHub action that validates modification in VOTERS file on PR level
- Mechanism to collect more details about TSC members (social accounts, hire availability, etc.)

Learn more: [https://github.com/asyncapi/.github/issues/210](https://github.com/asyncapi/.github/issues/210)

- 🎯 **Outcome:** Automated system for maintaining and validating TSC member lists across repositories.
- 🛠️ **Skills Required:** JavaScript/TypeScript, GitHub Actions, Node.js.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** [Lukasz Gornicki](https://github.com/derberg) | [Khuda Dad Nomani](https://github.com/KhudaDad414)
- 👩🏿‍🏫 **Mentee:** [Richa Mishra](https://github.com/14Richa)
- ⏳ **Length:** 175 Hours

## 3) [Introduce UI tests and refactoring in the website: Website](https://github.com/asyncapi/website) ✅

We need automation tests to run on the PR level which checks the overall build and codebase of the changes made in the PR. It should cover all the aspects of testing the website and the scripts running inside it. The idea of this project is not only to add UI tests, but also to refactor some parts in code to effectively create tests on it.

**Why do we need this?**
- We have no tests to test the components and the functions inside it
- More and more scripts are added to the repository
- No tests means nothing forces us to write clearer and testable small functions
- Soon website maintenance/contribution will become hard as more addition of code will make duplication and inconsistency inside the codebase

Learn more: [https://github.com/asyncapi/website/issues/1090](https://github.com/asyncapi/website/issues/1090)

- 🎯 **Outcome:** Comprehensive UI testing framework and refactored codebase for better maintainability.
- 🛠️ **Skills Required:** JavaScript/TypeScript, Testing frameworks, React, Next.js.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** [Akshat Nema](https://github.com/akshatnema) | [Aabhas Malik](https://github.com/imabp)
- 👩🏿‍🏫 **Mentee:** [Aadrika Bhargava](https://github.com/reachaadrika)
- ⏳ **Length:** 175 Hours

## 4) [Add "Autofix" feature for common linting errors (w/ spectral): VS Code Extension](https://github.com/asyncapi/vs-asyncapi-preview) ✅

AsyncAPI-Preview + Spectral for VS Code form a perfect combo in terms of UX/DX for AsyncAPI editing. This feature will provide auto-fix refactoring for the most common and standard spectral linting errors for AsyncAPI.

**Key Features:**
- Navigate and preview your API definition
- Spectral for VS Code provides inline and listed linting error for common and custom mistakes
- Quick/autofixes for linting errors using VS Code's CodeActionProvider API

Learn more: [https://github.com/asyncapi/vs-asyncapi-preview/issues/160](https://github.com/asyncapi/vs-asyncapi-preview/issues/160)

- 🎯 **Outcome:** Auto-fix capability for standard Spectral linting errors in AsyncAPI documents.
- 🛠️ **Skills Required:** TypeScript/JavaScript, VS Code Extensions, Spectral rules.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** [Iván García Sainz-Aja](https://github.com/ivangsa)
- 👩🏿‍🏫 **Mentee:** [Savio Martin](https://github.com/Savio629)
- ⏳ **Length:** 175 Hours

## 5) [Add `help/{command}` endpoint: Server API](https://github.com/asyncapi/server-api/issues/144)

Create an endpoint `help/{command}` to return instructions of given command to the user. For example, `help/generate` should return available parameters such as available templates etc. The endpoint should be done in a similar way as in our main CLI, so the main help endpoint should return all available endpoints and particular ones like `help/generate` should return details about given command.

Learn more: [https://github.com/asyncapi/server-api/issues/144](https://github.com/asyncapi/server-api/issues/144)

- 🎯 **Outcome:** Help endpoint system similar to AsyncAPI CLI for better API discoverability.
- 🛠️ **Skills Required:** JavaScript/TypeScript, Node.js, API development.
- 🧩 **Difficulty:** Easy/Medium
- 👩🏿‍🏫 **Mentor(s):** [David Pereira](https://github.com/BOLT04)
- ⏳ **Length:** 175 Hours

## Contact AsyncAPI Mentors
- Join [our Slack workspace](https://www.asyncapi.com/slack-invite). Observe our [Slack etiquette](../060-meetings-and-communication/slack-etiquette) and [AsyncAPI code of conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
- Join the dedicated Mentorship channel `#09_mentorships` to meet all other GSoC mentees and mentors.

## FAQ

1. **How active are previous GSoC contributors in AsyncAPI?**
   AsyncAPI participated in GSoC through Postman's umbrella organization in previous years. Active contributors from earlier cohorts continue to contribute to various AsyncAPI repositories and some have taken on leadership roles within the community.

2. **Is using ChatGPT for GSoC project proposals allowed?**
   We advise against using ChatGPT or similar AI tools for your GSoC project proposals with AsyncAPI. If you choose to use such tools, we require that you fully disclose this in your application.

3. **Where is the AsyncAPI source code located?**
   You can find all AsyncAPI source code on GitHub under our organization: [https://github.com/asyncapi](https://github.com/asyncapi).

>If you have further questions or queries, please create an issue in this `/community` repo (with the prefix `GSoC 2023`) or start an [open AsyncAPI discussion](https://github.com/orgs/asyncapi/discussions).