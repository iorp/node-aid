 
 
const fs = require('fs'); 


/**
 * Synchronously checks if a path (file or directory) exists at the given path.
 *
 * @param {string} uri - The path to the file or directory.
 * @returns {boolean} - True if the path exists, false otherwise.
 */
function pathExists(uri) {
    try {
        fs.accessSync(uri);
        return true; // Path exists
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // Path does not exist
        }
        throw error; // Propagate other errors
    }
}
module.exports = pathExists;