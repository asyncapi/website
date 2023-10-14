const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../utils');
const { resolve } = require('path');

const dirWithAdoptors = 'config/adoptors';
module.exports = async function buildAdoptorsList() {
    let files = await readdir(dirWithAdoptors);
    let AdoptorsList = [];
    try {
        for (let file of files) {
            const AdoptorsFileName = [dirWithAdoptors, file].join('/');
            const AdoptorsContent = await readFile(AdoptorsFileName, 'utf-8');
            const jsonContent = convertToJson(AdoptorsContent);
            
            AdoptorsList.push(jsonContent);
            await writeFile(
                resolve(__dirname, '../../config', 'adoptors.json'),
                JSON.stringify(AdoptorsList)
            )
        }
    } catch (err) {
        console.log(err);
        throw err
    }
};