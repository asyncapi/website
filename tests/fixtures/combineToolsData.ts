import type { Category } from '../../types/scripts/tools';

const expectedDataT1 = {
  languages: [
    {
      name: 'JavaScript',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]'
    },
    {
      name: 'Python',
      color: 'bg-[#3572A5]',
      borderColor: 'border-[#3572A5]'
    }
  ],
  technologies: [
    {
      name: 'Node.js',
      color: 'bg-[#61d0f2]',
      borderColor: 'border-[#40ccf7]'
    },
    {
      name: 'Flask',
      color: 'bg-[#000000]',
      borderColor: 'border-[#FFFFFF]'
    }
  ]
};

const manualToolsWithMissingData = {
  myCategory: {
    description: 'this is a test category',
    toolsList: [
      {
        title: 'Tool C',
        filters: {
          categories: [] as Category[]
        },
        links: { repoUrl: 'https://github.com/asyncapi/tool-c' }
      }
    ]
  }
};

const manualToolsToSort = {
  category1: {
    description: 'Sample Category',
    toolsList: [
      {
        title: 'Tool Z',
        filters: {
          language: ['JavaScript'],
          technology: [],
          categories: ['code-generator' as Category]
        },
        links: { repoUrl: 'https://github.com/asyncapi/tool-z' }
      },
      {
        title: 'Tool A',
        filters: {
          language: ['Python'],
          technology: [],
          categories: ['code-generator' as Category]
        },
        links: { repoUrl: 'https://github.com/asyncapi/tool-a' }
      }
    ]
  }
};

const toolWithMultipleLanguages = {
  title: 'Multi-Language Tool',
  filters: {
    language: ['JavaScript', 'Python', 'NewLanguage'],
    technology: ['Node.js'],
    categories: ['code-generator' as Category]
  },
  links: { repoUrl: 'https://github.com/example/multi-language-tool' }
};

const automatedToolsT5 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithMultipleLanguages]
  }
};

const invalidToolT4 = {
  title: 'Invalid Tool',
  filters: {
    categories: [] as Category[]
  }
};

const automatedToolsT4 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: []
  }
};
const manualToolsT4 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [invalidToolT4]
  }
};

const toolWithNewTagsT6 = {
  title: 'New Tags Tool',
  filters: {
    language: ['NewLanguage'],
    technology: ['NewTechnology'],
    categories: ['api' as Category]
  },
  links: { repoUrl: 'https://github.com/example/new-tags-tool' }
};

const automatedToolsT6 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithNewTagsT6]
  }
};

const toolWithNewLanguageT7 = {
  title: 'New Language Tool',
  filters: {
    language: 'Go',
    technology: ['Node.js'],
    categories: ['api' as Category]
  },
  links: { repoUrl: 'https://github.com/example/new-language-tool' }
};

const automatedToolsT7 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithNewLanguageT7]
  }
};

const validToolT8 = {
  title: 'Valid Tool',
  filters: {
    language: ['JavaScript'],
    technology: ['Node.js'],
    categories: ['api' as Category]
  },
  links: { repoUrl: 'https://github.com/asyncapi/valid-tool' }
};

const automatedToolsT8 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: []
  }
};

const manualToolsT8 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [validToolT8]
  }
};

const toolWithoutRepoUrlT9 = {
  title: 'Tool Without Repo',
  filters: {
    language: ['Python'],
    technology: ['Flask'],
    categories: ['documentation-generator' as Category]
  },
  links: {}
};

const automatedToolsT9 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: []
  }
};

const manualToolsT9 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithoutRepoUrlT9]
  }
};

const invalidAutomatedToolsT10 = {
  invalidCategory: {
    description: 'Invalid Category Description',
    toolsList: []
  }
};

const manualToolsWithInvalidURLT11 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [
      {
        title: 'Tool with Invalid URL',
        filters: {
          language: ['JavaScript'],
          technology: [],
          categories: ['api' as Category]
        },
        links: { repoUrl: 'invalid-url' }
      }
    ]
  }
};

const circularTool = {
  title: 'Circular Tool',
  filters: {
    language: ['JavaScript'],
    technology: ['Node.js'],
    categories: ['api' as Category]
  },
  links: { repoUrl: 'https://github.com/asyncapi/circular-tool' }
};

const automatedToolsT12 = {
  category1: {
    description: 'Category 1',
    toolsList: [circularTool]
  }
};

const finalToolWithMissingData = {
  title: 'Tool C',

  links: { repoUrl: 'https://github.com/asyncapi/tool-c' },
  filters: {
    language: [],
    technology: [],
    categories: [] as Category[],
    hasCommercial: false
  }
};

export {
  automatedToolsT4,
  automatedToolsT5,
  automatedToolsT6,
  automatedToolsT7,
  automatedToolsT8,
  automatedToolsT9,
  automatedToolsT12,
  circularTool,
  expectedDataT1,
  finalToolWithMissingData,
  invalidAutomatedToolsT10,
  manualToolsT4,
  manualToolsT8,
  manualToolsT9,
  manualToolsToSort,
  manualToolsWithInvalidURLT11,
  manualToolsWithMissingData
};
