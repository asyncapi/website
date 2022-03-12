<a href="https://www.asyncapi.com" target="_blank">
<img width="830" alt="github-repobanner-website" src="https://user-images.githubusercontent.com/76521428/158002500-639985d7-7558-410d-ae57-ca04e57f2be4.png">
</a>

---
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-21-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

#### Compose a new blog post

To bootstrap a new post, run this command:
```bash
npm run write:blog
```

Follow the interactive prompt to generate a post with pre-filled front matter.

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
  │    ├── about                  # Raw blog for /about page
  │    ├── blog                   # Blog posts
  │    └── docs                   # Blog for /docs/* pages
  ├── public                      # Data for site metadata and static blog such as images
  ├── scripts                     # Scripts used in the build and dev processes
  ├── next.config.js              # Next.js configuration file
  ├── postcss.config.js           # PostCSS configuration file
  └── tailwind.config.js          # TailwindCSS configuration file
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.fmvilas.com/"><img src="https://avatars.githubusercontent.com/u/242119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=fmvilas" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=fmvilas" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Afmvilas" title="Bug reports">🐛</a> <a href="#design-fmvilas" title="Design">🎨</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="#infra-fmvilas" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="#blog-fmvilas" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://dev.to/derberg"><img src="https://avatars.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=derberg" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=derberg" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Aderberg" title="Bug reports">🐛</a> <a href="#design-derberg" title="Design">🎨</a> <a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="#infra-derberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="#blog-derberg" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/magicmatatjahu"><img src="https://avatars.githubusercontent.com/u/20404945?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=magicmatatjahu" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Amagicmatatjahu" title="Bug reports">🐛</a> <a href="#design-magicmatatjahu" title="Design">🎨</a> <a href="#maintenance-magicmatatjahu" title="Maintenance">🚧</a> <a href="#infra-magicmatatjahu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-magicmatatjahu" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Amagicmatatjahu" title="Reviewed Pull Requests">👀</a> <a href="#blog-magicmatatjahu" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/alequetzalli"><img src="https://avatars.githubusercontent.com/u/19964402?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alejandra Quetzalli </b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=alequetzalli" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aalequetzalli" title="Reviewed Pull Requests">👀</a> <a href="#talk-alequetzalli" title="Talks">📢</a></td>
    <td align="center"><a href="https://aayushmau5.github.io/"><img src="https://avatars.githubusercontent.com/u/54525741?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aayush Kumar Sahu</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=aayushmau5" title="Code">💻</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Aaayushmau5" title="Bug reports">🐛</a> <a href="#design-aayushmau5" title="Design">🎨</a></td>
    <td align="center"><a href="https://boyney.io/"><img src="https://avatars.githubusercontent.com/u/3268013?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Boyne</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=boyney123" title="Code">💻</a> <a href="#design-boyney123" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/jessemenning"><img src="https://avatars.githubusercontent.com/u/62108913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jesse Menning</b></sub></a><br /><a href="#blog-jessemenning" title="Blogposts">📝</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://dedouss.is/"><img src="https://avatars.githubusercontent.com/u/24495755?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dimitrios Dedoussis</b></sub></a><br /><a href="#blog-dedoussis" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://linkedin.com/in/jonaslagoni/"><img src="https://avatars.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="#blog-jonaslagoni" title="Blogposts">📝</a> <a href="https://github.com/asyncapi/website/commits?author=jonaslagoni" title="Code">💻</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Ajonaslagoni" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/smoya"><img src="https://avatars.githubusercontent.com/u/1083296?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sergio Moya</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=smoya" title="Code">💻</a> <a href="#blog-smoya" title="Blogposts">📝</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Asmoya" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/bodograumann"><img src="https://avatars.githubusercontent.com/u/1223583?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bodo Graumann</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=bodograumann" title="Documentation">📖</a></td>
    <td align="center"><a href="https://damilolarandolph.com"><img src="https://avatars.githubusercontent.com/u/43427949?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damilola Randolph</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=damilolarandolph" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Barbanio"><img src="https://avatars.githubusercontent.com/u/77982319?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Barbanio González</b></sub></a><br /><a href="#blog-Barbanio" title="Blogposts">📝</a> <a href="#ideas-Barbanio" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/hkaur008"><img src="https://avatars.githubusercontent.com/u/56452820?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hargun Kaur</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=hkaur008" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ceich"><img src="https://avatars.githubusercontent.com/u/38611?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Eich</b></sub></a><br /><a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aceich" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/hpatoio"><img src="https://avatars.githubusercontent.com/u/249948?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Simone Fumagalli</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=hpatoio" title="Documentation">📖</a></td>
    <td align="center"><a href="https://melissaturco.com"><img src="https://avatars.githubusercontent.com/u/60163079?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Missy Turco</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=mcturco" title="Code">💻</a> <a href="#design-mcturco" title="Design">🎨</a> <a href="#ideas-mcturco" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Amcturco" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://ritik307.github.io/portfolio/"><img src="https://avatars.githubusercontent.com/u/22374829?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ritik Rawal</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=ritik307" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/akshatnema"><img src="https://avatars.githubusercontent.com/u/76521428?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Akshat Nema</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=akshatnema" title="Code">💻</a></td>
    <td align="center"><a href="https://bolt04.github.io/react-ultimate-resume/"><img src="https://avatars.githubusercontent.com/u/18630253?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Pereira</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=BOLT04" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=BOLT04" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/ron-debajyoti"><img src="https://avatars.githubusercontent.com/u/22571664?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Debajyoti Halder</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=ron-debajyoti" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
