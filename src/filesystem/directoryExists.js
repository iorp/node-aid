 
 
const fs = require('fs'); 


/**
 * Synchronously checks if a directory exists at the given path.
 *
 * @param {string} uri - The path to the directory.
 * @returns {boolean} - True if the directory exists, false otherwise.
 */
function directoryExists(uri) {
    try {
        const stats = fs.statSync(uri);
        return stats.isDirectory();
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // Directory does not exist
        }
        throw error; // Propagate other errors
    }
}

module.exports = directoryExists;