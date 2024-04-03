const extractClosure = require('./../string/extractClosure')
/**
 * Extracts a tree structure representing nested closures from a string.
 *
 * @param {string} str - The input string containing closures.
 * @param {Object} options - Configuration options for the extraction.
 * @param {Object} options.collector - A function that collects closure information.
 * @param {string} options.opener - The opening symbol of the closure.
 * @param {string} options.closer - The closing symbol of the closure.
 * @param {number} options.offset - An offset to adjust the positions of closures.
 * @param {Array<Array<string>>} options.excludes - Excluded patterns to ignore within closures.
 * @param {number} globalOffset - Additional global offset for position calculations.
 * @param {number} globalDepth - Additional depth for position calculations.
 * @returns {Object} - A tree structure representing the extracted closures.
 */
function extractClosureTree(str, options = {}, globalOffset = 0,globalDepth = 0) {
    options = Object.assign({
        collector: (collected, closure, options, globalOffset,globalDepth) => {
            collected[Object.keys(collected).length] = {
                '@match': closure.match,
                '@matchInner': closure.matchInner,
                '@start': closure.start + globalOffset,
                '@end': closure.end + globalOffset,
                '@depth':globalDepth,
                ...extractClosureTree(closure.match.slice(1, -1), { ...options, offset: 0 }, globalOffset + closure.start + options.opener.length,globalDepth+1),
                // the children can be grouped in a key
                // children:extractClosureTree(closure.match.slice(1, -1),{...options,offset:0},globalOffset+closure.start+options.opener.length)//+1 because we have sliced the closure symbol recurse(closure.match.slice(1, -1),level+1)
                // the children can be spread
                //...extractClosureTree(closure.match.slice(1, -1),{...options,offset:0},globalOffset+closure.start+options.opener.length,globalDepth+1)//+1 because we have sliced the closure symbol recurse(closure.match.slice(1, -1),level+1)
   
           
            };
        },
        opener: '{',
        closer: '}',
        offset: 0,
        excludes: [
            ['"', '"'],
            [`'`, `'`],
            ['`', '`'],
            ['/*', '*/'],
            ['//', '\n'],
        ],
    }, options);

    var { opener, closer, offset, excludes } = options;
    var i = 0;
    var collected = {};

    while (i < str.length) {
        var closure = extractClosure(str, { ...options, offset: i });
        if (!closure) {
            break;
        } else {
            options.collector(collected, closure, options, globalOffset,globalDepth);
            i = closure.end + 1;
        }
    }

    return collected;
}  
module.exports=extractClosureTree;

