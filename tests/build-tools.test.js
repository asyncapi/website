const { readFileSync, rmSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { getData } = require('../scripts/tools/extract-tools-github');
const { convertTools } = require('../scripts/tools/tools-object');
const { combineTools } = require('../scripts/tools/combine-tools');
const { buildTools } = require('../scripts/build-tools');
const { tagsData, manualTools, mockConvertedData, initialToolsData, mockExtractData } = require('../tests/fixtures/buildToolsData');

jest.mock('../scripts/tools/extract-tools-github');
jest.mock('../scripts/tools/tools-object');
jest.mock('../scripts/tools/combine-tools');

describe('buildTools', () => {
    const testDir = resolve(__dirname, 'test_config');
    const toolsPath = resolve(testDir, 'tools.json');
    const tagsPath = resolve(testDir, 'all-tags.json');
    const automatedToolsPath = resolve(testDir, 'tools-automated.json');
    const manualToolsPath = resolve(testDir, 'tools-manual.json');

    beforeAll(() => {
        mkdirSync(testDir, { recursive: true });

        writeFileSync(tagsPath, JSON.stringify(tagsData));
        writeFileSync(automatedToolsPath, JSON.stringify(mockConvertedData));
        writeFileSync(manualToolsPath, JSON.stringify(manualTools));
        writeFileSync(toolsPath, JSON.stringify(initialToolsData));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle file write errors', async () => {

    });
});
