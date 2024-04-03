 
 
const fs = require('fs'); 


/**
 * Writes content to a file with specified options.
 *
 * @param {string} uri - The URI of the file to be written.
 * @param {string|Object} content - The content to be written to the file.
 * @param {Object} options - Options for the write operation.
 * @param {string} options.datatype - The datatype of the content ('JSON' for JSON data). Defaults to null.
 * @param {boolean} options.merge - If true, merges existing JSON data with new data. Defaults to false.
 * @param {string} options.encoding - The encoding of the file. Defaults to 'utf-8'.
 * @returns {Object} - An object with information about the success of the write operation.
 * @throws {Object} - An object with error information if an exception occurs during the write operation.
 */ 
function writeFile(uri, content, options={}) { 
    var {datatype = null, merge = false, encoding = 'utf-8' }= options;
    
        
        try {
            if (datatype === 'JSON') {
                if (typeof content !== 'object') {
                    return { error: true, exception: "Content must be an object when datatype is set to 'JSON'" };
                }
    
                let existingData = {};
    
                // If merge is true, read existing JSON data from the file
                if (merge) {
                    try {
                        const existingContent = fs.readFileSync(uri, { encoding });
                        existingData = JSON.parse(existingContent);
                    } catch (readError) {
                        // Ignore read errors, assume no existing data
                    }
                }
    
                // Merge existing data with new data
                const mergedData = merge ? Object.assign({}, existingData, content) : content;
                content = JSON.stringify(mergedData, null, 4);
            }else{
                if(merge){
                    const existingContent = fs.readFileSync(uri, { encoding });
                    content=existingContent+content;
                }
            }
    
            try{
              fs.writeFileSync(uri, content, { encoding });
            }catch(e){
                console.error(e)
            }
            return {   code: 'WriteFileSuccess' ,uri:uri};
        } catch (error) {
            return { error: true, code: 'WriteFileError', exception: error.message };
        }
    } 
    
    
    module.exports = writeFile;