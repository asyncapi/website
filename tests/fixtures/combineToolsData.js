const expectedDataT1 = {
  languages: [
    {
      name: 'JavaScript',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]',
    },
    {
      name: 'Python',
      color: 'bg-[#3572A5]',
      borderColor: 'border-[#3572A5]',
    },
  ],
  technologies: [
    {
      name: 'Node.js',
      color: 'bg-[#61d0f2]',
      borderColor: 'border-[#40ccf7]',
    },
    {
      name: 'Flask',
      color: 'bg-[#000000]',
      borderColor: 'border-[#FFFFFF]',
    },
  ],
};

const manualToolsWithMissingData = [
  {
    title: 'Tool C',
    filters: {},
    links: { repoUrl: 'https://github.com/asyncapi/tool-c' },
  },
];

const manualToolsToSort = {
  category1: {
    description: 'Sample Category',
    toolsList: [
      {
        title: 'Tool Z',
        filters: { language: 'JavaScript' },
        links: { repoUrl: 'https://github.com/asyncapi/tool-z' },
      },
      {
        title: 'Tool A',
        filters: { language: 'Python' },
        links: { repoUrl: 'https://github.com/asyncapi/tool-a' },
      },
    ],
  },
};

const toolWithMultipleLanguages = {
  title: 'Multi-Language Tool',
  filters: {
    language: ['JavaScript', 'Python', 'NewLanguage'],
    technology: ['Node.js'],
  },
  links: { repoUrl: 'https://github.com/example/multi-language-tool' },
};

const automatedToolsT5 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithMultipleLanguages],
  },
};

const invalidToolT4 = { title: 'Invalid Tool' };

const automatedToolsT4 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [],
  },
};
const manualToolsT4 = {
  category1: {
    toolsList: [invalidToolT4],
  },
};

const toolWithNewTagsT6 = {
  title: 'New Tags Tool',
  filters: {
    language: 'NewLanguage',
    technology: ['NewTechnology'],
  },
  links: { repoUrl: 'https://github.com/example/new-tags-tool' },
};

const automatedToolsT6 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithNewTagsT6],
  },
};

const toolWithNewLanguageT7 = {
  title: 'New Language Tool',
  filters: {
    language: 'Go',
    technology: ['Node.js'],
  },
  links: { repoUrl: 'https://github.com/example/new-language-tool' },
};

const automatedToolsT7 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [toolWithNewLanguageT7],
  },
};

const validToolT8 = {
  title: 'Valid Tool',
  filters: {
    language: 'JavaScript',
    technology: ['Node.js'],
  },
  links: { repoUrl: 'https://github.com/asyncapi/valid-tool' },
};

const automatedToolsT8 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [],
  },
};

const manualToolsT8 = {
  category1: {
    toolsList: [validToolT8],
  },
};

const toolWithoutRepoUrlT9 = {
  title: 'Tool Without Repo',
  filters: {
    language: 'Python',
    technology: ['Flask'],
  },
  links: {},
};

const automatedToolsT9 = {
  category1: {
    description: 'Category 1 Description',
    toolsList: [],
  },
};

const manualToolsT9 = {
  category1: {
    toolsList: [toolWithoutRepoUrlT9],
  },
};

const invalidAutomatedToolsT10 = {
  invalidCategory: {
    description: 'Invalid Category Description',
    toolsList: [],
  },
};

const manualToolsWithInvalidURLT11 = {
  category1: {
    toolsList: [
      {
        title: 'Tool with Invalid URL',
        filters: { language: 'JavaScript' },
        links: { repoUrl: 'invalid-url' },
      },
    ],
  },
};

const circularTool = {
  title: 'Circular Tool',
  filters: {
    language: 'JavaScript',
    technology: ['Node.js'],
  },
  links: { repoUrl: 'https://github.com/asyncapi/circular-tool' },
};

const automatedToolsT12 = {
  category1: {
    description: 'Category 1',
    toolsList: [circularTool],
  },
};

module.exports = {
  expectedDataT1,
  manualToolsWithMissingData,
  manualToolsToSort,
  automatedToolsT5,
  automatedToolsT4,
  manualToolsT4,
  automatedToolsT6,
  automatedToolsT7,
  automatedToolsT8,
  manualToolsT8,
  automatedToolsT9,
  manualToolsT9,
  circularTool,
  automatedToolsT12,
  invalidAutomatedToolsT10,
  manualToolsWithInvalidURLT11,
};
