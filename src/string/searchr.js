/**
 * Searches for matches in an input string using a regular expression.
 *
 * @param {RegExp} regex - The regular expression pattern.
 * @param {string} inputString - The input string to search for matches.
 * @returns {Array<Object>} - An array of match details.
 * @property {string} match - The original matched string (found at match[0]).
 * @property {number} start - The starting index of the match.
 * @property {number} end - The ending index of the match.
 */
function searchr(regex, inputString) {
  const matches = [];

  // Ensure the global flag is set
  if (!regex.global) {
    throw new Error('Regular expression must have the global flag set (e.g., /pattern/g)');
  }

  let match;
  while ((match = regex.exec(inputString)) !== null) {
    matches.push({
      match: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });

    // Reset the lastIndex property to avoid an infinite loop
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
  }

  return matches;
}

module.exports = searchr;
