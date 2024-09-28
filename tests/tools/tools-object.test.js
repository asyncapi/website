const { convertTools, createToolObject } = require('../../scripts/tools/tools-object');
const axios = require('axios');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const schema = require('../../scripts/tools/tools-schema.json');

// Mock axios
jest.mock('axios');

// Mock categoryList to include 'Category1' and 'Others'
jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'Category1', tag: 'Category1', description: 'Description for Category1' },
    { name: 'Others', tag: 'Others', description: 'Other tools category' },
  ]
}));

const { categoryList } = require('../../scripts/tools/categorylist');

// Setup AJV
const ajv = new Ajv();
addFormats(ajv, ["uri"]);
const validate = ajv.compile(schema);

// Sample data
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

describe('createToolObject', () => {
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
});

describe('convertTools', () => {
  beforeEach(() => {
    axios.get.mockClear();
    console.error = jest.fn();
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
});

