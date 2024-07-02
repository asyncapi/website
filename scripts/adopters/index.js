const { resolve } = require('path');
<<<<<<< HEAD
const writeJSON = require('../utils/write-json')
=======
const writeJSON = require('../utils/readAndWriteJson.js')
>>>>>>> master

module.exports = async function buildAdoptersList() {
    writeJSON('config/adopters.yml',resolve(__dirname, '../../config', 'adopters.json'));
};
