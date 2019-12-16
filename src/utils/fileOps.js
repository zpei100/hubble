const fs = require('fs');
const { promisify } = require('util')


const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const recordResult = data => appendFile(csvFileName, data);

module.exports = {
    readFile, writeFile, appendFile, recordResult
}