const { resolve } = require('path');
const writeJSON = require('../utils/readAndWriteJson.js')

module.exports = async function buildAdoptersList() {
    writeJSON('config/adopters.yml',resolve(__dirname, '../../config', 'adopters.json'));
};
