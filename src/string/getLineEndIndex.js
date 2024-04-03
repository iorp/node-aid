
/**
 * Get the character index of the end of a specified line in a multiline string.
 *
 * @param {string|string[]} lines - The multiline string.
 * @param {number} lineIndex - The index of the line for which to find the character index (1-indexed).
 * @param {boolean} inclusive - Whether the ending character index should be inclusive (default is false).
 * @returns {number} - The character index of the end of the specified line or -1 if the line index is out of range.
 */
function getLineEndIndex(lines, lineIndex, inclusive = true) {
    // Split the string into lines
    if (typeof lines === 'string') lines = lines.split('\n');
    if (!Array.isArray(lines)) {
        console.error('getLineEndIndex', 'lines must be string or string[]');
        return -1;
    }

    if (lineIndex < 0 || lineIndex >= lines.length) {
        console.error('getLineEndIndex','Out if range, it must be in range', 0,':',lines.length-1,'. And its ',lineIndex);

        return -1;
    }

    let currentLineIndex = 0;
    let currentLineLength = 0;

    for (let i = 0; i < lines.length; i++) {
        if (currentLineIndex === lineIndex) {
            // Found the specified line
            const endIndex = currentLineLength + lines[i].length;
            return inclusive ? endIndex : Math.max(endIndex - 1, 0); // Ending character index
        }

        currentLineLength += lines[i].length + 1; // Add 1 for the newline character
        currentLineIndex++;
    }

    // Line index is out of range, return the end of the last line
    return currentLineLength;
}  
module.exports=getLineEndIndex;


