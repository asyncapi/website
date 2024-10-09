const { convertTools, createToolObject } = require('../../scripts/tools/tools-object');
const axios = require('axios');

const { mockData,
  mockToolFileContent,
  toolFileT1,
  expectedObjectT1,
  repoDescription,
  repositoryUrl,
  isAsyncAPIOwner,
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
} = require("../fixtures/toolsObjectData")

jest.mock('axios');

jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'Category1', tag: 'Category1', description: 'Description for Category1' },
    { name: 'Others', tag: 'Others', description: 'Other tools category' },
  ]
}));

describe('Tools Object', () => {

  beforeEach(() => {
    axios.get.mockClear();
    console.error = jest.fn();
  });

  it('should create a tool object with provided parameters', async () => {

    const result = await createToolObject(toolFileT1, repositoryUrl, repoDescription, isAsyncAPIOwner);
    expect(result).toEqual(expectedObjectT1);
  });

  it('should use repoDescription when toolFile.description is not provided', async () => {

    const result = await createToolObject(toolFileT2, repositoryUrl, repoDescription, isAsyncAPIOwner);
    expect(result).toEqual(expectedObjectT2);
  });

  it('should convert tools data correctly', async () => {
    axios.get.mockResolvedValue({ data: mockToolFileContent });

    const result = await convertTools(mockData);

    expect(result).toEqual(expect.objectContaining(expectedObjectT3));
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should assign tool to Others category if no matching category is found', async () => {

    axios.get.mockResolvedValue({ data: toolFileContent });

    const result = await convertTools(dataWithUnknownCategory);

    expect(result.Others.toolsList).toHaveLength(1);
    expect(result.Others.toolsList[0].title).toBe('Unknown Tool');
  });

  it('should log errors for invalid .asyncapi-tool file', async () => {

    axios.get.mockResolvedValue({ data: invalidToolFileContent });

    let error;
    try {
      await convertTools(invalidToolData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeUndefined();

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

    axios.get.mockResolvedValue({ data: duplicateToolFileContent });

    const result = await convertTools(duplicateToolData);

    expect(result.Category1.toolsList).toHaveLength(2);
    expect(result.Category1.toolsList[0].title).toBe('Duplicate Tool');
    expect(result.Category1.toolsList[1].title).toBe('Duplicate Tool');
  });

  it('should add tool to Others category only once', async () => {

    axios.get.mockResolvedValue({ data: unknownToolFileContent });

    const result = await convertTools(dataWithUnknownCategoryOnce);

    const uniqueTools = result.Others.toolsList.filter((tool, index, self) =>
      index === self.findIndex((t) => t.title === tool.title)
    );

    expect(uniqueTools).toHaveLength(1);
    expect(uniqueTools[0].title).toBe('Unknown Tool');
  });

  it('should throw an error if axios.get fails', async () => {
    let error;
    axios.get.mockRejectedValue(new Error('Network Error'));

    try {
      await convertTools(mockData)
    } catch (err) {
      error = err;
      expect(err.message).toContain("Network Error")
    }
    expect(error).toBeDefined();
  });

  it('should handle malformed JSON in tool file', async () => {
    axios.get.mockResolvedValue({ data: toolFileMalformedJSON });

    let error;
    try {
      await convertTools(mockData);
    } catch (err) {
      error = err;
      expect(err.message).toContain('Unexpected token');
    }

    expect(error).toBeDefined();
  });

});