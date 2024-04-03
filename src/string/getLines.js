

// /**
//  * Split a multiline string into an array of lines.
//  *
//  * @param {string|string[]} line - The multiline string.
//  * @param {number} [from=0] - The starting index of the range (inclusive).
//  * @param {number|null} [to=null] - The ending index of the range (exclusive). If null, it goes until the end of the string.
//  * @returns {string[]} - An array containing individual lines of the input string within the specified range.
//  */
// function getLines(lines, from = 0, to = null) {
//     if(typeof lines ==='string') lines = lines.split('\n');
//     if(!Array.isArray(lines)) {console.error('getLines','lines must be string or [string]')}
  
    
//     if (to === null) {
//         return lines.slice(from);
//     } else {
//         return lines.slice(from, to);
//     }
// }  
// module.exports=getLines;


/**
 * Get a specified number of lines from a multiline string starting at a given index.
 *
 * @param {string} str - The multiline string.
 * @param {number} startIndex - The starting index to begin retrieving lines.
 * @param {number} lineCount - The number of lines to retrieve.
 * @returns {string[]} - An array containing the requested lines.
 */
function getLines(str, startIndex=0, lineCount=null) {
  
    if(typeof str !=='string') {
        console.error("getLines",'Requires the first element to be string ',typeof str, 'provided.')
    }     
    const lines = str.split('\n');
    const result = [];
    if(lineCount===null || lineCount>lines.length) lineCount = lines.length;
    for (let i = startIndex; i < lines.length && i < startIndex + lineCount; i++) {
        result.push(lines[i]);
    }

    return result;
}  
module.exports=getLines;

// // Example usage:
// const multilineString = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\n";
// const allLines = getLines(multilineString);
// console.log(allLines);
// // Output: [ 'Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5', '' ]

// const startIndex = 2;
// const linesToRetrieve = 3;
// const selectedLines = getLinesFromIndex(multilineString, startIndex, linesToRetrieve);
// console.log(selectedLines);
// // Output: [ 'Line 3', 'Line 4', 'Line 5' ]

