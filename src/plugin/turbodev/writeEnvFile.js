 
const fs = require('fs'); 
 
const readEnvFile=require('../../../src/plugin/turbodev/readEnvFile');

  
/**
 * Writes variables to a .env file.
 *
 * @param {string} filePath - The path to the .env file.
 * @param {Object} data - An object containing key-value pairs to be written to the .env file.
 * @param {boolean} merge - If true, merge the new data with existing data using Object.assign.
 * @returns {Object} - If an error occurs, returns an error object with the following properties:
 *                    - error (boolean): true
 *                    - code (string): 'EnvWriteError'
 *                    - exception (string): The exception message.
 *                    If successful, returns an object with the code 'EnvWriteSuccess'.
 */
function writeEnvFile(filePath, data, merge = false) {
  try {
    let existingData = {};

    // If merge is true, read existing data from the file
    if (merge) {
      const existingResult = readEnvFile(filePath);
      if (!existingResult.error) {
        existingData = existingResult.data;
      }
    }

    const combinedData = merge ? Object.assign({}, existingData, data) : data;

    const lines = [];
    for (const key in combinedData) {
      if (Object.prototype.hasOwnProperty.call(combinedData, key)) {
        lines.push(`${key}=${combinedData[key]}`);
      }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return { code: 'EnvWriteSuccess' };
  } catch (error) {
    return { error: true, code: 'EnvWriteError', exception: error.message };
  }
}
 
 
module.exports = writeEnvFile;