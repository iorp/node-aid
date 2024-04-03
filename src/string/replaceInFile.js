const readFile = require('../../src/filesystem/readFile');
const writeFile = require('../../src/filesystem/writeFile');
const replaceMultiple = require('../../src/string/replaceMultiple');

/**
 * Replace multiple occurrences in a file based on an array of replacement pairs.
 *
 * @param {string} inputPath - The path to the input file.
 * @param {string} [outputPath] - The path to the output file. If not provided, the input file will be overwritten.
 * @param {Array<Array<string>>} replacements - An array of arrays where each inner array contains
 *                                              two elements: the search term and its replacement.
 * @returns {Promise<void>} - A Promise that resolves once the replacement is complete and the file is written.
 * @throws {Error} - Throws an error if there is an issue reading or writing the file.
 */
function replaceInFile(inputPath, outputPath, replacements) {
  outputPath = outputPath ? outputPath : inputPath;

  //try {
    // Read content from the input file
    var file = readFile(inputPath);
   
    // Replace occurrences in the text
    text = replaceMultiple(file.data, replacements);

    // Write the modified text to the output file
    return writeFile(outputPath, text);
  // } catch (error) {
  //   throw new Error(`Error in replaceInFile: ${error.message}`);
  // }
}

module.exports = replaceInFile;
