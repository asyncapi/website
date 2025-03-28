import fs from 'fs/promises';
import path from 'path';

import { buildCaseStudiesList } from '../../scripts/casestudies/index';
import { json1, json2, yaml1, yaml2 } from '../fixtures/caseStudyData';

describe('buildCaseStudiesList', () => {
  const tempDir = path.join(__dirname, 'temp-test-dir');
  const tempConfigDir = path.join(tempDir, 'config', 'casestudies');
  const tempOutputFile = path.join(tempDir, 'case-studies.json');

  beforeAll(async () => {
    // Create temporary directories
    await fs.mkdir(tempConfigDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up temporary directories
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  beforeEach(async () => {
    // Clear the config directory before each test
    const files = await fs.readdir(tempConfigDir);

    await Promise.all(files.map((file) => fs.unlink(path.join(tempConfigDir, file))));
  });

  it('should read YAML files and create a JSON file with case studies', async () => {
    // Create sample YAML files

    await fs.writeFile(path.join(tempConfigDir, 'casestudy1.yml'), yaml1);
    await fs.writeFile(path.join(tempConfigDir, 'casestudy2.yml'), yaml2);

    // Run the function
    await buildCaseStudiesList(tempConfigDir, tempOutputFile);

    // Read the output JSON file
    const outputContent = await fs.readFile(tempOutputFile, 'utf-8');
    const outputJson = JSON.parse(outputContent);

    expect(outputJson).toHaveLength(2);
    expect(outputJson[0]).toEqual(json1);
    expect(outputJson[1]).toEqual(json2);
  });

  it('should throw an error with incorrect parameters', async () => {
    try {
      await buildCaseStudiesList('invalid-dir', tempOutputFile);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(/ENOENT/); // Error for directory not found
    }
  });

  it('should throw an error when the output file path is invalid', async () => {
    try {
      // Call the function with an invalid output file path
      await buildCaseStudiesList(tempConfigDir, '/invalid-path/case-studies.json');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw an error when YAML content is invalid', async () => {
    // Create an invalid YAML file
    const invalidYaml = `
    invalid: yaml: content
    `;

    await fs.writeFile(path.join(tempConfigDir, 'invalid.yml'), invalidYaml);

    try {
      await buildCaseStudiesList(tempConfigDir, tempOutputFile);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain('Invalid content format'); // Error for invalid YAML content
    }
  });
});
