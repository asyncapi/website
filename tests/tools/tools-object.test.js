import axios from 'axios';
import { convertTools, createToolObject } from '../../scripts/tools/tools-object.ts';
import {
  createToolFileContent,
  createExpectedToolObject,
  createMockData,
  createMalformedYAML
} from '../helper/toolsObjectData';

const { logger } = require('../../scripts/utils/logger.ts');

jest.mock('../../scripts/utils/logger', () => ({
  logger: { warn: jest.fn(), error: jest.fn() }
}));

jest.mock('axios');
jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'Category1', tag: 'Category1', description: 'Description for Category1' },
    { name: 'Others', tag: 'Others', description: 'Other tools category' }
  ]
}));

describe('Tools Object', () => {
  beforeEach(() => {
    axios.get.mockClear();
    console.error = jest.fn();
  });

  const mockToolData = (toolContent, toolNames = ['valid-tool']) => {
    const mockData = createMockData(toolNames.map((name) => ({ name: `.asyncapi-tool-${name}`, repoName: name })));
    axios.get.mockResolvedValue({ data: toolContent });
    return mockData;
  };

  it('should create a tool object with provided parameters', async () => {
    const toolFile = createToolFileContent({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    });

    const expected = createExpectedToolObject({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    });

    const result = await createToolObject(toolFile, expected.links.repoUrl, 'Repository Description', true);

    expect(result).toEqual(expected);
  });
  it('should create a tool object one parameters', async () => {
    // We will pass only the first parameter in the createToolObject
    const toolFile = createToolFileContent({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    });

    const expected = createExpectedToolObject({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    });
    expected.filters.isAsyncAPIOwner = '';
    const result = await createToolObject(toolFile);
    expect(result).toEqual(expected);
  });

  it('should convert tools data correctly', async () => {
    const toolContent = createToolFileContent({ title: 'Valid Tool', categories: ['Category1'] });
    const mockData = mockToolData(toolContent);

    const result = await convertTools(mockData);

    expect(result.Category1.toolsList).toHaveLength(1);
    expect(result.Category1.toolsList[0].title).toBe('Valid Tool');
  });

  it('should assign tool to Others category if no matching category is found', async () => {
    const toolContent = createToolFileContent({ title: 'Unknown Category Tool', categories: ['UnknownCategory'] });
    const mockData = mockToolData(toolContent);

    const result = await convertTools(mockData);

    expect(result.Others.toolsList).toHaveLength(1);
    expect(result.Others.toolsList[0].title).toBe('Unknown Category Tool');
  });

  it('should log errors for invalid .asyncapi-tool file', async () => {
    const invalidContent = createToolFileContent({
      title: 'Invalid Tool',
      additionalFilters: { invalidField: true }
    });
    const mockData = mockToolData(invalidContent);

    await convertTools(mockData);

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'Script is not failing, it is just dropping errors for further investigation.\nInvalid .asyncapi-tool file.'
      )
    );
  });

  it('should add duplicate tool objects to the same category', async () => {
    const toolContent = createToolFileContent({
      title: 'Duplicate Tool',
      categories: ['Category1']
    });

    const mockData = createMockData([
      { name: '.asyncapi-tool-dup1', repoName: 'dup1' },
      { name: '.asyncapi-tool-dup2', repoName: 'dup2' }
    ]);

    axios.get.mockResolvedValue({ data: toolContent });

    const result = await convertTools(mockData);

    expect(result.Category1.toolsList).toHaveLength(2);
    expect(result.Category1.toolsList[0].title).toBe('Duplicate Tool');
    expect(result.Category1.toolsList[1].title).toBe('Duplicate Tool');
  });

  it('should add tool to Others category only once', async () => {
    const toolContent = createToolFileContent({
      title: 'Duplicate Tool in Others',
      categories: ['UnknownCategory']
    });

    const mockData = mockToolData(toolContent);

    const result = await convertTools(mockData);

    expect(result.Others.toolsList).toHaveLength(1);
    expect(result.Others.toolsList[0].title).toBe('Duplicate Tool in Others');
  });

  it('should throw an error if axios.get fails', async () => {
    const mockData = createMockData([
      {
        name: '.asyncapi-tool-error',
        repoName: 'error-tool'
      }
    ]);

    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(convertTools(mockData)).rejects.toThrow('Network Error');
  });

  it('should handle malformed JSON in tool file', async () => {
    const malformedContent = createMalformedYAML();
    await expect(convertTools(malformedContent)).rejects.toThrow();
  });

  it('should use repository description when tool description is missing', async () => {
    const toolFile = createToolFileContent({
      title: 'No Description Tool',
      description: ''
    });

    const repositoryDescription = 'Fallback Repository Description';
    const mockData = createMockData([
      {
        name: '.asyncapi-tool-no-description',
        repoName: 'no-description',
        description: repositoryDescription
      }
    ]);

    axios.get.mockResolvedValue({ data: toolFile });

    const result = await convertTools(mockData);

    const toolObject = result.Category1.toolsList[0];

    expect(toolObject.description).toBe(repositoryDescription);
    expect(toolObject.title).toBe('No Description Tool');
  });

  it('should throw a generic error when the error object is not an Error instance', async () => {
    const mockData = createMockData([
      {
        name: '.asyncapi-tool-error',
        repoName: 'error-tool'
      }
    ]);

    // Mock axios.get to throw a non-Error object
    axios.get.mockImplementation(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'This is a string error, not an Error object';
    });

    await expect(convertTools(mockData)).rejects.toThrow('An unexpected error occurred');
  });
});
