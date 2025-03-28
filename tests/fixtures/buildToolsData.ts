const tagsData = {
  languages: [
    { name: 'JavaScript', color: 'bg-[#f1e05a]', borderColor: 'border-[#f1e05a]' },
    { name: 'Python', color: 'bg-[#3572A5]', borderColor: 'border-[#3572A5]' }
  ],
  technologies: [
    { name: 'React', color: 'bg-[#61dafb]', borderColor: 'border-[#61dafb]' },
    { name: 'Node.js', color: 'bg-[#68a063]', borderColor: 'border-[#68a063]' }
  ]
};

const manualTools = [
  {
    title: 'Manual Tool 1',
    description: 'Description for manual tool 1',
    links: { repoUrl: 'https://github.com/manual/tool1' },
    filters: { categories: ['Category1'], language: 'JavaScript', technology: ['React'] }
  },
  {
    title: 'Manual Tool 2',
    description: 'Description for manual tool 2',
    links: { repoUrl: 'https://github.com/manual/tool2' },
    filters: { categories: ['Category2'], language: 'Python', technology: ['Node.js'] }
  }
];

const mockConvertedData = {
  Category1: {
    description: 'Description for Category1',
    toolsList: [
      {
        title: 'Tool 1',
        description: 'Description for tool 1',
        links: { repoUrl: 'https://github.com/tool1' },
        filters: { categories: ['Category1'], language: 'JavaScript', technology: ['React'] }
      }
    ]
  },
  Category2: {
    description: 'Description for Category2',
    toolsList: [
      {
        title: 'Tool 2',
        description: 'Description for tool 2',
        links: { repoUrl: 'https://github.com/tool2' },
        filters: { categories: ['Category2'], language: 'Python', technology: ['Node.js'] }
      }
    ]
  }
};

const mockExtractData = {
  items: [
    {
      name: '.asyncapi-tool',
      url: 'https://api.github.com/repositories/123456/contents/.asyncapi-tool?ref=abcdef',
      repository: {
        full_name: 'user/repo1',
        html_url: 'https://github.com/user/repo1',
        description: 'Description for repo1',
        owner: { login: 'asyncapi' }
      },
      path: '.asyncapi-tool'
    },
    {
      name: '.asyncapi-tool',
      url: 'https://api.github.com/repositories/789012/contents/.asyncapi-tool?ref=ghijkl',
      repository: {
        full_name: 'user/repo2',
        html_url: 'https://github.com/user/repo2',
        description: 'Description for repo2',
        owner: { login: 'asyncapi' }
      },
      path: '.asyncapi-tool'
    }
  ]
};

export { manualTools, mockConvertedData, mockExtractData, tagsData };
