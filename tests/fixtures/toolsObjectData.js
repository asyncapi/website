const mockData = {
  items: [
    {
      name: '.asyncapi-tool-example',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=61855e7365a881e98c2fe667a658a0005753d873',
      repository: {
        full_name: 'asyncapi/example-repo',
        html_url: 'https://github.com/asyncapi/example-repo',
        description: 'Example repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    }
  ]
};

const mockToolFileContent = `
  title: Example Tool
  description: This is an example tool.
  links:
    repoUrl: https://github.com/asyncapi/example-repo
  filters:
    categories:
      - Category1
    hasCommercial: true
  `;

const toolFileT1 = {
  title: 'Example Tool',
  description: 'This is an example tool.',
  links: {
    repoUrl: 'https://github.com/asyncapi/example-repo'
  },
  filters: {
    categories: ['Category1'],
    hasCommercial: true
  }
};

const expectedObjectT1 = {
  title: 'Example Tool',
  description: 'This is an example tool.',
  links: {
    repoUrl: 'https://github.com/asyncapi/example-repo'
  },
  filters: {
    categories: ['Category1'],
    hasCommercial: true,
    isAsyncAPIOwner: true
  }
};

const repositoryUrl = 'https://github.com/asyncapi/example-repo';
const repoDescription = 'Example repository';
const isAsyncAPIrepo = true;

const toolFileT2 = {
  title: 'Example Tool',
  links: {
    repoUrl: 'https://github.com/asyncapi/example-repo'
  },
  filters: {
    categories: ['Category1']
  }
};

const expectedObjectT2 = {
  title: 'Example Tool',
  description: 'Example repository',
  links: {
    repoUrl: 'https://github.com/asyncapi/example-repo'
  },
  filters: {
    categories: ['Category1'],
    hasCommercial: false,
    isAsyncAPIOwner: true
  }
};

const expectedObjectT3 = {
  Category1: {
    description: 'Description for Category1',
    toolsList: [
      {
        title: 'Example Tool',
        description: 'This is an example tool.',
        links: {
          repoUrl: 'https://github.com/asyncapi/example-repo'
        },
        filters: {
          categories: ['Category1'],
          hasCommercial: true,
          isAsyncAPIOwner: true
        }
      }
    ]
  },
  Others: {
    description: 'Other tools category',
    toolsList: []
  }
};

const dataWithUnknownCategory = {
  items: [
    {
      name: '.asyncapi-tool-unknown',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=61855e7365a881e98c2fe667a658a0005753d873',
      repository: {
        full_name: 'asyncapi/unknown-repo',
        html_url: 'https://github.com/asyncapi/unknown-repo',
        description: 'Unknown repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    }
  ]
};

const toolFileContent = `
  title: Unknown Tool
  description: This tool has an unknown category.
  links:
    repoUrl: https://github.com/asyncapi/unknown-repo
  filters:
    categories:
      - UnknownCategory
  `;

const invalidToolFileContent = `
  title: Invalid Tool
  description: This tool has invalid schema.
  links:
    repoUrl: https://github.com/asyncapi/invalid-repo
  filters:
    categories:
      - Category1
    invalidField: true
  `;

const invalidToolData = {
  items: [
    {
      name: '.asyncapi-tool-invalid',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=invalidref',
      repository: {
        full_name: 'asyncapi/invalid-repo',
        html_url: 'https://github.com/asyncapi/invalid-repo',
        description: 'Invalid repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    }
  ]
};

const duplicateToolData = {
  items: [
    {
      name: '.asyncapi-tool-duplicate',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=duplicate1',
      repository: {
        full_name: 'asyncapi/duplicate-repo',
        html_url: 'https://github.com/asyncapi/duplicate-repo',
        description: 'Duplicate repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    },
    {
      name: '.asyncapi-tool-duplicate',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=duplicate2',
      repository: {
        full_name: 'asyncapi/duplicate-repo',
        html_url: 'https://github.com/asyncapi/duplicate-repo',
        description: 'Duplicate repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    }
  ]
};

const duplicateToolFileContent = `
  title: Duplicate Tool
  description: This is a duplicate tool.
  links:
    repoUrl: https://github.com/asyncapi/duplicate-repo
  filters:
    categories:
      - Category1
  `;

const dataWithUnknownCategoryOnce = {
  items: [
    {
      name: '.asyncapi-tool-unknown',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=unknown1',
      repository: {
        full_name: 'asyncapi/unknown-repo',
        html_url: 'https://github.com/asyncapi/unknown-repo',
        description: 'Unknown repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    },
    {
      name: '.asyncapi-tool-unknown',
      url: 'https://api.github.com/repositories/351453552/contents/.asyncapi-tool?ref=unknown2',
      repository: {
        full_name: 'asyncapi/unknown-repo',
        html_url: 'https://github.com/asyncapi/unknown-repo',
        description: 'Unknown repository',
        owner: {
          login: 'asyncapi'
        }
      },
      path: '.asyncapi-tool'
    }
  ]
};

const unknownToolFileContent = `
  title: Unknown Tool
  description: This tool has an unknown category.
  links:
    repoUrl: https://github.com/asyncapi/unknown-repo
  filters:
    categories:
      - UnknownCategory
  `;

// New Fixtures for Error Handling Tests
const toolFileMalformedJSON = `
  title: Malformed Tool
  description: This tool has malformed JSON.
  links:
    repoUrl: https://github.com/asyncapi/malformed-repo
  filters
    categories:
      - Category1
  `;

module.exports = {
  mockData,
  mockToolFileContent,
  toolFileT1,
  expectedObjectT1,
  repoDescription,
  repositoryUrl,
  isAsyncAPIrepo,
  toolFileT2,
  expectedObjectT2,
  expectedObjectT3,
  dataWithUnknownCategory,
  toolFileContent,
  invalidToolFileContent,
  invalidToolData,
  duplicateToolData,
  duplicateToolFileContent,
  dataWithUnknownCategoryOnce,
  unknownToolFileContent,
  toolFileMalformedJSON,
}