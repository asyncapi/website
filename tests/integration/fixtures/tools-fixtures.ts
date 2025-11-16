export const mockToolsData = {
  // First page of GitHub API search results
  githubSearchResponse: {
    items: [
      {
        name: '.asyncapi-tool',
        url: 'https://api.github.com/repositories/123456/contents/.asyncapi-tool?ref=abcdef',
        repository: {
          full_name: 'asyncapi/tool1',
          html_url: 'https://github.com/asyncapi/tool1',
          description: 'AsyncAPI Tool 1 - A powerful tool for AsyncAPI',
          owner: { login: 'asyncapi' }
        },
        path: '.asyncapi-tool'
      },
      {
        name: '.asyncapi-tool',
        url: 'https://api.github.com/repositories/789012/contents/.asyncapi-tool?ref=ghijkl',
        repository: {
          full_name: 'asyncapi/tool2',
          html_url: 'https://github.com/asyncapi/tool2',
          description: 'AsyncAPI Tool 2 - Another great tool',
          owner: { login: 'asyncapi' }
        },
        path: '.asyncapi-tool'
      },
      {
        name: '.asyncapi-tool',
        url: 'https://api.github.com/repositories/345678/contents/.asyncapi-tool?ref=mnopqr',
        repository: {
          full_name: 'asyncapi/tool3',
          html_url: 'https://github.com/asyncapi/tool3',
          description: 'AsyncAPI Tool 3 - Third tool in the collection',
          owner: { login: 'asyncapi' }
        },
        path: '.asyncapi-tool'
      }
    ],
    total_count: 3,
    incomplete_results: false
  },

  // Second page of GitHub API search results
  githubSearchResponsePage2: {
    items: [
      {
        name: '.asyncapi-tool',
        url: 'https://api.github.com/repositories/456789/contents/.asyncapi-tool?ref=stuvwx',
        repository: {
          full_name: 'asyncapi/tool4',
          html_url: 'https://github.com/asyncapi/tool4',
          description: 'AsyncAPI Tool 4 - Fourth tool',
          owner: { login: 'asyncapi' }
        },
        path: '.asyncapi-tool'
      }
    ],
    total_count: 4,
    incomplete_results: false
  },

  // Raw GitHub content responses for .asyncapi-tool files (YAML format)
  githubContentResponses: {
    tool1: `title: AsyncAPI Tool 1
description: A powerful tool for AsyncAPI development
links:
  repoUrl: https://github.com/asyncapi/tool1
  websiteUrl: https://tool1.example.com
  docsUrl: https://docs.tool1.example.com
filters:
  categories:
    - code-generator
  language: JavaScript
  technology:
    - React
    - Node.js
  hasCommercial: false`,
    tool2: `title: AsyncAPI Tool 2
description: Another great tool for validation
links:
  repoUrl: https://github.com/asyncapi/tool2
  websiteUrl: https://tool2.example.com
filters:
  categories:
    - validator
  language: Python
  technology:
    - FastAPI
    - Django
  hasCommercial: true`,
    tool3: `title: AsyncAPI Tool 3
description: Third tool in the collection for documentation
links:
  repoUrl: https://github.com/asyncapi/tool3
  docsUrl: https://docs.tool3.example.com
filters:
  categories:
    - documentation-generator
  language: TypeScript
  technology:
    - Next.js
    - React
  hasCommercial: false`,
    tool4: `title: AsyncAPI Tool 4
description: Fourth tool for code generation
links:
  repoUrl: https://github.com/asyncapi/tool4
  websiteUrl: https://tool4.example.com
filters:
  categories:
    - code-generator
  language: JavaScript
  technology:
    - Vue.js
    - Nuxt.js
  hasCommercial: false`
  },

  // Manual tools data (already processed format)
  manualTools: {
    'Code Generators': {
      description:
        'The following is a list of tools that generate code from an AsyncAPI document; not the other way around.',
      toolsList: [
        {
          title: 'Manual Tool 1',
          description: 'A manually curated tool for AsyncAPI development',
          links: {
            repoUrl: 'https://github.com/manual/tool1',
            websiteUrl: 'https://manual-tool1.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['React'],
            hasCommercial: false
          }
        }
      ]
    },
    Validators: {
      description: 'The following is a list of tools that validate AsyncAPI documents.',
      toolsList: [
        {
          title: 'Manual Tool 2',
          description: 'Another manual tool for AsyncAPI validation',
          links: {
            repoUrl: 'https://github.com/manual/tool2',
            docsUrl: 'https://docs.manual-tool2.example.com'
          },
          filters: {
            categories: ['validator'],
            language: 'Python',
            technology: ['FastAPI'],
            hasCommercial: true
          }
        }
      ]
    }
  },

  // Expected automated tools after processing (simplified for testing)
  expectedAutomatedTools: {
    'Code Generators': {
      description:
        'The following is a list of tools that generate code from an AsyncAPI document; not the other way around.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 1',
          description: 'A powerful tool for AsyncAPI development',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool1',
            websiteUrl: 'https://tool1.example.com',
            docsUrl: 'https://docs.tool1.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['React', 'Node.js'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        },
        {
          title: 'AsyncAPI Tool 4',
          description: 'Fourth tool for code generation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool4',
            websiteUrl: 'https://tool4.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['Vue.js', 'Nuxt.js'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        }
      ]
    },
    Validators: {
      description: 'The following is a list of tools that validate AsyncAPI documents.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 2',
          description: 'Another great tool for validation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool2',
            websiteUrl: 'https://tool2.example.com'
          },
          filters: {
            categories: ['validator'],
            language: 'Python',
            technology: ['FastAPI', 'Django'],
            hasCommercial: true,
            isAsyncAPIOwner: true
          }
        }
      ]
    },
    'Documentation Generators': {
      description:
        'The following is a list of tools that generate human-readable documentation from an AsyncAPI document.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 3',
          description: 'Third tool in the collection for documentation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool3',
            docsUrl: 'https://docs.tool3.example.com'
          },
          filters: {
            categories: ['documentation-generator'],
            language: 'TypeScript',
            technology: ['Next.js', 'React'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        }
      ]
    }
  },

  // Expected combined tools (automated + manual)
  expectedCombinedTools: {
    'Code Generators': {
      description:
        'The following is a list of tools that generate code from an AsyncAPI document; not the other way around.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 1',
          description: 'A powerful tool for AsyncAPI development',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool1',
            websiteUrl: 'https://tool1.example.com',
            docsUrl: 'https://docs.tool1.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['React', 'Node.js'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        },
        {
          title: 'Manual Tool 1',
          description: 'A manually curated tool for AsyncAPI development',
          links: {
            repoUrl: 'https://github.com/manual/tool1',
            websiteUrl: 'https://manual-tool1.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['React'],
            hasCommercial: false,
            isAsyncAPIOwner: false
          }
        },
        {
          title: 'AsyncAPI Tool 4',
          description: 'Fourth tool for code generation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool4',
            websiteUrl: 'https://tool4.example.com'
          },
          filters: {
            categories: ['code-generator'],
            language: 'JavaScript',
            technology: ['Vue.js', 'Nuxt.js'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        }
      ]
    },
    Validators: {
      description: 'The following is a list of tools that validate AsyncAPI documents.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 2',
          description: 'Another great tool for validation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool2',
            websiteUrl: 'https://tool2.example.com'
          },
          filters: {
            categories: ['validator'],
            language: 'Python',
            technology: ['FastAPI', 'Django'],
            hasCommercial: true,
            isAsyncAPIOwner: true
          }
        },
        {
          title: 'Manual Tool 2',
          description: 'Another manual tool for AsyncAPI validation',
          links: {
            repoUrl: 'https://github.com/manual/tool2',
            docsUrl: 'https://docs.manual-tool2.example.com'
          },
          filters: {
            categories: ['validator'],
            language: 'Python',
            technology: ['FastAPI'],
            hasCommercial: true,
            isAsyncAPIOwner: false
          }
        }
      ]
    },
    'Documentation Generators': {
      description:
        'The following is a list of tools that generate human-readable documentation from an AsyncAPI document.',
      toolsList: [
        {
          title: 'AsyncAPI Tool 3',
          description: 'Third tool in the collection for documentation',
          links: {
            repoUrl: 'https://github.com/asyncapi/tool3',
            docsUrl: 'https://docs.tool3.example.com'
          },
          filters: {
            categories: ['documentation-generator'],
            language: 'TypeScript',
            technology: ['Next.js', 'React'],
            hasCommercial: false,
            isAsyncAPIOwner: true
          }
        }
      ]
    }
  },

  expectedTags: {
    languages: [
      {
        name: 'JavaScript',
        color: 'bg-[#f1e05a]',
        borderColor: 'border-[#f1e05a]'
      },
      {
        name: 'Python',
        color: 'bg-[#3572A5]',
        borderColor: 'border-[#3572A5]'
      },
      {
        name: 'TypeScript',
        color: 'bg-[#2b7489]',
        borderColor: 'border-[#2b7489]'
      }
    ],
    technologies: [
      { name: 'React', color: 'bg-[#61dafb]', borderColor: 'border-[#61dafb]' },
      {
        name: 'FastAPI',
        color: 'bg-[#009688]',
        borderColor: 'border-[#009688]'
      },
      {
        name: 'Next.js',
        color: 'bg-[#000000]',
        borderColor: 'border-[#000000]'
      }
    ]
  },

  errorResponse: {
    message: 'API rate limit exceeded',
    documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'
  },

  emptyResponse: {
    items: [],
    total_count: 0,
    incomplete_results: false
  }
};
