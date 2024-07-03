const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../../scripts/utils');
const { resolve } = require('path');

const dirWithCaseStudy = 'config/casestudies';
module.exports = async function buildCaseStudiesList() {
    try {
        let files = await readdir(dirWithCaseStudy);
        let caseStudiesList = [];
        for (let file of files) {
            const caseStudyFileName = [dirWithCaseStudy, file].join('/');
            const caseStudyContent = await readFile(caseStudyFileName, 'utf-8');
            const jsonContent = convertToJson(caseStudyContent);
            
            caseStudiesList.push(jsonContent);
            await writeFile(
                resolve(__dirname, '../../config', 'case-studies.json'),
                JSON.stringify(caseStudiesList)
            )
        }
    } catch (err) {
        throw new Error(err);
    }
};
