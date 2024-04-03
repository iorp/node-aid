// todo bring to strings 
function replaceRange(inputString, startIndex, endIndex, replacement) {
    if (startIndex < 0 || endIndex >= inputString.length || startIndex > endIndex) {
      // Handle invalid range
      console.error("Invalid range");
      return null;
    }
  
    // Replace the specified range with the new string
    var modifiedString = inputString.slice(0, startIndex) + replacement + inputString.slice(endIndex + 1);
  
    return modifiedString;
  }
  
/**
 * Extracts a closure from a string based on provided opener and closer characters.
 *
 * @param {string} haystack - The input string from which to extract the closure.
 * @param {Object} options - Options for the extraction operation.
 * @param {string} options.opener - The opening character of the closure. Defaults to '{'.
 * @param {string} options.closer - The closing character of the closure. Defaults to '}'.
 * @param {number} options.offset - The starting position in the string. Defaults to 0.
 * @param {Array} options.excludes - Array of exclusion pairs represented as arrays. Defaults to [
      ['"', '"'],
      [`'`, `'`],
      ['`', '`'],
      ['/*', '*\/'],
      ['//', '\n']
    ].
 * @returns {string|null} - The extracted closure or null if no closure is found.
 */
 
function xplit(haystack,needle, options={}) { 
    options=   Object.assign({ 
        offset: 0,
         excludes : [
            ['"', '"'],
        [`'`, `'`],
        ['`', '`'],
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
            ['/*', '*/'],
            ['//', '\n']
        ]
    },options);
    var { offset, excludes }= options;
    
    let start = -1;
    let level = 0;
    let exclusion = null;
    let q= false; // if opener==closer acts like a is open flag
    let k =false; // if opener==closer acts like a is opened in this cicle flag
    // Adjust the string based on the offset
    haystack = haystack.substring(offset);
    var found = [];
    var lastStartCharIndex =0;
    var previousEndCharIndex =0;
    // Loop through each character in the adjusted string
    for (let i = 0; i < haystack.length; i++) {
        k=false;
        // Look for exclusion openers and closers
        if (exclusion === null) {
            // Exclusion starter
            for (let j = 0; j < excludes.length; j++) {
                 
                if(!excludes[j])continue;
                const [exclusionStart, exclusionEnd] = excludes[j];

                
                 
                if (haystack.substring(i, i + exclusionStart.length) === exclusionStart &&
                !(exclusionStart.length === 1 && haystack.substring(i - 1,i) === '\\')) { 
                    exclusion = j;
                   break;
                }
            }
        } else {
            // Exclusion ender
            const [exclusionStart, exclusionEnd] = excludes[exclusion];

            if (haystack.substring(i, i + exclusionEnd.length) === exclusionEnd &&
                !(exclusionEnd.length === 1 && haystack.substring(i - 1) === '\\')) {
                exclusion = null;
            }
        }

        if (exclusion !== null) continue;

        if (haystack.substring(i, i + needle.length) === needle  && haystack.substring(i - 1) != '\\') {
            lastStartCharIndex= i + + needle.length
          
            found.push(haystack.substring(previousEndCharIndex,i))
            previousEndCharIndex =i + needle.length; 

           
        }
 
    }
     
    found.push(haystack.substring(lastStartCharIndex))
    // uninverted
   // found.sort((a, b) => a.keya - b.keya);
    // inverted 
     // found.sort((a, b) => b.keya - a.keya);

    //   var result = [];
    //   found.forEach(part => {
    //         result.push(haystack.substring(part.start))
    //   });






    return  found
}  
module.exports=xplit;

