const extractClosure = require('./../../src/string/extractClosure')

/**
 * Parses a string into a list of items separated by a specified separator.
 * @deprecated use xplit
 * @todo replace by xplit from everiwhere
 * @param {string} str - The input string to be parsed into a list.
 * @param {Object} options - Options for the parsing operation.
 * @param {string} options.separator - The separator character between list items. Defaults to ','.
 * @param {number} options.offset - The starting position in the string. Defaults to 0.
 * @param {Array} options.excluders - Array of exclusion pairs represented as arrays. Defaults to [
 *                                      ['"', '"'],
 *                                      [`'`, `'`],
 *                                      ['`', '`'],
 *                                      ['{', '}'],
 *                                      ['[', ']'],
 *                                      ['(', ')']
 *                                    ].
 * @returns {Array} - An array containing the parsed items from the input string.
 */
// 
function parseList(str, options={}) {
    var {separator = ",", offset = 0, excluders = [
        ['"', '"'],
        [`'`, `'`],
        ['`', '`'],
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ]}= options;
    /**
     * Checks if the character at the given position is part of an exclusion pair.
     * If so, returns the content of the exclusion pair; otherwise, returns an empty string.
     *
     * @param {string} str - The input string.
     * @param {number} i - The current position in the string.
     * @returns {string} - The content of the exclusion pair or an empty string.
     */

    const excludedChars = (str, i) => {
        let c = str[i];

        for (let j = 0; j < excluders.length; j++) {
            let e = excluders[j];

            if (c == e[0]) {
                let closure = extractClosure(str, {opener :e[0], closer :e[1]});

                // let closure = extractClosure(str, e[0], e[1], i,[]);
                // console.log(str, e[0], e[1],closure)
                if (closure!= null) { 
                    return closure.match ;
                }
            }
        }

        return '';
    }

    let exclusion = null;
    let out = [];
    let accumulator = '';

    for (let i = 0; i < str.length; i++) {
        let c = str[i];
 
        let excluded = excludedChars(str, i);
  

        if (excluded.length > 0) {
            i += excluded.length - 1;
            accumulator = accumulator + excluded;
            continue;
        }
        
        //if (c === separator) {
        if (str.substring(i, i + separator.length) === separator  && 
        !(separator.length && str.substring(i - 1,i) === '\\'))   {
        
            out.push(accumulator);
            accumulator = '';
            i+=separator.length-1;
            continue;
        } else {
            accumulator += c;
        }
    }

    // Push the last accumulated argument (if any)
    if (accumulator.length > 0) {
        out.push(accumulator);
    }

    return out;
}  
module.exports=parseList;