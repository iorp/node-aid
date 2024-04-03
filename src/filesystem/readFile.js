 
 
const fs = require('fs');  


/**
 * Reads content from a file with specified options.
 *
 * @param {string} uri - The URI of the file to be read.
 * @param {Object} options - Options for the read operation.
 * @param {string} options.datatype - The datatype of the content ('JSON' for JSON data). Defaults to null.
 * @param {string} options.encoding - The encoding of the file. Defaults to 'utf-8'.
 * @returns {Object} - An object with information about the success of the read operation. Retrieve object.data or object.error
 * @throws {Object} - An object with error information if an exception occurs during the read operation.
 */ 
function readFile(uri, options={}) { 
    var {datatype = null, encoding = 'utf-8' }= options;
    
    try {
        const fileContents = fs.readFileSync(uri, { encoding });

        if (datatype === 'JSON') {
            try {
                return {  data: JSON.parse(fileContents) };
            } catch (jsonError) {
                return { error: true, exception: "JSON decoding error. The file may not contain valid JSON data." };
            }
        }

        return { code: 'ReadFileSuccess',data: fileContents };
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { error: true, code: 'ReadFileFileNotFoundError', exception: `File not found: ${uri}` };
        }
        return { error: true, exception: error.message };
    }
}
module.exports = readFile;