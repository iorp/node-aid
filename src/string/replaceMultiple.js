/**
 * Replace multiple occurrences in a string based on an array of replacement pairs.
 *
 * @param {string} inputString - The input string to be modified.
 * @param {Array<Array<string>>} replacements - An array of arrays where each inner array contains
 *                                              two elements: the search term and its replacement.
 * @returns {string} - The modified string after all replacements.
 * @throws {Error} - Throws an error if replacements is not an array of arrays.
 */
function replaceMultiple(inputString, replacements) {
    if (!Array.isArray(replacements)) {
      throw new Error('Replacements must be an array of arrays');
    }
  
    return replacements.reduce((result, [search, replace]) => {
      return result.split(search).join(replace);
    }, inputString);
  }
  module.exports =replaceMultiple
  
//   // Example usage:
//   const inputString = 'apple banana cherry';
//   const replacementPairs = [['apple', 'orange'], ['banana', 'grape'], ['cherry', 'strawberry']];
  
//   const result = replaceMultiple(inputString, replacementPairs);
//   console.log(result);
  