[![AsyncAPI Banner and Logo](./public/img/logos/github-repobanner-website.png)](https://www.asyncapi.com)

---

<br/>
<p align="center">
    <a href="https://github.com/asyncapi/website/graphs/contributors" alt="AsyncAPI GitHub website contributors">
      <img src="https://img.shields.io/github/contributors/asyncapi/website?color=orange" />
    </a>
    <a href="https://github.com/asyncapi/website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" alt="Good First AsyncAPI issue">
      <img src="https://img.shields.io/github/issues/asyncapi/website/good%20first%20issue.svg?color=%23DDDD00" />
    </a>
    <a href="https://asyncapi.slack.com/" alt="AsyncAPI Slack">
      <img src="https://img.shields.io/badge/Slack-AsyncAPI-@website.svg?logo=slack&color=yellow" />
    </a>
    <a href="https://app.netlify.com/sites/asyncapi-website/deploys">
      <img src="https://api.netlify.com/api/v1/badges/b2137407-b765-46c4-95b5-a72d9b1592ab/deploy-status" />
    </a>
    <a href="https://github.com/asyncapi/website" alt="AsyncAPI Apache License">
      <img src="https://img.shields.io/github/license/asyncapi/website.svg" />
    </a>
</p>

## Overview

This repository contains the sources of AsyncAPI website:

- It's powered by [Next.js](https://nextjs.org/),
- It uses [Tailwind](https://tailwindcss.com/) CSS framework,
- It's build and deployed with [Netlify](https://www.netlify.com/).

## Requirements

Use the following tools to set up the project:

- [Node.js](https://nodejs.org/) v16.0.0+
- [npm](https://www.npmjs.com/) v7.10.0+


## Run locally

1. Fork the repository by clicking on `Fork` option on top right of the main repository.

2. Open Command Prompt on your local computer.

3. Clone the forked repository by adding your own GitHub username in place of `<username>`.
   For multiple contributions it is recommended to have [proper configuration of forked repo](https://github.com/asyncapi/community/blob/master/git-workflow.md).

```bash
    git clone https://github.com/<username>/website/
```

4. Navigate to the website directory.

```bash
    cd website
```

5. Install all website dependencies. 

```bash
    npm install
```

6. Run the website locally.

```bash
    npm run dev
```

7. Access the live development server at [localhost:3000](http://localhost:3000).


## Compose new blog post

To bootstrap a new post, run this command:

```bash
    npm run write:blog
```

Follow the interactive prompt to generate a post with pre-filled front matter.

### Spin up Gitpod codespace

In order to prepare and spin up a Gitpod dev environment for our project, we configured our workspace through a [.gitpod.yml](./.gitpod.yml) file.

To spin up a Gitpod codespace, go to http://gitpod.io/#https://github.com/asyncapi/website.

### Build

To build a production-ready website, run the following command:

```bash
npm run build
```

Generated files of the website go to the `.next` folder.

## Case studies

### Overview

A case study is a special document that any end-user company can provide. An end-user company is a company that uses AsyncAPI to solve technical challenges. A case study is not a document where a vendor company can describe how they build their commercial AsyncAPI-based product. On the other hand, it is completely fine if a case study of some end-user mentions some commercial tools that helped them to work with AsyncAPI or event-driven architecture. An example of such a case can be a case study from an end-user where at some point, Confluent Schema Registry is mentioned in an explanation about schemas and runtime message validation.

### How to add a case study

A case study is documented in the form of a YAML file. Anyone can open a pull request with a new case study.

- YAML file must be located in `config/casestudies`.
- To make it easier for you to create such a YAML file you can use:
  - [Template YAML with comments explaining every section](scripts/casestudies/casestudy_template.yml)
  - [JSON Schema that describes all YAML fields](scripts/casestudies/schema.json)
- All additional files for the case study, like complete AsyncAPI document examples, should be located in the `public/resources/casestudies` directory.
- Company logo and other images that will be rendered in the website should be located in `public/img/casestudies`.

Once you collect all information and create a case study, open a pull request. It must be authored or at least approved by a representative of the given company. Such a representative is probably already a contact person mentioned in the case study.

A case study becomes publicly available right after merging and rebuilding the website.

## JSON Schema definitions

All AsyncAPI JSON Schema definition files are being served within the `/definitions/<file>` path. The content is being served from GH, in particular from https://github.com/asyncapi/spec-json-schemas/tree/master/schemas.
This is possible thanks to the following:

1. A [Netlify Rewrite rule](https://docs.netlify.com/routing/redirects/rewrites-proxies/) located in the [netlify.toml](netlify.toml) file, which acts as proxy for all requests to the `/definitions/<file>` path, serving the content from GH without having an HTTP redirect.
2. A [Netlify Edge Function](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/) that modifies the `Content-Type` header of the rewrite response to become `application/schema+json`. This lets tooling, such as [Hyperjump](https://json-schema.hyperjump.io), to fetch the schemas directly from their URL.

## Project structure

This repository has the following structure:

<!-- If you make any changes in the project structure, remember to update it. -->

```text
  ├── .github                     # Definitions of GitHub workflows, pull request and issue templates
  ├── components                  # Various generic components such as "Button", "Figure", etc.
  ├── config                      # Transformed static data to display on the pages such as blog posts etc.
  ├── context                     # Various React's contexts used in website
  ├── css                         # Various CSS files
  ├── lib                         # Various JS code for preparing static data to render in pages
  ├── pages                       # Website's pages source. It includes raw markdown files and React page templates.
  │    ├── about                  # Raw blog for /about page
  │    ├── blog                   # Blog posts
  │    ├── docs                   # Blog for /docs/* pages
  │    └── tools                  # Various pages to describe tools
  ├── public                      # Data for site metadata and static blog such as images
  ├── scripts                     # Scripts used in the build and dev processes
  ├── next.config.js              # Next.js configuration file
  ├── netlify                     # Code that runs on Netlify
  │    ├── edge-functions         # Netlify Edge-Functions code
  ├── postcss.config.js           # PostCSS configuration file
  └── tailwind.config.js          # TailwindCSS configuration file
```

## Connect with AsyncAPI Community

<p align="left">
    <a href="https://asyncapi.slack.com/" target="blank">
      <img align="center" src="https://img.icons8.com/color/48/null/slack-new.png" alt="AsyncAPI Slack" height="30" width="40" />
    </a>
    <a href="https://twitter.com/asyncapispec" target="blank">
      <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="AsyncAPI Twitter" height="30" width="40" />
    </a>
    <a href="https://www.linkedin.com/company/asyncapi" target="blank">
      <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="AsyncAPI LinkedIn" height="30" width="40" />
    </a>
    <a href="https://www.youtube.com/c/asyncapi" target="blank">
      <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="AsyncAPI YouTube" height="30" width="40" />
    </a>
    <a href="https://www.twitch.tv/asyncapi" target="blank">
      <img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitch.svg" alt="AsyncAPI Twitch" height="30" width="40" />
    </a>
</p>

## AsyncAPI Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.fmvilas.com/"><img src="https://avatars.githubusercontent.com/u/242119?v=4?s=100" width="100px;" alt="Fran Méndez"/><br /><sub><b>Fran Méndez</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=fmvilas" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=fmvilas" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Afmvilas" title="Bug reports">🐛</a> <a href="#design-fmvilas" title="Design">🎨</a> <a href="#maintenance-fmvilas" title="Maintenance">🚧</a> <a href="#infra-fmvilas" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-fmvilas" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Afmvilas" title="Reviewed Pull Requests">👀</a> <a href="#blog-fmvilas" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dev.to/derberg"><img src="https://avatars.githubusercontent.com/u/6995927?v=4?s=100" width="100px;" alt="Lukasz Gornicki"/><br /><sub><b>Lukasz Gornicki</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=derberg" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=derberg" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Aderberg" title="Bug reports">🐛</a> <a href="#design-derberg" title="Design">🎨</a> <a href="#maintenance-derberg" title="Maintenance">🚧</a> <a href="#infra-derberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-derberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aderberg" title="Reviewed Pull Requests">👀</a> <a href="#blog-derberg" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/magicmatatjahu"><img src="https://avatars.githubusercontent.com/u/20404945?v=4?s=100" width="100px;" alt="Maciej Urbańczyk"/><br /><sub><b>Maciej Urbańczyk</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=magicmatatjahu" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=magicmatatjahu" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Amagicmatatjahu" title="Bug reports">🐛</a> <a href="#design-magicmatatjahu" title="Design">🎨</a> <a href="#maintenance-magicmatatjahu" title="Maintenance">🚧</a> <a href="#infra-magicmatatjahu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-magicmatatjahu" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Amagicmatatjahu" title="Reviewed Pull Requests">👀</a> <a href="#blog-magicmatatjahu" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alequetzalli"><img src="https://avatars.githubusercontent.com/u/19964402?v=4?s=100" width="100px;" alt="Alejandra Quetzalli "/><br /><sub><b>Alejandra Quetzalli </b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=alequetzalli" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aalequetzalli" title="Reviewed Pull Requests">👀</a> <a href="#talk-alequetzalli" title="Talks">📢</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://aayushmau5.github.io/"><img src="https://avatars.githubusercontent.com/u/54525741?v=4?s=100" width="100px;" alt="Aayush Kumar Sahu"/><br /><sub><b>Aayush Kumar Sahu</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=aayushmau5" title="Code">💻</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Aaayushmau5" title="Bug reports">🐛</a> <a href="#design-aayushmau5" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://boyney.io/"><img src="https://avatars.githubusercontent.com/u/3268013?v=4?s=100" width="100px;" alt="David Boyne"/><br /><sub><b>David Boyne</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=boyney123" title="Code">💻</a> <a href="#design-boyney123" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jessemenning"><img src="https://avatars.githubusercontent.com/u/62108913?v=4?s=100" width="100px;" alt="Jesse Menning"/><br /><sub><b>Jesse Menning</b></sub></a><br /><a href="#blog-jessemenning" title="Blogposts">📝</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://dedouss.is/"><img src="https://avatars.githubusercontent.com/u/24495755?v=4?s=100" width="100px;" alt="Dimitrios Dedoussis"/><br /><sub><b>Dimitrios Dedoussis</b></sub></a><br /><a href="#blog-dedoussis" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://linkedin.com/in/jonaslagoni/"><img src="https://avatars.githubusercontent.com/u/13396189?v=4?s=100" width="100px;" alt="Jonas Lagoni"/><br /><sub><b>Jonas Lagoni</b></sub></a><br /><a href="#blog-jonaslagoni" title="Blogposts">📝</a> <a href="https://github.com/asyncapi/website/commits?author=jonaslagoni" title="Code">💻</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Ajonaslagoni" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/smoya"><img src="https://avatars.githubusercontent.com/u/1083296?v=4?s=100" width="100px;" alt="Sergio Moya"/><br /><sub><b>Sergio Moya</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=smoya" title="Code">💻</a> <a href="#blog-smoya" title="Blogposts">📝</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Asmoya" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bodograumann"><img src="https://avatars.githubusercontent.com/u/1223583?v=4?s=100" width="100px;" alt="Bodo Graumann"/><br /><sub><b>Bodo Graumann</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=bodograumann" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://damilolarandolph.com"><img src="https://avatars.githubusercontent.com/u/43427949?v=4?s=100" width="100px;" alt="Damilola Randolph"/><br /><sub><b>Damilola Randolph</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=damilolarandolph" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Barbanio"><img src="https://avatars.githubusercontent.com/u/77982319?v=4?s=100" width="100px;" alt="Barbanio González"/><br /><sub><b>Barbanio González</b></sub></a><br /><a href="#blog-Barbanio" title="Blogposts">📝</a> <a href="#ideas-Barbanio" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hkaur008"><img src="https://avatars.githubusercontent.com/u/56452820?v=4?s=100" width="100px;" alt="Hargun Kaur"/><br /><sub><b>Hargun Kaur</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=hkaur008" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ceich"><img src="https://avatars.githubusercontent.com/u/38611?v=4?s=100" width="100px;" alt="Chris Eich"/><br /><sub><b>Chris Eich</b></sub></a><br /><a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aceich" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hpatoio"><img src="https://avatars.githubusercontent.com/u/249948?v=4?s=100" width="100px;" alt="Simone Fumagalli"/><br /><sub><b>Simone Fumagalli</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=hpatoio" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://melissaturco.com"><img src="https://avatars.githubusercontent.com/u/60163079?v=4?s=100" width="100px;" alt="Missy Turco"/><br /><sub><b>Missy Turco</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=mcturco" title="Code">💻</a> <a href="#design-mcturco" title="Design">🎨</a> <a href="#ideas-mcturco" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Amcturco" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ritik307.github.io/portfolio/"><img src="https://avatars.githubusercontent.com/u/22374829?v=4?s=100" width="100px;" alt="Ritik Rawal"/><br /><sub><b>Ritik Rawal</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=ritik307" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/akshatnema"><img src="https://avatars.githubusercontent.com/u/76521428?v=4?s=100" width="100px;" alt="Akshat Nema"/><br /><sub><b>Akshat Nema</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=akshatnema" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bolt04.github.io/react-ultimate-resume/"><img src="https://avatars.githubusercontent.com/u/18630253?v=4?s=100" width="100px;" alt="David Pereira"/><br /><sub><b>David Pereira</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=BOLT04" title="Code">💻</a> <a href="https://github.com/asyncapi/website/commits?author=BOLT04" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ron-debajyoti"><img src="https://avatars.githubusercontent.com/u/22571664?v=4?s=100" width="100px;" alt="Debajyoti Halder"/><br /><sub><b>Debajyoti Halder</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=ron-debajyoti" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://juanarce.me"><img src="https://avatars.githubusercontent.com/u/30204147?v=4?s=100" width="100px;" alt="Juan A."/><br /><sub><b>Juan A.</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=jaas666" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/luphieanza"><img src="https://avatars.githubusercontent.com/u/20577131?v=4?s=100" width="100px;" alt="Muhammad Rafly Andrianza"/><br /><sub><b>Muhammad Rafly Andrianza</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=luphieanza" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Harish-b-03"><img src="https://avatars.githubusercontent.com/u/69810789?v=4?s=100" width="100px;" alt="Harish"/><br /><sub><b>Harish</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Harish-b-03" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/paulgoldsmith"><img src="https://avatars.githubusercontent.com/u/471550?v=4?s=100" width="100px;" alt="Paul Goldsmith"/><br /><sub><b>Paul Goldsmith</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=paulgoldsmith" title="Code">💻</a> <a href="https://github.com/asyncapi/website/issues?q=author%3Apaulgoldsmith" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.twitter.com/dulemartins"><img src="https://avatars.githubusercontent.com/u/33032530?v=4?s=100" width="100px;" alt="Tabah Baridule"/><br /><sub><b>Tabah Baridule</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Dule-mart" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://starlightknown.github.io/"><img src="https://avatars.githubusercontent.com/u/74637789?v=4?s=100" width="100px;" alt="Karuna Tata"/><br /><sub><b>Karuna Tata</b></sub></a><br /><a href="#a11y-starlightknown" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nibble0101"><img src="https://avatars.githubusercontent.com/u/52580190?v=4?s=100" width="100px;" alt="Joseph Mawa"/><br /><sub><b>Joseph Mawa</b></sub></a><br /><a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Anibble0101" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aeworxet"><img src="https://avatars.githubusercontent.com/u/16149591?v=4?s=100" width="100px;" alt="Viacheslav Turovskyi"/><br /><sub><b>Viacheslav Turovskyi</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=aeworxet" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/commits?author=aeworxet" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/helen-kosova/"><img src="https://avatars.githubusercontent.com/u/8576823?v=4?s=100" width="100px;" alt="Helen Kosova"/><br /><sub><b>Helen Kosova</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=hkosova" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://linktr.ee/thulieblack"><img src="https://avatars.githubusercontent.com/u/66913810?v=4?s=100" width="100px;" alt="V Thulisile Sibanda"/><br /><sub><b>V Thulisile Sibanda</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=thulieblack" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/manavdesai27"><img src="https://avatars.githubusercontent.com/u/74018438?v=4?s=100" width="100px;" alt="Manav Desai"/><br /><sub><b>Manav Desai</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=manavdesai27" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.toukir.co"><img src="https://avatars.githubusercontent.com/u/88899011?v=4?s=100" width="100px;" alt="Mohd Toukir Khan"/><br /><sub><b>Mohd Toukir Khan</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=toukirkhan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://annysah.hashnode.dev"><img src="https://avatars.githubusercontent.com/u/52763841?v=4?s=100" width="100px;" alt="Anisat Akinbani"/><br /><sub><b>Anisat Akinbani</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Annysah" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sambhavgupta0705"><img src="https://avatars.githubusercontent.com/u/81870866?v=4?s=100" width="100px;" alt="sambhavgupta0705"/><br /><sub><b>sambhavgupta0705</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=sambhavgupta0705" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ankitchaudharyy"><img src="https://avatars.githubusercontent.com/u/46367738?v=4?s=100" width="100px;" alt="Ankit Chaudhary"/><br /><sub><b>Ankit Chaudhary</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Ankitchaudharyy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Amzani"><img src="https://avatars.githubusercontent.com/u/554438?v=4?s=100" width="100px;" alt="samz"/><br /><sub><b>samz</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Amzani" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bhaswatiroy.github.io/Bhaswati-Roy-Portfolio/"><img src="https://avatars.githubusercontent.com/u/78029145?v=4?s=100" width="100px;" alt="Bhaswati Roy "/><br /><sub><b>Bhaswati Roy </b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=BhaswatiRoy" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.behance.net/muibudeenaisha"><img src="https://avatars.githubusercontent.com/u/105395613?v=4?s=100" width="100px;" alt="AISHAT MUIBUDEEN"/><br /><sub><b>AISHAT MUIBUDEEN</b></sub></a><br /><a href="#design-Mayaleeeee" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nawedali.tech"><img src="https://avatars.githubusercontent.com/u/83456083?v=4?s=100" width="100px;" alt="Nawed Ali"/><br /><sub><b>Nawed Ali</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=nawed2611" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.blessingolaleye.xyz/"><img src="https://avatars.githubusercontent.com/u/70102539?v=4?s=100" width="100px;" alt="Olaleye Blessing"/><br /><sub><b>Olaleye Blessing</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Olaleye-Blessing" title="Code">💻</a> <a href="#a11y-Olaleye-Blessing" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/niranjan-kurhade"><img src="https://avatars.githubusercontent.com/u/97905637?v=4?s=100" width="100px;" alt="niranjan-kurhade"/><br /><sub><b>niranjan-kurhade</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=niranjan-kurhade" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://linkfree.eddiehub.io/rukundob451"><img src="https://avatars.githubusercontent.com/u/67878128?v=4?s=100" width="100px;" alt="Benjamin Rukundo"/><br /><sub><b>Benjamin Rukundo</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=rukundob451" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tthijm"><img src="https://avatars.githubusercontent.com/u/59415467?v=4?s=100" width="100px;" alt="tthijm"/><br /><sub><b>tthijm</b></sub></a><br /><a href="#infra-tthijm" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://cynthiapeter.com"><img src="https://avatars.githubusercontent.com/u/33583060?v=4?s=100" width="100px;" alt="Cynthia Peter"/><br /><sub><b>Cynthia Peter</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=CynthiaPeter" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://florence-njeri.github.io/NjeriPortfolio"><img src="https://avatars.githubusercontent.com/u/40742916?v=4?s=100" width="100px;" alt="Florence Njeri"/><br /><sub><b>Florence Njeri</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Florence-Njeri" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ansh.live"><img src="https://avatars.githubusercontent.com/u/94157520?v=4?s=100" width="100px;" alt="Ansh Goyal"/><br /><sub><b>Ansh Goyal</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=anshgoyalevil" title="Code">💻</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3Aanshgoyalevil" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SumantxD"><img src="https://avatars.githubusercontent.com/u/65810424?v=4?s=100" width="100px;" alt="Sumant.xD"/><br /><sub><b>Sumant.xD</b></sub></a><br /><a href="#infra-SumantxD" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://shrianshagarwal.in"><img src="https://avatars.githubusercontent.com/u/41548480?v=4?s=100" width="100px;" alt="Shriansh Agarwal"/><br /><sub><b>Shriansh Agarwal</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=Shriansh2002" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/reachaadrika"><img src="https://avatars.githubusercontent.com/u/64789514?v=4?s=100" width="100px;" alt="Aadrika Bhargava"/><br /><sub><b>Aadrika Bhargava</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=reachaadrika" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vishvamsinh28"><img src="https://avatars.githubusercontent.com/u/90895835?v=4?s=100" width="100px;" alt="Vishvamsinh Vaghela"/><br /><sub><b>Vishvamsinh Vaghela</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=vishvamsinh28" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AnimeshKumar923"><img src="https://avatars.githubusercontent.com/u/99868037?v=4?s=100" width="100px;" alt="Animesh Kumar"/><br /><sub><b>Animesh Kumar</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=AnimeshKumar923" title="Documentation">📖</a> <a href="https://github.com/asyncapi/website/pulls?q=is%3Apr+reviewed-by%3AAnimeshKumar923" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
