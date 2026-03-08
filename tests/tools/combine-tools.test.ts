import type { JSONSchemaType } from 'ajv';
import fs from 'fs';
import path from 'path';

import type { AsyncAPITool } from '@/types/scripts/tools';

import { logger } from '../../scripts/helpers/logger';
import { combineTools, getFinalTool, shouldIgnoreTool } from '../../scripts/tools/combine-tools';
import {
  automatedToolsForIgnore,
  automatedToolsT4,
  automatedToolsT5,
  automatedToolsT6,
  automatedToolsT7,
  automatedToolsT8,
  automatedToolsT9,
  automatedToolsT12,
  circularTool,
  expectedDataT1,
  finalToolWithMissingData,
  ignoreByRepoUrlOnly,
  ignoreByRepoUrlWithCategoryScope,
  ignoreByTitleAndRepo,
  ignoreByTitleOnly,
  ignoreManualTool,
  ignoreWithCategoryScope,
  invalidAutomatedToolsT10,
  manualToolsForIgnore,
  manualToolsT4,
  manualToolsT8,
  manualToolsT9,
  manualToolsToSort,
  manualToolsWithInvalidURLT11,
  manualToolsWithMissingData
} from '../fixtures/combineToolsData';

jest.mock('../../scripts/helpers/logger', () => ({
  logger: { error: jest.fn(), info: jest.fn() }
}));

jest.mock('ajv', () => {
  return jest.fn().mockImplementation(() => ({
    compile: jest.fn().mockImplementation(() => (data: JSONSchemaType<any>) => data.title !== 'Invalid Tool')
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

const readJSON = (filePath: string) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

describe('combineTools function', () => {
  const toolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tools.json');
  const tagsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tags.json');
  const manualToolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'manual-tools.json');
  const automatedToolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'automated-tools.json');

  let manualTools: Record<string, any>;
  let automatedTools: Record<string, any>;
  let consoleErrorMock: jest.SpyInstance;
  const loggerErrorMock: jest.SpyInstance = jest.spyOn(logger, 'error');

  beforeAll(() => {
    manualTools = readJSON(manualToolsPath);
    automatedTools = readJSON(automatedToolsPath);
  });

  afterAll(() => {
    if (fs.existsSync(toolsPath)) fs.unlinkSync(toolsPath);
    if (fs.existsSync(tagsPath)) fs.unlinkSync(tagsPath);

    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should combine tools and create correct JSON files', async () => {
    await combineTools(automatedTools, manualTools, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);

    expect(combinedTools).toHaveProperty('category1');

    const tagsData = readJSON(tagsPath);

    expect(tagsData).toHaveProperty('languages');
    expect(tagsData).toHaveProperty('technologies');
    expect(tagsData).toEqual(expectedDataT1);
  });

  it('should handle tools with missing language or technology', async () => {
    await combineTools({}, manualToolsWithMissingData, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);

    expect(combinedTools).toHaveProperty('category1');
  });

  it('should throw an error when tools are passed as an array instead of object', async () => {
    const toolsArray = [
      {
        title: 'Array Tool',
        filters: {
          categories: [{ name: 'category1', description: 'Sample Category 1' }],
          language: [],
          technology: []
        },
        links: { repoUrl: 'https://example.com' }
      }
    ];

    // @ts-expect-error - Intentionally passing wrong type to test error handling
    await expect(combineTools(toolsArray, {}, toolsPath, tagsPath)).rejects.toThrow('Error combining tools');
  });

  it('should sort tools alphabetically by title', async () => {
    await combineTools(manualToolsToSort, {}, toolsPath, tagsPath);

    const combinedTools = readJSON(toolsPath);
    const toolTitles = combinedTools.category1.toolsList.map((tool: AsyncAPITool) => tool.title);

    expect(toolTitles).toEqual(['Tool A', 'Tool Z']);
  });

  it('should log validation errors to console.error', async () => {
    await combineTools(automatedToolsT4, manualToolsT4, toolsPath, tagsPath);

    const { message, tool, source, note } = JSON.parse(loggerErrorMock.mock.calls[0][0]);

    expect(message).toBe('Tool validation failed');
    expect(tool).toBe('Invalid Tool');
    expect(source).toBe('manual-tools.json');
    expect(note).toBe('Script continues execution, error logged for investigation');

    expect(fs.existsSync(toolsPath)).toBe(true);
    expect(fs.existsSync(tagsPath)).toBe(true);
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
    const invalidPath = 'this/is/not/valid';

    await expect(combineTools(automatedTools, manualTools, invalidPath, invalidPath)).rejects.toThrow(/ENOENT|EACCES/);
  });

  it('should throw an error when there is an invalid category', async () => {
    await expect(combineTools(invalidAutomatedToolsT10, manualTools, toolsPath, tagsPath)).rejects.toThrow(
      'Error combining tools'
    );
  });

  it('should throw an error when URL parsing fails', async () => {
    await expect(combineTools(automatedTools, manualToolsWithInvalidURLT11, toolsPath, tagsPath)).rejects.toThrow(
      'Invalid URL'
    );
  });

  it('should handle errors when processing tools with circular references', async () => {
    (circularTool as any).circular = circularTool;
    await expect(combineTools(automatedToolsT12, {}, toolsPath, tagsPath)).rejects.toThrow(
      'Converting circular structure to JSON'
    );
  });
  it('should handle tools with missing data and filters', async () => {
    manualToolsWithMissingData.myCategory.toolsList[0].filters = {
      categories: [],
      hasCommercial: false
    } as any;
    const result = await getFinalTool(manualToolsWithMissingData.myCategory.toolsList[0]);

    expect(result).toEqual(finalToolWithMissingData);
  });
  it('should log an error when tool or anotherTool has no title', async () => {
    const noTitleTools = {
      category1: {
        toolsList: [
          {
            filters: { language: [], technology: [] }
          },
          {
            title: 'Valid Tool',
            filters: { language: [], technology: [] }
          }
        ]
      }
    };

    // @ts-ignore, ignore the error for missing properties

    await combineTools(noTitleTools, {}, toolsPath, tagsPath);
    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Tool title is missing during sort',
        source: 'combine-tools.ts'
      })
    );
  });

  it('should skip inherited prototype properties in automatedTools', async () => {
    const proto = {
      extraCategory: {
        toolsList: [
          {
            title: 'Inherited Tool',
            filters: { language: [], technology: [] }
          }
        ]
      }
    };
    const inheritedTools = Object.create(proto);

    inheritedTools.category1 = {
      toolsList: [
        {
          title: 'Local Tool',
          filters: { language: [], technology: [] }
        }
      ]
    };

    await combineTools(inheritedTools, {}, toolsPath, tagsPath);
  });
});

