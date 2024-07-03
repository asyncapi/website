const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../../scripts/utils');
const { resolve } = require('path');
const buildCaseStudiesList = require('../../scripts/casestudies/index');
const {caseStudyContentyaml,caseStudyContentJson} = require('../fixtures/caseStudyData')

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
    const caseStudyContent1 = caseStudyContentyaml;
    const caseStudyContent2 = caseStudyContentyaml;
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

  test('should throw an error if an error occurs', async () => {
    const error = new Error('Test error');
    readdir.mockRejectedValue(error);

    await expect(buildCaseStudiesList()).rejects.toThrow(`Error: ${error.message}`);

  });
});
