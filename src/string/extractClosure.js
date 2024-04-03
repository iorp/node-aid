
/**
 * Extracts a closure from a string based on provided opener and closer characters.
 *
 * @param {string} str - The input string from which to extract the closure.
 * @param {Object} options - Options for the extraction operation.
 * @param {string} options.opener - The opening character of the closure. Defaults to '{'.
 * @param {string} options.closer - The closing character of the closure. Defaults to '}'.
 * @param {number} options.offset - The starting position in the string. Defaults to 0.
 * @param {Array} options.excludes - Array of exclusion pairs represented as arrays. Defaults to [
 *                                    ['"', '"'],
 *                                    [`'`, `'`],
 *                                    ['`', '`'],
 *                                    ['/*', '*\/'],
 *                                    ['//', '\n']
 *                                  ].
 * @returns {string|null} - The extracted closure or null if no closure is found.
 */
 
function extractClosure(str, options={}) { 
    options=   Object.assign({
        opener :'{', closer : '}', 
        offset: 0,
         excludes : [
            ['"', '"'],
            [`'`, `'`],
            ['`', '`'],
            ['/*', '*/'],
            ['//', '\n']
        ]
    },options);
    var {opener , closer, offset, excludes }= options;
    
    let start = -1;
    let level = 0;
    let exclusion = null;
    let q= false; // if opener==closer acts like a is open flag
    let k =false; // if opener==closer acts like a is opened in this cicle flag
    // Adjust the string based on the offset
    str = str.substring(offset);

    // Loop through each character in the adjusted string
    for (let i = 0; i < str.length; i++) {
        k=false;
        // Look for exclusion openers and closers
        if (exclusion === null) {
            // Exclusion starter
            for (let j = 0; j < excludes.length; j++) {
                const [exclusionStart, exclusionEnd] = excludes[j];

                // Exclusion starter
                if (str.substring(i, i + exclusionStart.length) === exclusionStart &&
                    !(exclusionStart.length === 1 && str.substring(i - 1) === '\\')) {
                    exclusion = j;
                    break;
                }
            }
        } else {
            // Exclusion ender
            const [exclusionStart, exclusionEnd] = excludes[exclusion];

            if (str.substring(i, i + exclusionEnd.length) === exclusionEnd ) {
                // no escaping 
              //!(exclusionEnd.length === 1 && str.substring(i - 1) === '\\')
                    // @todo test this 
                //!(exclusionEnd.length === 1 && str.substring(i - 1,i) === '\\')) {
                     
                exclusion = null;
            }
        }

        if (exclusion !== null) continue;

 

        // Find main opener and closer 
        if (str.substring(i, i + opener.length) === opener  && str.substring(i - 1) != '\\')   {
           
            if(opener==closer){
                if(!q){
                    k=true;
                    q=true;
                    level++; if (start < 0) start = i;
                }
                
            }else{ 
            level++;  if (start < 0) start = i;
        }
        }

       // if (str.substring(i, i + closer.length) === closer) {
        if (str.substring(i, i + closer.length) === closer  && str.substring(i - 1) != '\\')   {
            if(opener==closer){
                if(!k){  
                    level--; 
                }
            }else{
                    level--;
                }
             
         }


        //  console.log(i,level,str[i])
        if (level === 0 && start >= 0) {
            var match = str.substring(start, i + closer.length);
            // Return the extracted content
            // if(!inclusive) match = match.slice(1, -1);

            return {
                match:match,
                matchInner:match.trim().slice(1, -1),
                start:offset+start, // global 
                end:offset+i + closer.length-1,// global 
                ostart:start, // within offset 
                oend:i + closer.length-1,// within offset 
            } 
        }
    }

    // Return null if no closure is found
    return  null
}  
module.exports=extractClosure;

