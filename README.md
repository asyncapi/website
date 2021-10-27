<h5 align="center">
  <img src="./.github/assets/logo.png" alt="AsyncAPI logo" width="200">
  <br>
  Website
</h5>

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/b2137407-b765-46c4-95b5-a72d9b1592ab/deploy-status)](https://app.netlify.com/sites/asyncapi-website/deploys)

## Overview

This repository contains the sources of AsyncAPI website:

- It's powered by [Next.js](https://nextjs.org/), 
- It uses [Tailwind](https://tailwindcss.com/) CSS framework,
- It's build and deployed with [Netlify](https://www.netlify.com/).

## Requirements

Use the following tools to set up the project:

- [Node.js](https://nodejs.org/) v12.16+
- [npm](https://www.npmjs.com/) v6.13.7+

## Usage

### Install dependencies

To install all dependencies, run this command:

```bash
npm install
```

### Develop

Launch the development server with the hot reloading functionality that allows any change in files to be immediately visible in the browser. Use this command:

```bash
npm run dev
```

You can access the live development server at [localhost:8080](http://localhost:8080).

### Spin up Gitpod codespace
In order to prepare and spin up a Gitpod dev environment for our project, we configured our workspace through a [.gitpod.yml](/.gitpod.yml) file.

To spin up a Gitpod codespace, go to http://gitpod.io/#https://github.com/asyncapi/website.

### Build

To build a production-ready website, run the following command:

```bash
npm run build
```

Generated files of the website go to the `.next` folder.

## Project structure

This repository has the following structure:

<!-- If you make any changes in the project structure, remember to update it. -->

```text
  ├── .github                     # Definitions of Github workflows, pull request and issue templates
  ├── components                  # Various generic components such as "Button", "Figure", etc.
  ├── config                      # Transformed static data to display on the pages such as blog posts etc.
  ├── context                     # Various React's contexts used in website
  ├── css                         # Various CSS files
  ├── lib                         # Various JS code for preparing static data to render in pages
  ├── pages                       # Website's pages source. It includes raw markdown files and React page templates.
  │    ├── about                  # Raw content for /about page
  │    ├── blog                   # Blog posts
  │    └── docs                   # Content for /docs/* pages
  ├── public                      # Data for site metadata and static content such as images
  ├── scripts                     # Scripts used in the build and dev processes
  ├── next.config.js              # Next.js configuration file
  ├── postcss.config.js           # PostCSS configuration file
  └── tailwind.config.js          # TailwindCSS configuration file
```
