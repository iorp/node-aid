

// category A :  like param :  param,property,typedef
//* @param {string} name - The name parameter.
//* @param {string} [uri='default value'] - The path of the folder to start the conversion.

// category B:  tag only : function, component , ignore,description,namespace 
//* @function

// category C : tag & text : description, memberOf,name 
//* @name sayHello 

// category D : like returns : returns , throws
 //* @returns {string} A formatted greeting.
 
 // category E : like example, capture multiline until the next @ : example
 //* @example
 //* myExample(123) 


const extractClosure = require("../../../string/extractClosure");
const xplit = require("../../../string/xplit");
const ageti = require("../../../array/ageti");
 /**
 * Serialize a docblock string into a structured format.
 *
 * @param {string} str - The docblock string to be serialized.
 * @param {Object} options - Custom options for serialization (optional).
 * @returns {Object} - The serialized docblock containing comments and tags.
 */
function serializeDocblock(str, options = {}) {
   
  

    // Default options for serialization
    const defaultOptions = {
        tagSet: {
            param: { category: 'a' },
            property: { category: 'a' },
            typedef: { category: 'a' },
            function: { category: 'b' },
            component: { category: 'b' },
            ignore: { category: 'b' }, 
            namespace: { category: 'b' },
            description: { category: 'c' },
            memberOf: { category: 'c' },
            name: { category: 'c' },
            returns: { category: 'd' },
            throws: { category: 'd' },
            example: { category: 'e' },
            __default: { category: 'b' }
        }  
    };

    // Merge provided options with default options
    options = Object.assign(defaultOptions, options);

    /**
     * Serialize individual tags based on their types.
     *
     * @param {Array} rawTags - Array of raw tags extracted from the docblock.
     * @returns {Array} - Array of serialized tags with structured information.
     */
    const serializeTags = (rawTags) => {
        var tags = [];

    

        // Models for different tag types
        const models = {
            a: {
                extract: (parts, segments, key, rawTag) => {
               
                    return {
                        category: 'a',
                        type: ageti(parts, 0, '').trim(),
                        dataType: ageti(parts, 1, '').trim(),
                        name: models.a.getName(ageti(parts, 2, '').trim()),
                        default: models.a.getDefaultValue(ageti(parts, 2, '').trim()),
                        attributes:{optional:models.a.getIsOptional(ageti(parts, 2, '').trim()) },
                        comment: ageti(segments, 1, '').trim()
                    };
                },
                getName: (namePart) => {
                    if (namePart.trim().startsWith('[')) {
                        let closure = extractClosure(namePart, { opener: '[', closer: ']' });

                        if (!closure) {
                            console.error('Malformed closure');
                            return 'UNKNOWN';
                        }
                        return xplit(closure.matchInner, '=')[0];
                    } else {
                        return namePart;
                    }
                },
                getDefaultValue: (namePart) => {
                    if (namePart.trim().startsWith('[')) {
                        let closure = extractClosure(namePart, { opener: '[', closer: ']' });
                       
                        if (!closure) {
                            console.error('Malformed closure'); 
                        } 
                        return xplit(closure.matchInner, '=')[1] || undefined;
                    } else {
                        return 'unimplemented';
                    }
                },
                getIsOptional: (namePart) => {
                    return namePart.trim().startsWith('[');
                }
            },
            b: {
                extract: (parts, segments, key, rawTag) => {
                    return { 
                        category: 'b',
                        type: ageti(parts, 0, '').trim(),
                        comment: (segments[1] || '').trim()
                    };
                }
            },
            c: {
                extract: (parts, segments, key, rawTag) => {
                    return {
                        category: 'c',
                        type: ageti(parts, 0, '').trim(),
                        value: ageti(parts, 1, '').trim(),
                        comment: ageti(segments, 1, '').trim(),
                    };
                }
            },
            d: {
                extract: (parts, segments, key, rawTag) => {
                    return {
                        category: 'd',
                        type: ageti(parts, 0, '').trim(),
                        dataType: ageti(parts, 1, '').trim(),
                        description: ageti(parts, 2, '').trim(),
                        comment: ageti(segments, 1, '').trim(),
                    };
                }
            },
            e: {
                extract: (parts, segments, key, rawTag) => {
                    const type = ageti(parts, 0, '').trim();
                    return {
                        category: 'e',
                        type: type,
                        content: rawTag.substring(type.length).trim()
                    };
                }
            },
        };

        rawTags.forEach((rawTag ,index)=> {
            // Get tag category by key
            const segments = xplit(rawTag, '-');
            var parts = xplit(segments[0], ' ', { excludes: [['"', '"'], ['`', '`'], ['{', '}'], ['[', ']'], ['(', ')'], ['/*', '*/'], ['//', '\n']] });
            
            if (parts[0].includes('\n')) {
                segments[0] = parts[0].replace('\n', ' \n') + segments[0].substring(parts[0].length);
                parts = xplit(segments[0], ' ', { excludes: [['"', '"'], ['`', '`'], ['{', '}'], ['[', ']'], ['(', ')'], ['/*', '*/'], ['//', '\n']] });
            }

            const key = parts[0].substring(1);

            const tagInfo = options.tagSet[key] ? options.tagSet[key] : options.tagSet.__default;

            // Get the model
            const model = models[tagInfo.category];
            if (!model) {
                console.error('Model not found');
            }
            if (typeof model.extract !== 'function') {
                console.error('Missing model extract function');
            }

            // Remove empty elements to solve multiple spaces capture problem
            parts = parts.filter(element => element !== '' && element !== '\n' && element !== '\r' && element !== '\t');
            parts = parts.map(element => element.trim());
            tags.push(model.extract(parts, segments, key, rawTag));
        });

        return tags;
    };

    // Remove block comments and extract raw comments and tags
    str = str.replace(/\/\*(.*?)\*\//gs, (match, group) => group.replace(/^\s*\*\s?/gm, ''));
    const raw = {
        description: str.split(/\n\s*@/)[0].trim()||'',
        tags: str.match(/@[^@]+(?:\n[^\n@]+)*/g)||[]
    };
    // Structured result containing comments and serialized tags
    const value = {
        description: raw.description,
        tags: serializeTags(raw.tags)
    };

    return value;
}



module.exports=serializeDocblock;

  