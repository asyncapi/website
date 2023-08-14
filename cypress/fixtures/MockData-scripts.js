
//main DocTree mockData and expected tree 
export const mockNavItems = [
    { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
    { title: 'Introduction', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'introduction', sectionWeight: 1, slug: '/docs/introduction' },
    { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/overview' },
    { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/getting-started' },
    { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2, slug: '/docs/reference' },
    { title: 'Specification', weight: 0, isSection: true, parent: 'reference', sectionId: 'specification', slug: '/docs/reference/specification' },
    { title: 'Version 1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/1.0' },
    { title: 'Version 2.0 (prerelease)', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/2.0', isPrerelease: true }
]

export const expectedTree = {
    "introduction": {
        "children": {
            "Getting Started": {
                "item": {
                    "isSection": false,
                    "rootSectionId": "introduction",
                    "slug": "/docs/introduction/getting-started",
                    "title": "Getting Started",
                    "weight": 1
                }
            },
            "Overview": {
                "item": {
                    "isSection": false,
                    "rootSectionId": "introduction",
                    "slug": "/docs/introduction/overview",
                    "title": "Overview",
                    "weight": 0
                }
            }
        },
        "item": {
            "isRootSection": true,
            "isSection": true,
            "rootSectionId": "introduction",
            "sectionWeight": 1,
            "slug": "/docs/introduction",
            "title": "Introduction",
            "weight": 1
        }
    },
    "reference": {
        "children": {
            "specification": {
                "children": [
                    {
                        "isPrerelease": true,
                        "isSection": false,
                        "rootSectionId": "reference",
                        "sectionId": "specification",
                        "slug": "/docs/reference/specification/2.0",
                        "title": "Version 2.0 (prerelease)",
                        "weight": 1
                    }
                ],
                "item": {
                    "isSection": true,
                    "parent": "reference",
                    "sectionId": "specification",
                    "slug": "/docs/reference/specification",
                    "title": "Specification",
                    "weight": 0
                }
            }
        },
        "item": {
            "isRootSection": true,
            "isSection": true,
            "rootSectionId": "reference",
            "sectionWeight": 2,
            "slug": "/docs/reference",
            "title": "Reference",
            "weight": 2
        }
    },
    "welcome": {
        "children": {
        },
        "item": {
            "isRootSection": true,
            "isSection": true,
            "rootSectionId": "welcome",
            "sectionWeight": 0,
            "slug": "/docs",
            "title": "Welcome",
            "weight": 0
        }
    }
}

//main mockDocObjec and //expected
export const mockDocObject = {
    item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
    children: {
        'Introduction': {
            item: { title: 'Introduction', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'introduction', sectionWeight: 1, slug: '/docs/introduction' },
            children: {
                'Overview': { item: { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/overview' } },
                'Getting Started': { item: { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/getting-started' } }
            }
        }
    }
}
// expected output for convertDocPosts
export const expectedDocsArray = [
    { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
    { title: 'Introduction', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'introduction', sectionWeight: 1, slug: '/docs/introduction' },
    { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/overview' },
    { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/getting-started' }
]

export const mockDocPosts = [
    { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs', content: 'Welcome to the docs' },
    { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/overview', content: 'This is an overview of the docs' },
    { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/getting-started', content: 'This is how to get started with the docs' },
    { title: 'Version 1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/1.0', content: 'This is the specification for version 1.0' },
    { title: 'Version 2.0 (prerelease)', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/2.0', content: 'This is the specification for version 2.0 (prerelease)', isPrerelease: true }
]

// mock data for treePosts
export const mockTreePosts = {
    welcome: {
        item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        children: {}
    },
    introduction: {
        item: { title: 'Introduction', weight: 1, isRootSection: true, isSection: true, rootSectionId: 'introduction', sectionWeight: 1, slug: '/docs/introduction' },
        children: {
            Overview: { item: { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/overview' } },
            'Getting Started': { item: { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'introduction', slug: '/docs/introduction/getting-started' } }
        }
    },
    reference: {
        item: { title: 'Reference', weight: 2, isRootSection: true, isSection: true, rootSectionId: 'reference', sectionWeight: 2, slug: '/docs/reference' },
        children: {
            specification: {
                item: { title: 'Specification', weight: 0, isSection: true, parent: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/2.0' },
                children: [
                    { title: 'Version 1.0', weight: 0, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/1.0' },
                    {
                        title: 'Version 2.0 (prerelease)', weight: 1, isSection: false, rootSectionId: 'reference', sectionId: 'specification', slug: '/docs/reference/specification/2.0',
                        isPrerelease: true
                    }
                ]
            }
        }
    }
}

// expected output for addDocButtons
export const expectedStructuredPosts = [
    {
        "content": "Welcome to the docs",
        "isRootSection": true,
        "isSection": true,
        "rootSectionId": "welcome",
        "sectionWeight": 0,
        "slug": "/docs",
        "title": "Welcome",
        "weight": 0
    },
    {
        "isRootSection": true,
        "isSection": true,
        "rootSectionId": "introduction",
        "sectionWeight": 1,
        "slug": "/docs/introduction",
        "title": "Introduction",
        "weight": 1
    },
    {
        "isSection": false,
        "nextPage": {
            "href": "/docs/introduction/getting-started",
            "title": "Getting Started"
        },
        "prevPage": {
            "href": "/docs",
            "title": "Welcome - Welcome"
        },
        "rootSectionId": "introduction",
        "slug": "/docs/introduction/overview",
        "title": "Overview",
        "weight": 0
    },
    {
        "isSection": false,
        "nextPage": {
            "href": "/docs/reference/specification/2.0",
            "title": "Reference - Specification"
        },
        "prevPage": {
            "href": "/docs/introduction/overview",
            "title": "Overview"
        },
        "rootSectionId": "introduction",
        "slug": "/docs/introduction/getting-started",
        "title": "Getting Started",
        "weight": 1
    },
    {
        "isRootSection": true,
        "isSection": true,
        "rootSectionId": "reference",
        "sectionWeight": 2,
        "slug": "/docs/reference",
        "title": "Reference",
        "weight": 2
    },
    {
        "isSection": true,
        "parent": "reference",
        "sectionId": "specification",
        "slug": "/docs/reference/specification/2.0",
        "title": "Specification",
        "weight": 0
    },
    {
        "isSection": false,
        "nextPage": {
            "href": "/docs/reference/specification/2.0",
            "title": "Version 2.0 (prerelease)"
        },
        "prevPage": {
            "href": "/docs/reference",
            "title": "Reference - Reference"
        },
        "rootSectionId": "reference",
        "sectionId": "specification",
        "slug": "/docs/reference/specification/1.0",
        "title": "Version 1.0",
        "weight": 0
    },
    {
        "isPrerelease": true,
        "isSection": false,
        "prevPage": {
            "href": "/docs/reference/specification/1.0",
            "title": "Version 1.0"
        },
        "rootSectionId": "reference",
        "sectionId": "specification",
        "slug": "/docs/reference/specification/2.0",
        "title": "Version 2.0 (prerelease)",
        "weight": 1
    }
]

// create a new mock data with only one root section and no subsections
export const mockDocPostsOneRoot = [
    { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs', content: 'Welcome to the docs' },
    { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'welcome', slug: '/docs/overview', content: 'This is an overview of the docs' },
    { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'welcome', slug: '/docs/getting-started', content: 'This is how to get started with the docs' }
]

export const mockTreePostsOneRoot = {
    welcome: {
        item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        children: {
            Overview: { item: { title: 'Overview', weight: 0, isSection: false, rootSectionId: 'welcome', slug: '/docs/overview' } },
            'Getting Started': { item: { title: 'Getting Started', weight: 1, isSection: false, rootSectionId: 'welcome', slug: '/docs/getting-started' } }
        }
    }
}

// create a new expected output with only one root section and no subsections
export const expectedStructuredPostsOneRoot = [
    {
        "content": "Welcome to the docs",
        "isRootSection": true,
        "isSection": true,
        "rootSectionId": "welcome",
        "sectionWeight": 0,
        "slug": "/docs",
        "title": "Welcome",
        "weight": 0
    },
    {
        "isSection": false,
        "nextPage": {
            "href": "/docs/getting-started",
            "title": "Getting Started"
        },
        "rootSectionId": "welcome",
        "slug": "/docs/overview",
        "title": "Overview",
        "weight": 0
    },
    {
        "isSection": false,
        "prevPage": {
            "href": "/docs/overview",
            "title": "Overview"
        },
        "rootSectionId": "welcome",
        "slug": "/docs/getting-started",
        "title": "Getting Started",
        "weight": 1
    }
]
