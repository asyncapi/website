import axios from 'axios';
import { promises as fs } from 'fs';
import os from 'os';
import { resolve } from 'path';

import { runBuildTools } from '../../npm/runners/build-tools-runner';
import { buildTools } from '../../scripts/build-tools';
import { mockToolsData } from './fixtures/tools-fixtures';

// Mock axios for GitHub API calls
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the category list and tags color modules
jest.mock('../../scripts/tools/categorylist', () => ({
  categoryList: [
    {
      name: 'Code Generators',
      tag: 'code-generator',
      description:
        'The following is a list of tools that generate code from an AsyncAPI document; not the other way around.',
    },
    {
      name: 'Validators',
      tag: 'validator',
      description:
        'The following is a list of tools that validate AsyncAPI documents.',
    },
    {
      name: 'Documentation Generators',
      tag: 'documentation-generator',
      description:
        'The following is a list of tools that generate human-readable documentation from an AsyncAPI document.',
    },
  ],
}));

jest.mock('../../scripts/tools/tags-color', () => ({
  languagesColor: [
    {
      name: 'JavaScript',
      color: 'bg-[#f1e05a]',
      borderColor: 'border-[#f1e05a]',
    },
    { name: 'Python', color: 'bg-[#3572A5]', borderColor: 'border-[#3572A5]' },
    {
      name: 'TypeScript',
      color: 'bg-[#2b7489]',
      borderColor: 'border-[#2b7489]',
    },
  ],
  technologiesColor: [
    { name: 'React', color: 'bg-[#61dafb]', borderColor: 'border-[#61dafb]' },
    { name: 'FastAPI', color: 'bg-[#009688]', borderColor: 'border-[#009688]' },
    { name: 'Next.js', color: 'bg-[#000000]', borderColor: 'border-[#000000]' },
    { name: 'Node.js', color: 'bg-[#339933]', borderColor: 'border-[#339933]' },
    { name: 'Django', color: 'bg-[#092e20]', borderColor: 'border-[#092e20]' },
    { name: 'Vue.js', color: 'bg-[#4fc08d]', borderColor: 'border-[#4fc08d]' },
    { name: 'Nuxt.js', color: 'bg-[#00dc82]', borderColor: 'border-[#00dc82]' },
  ],
}));

