# Welcome

Welcome to our open-source project! We're excited to have you join our community and contribute to making our project better. To ensure a smooth contribution process and maintain the quality of our codebase and documentation, please follow this guide.

We encourage all contributors to familiarize themselves with these guidelines and actively participate in the project's growth. If you have any questions or need assistance, don't hesitate to reach out to the project maintainers or community members.

## Code of Conduct

AsyncAPI has adopted a Code of Conduct that we expect project participants to adhere to. Please [read the full text](./CODE_OF_CONDUCT.md) so that you can understand what sort of behaviour is expected.

## Our Development Process

We use Github to host code, to track issues and feature requests, as well as accept pull requests.

## Contribution flow

The following is a summary of the ideal contribution flow.

```
    ┌───────────────────────┐
    │                       │
    │    Open an issue      │
    │  (a bug report or a   │
    │   feature request)    │
    │                       │
    └───────────────────────┘
               ⇩
    ┌───────────────────────┐
    │                       │
    │  Open a Pull Request  │
    │   (only after issue   │
    │     is approved)      │
    │                       │
    └───────────────────────┘
               ⇩
    ┌───────────────────────┐
    │                       │
    │   Your changes will   │
    │     be merged and     │
    │ published on the next │
    │        release        │
    │                       │
    └───────────────────────┘
```

Issues and pull requests without activity from the creator within 14 days will be automatically closed. However, closure does not mean rejection. If you wish to revisit a closed issue or pull request, feel free to open a new one referencing the closed item.

### Issues

[Open an issue](https://github.com/asyncapi/asyncapi/issues/new) **only** if you want to report a bug or a feature. Don't open issues for questions or support, instead join our [Slack workspace](https://www.asyncapi.com/slack-invite) and ask there. Don't forget to follow our [Slack Etiquette](https://github.com/asyncapi/community/blob/master/slack-etiquette.md) while interacting with community members! It's more likely you'll get help, and much faster!

### Bug Reports and Feature Requests

Please use our issues templates that provide you with hints on what information we need from you to help you out.

### Pull Requests

**Please, make sure you open an issue before starting with a Pull Request, unless it's a typo or a really obvious error.** Pull requests are the best way to propose changes to the specification. If there was no issue created first where maintainers discussed if pull request is needed, the pull request can be rejected.

Get familiar with our document that explains [Git workflow](https://github.com/asyncapi/community/blob/master/git-workflow.md) used in our repositories.

## Conventional commits

Our repositories follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification. Releasing to GitHub and NPM is done with the support of [semantic-release](https://semantic-release.gitbook.io/semantic-release/).

Pull requests should have a title that follows the specification, otherwise, merging is blocked. If you are not familiar with the specification simply ask maintainers to modify. You can also use this cheatsheet if you want:

- `fix: ` prefix in the title indicates that PR is a bug fix and PATCH release must be triggered.
- `feat: ` prefix in the title indicates that PR is a feature and MINOR release must be triggered.
- `docs: ` prefix in the title indicates that PR is only related to the documentation and there is no need to trigger release.
- `chore: ` prefix in the title indicates that PR is only related to cleanup in the project and there is no need to trigger release.
- `test: ` prefix in the title indicates that PR is only related to tests and there is no need to trigger release.
- `refactor: ` prefix in the title indicates that PR is only related to refactoring and there is no need to trigger release.

What about MAJOR release? just add `!` to the prefix, like `fix!: ` or `refactor!: `

Prefix that follows specification is not enough though. Remember that the title must be clear and descriptive with usage of [imperative mood](https://chris.beams.io/posts/git-commit/#imperative).

Happy contributing :heart:

## License
When you submit changes, your submissions are understood to be under the same [Apache 2.0 License](https://github.com/asyncapi/asyncapi/blob/master/LICENSE) that covers the project. Feel free to [contact the maintainers](https://www.asyncapi.com/slack-invite) if that's a concern.

## Contribution recogniton

We use [All Contributors](https://allcontributors.org/docs/en/specification) specification to handle recognitions. For more details read [this](https://github.com/asyncapi/community/blob/master/recognize-contributors.md) document.

## Maintainers setup

To streamline project management and facilitate onboarding. Maintainers setup in the project include two roles: triager and committer.

There are also two separate areas of responsibility: docs and code. There can be a committer responsible for code only, and there can also be triager responcible for docs only. There can also be a maintainer that holds all roles and participages in different areas.

We recognize that because of the size of the project and its complexity, areas of responsibility can also get more granular. For example there can be a committer responsible for docs, but only community docs or committeer responsible only for project design. These exceptions are assesed and approved by project maintainers.

### Triager

Triagers are responsible for labeling, commenting, and assisting with issue and pull request management.

- Triagers assess newly-opened issues and pull requests.
- Responsibilities include labeling issues and pull requests, commenting, closing, and reopening items as needed, and assisting users and novice contributors.
- Triagers play a crucial role in enforcing the contributor guide and maintaining a clean backlog.
- If a triager plans to become a committer, they should consult with existing committers to gradually gain more rights.

### Committer

Committers are responsivle for technical oversight, pull request approval, and onboarding of new maintainers.

- Committers approve pull requests and oversee the technical direction of the project.
- They are responsible for reviewing and approving pull requests for merging.
- Committers also play a role in onboarding new maintainers and triagers.