 
const dotenv = require('dotenv'); 
 

  

/**
 * Reads variables from a .env file.
 *
 * @param {string} filePath - The path to the .env file.
 * @returns {Object} - If successful, returns an object with the data read from the .env file.
 *                    If unsuccessful, returns an error object with the following properties:
 *                    - error (boolean): true
 *                    - code (string): 'EnvReadError'
 *                    - exception (string): The exception message.
 */
function readEnvFile(filePath) {
  try {
    const data = dotenv.config({ path: filePath }).parsed;
    if (!data) {
      throw new Error('No data found in the .env file');
    }
    return { data };
  } catch (error) {
    return { error: true, code: 'EnvReadError', exception: error.message };
  }
}



module.exports = readEnvFile;