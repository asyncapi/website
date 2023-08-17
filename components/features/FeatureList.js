export const features = [
  {
    name: "Specification",
    id: "specification",
    description:
      "Allows you to define the interfaces of asynchronous APIs and is protocol agnostic.",
    links: [{ label: "Documentation", href: "docs/specifications/latest", id: 'whyasyncapi-spec-documentation-link' }],
  },
  {
    name: "Document APIs",
    id: 'document-apis',
    description:
      "Use our tools to generate documentation at the build level, on a server, and on a client.",
    links: [
      {
        label: "HTML Template",
        href: "https://github.com/asyncapi/html-template",
        id: 'whyasyncapi-apis-htmltemplate-link'
      },
      {
        label: "React Component",
        href: "https://github.com/asyncapi/asyncapi-react/",
        id: 'whyasyncapi-apis-reactcomponents-link'
      },
    ],
  },
  {
    name: "Code Generation",
    id: "code-generation",
    description:
      "Generate documentation, Code (TypeScript, Java, C#, etc), and more out of your AsyncAPI files.",
    links: [{ label: "Generator", href: "tools/generator", id: 'whyasyncapi-generation-generator-link' }, { label: "Modelina", href: "tools/modelina", id: 'whyasyncapi-generation-modelina-link' }],
  },
  {
    name: "Community",
    id: "community",
    description: "We're a community of great people who are passionate about AsyncAPI and event-driven architectures.",
    links: [
      { label: "Join our Slack", href: "https://asyncapi.com/slack-invite", id: 'whyasyncapi-community-slack-link' },
    ],
  },
  {
    name: "Open Governance",
    id: "open-governance",
    description:
      "Our Open-Source project is part of Linux Foundation and works under an Open Governance model.",
    links: [{ label: "Read more about Open Governance", href: "blog/governance-motivation", id: 'whyasyncapi-governance-more-link' }, { label: "TSC Members", href: "community/tsc", id: 'whyasyncapi-governance-tsc-link' }],
  },
  {
    name: "And much more...",
    id: "much-more",
    description:
      "We have many different tools and welcome you to explore our ideas and propose new ideas to AsyncAPI.",
    links: [{ label: "View GitHub Discussions", href: "https://github.com/asyncapi/community/discussions", id: 'whyasyncapi-muchmore-github-link' }],
  },
];