
 /**
 * Get the line number in a multiline string for a given character index.
 *
 * @param {string|string[]} lines - The multiline string or the lines string array.
 * @param {number} charIndex - The index of the character for which to find the line number.
 * @returns {number} - The line number (1-indexed) or -1 if the character is beyond the end of the string.
 */
 function getLineNumber(lines, charIndex) {
    // Split the string into lines
    if(typeof lines ==='string') lines = lines.split('\n');
    if(!Array.isArray(lines)) {console.error('getLineNumber','lines must be string or [string]')}
     

    let currentLineIndex = 0;
    let currentLineLength = 0;

    for (let i = 0; i < lines.length; i++) {
        currentLineLength += lines[i].length + 1; // Add 1 for the newline character

        if (currentLineLength > charIndex) {
            // The character is in the current line
            return currentLineIndex; 
        }

        currentLineIndex++;
    }

    // Character is beyond the end of the string
    return -1;
}  
module.exports=getLineNumber;
