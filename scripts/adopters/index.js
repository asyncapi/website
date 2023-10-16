const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../utils');
const { resolve } = require('path');

const dirWithAdopters = 'config/adopters';
module.exports = async function buildAdoptersList() {
    let files = await readdir(dirWithAdopters);
    let AdoptersList = [];
    try {
        for (let file of files) {
            const AdoptersFileName = [dirWithAdopters, file].join('/');
            const AdoptersContent = await readFile(AdoptersFileName, 'utf-8');
            const jsonContent = convertToJson(AdoptersContent);
            
            AdoptersList.push(jsonContent);
            await writeFile(
                resolve(__dirname, '../../config', 'adopters.json'),
                JSON.stringify(AdoptersList)
            )
        }
    } catch (err) {
        console.log(err);
        throw err
    }
};