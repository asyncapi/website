const fs = require('fs');
const path = require('path');
const { combineTools } = require('../../scripts/tools/combine-tools');
const {
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
  automatedToolsT12,
  invalidAutomatedToolsT10,
  manualToolsWithInvalidURLT11,
  circularTool
} = require('../fixtures/combineToolsData');

jest.mock('ajv', () => {
  return jest.fn().mockImplementation(() => ({
    compile: jest.fn().mockImplementation(() => (data) => data.title !== 'Invalid Tool'),
  }));
});


jest.mock('ajv-formats', () => {
  return jest.fn();
});

jest.mock('../../scripts/tools/tags-color', () => ({
  languagesColor: [
    { name: 'JavaScript', color: 'bg-[#57f281]', borderColor: 'border-[#37f069]' },
    { name: 'Python', color: 'bg-[#3572A5]', borderColor: 'border-[#3572A5]' }
  ],
  technologiesColor: [
    { name: 'Node.js', color: 'bg-[#61d0f2]', borderColor: 'border-[#40ccf7]' },
    { name: 'Flask', color: 'bg-[#000000]', borderColor: 'border-[#FFFFFF]' }
  ]
}));

jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'category1', description: 'Sample Category 1' },
    { name: 'category2', description: 'Sample Category 2' }
  ]
}));

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

describe('combineTools function', () => {
  const toolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tools.json');
  const tagsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tags.json');
  const manualToolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'manual-tools.json');
  const automatedToolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'automated-tools.json');

  let manualTools;
  let automatedTools;

  beforeAll(() => {
    manualTools = readJSON(manualToolsPath);
    automatedTools = readJSON(automatedToolsPath);

  });

  afterAll(() => {
    if (fs.existsSync(toolsPath)) fs.unlinkSync(toolsPath);
    if (fs.existsSync(tagsPath)) fs.unlinkSync(tagsPath);
  });

  it('should combine tools and create correct JSON files', async () => {
    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    expect(combinedTools).toHaveProperty('category1');

    const tagsData = readJSON(tagsPath);
    expect(tagsData).toHaveProperty('languages');
    expect(tagsData).toHaveProperty('technologies');
    expect(tagsData).toEqual(expectedDataT1)
  });

  it('should handle tools with missing language or technology', async () => {

    await combineTools({}, manualToolsWithMissingData, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    expect(combinedTools).toHaveProperty('category1');
  });

  it('should sort tools alphabetically by title', async () => {

    await combineTools(manualToolsToSort, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const toolTitles = combinedTools.category1.toolsList.map(tool => tool.title);
    expect(toolTitles).toEqual(['Tool A', 'Tool Z']);
  });

  it('should log validation errors to console.error', async () => {

    let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });

    await combineTools(automatedToolsT4, manualToolsT4, toolsPath, tagsPath);

    const errorCalls = console.error.mock.calls;

    expect(errorCalls[0][0]).toBe('Script is not failing, it is just dropping errors for further investigation');
    expect(errorCalls[1][0]).toBe('Invalid Invalid Tool .asyncapi-tool file.');
    expect(errorCalls[2][0]).toBe('Located in manual-tools.json file');
    expect(errorCalls[3][0]).toEqual(expect.stringContaining('Validation errors:'));

    expect(fs.existsSync(toolsPath)).toBe(true);
    expect(fs.existsSync(tagsPath)).toBe(true);

    consoleErrorMock.mockRestore();
  });

  it('should handle tools with multiple languages, including new ones', async () => {

    await combineTools(automatedToolsT5, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const tool = combinedTools.category1.toolsList[0];

    expect(tool.filters.language).toHaveLength(3);
    expect(tool.filters.language).toContainEqual(expect.objectContaining({ name: 'JavaScript' }));
    expect(tool.filters.language).toContainEqual(expect.objectContaining({ name: 'Python' }));
    expect(tool.filters.language).toContainEqual(expect.objectContaining({ name: 'NewLanguage' }));

    const tagsData = readJSON(tagsPath);
    expect(tagsData.languages).toContainEqual(expect.objectContaining({ name: 'NewLanguage' }));
  });

  it('should add a new language and technology when not found in the existing lists', async () => {

    await combineTools(automatedToolsT6, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const tool = combinedTools.category1.toolsList[0];

    expect(tool.filters.language).toHaveLength(1);
    expect(tool.filters.language).toContainEqual(expect.objectContaining({ name: 'NewLanguage' }));

    expect(tool.filters.technology).toHaveLength(1);
    expect(tool.filters.technology).toContainEqual(expect.objectContaining({ name: 'NewTechnology' }));

    const tagsData = readJSON(tagsPath);
    expect(tagsData.languages).toContainEqual({
      name: 'NewLanguage',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]'
    });
    expect(tagsData.technologies).toContainEqual({
      name: 'NewTechnology',
      color: 'bg-[#61d0f2]',
      borderColor: 'border-[#40ccf7]'
    });
  });

  it('should add a new language when it is not found in the existing languages list', async () => {

    await combineTools(automatedToolsT7, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const tool = combinedTools.category1.toolsList[0];

    expect(tool.filters.language).toHaveLength(1);
    expect(tool.filters.language).toContainEqual(expect.objectContaining({ name: 'Go' }));

    const tagsData = readJSON(tagsPath);
    expect(tagsData.languages).toContainEqual({
      name: 'Go',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]'
    });
  });

  it('should handle valid tool objects', async () => {

    await combineTools(automatedToolsT8, manualToolsT8, toolsPath, tagsPath);


    const tagsData = readJSON(tagsPath);
    expect(tagsData.languages).toContainEqual({
      name: 'JavaScript',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]'
    });
    expect(tagsData.technologies).toContainEqual({
      name: 'Node.js',
      color: 'bg-[#61d0f2]',
      borderColor: 'border-[#40ccf7]'
    });
  });

  it('should handle tool objects without repoUrl', async () => {

    await combineTools(automatedToolsT9, manualToolsT9, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const tool = combinedTools.category1.toolsList[0];

    expect(tool.isAsyncAPIrepo).toBeUndefined();
  });

  it('should throw an error when fs.writeFileSync fails', async () => {
    let error;
    let invalidPath = "this/is/not/valid"

    try {
      await combineTools(automatedTools, manualTools, invalidPath, invalidPath);
    } catch (err) {
      error = err;
      expect(err.message).toMatch(/ENOENT|EACCES/);
    }
    expect(error).toBeDefined();
  });

  it('should throw an error when there is an invalid category', async () => {
    let error;

    try {
      await combineTools(invalidAutomatedToolsT10, manualTools, toolsPath, tagsPath);
    } catch (err) {
      error = err;
      expect(err.message).toContain('Error combining tools');
    }
    expect(error).toBeDefined();
  });

  it('should throw an error when URL parsing fails', async () => {
    let error;

    try {
      await combineTools(automatedTools, manualToolsWithInvalidURLT11, toolsPath, tagsPath);
    } catch (err) {
      error = err;
      expect(err.message).toContain('Invalid URL');
    }
    expect(error).toBeDefined();
  });

  it('should handle errors when processing tools with circular references', async () => {
    let error;
    circularTool.circular = circularTool;

    try {
      await combineTools(automatedToolsT12, {}, toolsPath, tagsPath);
    } catch (err) {
      error = err;
      expect(err.message).toContain('Converting circular structure to JSON');
    }
    expect(error).toBeDefined();
  });
  
});
