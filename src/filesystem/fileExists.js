 
 
const fs = require('fs'); 


/**
 * Synchronously checks if a file exists at the given path.
 *
 * @param {string} uri - The path to the file.
 * @returns {boolean} - True if the file exists, false otherwise.
 */
function fileExists(uri) {
    try {
        fs.accessSync(uri);
        return true; // File exists
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // File does not exist
        }
        throw error; // Propagate other errors
    }
}

module.exports = fileExists;