---
title: "AsyncAPI Made Simple: Neuroglia’s Innovative Tools for Developers"
date: 2025-07-25T06:00:00+01:00
type: Communication
tags:
  - Interview
  - Community
  - Marketing
cover: /img/posts/marketing-images/neuroglia-blog.webp
authors:
  - name: Atinuke Oluwabamikemi Kayode
    photo: /img/avatars/bami.webp
    link: https://www.linkedin.com/in/atinuke-oluwabamikemi-kayode-5b838b1b7/
    byline: AsyncAPI Community Marketing Specialist
excerpt: 'An interview with Neuroglia co-founder Charles d’Avernas on building innovative AsyncAPI SDKs featuring Fluent Builders, IO services, Fluent Validators, and code-first document generation.'
---

We recently had the pleasure of interviewing [Charles d'Avernas](https://www.linkedin.com/in/charles-d-avernas-40836a13/), who co-founded [Neuroglia SRL](https://neuroglia.io/) alongside [Jean-Baptiste Bianchi](https://www.linkedin.com/in/jean-baptiste-bianchi-aa42b914/), a company known for providing elegant and straightforward solutions to complex IT challenges. Charles and his team work with prominent players in the IT community, such as Cisco, to create sophisticated event-driven solutions that address core business issues.

In our conversation, Charles explained that Neuroglia's focus is mainly on orchestration. Unlike other players in their sector, Neuroglia doesn't take a "refactor or start-from-scratch" approach. Instead, they aim to integrate existing legacy systems into modern solutions, following an orchestration or event-driven approach.

## The Origin of Neuroglia’s Journey with AsyncAPI

Years ago, while working with orchestration tools, Neuroglia discovered Serverless Workflow, a CNCF project. They found the project while searching for orchestration tools that could standardize the creation and running of workflows for one of their clients. As Charles became deeply involved, he became the lead maintainer of the Serverless Workflow specification repository. Together with his associate, they also developed various SDKs, including Rust, .NET, and TypeScript.
As their work on the Serverless Workflow project progressed, Charles encountered AsyncAPI. Recognizing its potential, he actively pushed for its support within the Serverless Workflow specification.
At that time, the available .NET tooling options were limited and did not fulfill all their requirements, prompting Neuroglia to pursue a more vendor-neutral and flexible solution.

## Building an AsyncAPI SDK from Scratch

To solve their challenges, Neuroglia developed their own AsyncAPI SDK. They began by building domain models and then advanced to Fluent Builders, which enabled developers to create AsyncAPI documents using a Fluent code approach. This approach was followed by validation features implemented using Fluent Validation.
The UI they developed initially resembled Swagger’s approach, but later evolved to closely align with AsyncAPI’s official UI. Their solution has grown to include various modules, and now they are working towards integrating official HTML components for rendering documents.

## Key Differentiators of Neuroglia’s Solution

According to Charles, one of the key differentiators of Neuroglia’s AsyncAPI solution is their agnostic, out-of-the-box client, which supports most of the AsyncAPI specification bindings. This plug-and-play client allows developers to register services, specify the AsyncAPI document they want to connect to, and publish or subscribe to operations effortlessly.
Another unique feature is Neuroglia’s support for concurrent AsyncAPI versions. Users can work with older documents and newer documents simultaneously without conflicts, enhancing the flexibility of their solution.

## Problems Solved for AsyncAPI Users

Neuroglia’s solution addresses several challenges for AsyncAPI users:

- **Version Compatibility:** Hosting different versions of the AsyncAPI specification concurrently.
- **Document Generation:** Providing multiple methods to generate AsyncAPI documents, including code-first using Fluent Builders, automatic builders through reflection, and manual creation.
- **Efficient Client Connectivity:** The ability to connect to AsyncAPI services using Neuroglia’s plug-and-play client.
- **Expanded UI Options:** Offering a UI that provides an alternative experience to other AsyncAPI UIs available.

## Key Features & Benefits

It is essential to highlight the project's core features that distinguish it from existing solutions. Neuroglia’s AsyncAPI SDK offers:

- **Fluent Builders:** Simplifies the creation of AsyncAPI documents using a code-centric approach.
- **IO Services:** Facilitates parsing YAML or JSON files into new AsyncAPI documents.
- **Formatting Services:** Allows AsyncAPI documents to be formatted into YAML or JSON.
- **Fluent Validators:** Provides validation mechanisms ensuring document accuracy and adherence to standards.
- **Code-First, Attribute-Based Document Generation:** Automatic document generation through annotations.
- **UI to View Documents:** A user-friendly interface for viewing AsyncAPI documents.
- **A Generic Client:** Supports publishing and subscribing to AsyncAPI operations, compatible with most bindings.

## The Importance of Fluent Builders and Validators

The Fluent Builders developed by Neuroglia offer a code-centric and language-like way to build AsyncAPI documents. This approach simplifies the process, making it easier for developers to create documents without manually writing them in YAML or JSON. In .NET, developers benefit from features like auto-completion, which guides them through the process of building documents seamlessly.
Validators, on the other hand, ensure the correctness of AsyncAPI documents. By using Fluent Validation, developers can easily verify that their documents adhere to the required standards, thereby minimizing errors and enhancing efficiency.

## Code-First Approach and Attribute-Based Document Generation

Charles emphasized the significance of their code-first approach and attribute-based document generation. With this approach, developers can annotate their classes with attributes, allowing the application to generate AsyncAPI documents automatically during runtime, eliminating the need for manual document creation, saving time and reducing discrepancies between services and their documentation.

## Enhancing AsyncAPI Document Formatting and Parsing

Neuroglia’s approach to AsyncAPI document generation also improves formatting and parsing. By automating the generation process through attributes and providing validation mechanisms, they ensure that documents are accurate and properly formatted. This improves the overall efficiency of working with AsyncAPI specifications.

## What’s Next for Neuroglia

Looking ahead, Charles mentioned plans to migrate their UI to use official HTML components for rendering documents. Additionally, they are exploring further ways to enhance their AsyncAPI SDK, making it even more accessible and user-friendly for developers.

Neuroglia’s focus on orchestration, compatibility, and developer-friendly tools showcases their dedication to improving the AsyncAPI ecosystem, thus enhancing the accessibility and usability of AsyncAPI for developers worldwide. [Read more about the project on GitHub](https://github.com/orgs/asyncapi/discussions/1716).