import axios from 'axios';
import fs from 'fs-extra';
import os from 'os';
import path, { resolve } from 'path';

import { buildTools } from '../scripts/build-tools';
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
  const testDir = path.join(String(os.tmpdir()), 'test_config');
  const toolsPath = resolve(testDir, 'tools.json');
  const tagsPath = resolve(testDir, 'all-tags.json');
  const automatedToolsPath = resolve(testDir, 'tools-automated.json');
  const manualToolsPath = resolve(testDir, 'tools-manual.json');
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
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
});
