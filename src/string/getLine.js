/**
 * Get the line content in a multiline string for a given line index.
 *
 * @param {string|string[]} lines - The multiline string or the lines string array.
 * @param {number} lineIndex - The index of the line for which to find the line content of.
 * @returns {number} - The line number (1-indexed) or -1 if the character is beyond the end of the string.
 */

function getLine(lines,lineIndex){
    // Split the string into lines
    if(typeof lines ==='string') lines = lines.split('\n');
    if(!Array.isArray(lines)) {console.error('getLineNumber','lines must be string or [string]')}
       return lines[lineIndex]
   }  
   module.exports=getLine;
   // // Example usage:
   // const multilineString = "Line 1\nLine 2\nLine 3\n";
   // const characterIndex = 10; // Index of '2' in "Line 2"
   // const lineNumber = getLineNumber(multilineString, characterIndex);
   
   // console.log(lineNumber); // Output: 2
   