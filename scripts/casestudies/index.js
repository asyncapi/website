const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../../scripts/utils');

module.exports = async function buildCaseStudiesList(dirWithCaseStudy, writeFilePath) {
    try {
        let files = await readdir(dirWithCaseStudy);
        let caseStudiesList = [];
        for (let file of files) {
            const caseStudyFileName = [dirWithCaseStudy, file].join('/');
            const caseStudyContent = await readFile(caseStudyFileName, 'utf-8');
            const jsonContent = convertToJson(caseStudyContent);

            caseStudiesList.push(jsonContent);
            await writeFile(writeFilePath, JSON.stringify(caseStudiesList))
        }
    } catch (err) {
        throw new Error(err);
    }
};
