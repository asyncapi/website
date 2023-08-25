const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../utils');
const { resolve } = require('path');

const dirWithCaseStudy = 'config/casestudies';
module.exports = async function buildCaseStudiesList() {
    let files = await readdir(dirWithCaseStudy);
    let caseStudiesList = [];
    try {
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
        console.log(err);
        throw err
    }
};