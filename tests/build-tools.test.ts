import axios from 'axios';
import fs from 'fs-extra';
import os from 'os';
import path, { resolve } from 'path';

import { buildTools, buildToolsManual } from '../scripts/build-tools';
import { manualTools, mockConvertedData, mockExtractData, tagsData } from './fixtures/buildToolsData';

jest.mock('axios');
// Add this line to properly type the mocked axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../scripts/tools/categorylist', () => ({
  categoryList: [
    { name: 'Category1', description: 'Description for Category1' },
    { name: 'Category2', description: 'Description for Category2' }
  ]
}));

jest.mock('../scripts/tools/tags-color', () => ({
  languagesColor: [
    { name: 'JavaScript', color: 'bg-[#f1e05a]', borderColor: 'border-[#f1e05a]' },
    { name: 'Python', color: 'bg-[#3572A5]', borderColor: 'border-[#3572A5]' }
  ],
  technologiesColor: [
    { name: 'React', color: 'bg-[#61dafb]', borderColor: 'border-[#61dafb]' },
    { name: 'Node.js', color: 'bg-[#68a063]', borderColor: 'border-[#68a063]' }
  ]
}));

describe('buildTools', () => {
  let testDir: string;
  let toolsPath: string;
  let tagsPath: string;
  let automatedToolsPath: string;
  let manualToolsPath: string;
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    testDir = fs.mkdtempSync(path.join(String(os.tmpdir()), 'test_config-'));
    toolsPath = resolve(testDir, 'tools.json');
    tagsPath = resolve(testDir, 'all-tags.json');
    automatedToolsPath = resolve(testDir, 'tools-automated.json');
    manualToolsPath = resolve(testDir, 'tools-manual.json');
    fs.ensureDirSync(testDir);
    fs.outputFileSync(manualToolsPath, JSON.stringify(manualTools));
    fs.outputFileSync(automatedToolsPath, JSON.stringify({}));
    fs.outputFileSync(toolsPath, JSON.stringify({}));
    fs.outputFileSync(tagsPath, JSON.stringify({}));

    process.env.GITHUB_TOKEN = 'mockToken';
  });

  afterAll(() => {
    fs.removeSync(testDir);
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract, convert, combine tools, and write to file', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockExtractData });

    await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);

    const automatedToolsContent = JSON.parse(fs.readFileSync(automatedToolsPath, 'utf8'));
    const combinedToolsContent = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
    const tagsContent = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

    expect(Object.keys(automatedToolsContent)).toEqual(Object.keys(mockConvertedData));
    expect(automatedToolsContent.Category1.description).toEqual(mockConvertedData.Category1.description);
    expect(automatedToolsContent.Category2.description).toEqual(mockConvertedData.Category2.description);

    expect(combinedToolsContent).toHaveProperty('Category1');
    expect(combinedToolsContent).toHaveProperty('Category2');
    expect(combinedToolsContent.Category1.description).toEqual(mockConvertedData.Category1.description);
    expect(combinedToolsContent.Category2.description).toEqual(mockConvertedData.Category2.description);

    expect(tagsContent).toEqual(tagsData);
  });

  it('should handle getData error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Extract error'));

    await expect(buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath)).rejects.toThrow('Extract error');
  });

  it('should handle file write errors', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockExtractData });

    const invalidPath = path.resolve(os.tmpdir(), 'invalid_dir', 'tools.json');

    await expect(buildTools(invalidPath, manualToolsPath, toolsPath, tagsPath)).rejects.toThrow(/ENOENT|EACCES/);
  });

  it('should build tools manually from existing files', async () => {
    fs.writeFileSync(automatedToolsPath, JSON.stringify(mockConvertedData));
    fs.writeFileSync(manualToolsPath, JSON.stringify(manualTools));

    await buildToolsManual(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);

    const combinedToolsContent = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    expect(combinedToolsContent).toHaveProperty('Category1');
    expect(combinedToolsContent).toHaveProperty('Category2');
    expect(combinedToolsContent.Category1.description).toEqual(mockConvertedData.Category1.description);
    expect(combinedToolsContent.Category2.description).toEqual(mockConvertedData.Category2.description);
    expect(combinedToolsContent.Category1.toolsList).toBeDefined();
    expect(combinedToolsContent.Category2.toolsList).toBeDefined();
  });

  it('should handle combineTools error', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockExtractData });

    const combineSpy = jest
      .spyOn(require('../scripts/tools/combine-tools'), 'combineTools')
      .mockRejectedValueOnce(new Error('Combine error'));

    try {
      await expect(
        buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath)
      ).rejects.toThrow(
        'An error occurred while building tools: An error occurred while combining tools: Combine error'
      );
    } finally {
      combineSpy.mockRestore();
    }
  });

  it('should handle buildToolsManual error', async () => {
    const invalidAutomatedToolsPath = resolve(testDir, 'non-existent-dir', 'tools-automated.json');

    await expect(
      buildToolsManual(invalidAutomatedToolsPath, manualToolsPath, toolsPath, tagsPath)
    ).rejects.toThrow('An error occurred while building tools manually:');
  });

  it('should handle missing automated tools file', async () => {
    const invalidPath = resolve(testDir, 'missing-automated.json');

    await expect(
      buildToolsManual(invalidPath, manualToolsPath, toolsPath, tagsPath)
    ).rejects.toThrow('Automated tools file not found');
  });

  it('should handle missing manual tools file error', async () => {
    const invalidManualPath = resolve(testDir, 'nonexistent-manual.json');

    await expect(
      buildToolsManual(automatedToolsPath, invalidManualPath, toolsPath, tagsPath)
    ).rejects.toThrow('Manual tools file not found');
  });
});
