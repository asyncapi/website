const navData = {
  basicNavItems: [
    {
      title: 'Welcome',
      weight: 0,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'welcome',
      sectionWeight: 0,
      slug: '/docs'
    },
    {
      title: 'Getting Started',
      weight: 1,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'getting-started',
      sectionWeight: 1,
      slug: '/docs/getting-started'
    },
    {
      title: 'Installation',
      weight: 0,
      isSection: false,
      rootSectionId: 'getting-started',
      sectionId: 'installation',
      slug: '/docs/getting-started/installation'
    },
    {
      title: 'Configuration',
      weight: 1,
      isSection: false,
      rootSectionId: 'getting-started',
      sectionId: 'configuration',
      slug: '/docs/getting-started/configuration'
    },
    {
      title: 'Reference',
      weight: 2,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'reference',
      sectionWeight: 2,
      slug: '/docs/reference'
    },
    {
      title: 'API',
      weight: 0,
      isSection: true,
      rootSectionId: 'reference',
      sectionId: 'api',
      parent: 'reference',
      slug: '/docs/reference/api'
    },
    {
      title: 'Endpoints',
      weight: 0,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'api',
      slug: '/docs/reference/api/endpoints'
    },
    {
      title: 'Specification',
      weight: 1,
      isSection: true,
      rootSectionId: 'reference',
      sectionId: 'specification',
      parent: 'reference',
      slug: '/docs/reference/specification'
    },
    {
      title: 'v1.0',
      weight: 0,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v1.0',
      isPrerelease: false
    },
    {
      title: 'v2.0',
      weight: 1,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v2.0',
      isPrerelease: true
    },
    {
      title: 'v3.0',
      weight: 2,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v3.0'
    }
  ],

  sectionNavItems: [
    {
      title: 'Root',
      weight: 0,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'root',
      sectionWeight: 0,
      slug: '/docs'
    },
    { title: 'Item without sectionId', weight: 1, isSection: false, rootSectionId: 'root', slug: '/docs/item' }
  ],

  orphanNavItems: [
    {
      title: 'Orphaned Subsection',
      weight: 0,
      isSection: true,
      rootSectionId: 'root',
      sectionId: 'orphan',
      parent: 'non-existent-parent',
      slug: '/docs/orphaned'
    }
  ],

  missingFieldsNavItems: [
    { title: 'Incomplete Item', weight: 0, isSection: false, rootSectionId: 'incomplete', slug: '/docs/incomplete' }
  ],

  invalidParentNavItems: [
    {
      title: 'Valid Root',
      weight: 0,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'valid-root',
      sectionWeight: 0,
      slug: '/docs/valid-root'
    },
    {
      title: 'Child with invalid parent',
      weight: 1,
      isSection: true,
      rootSectionId: 'valid-root',
      sectionId: 'child-invalid',
      parent: 'non-existent-parent',
      slug: '/docs/valid-root/child-invalid'
    }
  ],

  multipleSubsectionsNavItems: [
    {
      title: 'Reference',
      weight: 0,
      isRootSection: true,
      isSection: true,
      rootSectionId: 'reference',
      sectionWeight: 0,
      slug: '/docs/reference'
    },
    {
      title: 'API',
      weight: 0,
      isSection: true,
      rootSectionId: 'reference',
      sectionId: 'api',
      parent: 'reference',
      slug: '/docs/reference/api'
    },
    {
      title: 'Endpoints',
      weight: 2,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'api',
      slug: '/docs/reference/api/endpoints'
    },
    {
      title: 'Authentication',
      weight: 1,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'api',
      slug: '/docs/reference/api/authentication'
    },
    {
      title: 'Rate Limiting',
      weight: 3,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'api',
      slug: '/docs/reference/api/rate-limiting'
    },
    {
      title: 'Specification',
      weight: 1,
      isSection: true,
      rootSectionId: 'reference',
      sectionId: 'specification',
      parent: 'reference',
      slug: '/docs/reference/specification'
    },
    {
      title: 'v1.0',
      weight: 10,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v1.0'
    },
    {
      title: 'v2.0',
      weight: 20,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v2.0'
    },
    {
      title: 'v3.0',
      weight: 30,
      isSection: false,
      rootSectionId: 'reference',
      sectionId: 'specification',
      slug: '/docs/reference/specification/v3.0'
    }
  ]
};

export default navData;
