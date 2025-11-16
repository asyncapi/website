import { promises as fs } from 'fs';
import os from 'os';
import { join, resolve } from 'path';

import { runCaseStudies } from '../../npm/runners/case-studies-runner';
import { CustomError } from '../../types/errors/CustomError';

describe('Integration: case-studies-runner', () => {
  let tempDir: string;
  let caseStudyDir: string;
  let outputPath: string;
  let output: any[];

  beforeAll(async () => {
    // Create a unique temp directory for this test run
    tempDir = resolve(os.tmpdir(), `case-studies-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    caseStudyDir = resolve(tempDir, 'casestudies');
    outputPath = resolve(tempDir, 'case-studies.json');

    // Create case study directory
    await fs.mkdir(caseStudyDir, { recursive: true });

    // Create test YAML files with valid case study data
    const caseStudy1 = `id: test-company-1
company:
  name: Test Company 1
  description: A test company for integration testing
  customers: "1000"
  industry: Technology
  website: https://example.com
  logo: /img/test1.svg
challenges: |
  Test challenges description
  with multiple lines.
solution: |
  Test solution description.
technical:
  languages:
    - JavaScript
    - TypeScript
  protocols:
    - WebSocket
asyncapi:
  versions:
    - 3.0.0
  storage: Git repository
`;

    const caseStudy2 = `id: test-company-2
company:
  name: Test Company 2
  description: Another test company
  industry: Finance
  website: https://example2.com
challenges: Single line challenge
solution: Single line solution
technical:
  languages:
    - Python
  protocols:
    - MQTT
asyncapi:
  versions:
    - 2.6.0
    - 3.0.0
`;

    // Write test YAML files
    await fs.writeFile(join(caseStudyDir, 'company1.yml'), caseStudy1, 'utf-8');
    await fs.writeFile(join(caseStudyDir, 'company2.yml'), caseStudy2, 'utf-8');

    // Run the runner
    await runCaseStudies({
      caseStudyDirectory: caseStudyDir,
      outputPath
    });

    // Read and parse the output
    const content = await fs.readFile(outputPath, 'utf-8');

    output = JSON.parse(content);
  });

  afterAll(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe('File Creation', () => {
    it('creates the output file successfully', async () => {
      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    });

    it('output file contains valid JSON', async () => {
      const content = await fs.readFile(outputPath, 'utf-8');

      expect(() => JSON.parse(content)).not.toThrow();
      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe('Output Structure', () => {
    it('output is an array', () => {
      expect(Array.isArray(output)).toBe(true);
    });

    it('output is not empty', () => {
      expect(output.length).toBeGreaterThan(0);
    });

    it('contains expected number of case studies', () => {
      expect(output.length).toBe(2);
    });

    it('each case study has an id', () => {
      output.forEach((study: any) => {
        expect(study).toHaveProperty('id');
        expect(typeof study.id).toBe('string');
        expect(study.id.length).toBeGreaterThan(0);
      });
    });

    it('each case study has a company object', () => {
      output.forEach((study: any) => {
        expect(study).toHaveProperty('company');
        expect(typeof study.company).toBe('object');
        expect(study.company).not.toBeNull();
      });
    });

    it('company objects have required fields', () => {
      output.forEach((study: any) => {
        expect(study.company).toHaveProperty('name');
        expect(typeof study.company.name).toBe('string');
        expect(study.company.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Content Validation', () => {
    it('preserves YAML content correctly', () => {
      const study1 = output.find((s: any) => s.id === 'test-company-1');

      expect(study1).toBeDefined();
      expect(study1.company.name).toBe('Test Company 1');
      expect(study1.company.industry).toBe('Technology');
      expect(study1.company.customers).toBe('1000');
    });

    it('handles multi-line strings correctly', () => {
      const study1 = output.find((s: any) => s.id === 'test-company-1');

      expect(study1.challenges).toContain('Test challenges description');
      expect(study1.challenges).toContain('with multiple lines');
      expect(study1.solution).toContain('Test solution description');
    });

    it('handles arrays correctly', () => {
      const study1 = output.find((s: any) => s.id === 'test-company-1');

      expect(Array.isArray(study1.technical.languages)).toBe(true);
      expect(study1.technical.languages).toContain('JavaScript');
      expect(study1.technical.languages).toContain('TypeScript');
    });

    it('handles nested objects correctly', () => {
      const study1 = output.find((s: any) => s.id === 'test-company-1');

      expect(study1.asyncapi).toBeDefined();
      expect(Array.isArray(study1.asyncapi.versions)).toBe(true);
      expect(study1.asyncapi.versions).toContain('3.0.0');
    });

    it('handles multiple versions in asyncapi', () => {
      const study2 = output.find((s: any) => s.id === 'test-company-2');

      expect(Array.isArray(study2.asyncapi.versions)).toBe(true);
      expect(study2.asyncapi.versions.length).toBe(2);
      expect(study2.asyncapi.versions).toContain('2.6.0');
      expect(study2.asyncapi.versions).toContain('3.0.0');
    });
  });

  describe('Default Options', () => {
    it('uses default paths when options not provided', async () => {
      // This test uses the actual config directory
      // We'll just verify the function doesn't throw
      await expect(runCaseStudies()).resolves.not.toThrow();
    });
  });

  describe('Custom Options', () => {
    it('uses custom case study directory when provided', async () => {
      const customDir = resolve(tempDir, 'custom-casestudies');
      const customOutput = resolve(tempDir, 'custom-output.json');

      await fs.mkdir(customDir, { recursive: true });

      const customCaseStudy = `id: custom-test
company:
  name: Custom Test Company
  description: Custom directory test
`;

      await fs.writeFile(join(customDir, 'custom.yml'), customCaseStudy, 'utf-8');

      await runCaseStudies({
        caseStudyDirectory: customDir,
        outputPath: customOutput
      });

      const content = await fs.readFile(customOutput, 'utf-8');
      const customOutputData = JSON.parse(content);

      expect(customOutputData.length).toBe(1);
      expect(customOutputData[0].id).toBe('custom-test');
      expect(customOutputData[0].company.name).toBe('Custom Test Company');
    });

    it('uses custom output path when provided', async () => {
      const customOutput = resolve(tempDir, 'custom-location', 'output.json');

      await fs.mkdir(resolve(tempDir, 'custom-location'), { recursive: true });

      await runCaseStudies({
        caseStudyDirectory: caseStudyDir,
        outputPath: customOutput
      });

      const fileExists = await fs
        .access(customOutput)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);

      const content = await fs.readFile(customOutput, 'utf-8');
      const data = JSON.parse(content);

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('throws CustomError when case study directory does not exist', async () => {
      const nonExistentDir = resolve(tempDir, 'non-existent-dir');

      await expect(
        runCaseStudies({
          caseStudyDirectory: nonExistentDir,
          outputPath
        })
      ).rejects.toThrow(CustomError);
    });

    it('wraps errors in CustomError with proper context', async () => {
      const nonExistentDir = resolve(tempDir, 'non-existent-dir');

      try {
        await runCaseStudies({
          caseStudyDirectory: nonExistentDir,
          outputPath
        });
        throw new Error('Expected error to be thrown');
      } catch (error) {
        if (error instanceof Error && error.message === 'Expected error to be thrown') {
          throw error;
        }
        expect(error).toBeInstanceOf(CustomError);
        const customError = error as CustomError;

        expect(customError.context.category).toBe('script');
        expect(customError.context.operation).toBe('runCaseStudies');
        expect(customError.context.detail).toBeDefined();
        expect(customError.context.detail).toContain('Case studies build failed');
      }
    });

    it('handles invalid YAML files gracefully', async () => {
      const invalidDir = resolve(tempDir, 'invalid-casestudies');
      const invalidOutput = resolve(tempDir, 'invalid-output.json');

      await fs.mkdir(invalidDir, { recursive: true });

      // Create invalid YAML file
      const invalidYaml = `id: invalid
company:
  name: Invalid Company
  invalid: [unclosed bracket
`;

      await fs.writeFile(join(invalidDir, 'invalid.yml'), invalidYaml, 'utf-8');

      await expect(
        runCaseStudies({
          caseStudyDirectory: invalidDir,
          outputPath: invalidOutput
        })
      ).rejects.toThrow();
    });

    it('handles empty case study directory', async () => {
      const emptyDir = resolve(tempDir, 'empty-casestudies');
      const emptyOutput = resolve(tempDir, 'empty-output.json');

      await fs.mkdir(emptyDir, { recursive: true });

      await runCaseStudies({
        caseStudyDirectory: emptyDir,
        outputPath: emptyOutput
      });

      const content = await fs.readFile(emptyOutput, 'utf-8');
      const data = JSON.parse(content);

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles case study with minimal required fields', async () => {
      const minimalDir = resolve(tempDir, 'minimal-casestudies');
      const minimalOutput = resolve(tempDir, 'minimal-output.json');

      await fs.mkdir(minimalDir, { recursive: true });

      const minimalCaseStudy = `id: minimal
company:
  name: Minimal Company
`;

      await fs.writeFile(join(minimalDir, 'minimal.yml'), minimalCaseStudy, 'utf-8');

      await runCaseStudies({
        caseStudyDirectory: minimalDir,
        outputPath: minimalOutput
      });

      const content = await fs.readFile(minimalOutput, 'utf-8');
      const data = JSON.parse(content);

      expect(data.length).toBe(1);
      expect(data[0].id).toBe('minimal');
      expect(data[0].company.name).toBe('Minimal Company');
    });

    it('handles case study with all optional fields', async () => {
      const fullDir = resolve(tempDir, 'full-casestudies');
      const fullOutput = resolve(tempDir, 'full-output.json');

      await fs.mkdir(fullDir, { recursive: true });

      const fullCaseStudy = `id: full-test
company:
  name: Full Test Company
  description: Complete test case study
  customers: 50000
  industry: Technology
  revenue: 10M USD
  website: https://fulltest.com
  logo: /img/fulltest.svg
  contact:
    - name: John Doe
      link: https://linkedin.com/johndoe
challenges: |
  Multiple challenges
  across lines
solution: |
  Comprehensive solution
technical:
  languages:
    - Java
    - Kotlin
  frameworks:
    - Spring Boot
  protocols:
    - Kafka
    - MQTT
  brokers: Apache Kafka cluster
  testing: Unit and integration tests
  architecture: Microservices architecture
  codegen: Java code generation
schemas:
  description: Avro schemas
  storage: Git repository
  registry: Confluent Schema Registry
  validation: Schema validation enabled
  versioning: Semantic versioning
asyncapi:
  usecase: API documentation
  versions:
    - 2.6.0
    - 3.0.0
  storage: Git repository
  editing: VS Code
  maintainers: Development team
  audience:
    internal: true
    external: false
  extensions: Custom extensions
  documentation: Generated documentation
  bindings: Kafka bindings
  tools: AsyncAPI Generator
  fullExample: example.yaml
additionalResources: Additional resources link
`;

      await fs.writeFile(join(fullDir, 'full.yml'), fullCaseStudy, 'utf-8');

      await runCaseStudies({
        caseStudyDirectory: fullDir,
        outputPath: fullOutput
      });

      const content = await fs.readFile(fullOutput, 'utf-8');
      const data = JSON.parse(content);

      expect(data.length).toBe(1);
      const study = data[0];

      expect(study.id).toBe('full-test');
      expect(study.company.name).toBe('Full Test Company');
      expect(study.company.contact).toBeDefined();
      expect(Array.isArray(study.company.contact)).toBe(true);
      expect(study.technical.languages.length).toBe(2);
      expect(study.asyncapi.audience.internal).toBe(true);
      expect(study.asyncapi.audience.external).toBe(false);
    });

    it('handles multiple case studies correctly', async () => {
      // This is already tested in beforeAll, but let's verify the count
      expect(output.length).toBe(2);

      const ids = output.map((s: any) => s.id);

      expect(ids).toContain('test-company-1');
      expect(ids).toContain('test-company-2');
    });

    it('handles files with different extensions', async () => {
      const mixedDir = resolve(tempDir, 'mixed-extensions');
      const mixedOutput = resolve(tempDir, 'mixed-output.json');

      await fs.mkdir(mixedDir, { recursive: true });

      const yamlFile = `id: yaml-test
company:
  name: YAML Test
`;

      // Create both .yml and .yaml files
      await fs.writeFile(join(mixedDir, 'test1.yml'), yamlFile, 'utf-8');
      await fs.writeFile(join(mixedDir, 'test2.yaml'), yamlFile.replace('yaml-test', 'yaml-test-2'), 'utf-8');

      await runCaseStudies({
        caseStudyDirectory: mixedDir,
        outputPath: mixedOutput
      });

      const content = await fs.readFile(mixedOutput, 'utf-8');
      const data = JSON.parse(content);

      expect(data.length).toBe(2);
    });
  });

  describe('Idempotency', () => {
    it('produces same results when run multiple times', async () => {
      const firstRun = await fs.readFile(outputPath, 'utf-8');
      const firstData = JSON.parse(firstRun);

      // Run again
      await runCaseStudies({
        caseStudyDirectory: caseStudyDir,
        outputPath
      });

      const secondRun = await fs.readFile(outputPath, 'utf-8');
      const secondData = JSON.parse(secondRun);

      expect(firstData.length).toBe(secondData.length);
      expect(JSON.stringify(firstData)).toBe(JSON.stringify(secondData));
    });
  });

  describe('Function Export', () => {
    it('should export the runner function', async () => {
      expect(typeof runCaseStudies).toBe('function');
      // Verify it's a Promise-returning function
      const promise = runCaseStudies();

      expect(promise).toBeInstanceOf(Promise);
      // Await the Promise to handle any potential rejections
      await promise;
    });
  });
});
