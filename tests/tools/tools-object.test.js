const { convertTools, createToolObject } = require('../../scripts/tools/tools-object');
const axios = require('axios');

jest.mock('axios');

jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'Category1', tag: 'Category1', description: 'Description for Category1' },
    { name: 'Others', tag: 'Others', description: 'Other tools category' },
  ]
}));

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

describe('Tools Object', () => {
  
  beforeEach(() => {
    axios.get.mockClear();
    console.error = jest.fn();
  });

  it('should create a tool object with provided parameters', async () => {
    const toolFile = {
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
    const repositoryUrl = 'https://github.com/asyncapi/example-repo';
    const repoDescription = 'Example repository';
    const isAsyncAPIrepo = true;

    const expectedObject = {
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

    const result = await createToolObject(toolFile, repositoryUrl, repoDescription, isAsyncAPIrepo);
    expect(result).toEqual(expectedObject);
  });

  it('should use repoDescription when toolFile.description is not provided', async () => {
    const toolFile = {
      title: 'Example Tool',
      links: {
        repoUrl: 'https://github.com/asyncapi/example-repo'
      },
      filters: {
        categories: ['Category1']
      }
    };
    const repositoryUrl = 'https://github.com/asyncapi/example-repo';
    const repoDescription = 'Example repository';
    const isAsyncAPIrepo = true;

    const expectedObject = {
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

    const result = await createToolObject(toolFile, repositoryUrl, repoDescription, isAsyncAPIrepo);
    expect(result).toEqual(expectedObject);
  });

  it('should convert tools data correctly', async () => {
    axios.get.mockResolvedValue({ data: mockToolFileContent });

    const result = await convertTools(mockData);

    const expectedObject = {
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

    expect(result).toEqual(expect.objectContaining(expectedObject));
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should assign tool to Others category if no matching category is found', async () => {
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

    axios.get.mockResolvedValue({ data: toolFileContent });

    const result = await convertTools(dataWithUnknownCategory);

    expect(result.Others.toolsList).toHaveLength(1);
    expect(result.Others.toolsList[0].title).toBe('Unknown Tool');
  });

  it('should throw an error if axios.get fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(convertTools(mockData)).rejects.toThrow('Network Error');
  });

  it('should log errors for invalid .asyncapi-tool file', async () => {
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

    axios.get.mockResolvedValue({ data: invalidToolFileContent });

    await convertTools(invalidToolData);

    console.log('All console.error calls:', console.error.mock.calls);

    const allErrorMessages = console.error.mock.calls.flat();
    expect(allErrorMessages).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Script is not failing, it is just dropping errors for further investigation'),
        expect.stringContaining('Invalid .asyncapi-tool file'),
        expect.stringContaining('Located in:'),
        expect.stringContaining('Validation errors:')
      ])
    );

  });

  it('should add duplicate tool objects to the same category', async () => {
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

    axios.get.mockResolvedValue({ data: duplicateToolFileContent });

    const result = await convertTools(duplicateToolData);

    expect(result.Category1.toolsList).toHaveLength(2);
    expect(result.Category1.toolsList[0].title).toBe('Duplicate Tool');
    expect(result.Category1.toolsList[1].title).toBe('Duplicate Tool');
  });

  it('should add tool to Others category only once', async () => {
    const dataWithUnknownCategory = {
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

    axios.get.mockResolvedValue({ data: unknownToolFileContent });

    const result = await convertTools(dataWithUnknownCategory);

    const uniqueTools = result.Others.toolsList.filter((tool, index, self) =>
      index === self.findIndex((t) => t.title === tool.title)
    );

    expect(uniqueTools).toHaveLength(1);
    expect(uniqueTools[0].title).toBe('Unknown Tool');
  });
});

