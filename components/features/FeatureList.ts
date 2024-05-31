interface FeatureLink {
  label: string;
  href: string;
  id: string;
}

interface Feature {
  id: string;
  links: FeatureLink[];
}

export const features: Feature[] = [
  {
    id: 'specification',
    links: [
      {
        label: 'Documentation',
        href: 'docs/reference/specification/latest',
        id: 'whyasyncapi-spec-documentation-link'
      }
    ]
  },
  {
    id: 'document-apis',
    links: [
      {
        label: 'HTML Template',
        href: 'https://github.com/asyncapi/html-template',
        id: 'whyasyncapi-apis-htmltemplate-link'
      },
      {
        label: 'React Component',
        href: 'https://github.com/asyncapi/asyncapi-react/',
        id: 'whyasyncapi-apis-reactcomponents-link'
      }
    ]
  },
  {
    id: 'code-generation',
    links: [
      {
        label: 'Generator',
        href: 'tools/generator',
        id: 'whyasyncapi-generation-generator-link'
      },
      {
        label: 'Modelina',
        href: 'tools/modelina',
        id: 'whyasyncapi-generation-modelina-link'
      }
    ]
  },
  {
    id: 'community',
    links: [
      {
        label: 'Join our Slack',
        href: 'https://asyncapi.com/slack-invite',
        id: 'whyasyncapi-community-slack-link'
      }
    ]
  },
  {
    id: 'open-governance',
    links: [
      {
        label: 'Read more about Open Governance',
        href: 'blog/governance-motivation',
        id: 'whyasyncapi-governance-more-link'
      },
      {
        label: 'TSC Members',
        href: 'community/tsc',
        id: 'whyasyncapi-governance-tsc-link'
      }
    ]
  },
  {
    id: 'much-more',
    links: [
      {
        label: 'View GitHub Discussions',
        href: 'https://github.com/asyncapi/community/discussions',
        id: 'whyasyncapi-muchmore-github-link'
      }
    ]
  }
];
