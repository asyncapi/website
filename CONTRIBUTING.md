# Welcome to AsyncAPI

Welcome to our open-source project! We're excited to have you join our community and contribute to making our project better. To ensure a smooth contribution process and maintain the quality of our codebase and documentation, please follow this guide. 

We encourage all contributors to familiarize themselves with these guidelines and actively participate in the project's growth. If you have any questions or need assistance, don't hesitate to reach out to the project maintainers or community members.

## Code of Conduct

AsyncAPI has adopted a Code of Conduct (CoC) that we expect project participants to adhere to. Please [read the full CoC text](./CODE_OF_CONDUCT.md) so that you can understand what sort of behavior is expected.

## Our Development Process

We use Github to host code, track issues and feature requests, as well as accept pull requests.

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

Issues and pull requests without activity from the creator within 14 days will be automatically closed by a triager or committer. However, closure does not mean rejection. If you wish to revisit a closed issue or pull request, feel free to open a new one referencing the closed item.

Issues and pull requests without activity from the triager or committer within 14 days may occure for many different reasons. Creator may use `/ptal` comment in the pull request to call out maintainers.

### Issues

[Open an issue](https://github.com/asyncapi/asyncapi/issues/new) **only** if you want to report a bug or a feature. Don't open issues for questions or support, instead join our [AsyncAPI Slack workspace](https://www.asyncapi.com/slack-invite) and ask there. Don't forget to follow our [Slack Etiquette](https://github.com/asyncapi/community/blob/master/slack-etiquette.md) while interacting with community members! It's more likely you'll get help, and much faster!

### Bug Reports and Feature Requests

Please use our issues templates that provide you with hints on what information we need from you to help you out.

### Pull Requests

**Please make sure you open an issue before starting with a Pull Request unless it's a typo or a really obvious error.** Pull requests are the best way to propose changes to the specification. If no issue was created first to discuss the need for a pull request, it may be rejected.

Get familiar with our document that explains the [Git workflow](https://github.com/asyncapi/community/blob/master/git-workflow.md) used in our repositories.

## Conventional commits

Our repositories follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.

Pull requests should have a title that follows the specification; otherwise, merging is blocked. If you are not familiar with the specification, simply ask maintainers to modify it. You can also use this cheatsheet if you want:

- `fix: ` prefix in the title indicates that PR is a bug fix.
- `feat: ` prefix in the title indicates that PR is a feature.
- `docs: ` prefix in the title indicates that PR is only related to the documentation.
- `chore: ` prefix in the title indicates that PR is only related to cleanup in the project.
- `test: ` prefix in the title indicates that PR is only related to tests.
- `refactor: ` prefix in the title indicates that PR is only related to refactoring.

A prefix that follows specification is not enough. Remember that the title must be clear and descriptive with the usage of [imperative mood](https://chris.beams.io/posts/git-commit/#imperative).

Happy contributing! :heart:

## License

When you submit changes, your submissions are understood to be under the same [Apache 2.0 License](https://github.com/asyncapi/asyncapi/blob/master/LICENSE) that covers the project. Feel free to [contact the maintainers](https://www.asyncapi.com/slack-invite) if that's a concern.

## Contribution recognition

We use the [All Contributors](https://allcontributors.org/docs/en/specification) specification to handle recognitions. For more details read the [`recognize contributors` document](https://github.com/asyncapi/community/blob/master/recognize-contributors.md).

## Maintainers setup

To streamline project management and facilitate onboarding, the maintainer's set up in the project includes two roles: `triager` and `committer`.

There are also two separate areas of responsibility: docs and code. There can be a committer responsible for code only, and there can also be a triager responsible for docs only. There can also be a maintainer that holds all roles and participages in different areas.

We recognize that because of the size of the project and its complexity, areas of responsibility can also get more granular. For example, there can be a committer responsible for docs but only community docs or a committeer responsible only for project design. These exceptions are assessed and approved by project maintainers.

### Triager

Triagers are responsible for labeling, commenting, and assisting with issue and pull request management.

- Triagers assess newly-opened issues and pull requests.
- Responsibilities include labeling issues and pull requests, commenting, closing, and reopening items as needed, and assisting users and novice contributors.
- Triagers play a crucial role in enforcing the contributor guide and maintaining a clean backlog.
- If a triager plans to become a committer, they should consult with existing committers to gradually gain more rights. It's crucial to earn the trust of existing committers so they feel confident in your ability to merge PRs. A triager should consistently demonstrate their dedication by regularly fulfilling their duties and actively reviewing PRs, providing code/docs suggestions and recommendations. This shows the committers that triager is knowledgeable about the docs/codebase and committed to maintaining its quality.

### Committer

Committers are responsible for technical oversight, pull request approval, and onboarding of new maintainers.

- Committers approve pull requests and oversee the technical direction of the project.
- They are responsible for reviewing and approving pull requests for merging.
- Committers also play a role in onboarding new maintainers and triagers.
