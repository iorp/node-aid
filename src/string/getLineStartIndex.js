
/**
 * Get the starting character index of a specified line in a multiline string.
 *
 * @param {string|string[]} lines - The multiline string.
 * @param {number} lineIndex - The index of the line for which to find the starting character index (1-indexed).
 * @returns {number} - The starting character index of the specified line or -1 if the line index is out of range.
 */
function getLineStartIndex(lines, lineIndex) {
    // Split the string into lines
    if(typeof lines ==='string') lines = lines.split('\n');
    if(!Array.isArray(lines)) {
        console.error('getLineStartIndex','lines must be string or string[]');
        return -1;
    }
 

    if (lineIndex < 0 || lineIndex >= lines.length) {
        // Line index is out of range
        console.error('getLineStartIndex','Out if range, it must be in range', 0,':',lines.length-1,'. And its ',lineIndex);

        return -1;
    }

    let currentLineIndex = 0;
    let currentLineLength = 0;

    for (let i = 0; i < lines.length; i++) {
        if (currentLineIndex === lineIndex) {
            // Found the specified line
            return currentLineLength;
        }

        currentLineLength += lines[i].length + 1; // Add 1 for the newline character
        currentLineIndex++;
    }

    // Line index is out of range
    return -1;
}  
module.exports=getLineStartIndex;

// // Example usage:
// const multilineString = "Line 1\nLine 2\nLine 3\n";
// const targetLineIndex = 2;
// const startIndex = getLineStartIndex(multilineString, targetLineIndex);

// console.log(startIndex); // Output: 7