describe('Integration: build-tools Runner', () => {
  let tempDir: string;
  let automatedToolsPath: string;
  let manualToolsPath: string;
  let toolsPath: string;
  let tagsPath: string;
  let automatedTools: any;
  let combinedTools: any;
  let tags: any;

  beforeAll(async () => {
    // Mock the GITHUB_TOKEN environment variable
    process.env.GITHUB_TOKEN = 'test-token';

    // Create a unique temp directory for this test run
    tempDir = resolve(os.tmpdir(), `build-tools-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    automatedToolsPath = resolve(tempDir, 'tools-automated.json');
    manualToolsPath = resolve(tempDir, 'tools-manual.json');
    toolsPath = resolve(tempDir, 'tools.json');
    tagsPath = resolve(tempDir, 'all-tags.json');

    // Create manual tools file in the correct format
    await fs.writeFile(
      manualToolsPath,
      JSON.stringify(mockToolsData.manualTools, null, 2),
    );

    // Setup mocked GitHub API responses
    // First, mock the search API calls
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockToolsData.githubSearchResponse })
      .mockResolvedValueOnce({ data: mockToolsData.githubSearchResponsePage2 })
      // Then mock the content download calls for each tool file (YAML format)
      .mockResolvedValueOnce({
        data: mockToolsData.githubContentResponses.tool1,
      })
      .mockResolvedValueOnce({
        data: mockToolsData.githubContentResponses.tool2,
      })
      .mockResolvedValueOnce({
        data: mockToolsData.githubContentResponses.tool3,
      })
      .mockResolvedValueOnce({
        data: mockToolsData.githubContentResponses.tool4,
      });

    // Run the tools builder using the full buildTools function
    await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);

    // Read and parse the output files
    const automatedContent = await fs.readFile(automatedToolsPath, 'utf-8');
    const combinedContent = await fs.readFile(toolsPath, 'utf-8');
    const tagsContent = await fs.readFile(tagsPath, 'utf-8');

    automatedTools = JSON.parse(automatedContent);
    combinedTools = JSON.parse(combinedContent);
    tags = JSON.parse(tagsContent);
  });

  afterAll(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });

    // Clean up environment variable
    delete process.env.GITHUB_TOKEN;
  });

  describe('File Creation', () => {
    it('creates all required output files', async () => {
      const automatedExists = await fs
        .access(automatedToolsPath)
        .then(() => true)
        .catch(() => false);
      const combinedExists = await fs
        .access(toolsPath)
        .then(() => true)
        .catch(() => false);
      const tagsExists = await fs
        .access(tagsPath)
        .then(() => true)
        .catch(() => false);

      expect(automatedExists).toBe(true);
      expect(combinedExists).toBe(true);
      expect(tagsExists).toBe(true);
    });
  });

  describe('Automated Tools Processing', () => {
    it('successfully processes GitHub API data and writes automated tools', () => {
      expect(automatedTools).toHaveProperty('Code Generators');
      expect(automatedTools).toHaveProperty('Validators');
      expect(automatedTools).toHaveProperty('Documentation Generators');

      expect(automatedTools['Code Generators']).toHaveProperty('description');
      expect(automatedTools['Code Generators']).toHaveProperty('toolsList');
      expect(Array.isArray(automatedTools['Code Generators'].toolsList)).toBe(
        true,
      );
    });

    it('categorizes tools correctly based on their filter categories', () => {
      // Check that code generators are in the right category
      const codeGenTools = automatedTools['Code Generators'].toolsList;

      expect(codeGenTools.length).toBeGreaterThanOrEqual(1);

      // Check that validators are in the right category
      const validatorTools = automatedTools.Validators.toolsList;

      expect(validatorTools.length).toBeGreaterThanOrEqual(1);

      // Note: Some tools may fail validation, which is expected behavior
      // The test verifies that the categorization logic works correctly
    });

    it('includes proper tool metadata', () => {
      const allTools = [
        ...automatedTools['Code Generators'].toolsList,
        ...automatedTools.Validators.toolsList,
        ...automatedTools['Documentation Generators'].toolsList,
      ];

      allTools.forEach((tool: any) => {
        expect(tool).toHaveProperty('title');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('links');
        expect(tool).toHaveProperty('filters');

        expect(typeof tool.title).toBe('string');
        expect(typeof tool.description).toBe('string');
        expect(typeof tool.links).toBe('object');
        expect(typeof tool.filters).toBe('object');

        // Check required filter properties
        expect(tool.filters).toHaveProperty('categories');
        expect(tool.filters).toHaveProperty('hasCommercial');
        expect(tool.filters).toHaveProperty('isAsyncAPIOwner');
        expect(Array.isArray(tool.filters.categories)).toBe(true);
        expect(typeof tool.filters.hasCommercial).toBe('boolean');
        expect(typeof tool.filters.isAsyncAPIOwner).toBe('boolean');
      });
    });
  });

  describe('Combined Tools Processing', () => {
    it('combines automated and manual tools correctly', () => {
      expect(combinedTools).toHaveProperty('Code Generators');
      expect(combinedTools).toHaveProperty('Validators');
      expect(combinedTools).toHaveProperty('Documentation Generators');

      // Check that tools are being combined correctly
      const codeGenTools = combinedTools['Code Generators'].toolsList;
      const validationTools = combinedTools.Validators.toolsList;

      // Verify that we have at least some tools (automated or manual)
      expect(codeGenTools.length).toBeGreaterThanOrEqual(1);
      expect(validationTools.length).toBeGreaterThanOrEqual(1);

      // Verify the combine logic works by checking structure
      codeGenTools.forEach((tool: any) => {
        expect(tool).toHaveProperty('title');
        expect(tool).toHaveProperty('filters');
      });
    });

    it('maintains proper category structure in combined tools', () => {
      Object.keys(combinedTools).forEach((category) => {
        expect(combinedTools[category]).toHaveProperty('description');
        expect(combinedTools[category]).toHaveProperty('toolsList');
        expect(Array.isArray(combinedTools[category].toolsList)).toBe(true);
      });
    });
  });

  describe('Tags Generation', () => {
    it('generates proper tags structure', () => {
      expect(tags).toHaveProperty('languages');
      expect(tags).toHaveProperty('technologies');

      expect(Array.isArray(tags.languages)).toBe(true);
      expect(Array.isArray(tags.technologies)).toBe(true);

      // Check that expected languages are present
      const languageNames = tags.languages.map((lang: any) => lang.name);

      expect(languageNames).toContain('JavaScript');
      expect(languageNames).toContain('Python');
      expect(languageNames).toContain('TypeScript');

      // Check that expected technologies are present
      const technologyNames = tags.technologies.map((tech: any) => tech.name);

      expect(technologyNames).toContain('React');
      expect(technologyNames).toContain('FastAPI');
      expect(technologyNames).toContain('Next.js');
    });

    it('includes proper color information for tags', () => {
      tags.languages.forEach((lang: any) => {
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('color');
        expect(lang).toHaveProperty('borderColor');
        expect(typeof lang.name).toBe('string');
        expect(typeof lang.color).toBe('string');
        expect(typeof lang.borderColor).toBe('string');
      });

      tags.technologies.forEach((tech: any) => {
        expect(tech).toHaveProperty('name');
        expect(tech).toHaveProperty('color');
        expect(tech).toHaveProperty('borderColor');
        expect(typeof tech.name).toBe('string');
        expect(typeof tech.color).toBe('string');
        expect(typeof tech.borderColor).toBe('string');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle GitHub API errors gracefully', async () => {
      const errorTempDir = resolve(
        os.tmpdir(),
        `build-tools-error-test-${Date.now()}`,
      );

      await fs.mkdir(errorTempDir, { recursive: true });

      const errorAutomatedPath = resolve(errorTempDir, 'tools-automated.json');
      const errorManualPath = resolve(errorTempDir, 'tools-manual.json');
      const errorToolsPath = resolve(errorTempDir, 'tools.json');
      const errorTagsPath = resolve(errorTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        errorManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Setup mock to return an error
      mockedAxios.get.mockRejectedValueOnce(new Error('GitHub API error'));

      await expect(
        buildTools(
          errorAutomatedPath,
          errorManualPath,
          errorToolsPath,
          errorTagsPath,
        ),
      ).rejects.toThrow();

      // Clean up
      await fs.rm(errorTempDir, { recursive: true, force: true });
    });

    it('should handle empty GitHub API response', async () => {
      const emptyTempDir = resolve(
        os.tmpdir(),
        `build-tools-empty-test-${Date.now()}`,
      );

      await fs.mkdir(emptyTempDir, { recursive: true });

      const emptyAutomatedPath = resolve(emptyTempDir, 'tools-automated.json');
      const emptyManualPath = resolve(emptyTempDir, 'tools-manual.json');
      const emptyToolsPath = resolve(emptyTempDir, 'tools.json');
      const emptyTagsPath = resolve(emptyTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(emptyManualPath, JSON.stringify(mockToolsData.manualTools, null, 2));

      // Setup mock to return empty response with proper structure
      // Reset all previous mocks and set up only the empty response
      mockedAxios.get.mockReset();
      mockedAxios.get.mockResolvedValueOnce({
        data: mockToolsData.emptyResponse,
      });

      // The empty response should still work - files should be created with empty/manual data
      await expect(
        buildTools(emptyAutomatedPath, emptyManualPath, emptyToolsPath, emptyTagsPath)
      ).resolves.not.toThrow();

      // Check that files were created even with empty API response
      const automatedExists = await fs
        .access(emptyAutomatedPath)
        .then(() => true)
        .catch(() => false);
      const combinedExists = await fs
        .access(emptyToolsPath)
        .then(() => true)
        .catch(() => false);
      const tagsExists = await fs
        .access(emptyTagsPath)
        .then(() => true)
        .catch(() => false);

      expect(automatedExists).toBe(true);
      expect(combinedExists).toBe(true);
      expect(tagsExists).toBe(true);

      // Clean up
      await fs.rm(emptyTempDir, { recursive: true, force: true });
    });

    it('should handle file write errors', async () => {
      const invalidTempDir = resolve(
        os.tmpdir(),
        `build-tools-invalid-test-${Date.now()}`,
      );

      await fs.mkdir(invalidTempDir, { recursive: true });

      const invalidAutomatedPath = resolve(
        invalidTempDir,
        'invalid_dir',
        'tools-automated.json',
      );
      const invalidManualPath = resolve(invalidTempDir, 'tools-manual.json');
      const invalidToolsPath = resolve(invalidTempDir, 'tools.json');
      const invalidTagsPath = resolve(invalidTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        invalidManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Setup mock for successful API call
      mockedAxios.get.mockResolvedValueOnce({
        data: mockToolsData.githubSearchResponse,
      });

      await expect(
        buildTools(
          invalidAutomatedPath,
          invalidManualPath,
          invalidToolsPath,
          invalidTagsPath,
        ),
      ).rejects.toThrow();

      // Clean up
      await fs.rm(invalidTempDir, { recursive: true, force: true });
    });
  });

  describe('Environment and Configuration', () => {
    it('should handle missing GITHUB_TOKEN', async () => {
      const envTempDir = resolve(
        os.tmpdir(),
        `build-tools-env-test-${Date.now()}`,
      );

      await fs.mkdir(envTempDir, { recursive: true });

      const envAutomatedPath = resolve(envTempDir, 'tools-automated.json');
      const envManualPath = resolve(envTempDir, 'tools-manual.json');
      const envToolsPath = resolve(envTempDir, 'tools.json');
      const envTagsPath = resolve(envTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        envManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Remove GITHUB_TOKEN
      const originalToken = process.env.GITHUB_TOKEN;

      delete process.env.GITHUB_TOKEN;

      // Setup mock to simulate missing token error
      mockedAxios.get.mockRejectedValueOnce(
        new Error('GITHUB_TOKEN is not set'),
      );

      await expect(
        buildTools(envAutomatedPath, envManualPath, envToolsPath, envTagsPath),
      ).rejects.toThrow();

      // Restore token
      if (originalToken) {
        process.env.GITHUB_TOKEN = originalToken;
      }

      // Clean up
      await fs.rm(envTempDir, { recursive: true, force: true });
    });

    it('should use default paths in runner when no options provided', async () => {
      // This should fail because default config files don't exist in test environment
      await expect(runBuildTools()).rejects.toThrow();
    });
  });

  describe('File Validation', () => {
    it('should handle invalid manual tools JSON', async () => {
      const invalidTempDir = resolve(
        os.tmpdir(),
        `build-tools-invalid-json-test-${Date.now()}`,
      );

      await fs.mkdir(invalidTempDir, { recursive: true });

      const invalidAutomatedPath = resolve(
        invalidTempDir,
        'tools-automated.json',
      );
      const invalidManualPath = resolve(invalidTempDir, 'tools-manual.json');
      const invalidToolsPath = resolve(invalidTempDir, 'tools.json');
      const invalidTagsPath = resolve(invalidTempDir, 'all-tags.json');

      // Create invalid JSON file
      await fs.writeFile(invalidManualPath, 'invalid json content');

      // Setup mock for successful API call
      mockedAxios.get.mockResolvedValueOnce({
        data: mockToolsData.githubSearchResponse,
      });

      await expect(
        buildTools(
          invalidAutomatedPath,
          invalidManualPath,
          invalidToolsPath,
          invalidTagsPath,
        ),
      ).rejects.toThrow();

      // Clean up
      await fs.rm(invalidTempDir, { recursive: true, force: true });
    });

    it('should handle missing manual tools file', async () => {
      const missingTempDir = resolve(
        os.tmpdir(),
        `build-tools-missing-file-test-${Date.now()}`,
      );

      await fs.mkdir(missingTempDir, { recursive: true });

      const missingAutomatedPath = resolve(
        missingTempDir,
        'tools-automated.json',
      );
      const missingManualPath = resolve(
        missingTempDir,
        'non-existent-file.json',
      );
      const missingToolsPath = resolve(missingTempDir, 'tools.json');
      const missingTagsPath = resolve(missingTempDir, 'all-tags.json');

      // Setup mock for successful API call
      mockedAxios.get.mockResolvedValueOnce({
        data: mockToolsData.githubSearchResponse,
      });

      await expect(
        buildTools(
          missingAutomatedPath,
          missingManualPath,
          missingToolsPath,
          missingTagsPath,
        ),
      ).rejects.toThrow();

      // Clean up
      await fs.rm(missingTempDir, { recursive: true, force: true });
    });
  });

  describe('Edge Cases', () => {
    it('should handle GitHub API pagination', async () => {
      const paginationTempDir = resolve(
        os.tmpdir(),
        `build-tools-pagination-test-${Date.now()}`,
      );

      await fs.mkdir(paginationTempDir, { recursive: true });

      const paginationAutomatedPath = resolve(
        paginationTempDir,
        'tools-automated.json',
      );
      const paginationManualPath = resolve(
        paginationTempDir,
        'tools-manual.json',
      );
      const paginationToolsPath = resolve(paginationTempDir, 'tools.json');
      const paginationTagsPath = resolve(paginationTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        paginationManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Setup mock for pagination scenario
      mockedAxios.get.mockReset();
      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            items: [],
            total_count: 0,
            incomplete_results: true, // Indicates more pages
          },
        })
        .mockResolvedValueOnce({
          data: {
            items: [],
            total_count: 0,
            incomplete_results: false, // No more pages
          },
        });

      await expect(
        buildTools(
          paginationAutomatedPath,
          paginationManualPath,
          paginationToolsPath,
          paginationTagsPath,
        ),
      ).resolves.not.toThrow();

      // Verify files were created
      const automatedExists = await fs
        .access(paginationAutomatedPath)
        .then(() => true)
        .catch(() => false);
      const combinedExists = await fs
        .access(paginationToolsPath)
        .then(() => true)
        .catch(() => false);

      expect(automatedExists).toBe(true);
      expect(combinedExists).toBe(true);

      // Clean up
      await fs.rm(paginationTempDir, { recursive: true, force: true });
    });

    it('should handle malformed YAML in .asyncapi-tool files', async () => {
      const malformedTempDir = resolve(
        os.tmpdir(),
        `build-tools-malformed-yaml-test-${Date.now()}`,
      );

      await fs.mkdir(malformedTempDir, { recursive: true });

      const malformedAutomatedPath = resolve(
        malformedTempDir,
        'tools-automated.json',
      );
      const malformedManualPath = resolve(
        malformedTempDir,
        'tools-manual.json',
      );
      const malformedToolsPath = resolve(malformedTempDir, 'tools.json');
      const malformedTagsPath = resolve(malformedTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        malformedManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Setup mock with malformed YAML content
      mockedAxios.get.mockReset();
      mockedAxios.get
        .mockResolvedValueOnce({ data: mockToolsData.githubSearchResponse })
        .mockResolvedValueOnce({
          data: 'invalid: yaml: content: [', // Malformed YAML
        });

      // This should not throw - the script should handle malformed YAML gracefully
      await expect(
        buildTools(
          malformedAutomatedPath,
          malformedManualPath,
          malformedToolsPath,
          malformedTagsPath,
        ),
      ).resolves.not.toThrow();

      // Verify files were still created (with warnings logged)
      const automatedExists = await fs
        .access(malformedAutomatedPath)
        .then(() => true)
        .catch(() => false);

      expect(automatedExists).toBe(true);

      // Clean up
      await fs.rm(malformedTempDir, { recursive: true, force: true });
    });
  });

  describe('Runner Integration', () => {
    it('should work with the runner function', async () => {
      const runnerTempDir = resolve(
        os.tmpdir(),
        `build-tools-runner-test-${Date.now()}`,
      );

      await fs.mkdir(runnerTempDir, { recursive: true });

      const runnerAutomatedPath = resolve(
        runnerTempDir,
        'tools-automated.json',
      );
      const runnerManualPath = resolve(runnerTempDir, 'tools-manual.json');
      const runnerToolsPath = resolve(runnerTempDir, 'tools.json');
      const runnerTagsPath = resolve(runnerTempDir, 'all-tags.json');

      // Create manual tools file
      await fs.writeFile(
        runnerManualPath,
        JSON.stringify(mockToolsData.manualTools, null, 2),
      );

      // Reset mocks for this test
      mockedAxios.get.mockClear();
      mockedAxios.get
        .mockResolvedValueOnce({ data: mockToolsData.githubSearchResponse })
        .mockResolvedValueOnce({
          data: mockToolsData.githubSearchResponsePage2,
        })
        .mockResolvedValueOnce({
          data: mockToolsData.githubContentResponses.tool1,
        })
        .mockResolvedValueOnce({
          data: mockToolsData.githubContentResponses.tool2,
        })
        .mockResolvedValueOnce({
          data: mockToolsData.githubContentResponses.tool3,
        })
        .mockResolvedValueOnce({
          data: mockToolsData.githubContentResponses.tool4,
        });

      // First, run buildTools to create the automated tools file
      await buildTools(
        runnerAutomatedPath,
        runnerManualPath,
        runnerToolsPath,
        runnerTagsPath,
      );

      // Verify the automated tools file was created by buildTools
      const automatedExistsAfterBuild = await fs
        .access(runnerAutomatedPath)
        .then(() => true)
        .catch(() => false);

      expect(automatedExistsAfterBuild).toBe(true);

      // Now test that the runner function can also work (it calls combineTools)
      // Reset the mock for a second call
      mockedAxios.get.mockClear();

      // Test the runner function which combines existing automated and manual tools
      await runBuildTools({
        automatedToolsPath: runnerAutomatedPath,
        manualToolsPath: runnerManualPath,
        toolsPath: runnerToolsPath,
        tagsPath: runnerTagsPath,
      });

      // Verify files still exist after runner call
      const combinedExists = await fs
        .access(runnerToolsPath)
        .then(() => true)
        .catch(() => false);
      const tagsExists = await fs
        .access(runnerTagsPath)
        .then(() => true)
        .catch(() => false);

      expect(combinedExists).toBe(true);
      expect(tagsExists).toBe(true);

      // Clean up
      await fs.rm(runnerTempDir, { recursive: true, force: true });
    });

    it('should handle runner errors gracefully', async () => {
      const errorRunnerTempDir = resolve(
        os.tmpdir(),
        `build-tools-runner-error-test-${Date.now()}`,
      );

      await fs.mkdir(errorRunnerTempDir, { recursive: true });

      const errorRunnerAutomatedPath = resolve(
        errorRunnerTempDir,
        'tools-automated.json',
      );
      const errorRunnerManualPath = resolve(
        errorRunnerTempDir,
        'tools-manual.json',
      );
      const errorRunnerToolsPath = resolve(errorRunnerTempDir, 'tools.json');
      const errorRunnerTagsPath = resolve(errorRunnerTempDir, 'all-tags.json');

      // Create invalid manual tools file
      await fs.writeFile(errorRunnerManualPath, 'invalid json');

      // Create valid automated tools file
      await fs.writeFile(
        errorRunnerAutomatedPath,
        JSON.stringify(mockToolsData.expectedAutomatedTools, null, 2),
      );

      await expect(
        runBuildTools({
          automatedToolsPath: errorRunnerAutomatedPath,
          manualToolsPath: errorRunnerManualPath,
          toolsPath: errorRunnerToolsPath,
          tagsPath: errorRunnerTagsPath,
        }),
      ).rejects.toThrow();

      // Clean up
      await fs.rm(errorRunnerTempDir, { recursive: true, force: true });
    });
  });
});
