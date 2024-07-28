const fs = require('fs');
const path = require('path');
const { combineTools } = require('../../scripts/tools/combine-tools');
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// Mock dependencies
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

jest.mock('../../scripts/tools/tools-object', () => ({
  createToolObject: jest.fn((tool, _, __, isAsyncAPIrepo) => {
    return { ...tool, isAsyncAPIrepo };
  })
}));

const ajv = new Ajv();
addFormats(ajv, ["uri"]);

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
    // Clean up by removing the created files
    if (fs.existsSync(toolsPath)) fs.unlinkSync(toolsPath);
    if (fs.existsSync(tagsPath)) fs.unlinkSync(tagsPath);
  });

  test('should combine tools and create correct JSON files', async () => {
    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);

    // Verify toolsPath file exists and has correct content
    const combinedTools = readJSON(toolsPath);
    expect(combinedTools).toHaveProperty('category1');

    // Verify tagsPath file exists and has correct content
    const tagsData = readJSON(tagsPath);
    expect(tagsData).toHaveProperty('languages');
    expect(tagsData).toHaveProperty('technologies');
    expect(tagsData.languages).toContainEqual({
      name: 'JavaScript',
      color: 'bg-[#57f281]',
      borderColor: 'border-[#37f069]'
    });
    expect(tagsData.languages).toContainEqual({
      name: 'Python',
      color: 'bg-[#3572A5]',
      borderColor: 'border-[#3572A5]'
    });
    expect(tagsData.technologies).toContainEqual({
      name: 'Node.js',
      color: 'bg-[#61d0f2]',
      borderColor: 'border-[#40ccf7]'
    });
    expect(tagsData.technologies).toContainEqual({
      name: 'Flask',
      color: 'bg-[#000000]',
      borderColor: 'border-[#FFFFFF]'
    });
  });

  test('should handle tools with missing language or technology', async () => {
    const manualToolsWithMissingData = [
      {
        title: 'Tool C',
        filters: {},
        links: { repoUrl: 'https://github.com/asyncapi/tool-c' }
      }
    ];

    await combineTools({}, manualToolsWithMissingData, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    expect(combinedTools).toHaveProperty('category1');
  });

  test('should validate manual tools and skip invalid ones', async () => {
    const invalidManualTools = [
      {
        title: 'Invalid Tool',
        filters: {
          language: 'Invalid Language'
        },
        links: {}
      }
    ];

    await combineTools({}, invalidManualTools, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    expect(combinedTools).toHaveProperty('category1');
  });


  test('should sort tools alphabetically by title', async () => {
    const manualToolsToSort = {
      category1: {
        description: 'Sample Category',
        toolsList: [
          {
            title: 'Tool Z',
            filters: { language: 'JavaScript' },
            links: { repoUrl: 'https://github.com/asyncapi/tool-z' }
          },
          {
            title: 'Tool A',
            filters: { language: 'Python' },
            links: { repoUrl: 'https://github.com/asyncapi/tool-a' }
          }
        ]
      }
    };

    await combineTools(manualToolsToSort, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const toolTitles = combinedTools.category1.toolsList.map(tool => tool.title);
    expect(toolTitles).toEqual(['Tool A', 'Tool Z']);
  });

});
