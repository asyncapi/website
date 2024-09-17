module.exports = {
    basicNavItems: [
        { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        { title: 'Getting Started', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'getting-started', sectionWeight: 1, slug: '/docs/getting-started' },
        { title: 'Installation', weight: 0, isSection: false, rootSectionId: 'getting-started', sectionId: 'installation', slug: '/docs/getting-started/installation' },
        { title: 'Configuration', weight: 1, isSection: false, rootSectionId: 'getting-started', sectionId: 'configuration', slug: '/docs/getting-started/configuration' },
        { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2, slug: '/docs/reference' },
        { title: 'API', weight: 0, isSection: true, rootSectionId: 'reference', sectionId: 'api', parent: 'reference', slug: '/docs/reference/api' },
        { title: 'Endpoints', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'api', slug: '/docs/reference/api/endpoints' },
        { title: 'Specification', weight: 1, isSection: true, rootSectionId: 'reference', sectionId: 'specification', parent: 'reference', slug: '/docs/reference/specification' },
        { title: 'v1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.0', isPrerelease: false },
        { title: 'v2.0', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v2.0', isPrerelease: true },
        { title: 'v3.0', weight: 2, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v3.0' }
    ],

    sectionNavItems: [
        { title: 'Root', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'root', sectionWeight: 0, slug: '/docs' },
        { title: 'Item without sectionId', weight: 1, isSection: false, rootSectionId: 'root', slug: '/docs/item' },
      ],

    orphanNavItems: [
        { title: 'Orphaned Subsection', weight: 0, isSection: true, rootSectionId: 'root', sectionId: 'orphan', parent: 'non-existent-parent', slug: '/docs/orphaned' }
    ],

    missingSpecVersion: [
        { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2, slug: '/docs/reference' },
        { title: 'Specification', weight: 1, isSection: true, rootSectionId: 'reference', sectionId: 'specification', parent: 'reference', slug: '/docs/reference/specification' },
        { title: 'v1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v1.0', isPrerelease: true },
        { title: 'v2.0', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/v2.0', isPrerelease: true }
    ],
    nullNavItems: null
};
