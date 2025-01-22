interface FeatureLink {
  label: string;
  href: string;
  id: string;
}

interface Feature {
  id: string;
  name: string;
  link: FeatureLink;
}

export const features: Feature[] = [
  {
    id: 'costs-control',
    name: 'Costs Control',
    link: {
      label: 'features.read-more',
      href: 'docs/costs-control',
      id: 'costs-control-read-more-link'
    }
  },
  {
    id: 'publishing-api',
    name: 'Self-service for Publishing API',
    link: {
      label: 'features.read-more',
      href: 'docs/publishing-api',
      id: 'publishing-api-read-more-link'
    }
  },
  {
    id: 'code-generation',
    name: 'Code Generation',
    link: {
      label: 'features.read-more',
      href: 'docs/code-generation',
      id: 'code-generation-read-more-link'
    }
  },
  {
    id: 'infra-as-code',
    name: 'Infrastructure as Code',
    link: {
      label: 'features.read-more',
      href: 'docs/infra-as-code',
      id: 'infra-as-code-read-more-link'
    }
  },
  {
    id: 'governance-consistency',
    name: 'Governance & Consistency',
    link: {
      label: 'features.read-more',
      href: 'docs/governance-consistency',
      id: 'governance-consistency-read-more-link'
    }
  },
  {
    id: 'developer-portal',
    name: 'Developer Portal',
    link: {
      label: 'features.read-more',
      href: 'docs/developer-portal',
      id: 'developer-portal-read-more-link'
    }
  }
];
