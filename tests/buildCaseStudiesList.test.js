// buildCaseStudiesList.test.js
const { buildCaseStudiesList } = require('../scripts/casestudies/index');
const fs = require('fs').promises;
const path = require('path');
const { convertToJson } = require('../utils');

// Mocking the fs module
jest.mock('fs', () => {
  return {
    promises: {
      readdir: jest.fn(),
      readFile: jest.fn(),
      writeFile: jest.fn(),
    },
  };
});

// Mocking the convertToJson utility function
jest.mock('../utils', () => ({
  convertToJson: jest.fn(),
}));

describe('buildCaseStudiesList', () => {
  it('should read case studies, convert them to JSON, and write to a file', async () => {
    // Setting up 
    const mockCaseStudies = ['caseStudy1.yml', 'caseStudy2.yml'];
    const mockCaseStudyContent = 'case study content';
    const mockJsonContent = { title: 'Case Study' };
    fs.readdir.mockResolvedValue(mockCaseStudies);
    fs.readFile.mockResolvedValue(mockCaseStudyContent);
    convertToJson.mockReturnValue(mockJsonContent);
    const expectedFilePath = path.resolve(__dirname, '../../config', 'case-studies.json');
    const expectedFileContent = JSON.stringify([mockJsonContent, mockJsonContent]);

    // Executecuiton of the testing function
    await buildCaseStudiesList();

    // Assert
    expect(fs.readdir).toHaveBeenCalledWith('config/casestudies');
    expect(fs.readFile).toHaveBeenCalledTimes(mockCaseStudies.length);
    expect(convertToJson).toHaveBeenCalledTimes(mockCaseStudies.length);
    expect(fs.writeFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });
});