---
title: "AsyncAPI Spec 3.0 is coming!"
date: 2022-02-28T06:00:00+01:00
type: Communication
tags:
  - Specification
  - Announcement
  - Release
cover: /img/posts/async-api-spec3.0-release/cover.webp
authors:
  - name: Harsh Mishra
    photo: /img/avatars/harsh.webp
    link: https://www.linkedin.com/in/harshcasper/
excerpt: 'Announcing the start of work on AsyncAPI Spec 3.0. Checkout all the major new features coming to AsyncAPI and how you can get involved!'
featured: false
---

AsyncAPI is a specification for describing your event-driven architecture and our specification allows you to describe and document your message-driven APIs into a human-readable format. After the last v2.3.0 release, the AsyncAPI community is inching towards a 3.0 release that will bring together multiple features, enhancements and breaking changes.

## Major new features

Many new features for AsyncAPI Spec 3.0 are being planned and written. Among the new major new features and changes so far:

-   [Introduce Schema Versioning](https://github.com/asyncapi/spec/issues/697)
-   [Introducing Data Format bindings](https://github.com/asyncapi/spec/issues/694)
-   [Making servers aware of their service name](https://github.com/asyncapi/spec/issues/654)
-   [Solving publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618) 
-   [Defining an AsyncAPI file](https://github.com/asyncapi/spec/issues/628) 
-   [Fixing schema inconsistencies](https://github.com/asyncapi/spec/issues/583)
-   [Defining a schema format other than the default one](https://github.com/asyncapi/spec/issues/622)
-   [Remove `$ref` field from `Channel Item Object`](https://github.com/asyncapi/spec/issues/699) 
-   [Application of message traits (intentionally) replacing existing attributes](https://github.com/asyncapi/spec/issues/505)
-   [Address perspective and channel reuse issues through introducing 'endpoint' concept](https://github.com/asyncapi/spec/issues/599)

The tooling issues and pull requests which are tied up with the Spec 3.0 release are:

-   [Implement intent-driven Parser API](https://github.com/asyncapi/parser-js/issues/401)
-   [Splitting out definitions into separate files](https://github.com/asyncapi/spec-json-schemas/issues/127)
-   [Move binding JSON schema files to main JSON schema repository](https://github.com/asyncapi/bindings/issues/113)

We are using the [GitHub milestone](https://github.com/asyncapi/spec/milestone/18) to track down all the issues related to Spec 3.0 release. If you are willing to take up an issue, filter the issues with `needs champion` label and drive the initiative forward. We also have a [release journal](https://github.com/asyncapi/community/issues/163) for the upcoming Spec 3.0 release to keep note of all the references, build the right documentation, and track the progress for the upcoming release.

## Contributing to the release

AsyncAPI is a community-driven project and we welcome all kinds of contributions! To get started, join our Slack workspace by [requesting an invite](http://asyncapi.com/slack-invite). After joining, reach out to us on the `#03_specification` channel and participate in the conversations.

To better understand AsyncAPI and how the Spec 3.0 release will play out, we recommend watching our [past meeting recordings](https://www.youtube.com/watch?v=CLNgLB4-UnA&list=PLbi1gRlP7pihClJY-kXuTRRJ8n1awb0VV). To know how you can contribute, we recommend checking out our [contributing guidelines](https://github.com/asyncapi/spec/blob/master/CONTRIBUTING.md). If you wish to keep track of all the work that is happening on the Spec 3.0 release, we recommend checking out our [GitHub issue](https://github.com/asyncapi/spec/issues/691).

Before landing in your contributions, make sure you follow our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md) and the pull request you raised is [described properly](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md#conventional-commits). To know how we collaborate using Git & GitHub, follow the [Git workflow](https://github.com/asyncapi/.github/blob/master/git-workflow.md) that we have developed for new contributors.

## When will the release happen?

We are yet to arrive at a date but the community is working towards releasing this by the end of 2022. Currently, we meet every two weeks to discuss the upcoming Spec 3.0 release and share updates and you are welcome to join it!

The release would follow a three-step process: End of the review period, Beta testing and official announcement. Currently, we are working in a review period where important work is picked before we start working on them. During Beta testing, we invite external contributors and users to test the contributions that have landed in and validate their use cases. Finally, after rigorous testing, we will make an official announcement about our release!

Join us and help make the upcoming release a successful one!

(Cover picture by [Andrew Coelho](https://unsplash.com/@andrewcoelho) on [Unsplash](https://unsplash.com/))
