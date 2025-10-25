import axios from 'axios';

import type { AsyncAPITool, Category } from '@/types/scripts/tools';

import { logger } from '../../scripts/helpers/logger';
import { convertTools, createToolObject } from '../../scripts/tools/tools-object';
import {
  createExpectedToolObject,
  createMalformedYAML,
  createMockData,
  createToolFileContent
} from '../helper/toolsObjectData';

jest.mock('../../scripts/helpers/logger.ts', () => ({
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
  const axiosMock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    axiosMock.get.mockClear();
  });

  const mockToolData = (toolContent: AsyncAPITool, toolNames = ['valid-tool']) => {
    const mockData = createMockData(toolNames.map((name) => ({ name: `.asyncapi-tool-${name}`, repoName: name })));

    axiosMock.get.mockResolvedValue({ data: toolContent });

    return mockData;
  };

  it('should create a tool object with provided parameters', async () => {
    const toolFile = createToolFileContent({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    }) as AsyncAPITool;

    const expected = createExpectedToolObject({
      title: 'Test Tool',
      description: 'Test Description',
      hasCommercial: true,
      additionalLinks: { docsUrl: 'https://docs.example.com' }
    });

    const result = await createToolObject(toolFile, expected.links!.repoUrl, 'Repository Description', true);

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

    // @ts-ignore, ignore the error for wrong data type

    expected.filters.isAsyncAPIOwner = false;
    const result = await createToolObject(toolFile);

    expect(result).toEqual(expected);
  });

  it('should convert tools data correctly', async () => {
    const toolContent = createToolFileContent({
      title: 'Valid Tool',
      categories: ['Category1' as unknown as Category]
    });
    const mockData = mockToolData(toolContent);

    const result = await convertTools(mockData);

    expect(result.Category1.toolsList).toHaveLength(1);
    expect(result.Category1.toolsList[0].title).toBe('Valid Tool');
  });

  it('should assign tool to Others category if no matching category is found', async () => {
    // @ts-ignore, ignore the error for unknown category
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
      categories: ['Category1' as unknown as Category]
    });

    const mockData = createMockData([
      { name: '.asyncapi-tool-dup1', repoName: 'dup1' },
      { name: '.asyncapi-tool-dup2', repoName: 'dup2' }
    ] as Array<{ name: string; repoName: string }>);

    axiosMock.get.mockResolvedValue({ data: toolContent });

    const result = await convertTools(mockData);

    expect(result.Category1.toolsList).toHaveLength(2);
    expect(result.Category1.toolsList[0].title).toBe('Duplicate Tool');
    expect(result.Category1.toolsList[1].title).toBe('Duplicate Tool');
  });

  it('should add tool to Others category only once', async () => {
    const toolContent = createToolFileContent({
      title: 'Duplicate Tool in Others',
      // @ts-ignore, ignore the error for unknown category
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

    axiosMock.get.mockRejectedValue(new Error('Network Error'));

    await expect(convertTools(mockData)).rejects.toThrow('Network Error');
  });

  it('should handle malformed JSON in tool file', async () => {
    const malformedContent = createMalformedYAML();

    // @ts-ignore, ignore the error for wrong data type

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

    axiosMock.get.mockResolvedValue({ data: toolFile });

    const result = await convertTools(mockData);

    const toolObject = result.Category1.toolsList[0];

    expect(toolObject.description).toBe(repositoryDescription);
    expect(toolObject.title).toBe('No Description Tool');
  });

  it('should skip files that do not start with .asyncapi-tool', async () => {
    const mockData = createMockData([{ name: 'not-asyncapi-tool', repoName: 'non-tool-repo' }]);

    const result = await convertTools(mockData);

    // Check that no tools were added to any category
    expect(result.Category1.toolsList).toHaveLength(0);
    expect(result.Others.toolsList).toHaveLength(0);
  });

  it('should not add the same tool object to the same category twice when a tool lists the same category multiple times', async () => {
    // Create a tool with duplicate categories
    const toolContent = createToolFileContent({
      title: 'Duplicate Category Tool',
      categories: ['Category1', 'Category1'] as unknown as Category[] // Same category listed twice
    });

    const mockData = mockToolData(toolContent);

    const result = await convertTools(mockData);

    // Even though Category1 is listed twice in the tool's categories,
    // the tool should only be added once to that category
    expect(result.Category1.toolsList).toHaveLength(1);
    expect(result.Category1.toolsList[0].title).toBe('Duplicate Category Tool');
  });
});