describe('shouldIgnoreTool', () => {
  it('should match by title only when no repoUrl in ignore entry', () => {
    const tool = {
      title: 'Tool Beta',
      filters: { language: ['Python'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-beta' }
    } as AsyncAPITool;

    const result = shouldIgnoreTool(tool, 'category1', ignoreByTitleOnly);

    expect(result).not.toBeNull();
    expect(result?.reason).toBe('Deprecated tool');
  });

  it('should not match when title differs', () => {
    const tool = {
      title: 'Tool Alpha',
      filters: { language: ['JavaScript'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-alpha' }
    } as AsyncAPITool;

    const result = shouldIgnoreTool(tool, 'category1', ignoreByTitleOnly);

    expect(result).toBeNull();
  });

  it('should match specific repo when repoUrl is provided in ignore entry', () => {
    const forkTool = {
      title: 'Shared Name Tool',
      filters: { language: ['JavaScript'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/fork/shared-name' }
    } as AsyncAPITool;

    const originalTool = {
      title: 'Shared Name Tool',
      filters: { language: ['JavaScript'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/original/shared-name' }
    } as AsyncAPITool;

    expect(shouldIgnoreTool(forkTool, 'category1', ignoreByTitleAndRepo)).not.toBeNull();
    expect(shouldIgnoreTool(originalTool, 'category1', ignoreByTitleAndRepo)).toBeNull();
  });

  it('should respect category scope in ignore entry', () => {
    const tool = {
      title: 'Tool Alpha',
      filters: { language: ['JavaScript'], technology: ['Node.js'], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-alpha' }
    } as AsyncAPITool;

    expect(shouldIgnoreTool(tool, 'category1', ignoreWithCategoryScope)).not.toBeNull();
    expect(shouldIgnoreTool(tool, 'category2', ignoreWithCategoryScope)).toBeNull();
  });

  it('should return null for an empty ignore list', () => {
    const tool = {
      title: 'Any Tool',
      filters: { language: [], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/any' }
    } as AsyncAPITool;

    expect(shouldIgnoreTool(tool, 'category1', [])).toBeNull();
  });

  it('should match by repoUrl only when no title in ignore entry', () => {
    const tool = {
      title: 'Tool Beta',
      filters: { language: ['Python'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-beta' }
    } as AsyncAPITool;

    const result = shouldIgnoreTool(tool, 'category1', ignoreByRepoUrlOnly);

    expect(result).not.toBeNull();
    expect(result?.reason).toBe('Remove by repoUrl alone');
  });

  it('should not match by repoUrl only when repo differs', () => {
    const tool = {
      title: 'Tool Alpha',
      filters: { language: ['JavaScript'], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-alpha' }
    } as AsyncAPITool;

    const result = shouldIgnoreTool(tool, 'category1', ignoreByRepoUrlOnly);

    expect(result).toBeNull();
  });

  it('should match by repoUrl only regardless of the tool title', () => {
    const tool = {
      title: 'Completely Different Title',
      filters: { language: [], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-beta' }
    } as AsyncAPITool;

    expect(shouldIgnoreTool(tool, 'category1', ignoreByRepoUrlOnly)).not.toBeNull();
  });

  it('should respect category scope with repoUrl-only entry', () => {
    const tool = {
      title: 'Tool Alpha',
      filters: { language: ['JavaScript'], technology: ['Node.js'], categories: [] },
      links: { repoUrl: 'https://github.com/example/tool-alpha' }
    } as AsyncAPITool;

    expect(shouldIgnoreTool(tool, 'category1', ignoreByRepoUrlWithCategoryScope)).not.toBeNull();
    expect(shouldIgnoreTool(tool, 'category2', ignoreByRepoUrlWithCategoryScope)).toBeNull();
  });

  it('should skip entries that have neither title nor repoUrl', () => {
    const tool = {
      title: 'Any Tool',
      filters: { language: [], technology: [], categories: [] },
      links: { repoUrl: 'https://github.com/example/any' }
    } as AsyncAPITool;

    const invalidEntries = [{ reason: 'Missing both title and repoUrl' }];

    expect(shouldIgnoreTool(tool, 'category1', invalidEntries)).toBeNull();
  });
});

describe('combineTools with ignore file', () => {
  const toolsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tools-ignore-test.json');
  const tagsPath = path.join(__dirname, '../', 'fixtures', 'tools', 'tags-ignore-test.json');
  const ignorePath = path.join(__dirname, '../', 'fixtures', 'tools', 'test-tools-ignore.json');
  const ignoredOutputPath = path.join(__dirname, '../', 'fixtures', 'tools', 'test-tools-ignored.json');

  afterAll(() => {
    for (const p of [toolsPath, tagsPath, ignorePath, ignoredOutputPath]) {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should ignore automated tools matching the ignore list by title', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreByTitleOnly })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const category1Titles = combined.category1.toolsList.map((t: any) => t.title);

    expect(category1Titles).not.toContain('Tool Beta');
    expect(category1Titles).toContain('Tool Alpha');
  });

  it('should ignore only the fork when repoUrl is specified', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreByTitleAndRepo })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const sharedTools = combined.category1.toolsList.filter((t: any) => t.title === 'Shared Name Tool');

    expect(sharedTools).toHaveLength(1);
    expect(sharedTools[0].links.repoUrl).toBe('https://github.com/original/shared-name');
  });

  it('should respect category scope and only ignore from specified categories', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreWithCategoryScope })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const cat1Titles = combined.category1.toolsList.map((t: any) => t.title);
    const cat2Titles = combined.category2.toolsList.map((t: any) => t.title);

    expect(cat1Titles).not.toContain('Tool Alpha');
    expect(cat2Titles).toContain('Tool Alpha');
  });

  it('should ignore manual tools matching the ignore list', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreManualTool })
    );

    await combineTools(automatedToolsForIgnore, manualToolsForIgnore, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const cat1Titles = combined.category1.toolsList.map((t: any) => t.title);

    expect(cat1Titles).not.toContain('Manual Tool');
  });

  it('should write audit log with ignored tools details', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreByTitleOnly })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const auditLog = JSON.parse(fs.readFileSync(ignoredOutputPath, 'utf-8'));

    expect(auditLog.totalIgnored).toBe(1);
    expect(auditLog.ignoredTools).toHaveLength(1);
    expect(auditLog.ignoredTools[0].title).toBe('Tool Beta');
    expect(auditLog.ignoredTools[0].reason).toBe('Deprecated tool');
    expect(auditLog.ignoredTools[0].source).toBe('automated');
    expect(auditLog.ignoredTools[0].category).toBe('category1');
    expect(auditLog.ignoredTools[0]).toHaveProperty('ignoredAt');
  });

  it('should write empty audit log when no tools are ignored', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: [] })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const auditLog = JSON.parse(fs.readFileSync(ignoredOutputPath, 'utf-8'));

    expect(auditLog.totalIgnored).toBe(0);
    expect(auditLog.ignoredTools).toHaveLength(0);
  });

  it('should log zero ignored when rules exist but none match', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({
        description: 'test',
        tools: [{ title: 'Non-Existent Tool', reason: 'Does not exist' }]
      })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    expect(combined.category1.toolsList).toHaveLength(4);
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Tools ignored: 0')
    );
  });

  it('should use empty ignore list when ignore file has no tools property', async () => {
    fs.writeFileSync(ignorePath, JSON.stringify({ description: 'test' }));

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    expect(combined.category1.toolsList).toHaveLength(4);
  });

  it('should log "no repo" for ignored tools without repoUrl', async () => {
    const automatedWithNoRepo = {
      category1: {
        description: 'Category 1',
        toolsList: [
          {
            title: 'Tool Without Repo',
            filters: {
              language: ['JavaScript'],
              technology: [],
              categories: ['api']
            },
            links: {}
          }
        ]
      }
    };
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({
        description: 'test',
        tools: [{ title: 'Tool Without Repo', reason: 'No repo URL' }]
      })
    );

    await combineTools(automatedWithNoRepo, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('no repo')
    );
  });

  it('should work normally when no ignore file path is provided', async () => {
    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    expect(combined.category1.toolsList).toHaveLength(4);
  });

  it('should work normally when ignore file does not exist', async () => {
    const nonExistentPath = path.join(__dirname, 'does-not-exist.json');

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, nonExistentPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    expect(combined.category1.toolsList).toHaveLength(4);
  });

  it('should ignore tools by repoUrl only across all categories', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreByRepoUrlOnly })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const category1Repos = combined.category1.toolsList.map((t: any) => t.links?.repoUrl);

    expect(category1Repos).not.toContain('https://github.com/example/tool-beta');
    expect(category1Repos).toContain('https://github.com/example/tool-alpha');
  });

  it('should respect category scope with repoUrl-only ignore entry', async () => {
    fs.writeFileSync(
      ignorePath,
      JSON.stringify({ description: 'test', tools: ignoreByRepoUrlWithCategoryScope })
    );

    await combineTools(automatedToolsForIgnore, {}, toolsPath, tagsPath, ignorePath, ignoredOutputPath);

    const combined = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    const cat1Repos = combined.category1.toolsList.map((t: any) => t.links?.repoUrl);
    const cat2Repos = combined.category2.toolsList.map((t: any) => t.links?.repoUrl);

    expect(cat1Repos).not.toContain('https://github.com/example/tool-alpha');
    expect(cat2Repos).toContain('https://github.com/example/tool-alpha');
  });
});
