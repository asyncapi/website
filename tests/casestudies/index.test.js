const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../../scripts/utils');
const { resolve } = require('path');
const buildCaseStudiesList = require('../../scripts/casestudies/index');
const { caseStudyContentYaml, caseStudyContentJson, malformedYaml } = require('../fixtures/caseStudyData');

jest.mock('fs', () => ({
  promises: {
    readdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

jest.mock('../../scripts/utils', () => ({
  convertToJson: jest.fn(),
}));

describe('buildCaseStudiesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should read files, convert to JSON, and write to case-studies.json', async () => {
    const dirWithCaseStudy = 'config/casestudies';
    const files = ['casestudy1.yml', 'casestudy2.yml'];
    const caseStudyContent1 = caseStudyContentYaml;
    const caseStudyContent2 = caseStudyContentYaml;
    const jsonContent1 = caseStudyContentJson;
    const jsonContent2 = caseStudyContentJson;
    const caseStudiesJsonPath = resolve(__dirname, '../../config', 'case-studies.json');

    readdir.mockResolvedValue(files);
    readFile.mockResolvedValueOnce(caseStudyContent1).mockResolvedValueOnce(caseStudyContent2);
    convertToJson.mockReturnValueOnce(jsonContent1).mockReturnValueOnce(jsonContent2);

    await buildCaseStudiesList();

    expect(readdir).toHaveBeenCalledWith(dirWithCaseStudy);
    expect(readFile).toHaveBeenCalledWith(`${dirWithCaseStudy}/casestudy1.yml`, 'utf-8');
    expect(readFile).toHaveBeenCalledWith(`${dirWithCaseStudy}/casestudy2.yml`, 'utf-8');
    expect(convertToJson).toHaveBeenCalledWith(caseStudyContent1);
    expect(convertToJson).toHaveBeenCalledWith(caseStudyContent2);
    expect(writeFile).toHaveBeenCalledWith(caseStudiesJsonPath, JSON.stringify([jsonContent1]));
    expect(writeFile).toHaveBeenCalledWith(caseStudiesJsonPath, JSON.stringify([jsonContent1, jsonContent2]));
  });

  test('should throw an error if directory does not exist', async () => {
    readdir.mockRejectedValue(new Error('ENOENT: no such file or directory'));

    await expect(buildCaseStudiesList()).rejects.toThrow('ENOENT: no such file or directory');
  });

  test('should throw an error if a file cannot be read', async () => {
    const files = ['casestudy1.yml', 'casestudy2.yml'];

    readdir.mockResolvedValue(files);
    readFile.mockResolvedValueOnce(caseStudyContentYaml)
            .mockRejectedValueOnce(new Error('ERROR: cannot read file'));

    await expect(buildCaseStudiesList()).rejects.toThrow('ERROR: cannot read file');
  });

  test('should throw an error if YAML is malformed', async () => {

    const files = ['file.yml'];

    readdir.mockResolvedValue(files);
    readFile.mockResolvedValueOnce(malformedYaml);
    convertToJson.mockImplementationOnce(() => {
      throw new Error('Invalid YAML');
    });

    await expect(buildCaseStudiesList()).rejects.toThrow('Invalid YAML');
  });

  test('should throw an error if writing to case-studies.json fails', async () => {
    const files = ['casestudy1.yml'];

    readdir.mockResolvedValue(files);
    readFile.mockResolvedValueOnce(caseStudyContentYaml);
    convertToJson.mockReturnValueOnce(caseStudyContentJson);
    writeFile.mockRejectedValueOnce(new Error("ERROR: cannot read file"));

    await expect(buildCaseStudiesList()).rejects.toThrow("ERROR: cannot read file");
  });
});