 
   //@todo In the future   - Capture assignees: aritmetical / logic operations, parenthesis enclosures, and regex  
 
   const parseList = require('../../../../string/parseList');
   const extractClosure = require('../../../../string/extractClosure');
   const getLineNumber = require('../../../../string/getLineNumber');
   const getLine = require('../../../../string/getLine');
   const getLines = require('../../../../string/getLines');
   const getLineStartIndex = require('../../../../string/getLineStartIndex');
   const getLineEndIndex = require('../../../../string/getLineEndIndex');
   const serializeDocblock = require('../../tools/serializeDocblock'); 
const odel = require('../../../../object/odel');
const deepMerge = require('../../../../object/deepMerge');
   /** 
    * `parseJSJSON` is a JavaScript class designed to parse and extract structured data from a string input, with a focus on capturing and organizing information related to code elements such as variables, functions, classes, prototypes, and more. The parsing process is customizable through various options, allowing users to control aspects such as verbosity, debug mode, filtering, and handling of specific markers.
    * @constructor
    * @param {string} input - The input string to be parsed.
    * @param {Object} options - An optional configuration object.
    * @param {boolean} [options.verbose=true] - Enable or disable verbose logging.
    * @param {boolean} [options.debug=false] - Enable debug mode for performance tests.
    * @param {string} [options.nodeDataKeyName='@'] - The subnode name where the node data is stored.
    * @param {number|null} [options.maxDepth=null] - The maximum level depth for parsing nested structures.
    * @param {boolean} [options.captureBlocks=true] - Capture doc blocks if present.
    * @param {boolean} [options.captureRoutes=true] - Capture routes (additional feature, not mentioned in the original code).
    * @param {Object} [options.markers] - Marker tags in single-line comments.
    * @param {string} [options.markers.todo='@todo'] - Marker for capturing TODO tags after single-line comments.
    * @param {Function} [options.filter] - A function to filter nodes based on custom conditions.
    * @param {Function} [options.onBeforeStoreNode] - A function to modify collected node data before storage.
    * @param {Function} [options.onAfterStoreNode] - A function to modify collected node data after storage.
    */
  
 const  parseJSJSON=(input, options = {}) =>{
      
       // default options
       options = deepMerge({
         'verbose': true,
         'debug': false, // Performance tests
         'nodeDataKeyName': '@', // the subnode name here the node data is stored 
         'maxDepth': null, // The max level depth
         'captureBlocks': true, // Capture also doc blocks if present,
         'captureRoutes': true, 
         // @deprecated markers @todo kill the markers in the future
         'markers': { // marker tags in single line comments
           'todo': '@todo', // This tells turbodoc to capture @todo tags after single line comments (//) 
         },
         filter: (node, offset, lines, line, self) => { return true;  }, // filter: if it returns true ,the node will be stored, if not ,the collected object will not be stored. Do node.children for children, 
         onBeforeStoreNode: (collected, offset, lines, line, self) => {
           return collected;
         }, // This allows to modify the collected node data before being stored. 
         onAfterStoreNode: (collected, offset, lines, line, self) => { return collected;}, // This allows to modify the collected node data after being stored. 
         // serialize docblocks
         serializeBlocks: true,
         // dockblock serializer options  same as  turbodoc/tools/serializeDocblock 
         blockSerializerOptions: {},
         //normal nodes
         
       }, options);
       // prepare output
       const output = {
        error: null,
        markers: {},
        tree: {}
      };
        // debug settings
    if(options.debug) {
     output.debug = {
       'startTime': new Date().getTime(),
       'log': [{
         time: 0,
         code: 'INIT'
       }]
     }
   }
       // Applied regex
       const REGEX = {
         VLC_DEFINITION_ASSIGNED: /^(var|let|const)\s*([a-zA-Z1-9@$_]*\w*)\s*=/,
         VLC_DEFINITION_ASSIGNED_INCLASS: /^(|static\s*async|async|static)\s*([a-zA-Z1-9@$_]*\w*)\s*=/,
         VLC_DEFINITION_UNASSIGNED: /^(var|let|const)\s*([a-zA-Z1-9@$_]*\w*)\s*/,
         ANONYMOUS_FUNCTION: /^((|static|async)(|\s*)(|static|async)(|\s*)(function(|\s*)\([^)]*\)(|\s*){\s*))|^(|static|async)(|\s*)(|static|async)(|\s*)(\(.*\)(|\s*)=(|\n*.\s*)>)/,
         ANONYMOUS_CLASS: /^(|static)(|.\s*)(class.*{)/,
        //  FUNCTION_DEFINITION: /^(|(static\s+async|static|async))(|\s+)function\s+([a-zA-Z1-9@$_]*\w*)(|\s+)\(.*(|\s+)\)(|\s+){/,
        //  FUNCTION_DEFINITION_INCLASS: /^(|((static\s+async|static|async)\s+))([a-zA-Z1-9@$_]*\w*)(|\s+)\((|.|\s+)\)(|\s+){/,
         FUNCTION_DEFINITION: /^(|(static\s+async|static|async))(|\s+)function\s+([a-zA-Z1-9@$_]*\w*)(|.*)\(.*(|\s+)\)(|\s+){/,
         FUNCTION_DEFINITION_INCLASS: /^(|((static\s+async|static|async)\s+))([a-zA-Z1-9@$_]*\w*)(|\s+)\((|.*)\)(|\s+){/,
         CLASS_DEFINITION: /^(|static)(|.\s*)(class.*{)/,
         PROTOTYPE_DEFINITION: /^([\w@$]+)\.prototype.([\w@$]+)/,
         NUMBER: /^-?\d+(\.\d+)?/
       }
       // collect functions
       const collect = {
         definitionAssignedVLC: (lines, line, attributes, level, parent) => {
          
           var collected = null;
           const PATTERN = (parent && parent.datatype == 'class') ? REGEX.VLC_DEFINITION_ASSIGNED_INCLASS : REGEX.VLC_DEFINITION_ASSIGNED
           if(PATTERN.test(lines.remainingText)) {
             let assignee = line.text.replace(/^[^=]*=/, '').trim();
             //## anonymous function assignee       
             if(REGEX.ANONYMOUS_FUNCTION.test(assignee)) {
               collected = collect.assigneeAnonymousFunction(lines, line, attributes, level, parent);
               attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char  
             } else
               //## string quoted assignee single and double quotes 
               if(assignee.startsWith('"') || assignee.startsWith("'")) {
                 collected = collect.assigneeQuotedString(assignee, lines, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char 
               }
             else
               //## string backticked assignee 
               if(assignee.startsWith('`')) {
                 collected = collect.assigneeEnclosure('`', '`', [], lines, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char 
               }
             else
               //## object assignee 
               if(assignee.startsWith('{')) {
                 collected = collect.assigneeEnclosure('{', '}', [], lines, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char 
               }
             else
               //## array assignee 
               if(assignee.startsWith('[')) {
                 collected = collect.assigneeEnclosure('[', ']', [], lines, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char 
               }
             else
               //## number assignee //todo redo to numeric 
               if(REGEX.NUMBER.test(assignee)) {
                 collected = collect.assigneeNumber(assignee, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char 
               }
             else
               //## anonymous class assignee       
               if(REGEX.ANONYMOUS_CLASS.test(assignee)) {
                 collected = collect.assigneeAnonymousClass(lines, line, attributes, level, parent);
                 attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char  
               }
             //@todo: parenthesed assignee 
             //  else 
             // //## parenthesed assignee 
             // if(assignee.startsWith('(')){
             // collected = collect.asigneeEnclosure('(',')',[],lines,line,attributes,level,parent); 
             // attributes.offset = collected[options.nodeDataKeyName]['end'] +2; //2 = 1 the new line, 1 for the next char 
             // }  
             //@todo: Numerical operations 
             // //## Numerical operations 
           }
           return collected;
         },
         // Unassigned variable
         definitionVLC: (lines, line, attributes, level, parent) => {
           if(parent && parent.datatype == 'class') return null;
           
           //# var without assignation
           var collected;
           if(REGEX.VLC_DEFINITION_UNASSIGNED.test(lines.remainingText)) {
             var {
               offset
             } = attributes;
             var collected = null;
             let words = line.text.split(' ');
             collected = {
               [options.nodeDataKeyName]: {
                 'name': words[1].split('=')[0].trim(),
                 'line': line.index,
                 'level': level,
                 'type': 'vlc-definition',
                 'definer': words[0].trim(), // first word
                 'datatype': undefined,
                 'start': line.startCharIndex,
                 'end': line.endCharIndex,  
                 'parent': parent,
               }
             };
             attributes.offset = collected[options.nodeDataKeyName]['end'] + 2 //2 = 1 the new line, 1 for the next char  
           }
           return collected;
         },
         definitionPrototype: (lines, line, attributes, level, parent) => {
           if(parent && parent.datatype == 'class') return null;
           
           var collected = null
           //# prototype definition       
           if(REGEX.PROTOTYPE_DEFINITION.test(lines.remainingText)) {
             var {
               offset
             } = attributes;
             var collected = null;
             // var attr =  TurboDocJs.getAttributes(line.text,'prototype');
             var argsClosure = extractClosure(lines.text, {
               opener: '(',
               closer: ')',
               offset: offset
             });
             if(!argsClosure) fn.throwError(line, 'Malformed prototype function arguments');
             var argsList = parseList(argsClosure.matchInner);
             var closure = extractClosure(lines.text, {
               offset: argsClosure.end + 1
             });
             if(closure) {
               collected = {
                 [options.nodeDataKeyName]: {
                   'name': line.text.match(/\b(?:\.prototype.)\s*([a-zA-Z1-9@$$_]*\w*)\b/)?.[1],
                   'line': line.index,
                   'level': level,
                   'type': 'prototype-definition',
                   'datatype': 'function',
                   'definer': 'prototype',
                   'prototypee': line.text.split('.')[0],
                   'params': argsList,
                   'start': line.startCharIndex,
                   'end': closure.end,
                   'parent': parent,
                 },
               }
               if(closure.matchInner.trim().length > 0 && (options.maxDepth == null || (level + 1) <= (options.maxDepth))) Object.assign(collected, extract(lines.text, {
                 offset: closure.start + 1,
                 limit: closure.end - 1
               }, level + 1, collected[options.nodeDataKeyName]))
             } else {
               fn.throwError(line, 'Malformed prototype function closure');
             }
             attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char  
           }
           return collected;
         },
         definitionClass: (lines, line, attributes, level, parent) => {
           
           if(parent && parent.datatype == 'class') return null;
           var collected = null
           //# class definiton       
           if(REGEX.CLASS_DEFINITION.test(lines.remainingText)) {
             var {
               offset
             } = attributes;
             var collected = null;
             //@todo: retrieve constructor logic 
             // var attr =  TurboDocJs.getAttributes(line.text,'class');
             //var argsClosure = extractClosure(lines.text,{opener:'(',closer:')',offset: i});
             //if(!argsClosure) fn.addError(line,'args... not ok ');  
             //var argsList = parseList(argsClosure.matchInner);
             var closure = extractClosure(lines.text, {
               offset: offset
             });
             if(closure) {
               collected = {
                 [options.nodeDataKeyName]: {
                   'name': line.text.match(/class\s+([A-Za-z_$@]*)/)?.[1].trim(),
                   'line': line.index,
                   'level': level,
                   'type': 'class-definition',
                   'datatype': 'class',
                   'definer': 'class',
                   //'params':argsList, // @todo from constructor if constructor present 
                   'start': line.startCharIndex,
                   'end': closure.end,
                   'static': line.text.startsWith('static'),
                   'extends': line.text.match(/extends\s+([A-Za-z_$@]*)/)?.[1].trim(),
                   'parent': parent
                 },
               }
               if(closure.matchInner.trim().length > 0 && (options.maxDepth == null || (level + 1) <= (options.maxDepth))) Object.assign(collected, extract(lines.text, {
                 offset: closure.start + 1,
                 limit: closure.end - 1
               }, level + 1, collected[options.nodeDataKeyName]))
             } else {
               fn.throwError(line, 'Malformed class  closure');
             }
             attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char  
           }
           return collected;
         },
         definitionFunction: (lines, line, attributes, level, parent) => {
           var collected = null;
           
           const PATTERN = (parent && parent.datatype == 'class') ? REGEX.FUNCTION_DEFINITION_INCLASS : REGEX.FUNCTION_DEFINITION
           const getFeatures = (lines, line, parent) => {
             let s = line.text.split('(')[0].split(' ')
             s.forEach(e => {
               e = e.trim();
             });
             // static and async 
             if(s[0] && s[1] && s[0] == 'static' && s[1] == 'async') {
               return {
                 _static: true,
                 _async: true,
                 _name: (parent && parent.datatype == 'class') ? s[2] : s[3]
               }
             }
             if(s[0] && s[0] == 'static') {
               return {
                 _static: true,
                 _async: false,
                 _name: (parent && parent.datatype == 'class') ? s[1] : s[2]
               }
             }
             if(s[0] && s[0] == 'async') {
               return {
                 _static: false,
                 _async: true,
                 _name: (parent && parent.datatype == 'class') ? s[1] : s[2]
               }
             }
             if(s[0] && s[0] == 'function') {
               return {
                 _static: false,
                 _async: false,
                 _name: s[1]
               }
             }
             // inclass function name when no async and no static 
             if(s[0] && (parent && parent.datatype == 'class')) {
               return {
                 _static: false,
                 _async: false,
                 _name: s[0]
               }
             }
           }
           if(PATTERN.test(lines.remainingText)) {
             const {
               _static,
               _async,
               _name
             } = getFeatures(lines, line, parent)
             var {
               offset
             } = attributes;
             var collected = null;
             var argsClosure = extractClosure(lines.text, {
               opener: '(',
               closer: ')',
               offset: offset
             });
             if(!argsClosure) fn.throwError(line, 'Malformed function arguments closure');
             var argsList = parseList(argsClosure.matchInner);
             var closure = extractClosure(lines.text, {
               offset: argsClosure.end + 1
             });
             if(closure) {
               collected = {
                 [options.nodeDataKeyName]: {
                   'name': _name,
                   'line': line.index,
                   'level': level,
                   'type': 'function-definition',
                   'datatype': 'function',
                   'definer': 'function',
                   'params': argsList,
                   'start': line.startCharIndex,
                   'end': closure.end,
                   'static': _static,
                   'async': _async,
                   'parent': parent,
                 }
               };
               if(closure.matchInner.trim().length > 0 && (options.maxDepth == null || (level + 1) <= (options.maxDepth))) Object.assign(collected, extract(lines.text, {
                 offset: closure.start + 1,
                 limit: closure.end - 1
               }, level + 1, collected[options.nodeDataKeyName]))
             } else {
               fn.throwError(line, 'Malformed function closure');
             }
             attributes.offset = collected[options.nodeDataKeyName]['end'] + 2; //2 = 1 the new line, 1 for the next char  
           }
           return collected;
         },
         assigneeAnonymousClass: (lines, line, attributes, level, parent) => {
           var {
             offset
           } = attributes;
           var collected = null;
           
           const getFeatures = (line, parent) => {
             let assignee = line.text.replace(/^[^=]*=/, '').trim();
             let _name = null,
               _static = null,
               _definer = null,
               _extends = null;
             let s = line.text.split(' ');
             s.forEach(e => {
               e = e.trim();
             });
             if(parent && parent.datatype == 'class') {
               if(s[0] && s[0] == 'static' && s[1]) {
                 _static = true;
                 _name = s[1];
                 _definer = 'const';
               } else {
                 _static = false;
                 _name = s[0];
                 _definer = 'const';
               }
             } else {
               _definer = s[0];
               _name = s[1];
             }
             let a = assignee.split(' ');
             a.forEach(e => {
               e = e.trim();
             });
             if(a[1] && a[1] == 'extends' && a[2]) _extends = (a[2].split('{')[0] || "").trim();
             return {
               _static: _static,
               _name: _name,
               _definer: _definer,
               _extends: _extends
             }
           }
           const {
             _name,
             _definer,
             _static,
             _extends
           } = getFeatures(line, parent)
           // @todo retrieve constructor arguments
           var closure = extractClosure(lines.text, {
             offset: offset
           });
           if(closure) {
             collected = {
               [options.nodeDataKeyName]: {
                 'name': _name,
                 'type': 'anonymous-class',
                 'definer': _definer,
                 'datatype': 'class',
                 'line': line.index,
                 'level': level,
                 //'arguments':argsList, // todo from constructor if constructor present 
                 'start': line.startCharIndex,
                 'end': closure.end,
                 'static': _static,
                 'extends': _extends,
                 'parent': parent,
               },
             }
             if(closure.matchInner.trim().length > 0 && (options.maxDepth == null || (level + 1) <= (options.maxDepth))) Object.assign(collected, extract(lines.text, {
               offset: closure.start + 1,
               limit: closure.end - 1
             }, level + 1, collected[options.nodeDataKeyName]))
           } else {
             fn.throwError(line, 'Malformed class closure');
           }
           return collected;
         },
         assigneeAnonymousFunction: (lines, line, attributes, level, parent) => {
           var {
             offset
           } = attributes;
           var collected = null;
           
           let assignee = line.text.replace(/^[^=]*=/, '').trim();
           const getFeatures = (line, assignee, parent) => {
             let _async = assignee.startsWith('async');
             let _name = null,
               _static = null,
               _definer = null;
             let s = line.text.split(' ');
             s.forEach(e => {
               e = e.trim();
             });
             if(parent && parent.datatype == 'class') {
               if(s[0] && s[0] == 'static' && s[1]) {
                 _static = true;
                 _name = s[1];
               } else {
                 _static = false;
                 _name = s[0]
               }
             } else {
               _definer = s[0];
               _name = s[1];
             }
             // let _name = (parent && parent.datatype=='class') ?
             //   (_static==true)?   line.text.match(/^\s*([^\s=]+)/)?.[1] :  line.text.match(/\b\w+\b/)?.[1]  
             //   :
             //   line.text.match(/\b\w+\b/)?.[1]
             return {
               _static: _static,
               _async: _async,
               _name: _name, //  first word ,//  second word  
               _definer: (parent && parent.datatype == 'class') ? null : line.text.match(/^\s*([^\s]+)/)?.[1] // first word 
             }
           }
           const {
             _name,
             _definer,
             _async,
             _static
           } = getFeatures(line, assignee, parent)
           var argsClosure = extractClosure(lines.text, {
             opener: '(',
             closer: ')',
             offset: offset
           });
           if(!argsClosure) fn.throwError(line, 'Malformed function arguments closure');
           var argsList = parseList(argsClosure.matchInner);
           var closure = extractClosure(lines.text, {
             offset: argsClosure.end + 1
           });
           if(closure) {
             collected = {
               [options.nodeDataKeyName]: {
                 'name': _name,
                 'type': 'anonymous-function',
                 'definer': _definer,
                 'datatype': 'function',
                 'line': line.index,
                 'level': level,
                 'arguments': argsList,
                 'start': line.startCharIndex,
                 'end': closure.end,
                 'static': _static,
                 "async": _async,
                 'parent': parent,
               },
             }
             if(closure.matchInner.trim().length > 0 && (options.maxDepth == null || (level + 1) <= (options.maxDepth))) Object.assign(collected, extract(lines.text, {
               offset: closure.start + 1,
               limit: closure.end - 1
             }, level + 1, collected[options.nodeDataKeyName]))
           } else {
             fn.throwError(line, 'Malformed function closure');
           }
           return collected;
         },
         assigneeEnclosure: (opener, closer, excludes, lines, line, attributes, level, parent) => {
           var {
             offset
           } = attributes;
           
           // fix here get features 
           var collected = null;
           const {
             _name,
             _static,
             _definer
           } = fn.getBasicAssigneeFeatures(line, parent)
           var end, datatype;
           var closure = extractClosure(lines.text, {
             opener: opener,
             closer: closer,
             excludes: excludes,
             offset: offset
           });
           if(closure) {
             // todo store match ... 
             end = closure.end
           } else {
             fn.throwError(line, 'Unclosed closure');
           }
           switch(opener) {
             case '{':
               datatype = 'object';
               break;
             case '[':
               datatype = 'array';
               break;
             case '`':
               datatype = 'string';
               break;
             default:
               datatype = null;
           }
           collected = {
             [options.nodeDataKeyName]: {
               'name': _name,
               'definer': _definer,
               'type': datatype + '-enclosure',
               'datatype': datatype,
               'line': line.index,
               'level': level,
               'start': line.startCharIndex,
               'end': end,
               'static': _static,
               'parent': parent
             }
           }
           return collected;
         },
         assigneeQuotedString: (input, lines, line, attributes, level, parent) => {
           var {
             offset
           } = attributes;
           
           const quoteType = input[0];
           var collected = null;
           const {
             _name,
             _static,
             _definer
           } = fn.getBasicAssigneeFeatures(line, parent)
           var end;
           if(input.endsWith(quoteType) || input.endsWith(';')) {
             end = line.endCharIndex;
           } else {
             if(input.endsWith('+')) {
               var currentLine = input;
               var currentLineNumber = line.index;
               while(currentLine.endsWith('+')) {
                 currentLineNumber++;
                 currentLine = getLine(lines.list, currentLineNumber)
               }
               const currentLineEnd = getLineEndIndex(lines.list, currentLineNumber);
               end = currentLineEnd;
             } else {
               fn.throwError(line, 'Unclosed string literal closure');
             }
           }
           collected = {
             [options.nodeDataKeyName]: {
               'name': _name,
               'line': line.index,
               'level': level,
               'type': 'string-enclosure',
               'definer': _definer,
               'datatype': 'string',
               'start': line.startCharIndex,
               'end': end,
               'static': _static,
               'parent': parent
             }
           }
           return collected;
         },
         assigneeNumber: (input, line, attributes, level, parent) => {
           var {
             offset
           } = attributes;
           
           //## number assignee
           var collected = null;
           const {
             _name,
             _static,
             _definer
           } = fn.getBasicAssigneeFeatures(line, parent)
           if(REGEX.NUMBER.test(input)) {
             collected = {
               [options.nodeDataKeyName]: {
                 'name': _name, // second word 
                 'line': line.index,
                 'level': level,
                 'definer': _definer, // first word 
                 'type': 'number',
                 'datatype': 'number',
                 'start': line.startCharIndex,
                 'end': line.endCharIndex,
                 'static': _static,
                 'parent': parent
               }
             };
           }
           return collected;
         }
       }
       // various funtions
       const fn = {
         stackMarker: (lines, line, inputString) => {
           // let markerNames = Object.keys(options.markers);
           let markerPatterns = Object.values(options.markers || {});
           markerPatterns.forEach((patternStr, i) => {
             const pattern = patternStr + '\\s*([^;]+)(?:;|$)';
             const match = (inputString.match(pattern) || [])[1]?.trim();
             if(match) {
               let markerName = Object.keys(options.markers)[i];
               if(!output.markers[markerName]) output.markers[markerName] = [];
               output.markers[markerName].push({
                 marker: markerName,
                 line: line.index,
                 text: match
               })
             }
           });
         },
         getBasicAssigneeFeatures: (line, parent) => {
           let _name = null,
             _static = null,
             _definer = null;
           let s = line.text.split('=')[0].split(' ');
           s.forEach(e => {
             e = e.trim();
           });
           if(parent && parent.datatype == 'class') {
             _definer = 'const';
             if(s[0] == 'static') {
               _static = true;
               _name = s[1];
             } else {
               _name = s[0]
             }
           } else {
             _definer = s[0];
             _name = s[1];
           }
           return {
             _name: _name,
             _static: _static,
             _definer: _definer
           };
         },
         getDocBlock: (lines, line) => {
           if(line.index >= lines.list.length) line.index = lines.list.length - 1;
           let insideCommentBlock = false;
           let storedLines = [];
           let lineEnd, lineStart;
           for(let i = line.index - 1; i >= 0; i = i - 1) {
             if(!lines.list[i]) continue;
             const currentLineText = lines.list[i].trim();
             if(currentLineText.endsWith('*/')) {
               insideCommentBlock = true;
               lineEnd = i;
             }
             if(currentLineText.length > 0 && !currentLineText.startsWith('/*') && !insideCommentBlock) {
               return null;
             }
             if(insideCommentBlock) {
               storedLines.push(lines.list[i].trim());
               if(currentLineText.startsWith('/*')) {
                 lineStart = i;
                 var blockText = storedLines.reverse().join('\n');
                 return {
                   text: blockText,
                   data: !options.serializeBlocks ? {} : serializeDocblock(blockText, options.blockSerializerOptions),
                   lineStart: lineStart,
                   lineEnd: lineEnd,
                   charStart: getLineStartIndex(lines.list, lineStart),
                   charEnd: getLineEndIndex(lines.list, lineEnd)
                 }
               }
             }
           }
           return null;
         },
         throwError: (line, exception) => {
           let error = {
             error: true,
             subject: 'turbodoc JsParser',
             lineIndex: line.index,
             exception: exception,
             line: line.text,
             // pass external data such as filename 
             ext: options.ext,
           };
           output.error = error;
           if(options.verbose) console.error(error);
           process.exit(1);
         },
         getRoute: (target) => {
           var res = [];
           var current = target;
           while(current != null) {
             res.push(current.name);
             current = current.parent ? current.parent || null : null;
           }
           return [...res].reverse();
         }
       }
       // extract function
       function extract(input = null, attributes = {}, level = 0, parent = null) { // Note use only input parameter, the others are internal
      
         input = input ? input : input;
        
         if(level == 0) {
           attributes = Object.assign({
             limit: null,
             offset: 0,
           }, attributes);
         }
         const lines = {
           list: getLines(input),
           text: input
         };
         var result = {};
         var sindex = 0;
         while(attributes.offset < input.length) {
           if(attributes.limit != null && attributes.offset > attributes.limit) break;
           let char = lines.text[attributes.offset];
           if(char == ' ' || char == '\s' || char == '\r' || char == '\n' || char == '\t') {
             attributes.offset++;
             continue;
           }
           var line = {}
           line.index = getLineNumber(lines.list, attributes.offset);
           line.text = (lines.list[line.index] || '').trim();
           line.startCharIndex = getLineStartIndex(lines.list, line.index);
           line.endCharIndex = getLineEndIndex(lines.list, line.index, false);
           lines.remainingText = input.substr(attributes.offset)
           // skip line comments todo make this not necesarily from the start 
           if(line.text.startsWith('//')) {
             if(options.markers) fn.stackMarker(lines, line, line.text.substring(2))
             attributes.offset = line.endCharIndex + 2;
             continue;
           }
           // skip comments closures 
           if(line.text.startsWith('/*')) {
             var closure = extractClosure(lines.text, {
               opener: '/*',
               closer: '*/',
               offset: line.startCharIndex,
               excludes: []
             })
             attributes.offset = closure.end + 1;
             continue;
           }
           var collected = null;
           // start capture of elements  
           if(!collected) collected = collect.definitionAssignedVLC(lines, line, attributes, level, parent);
           if(!collected) collected = collect.definitionVLC(lines, line, attributes, level, parent);
           if(!collected) collected = collect.definitionFunction(lines, line, attributes, level, parent);
           if(!collected) collected = collect.definitionClass(lines, line, attributes, level, parent);
           if(!collected) collected = collect.definitionPrototype(lines, line, attributes, level, parent);
           // capture docblock
           if(collected && options.captureBlocks) collected[options.nodeDataKeyName].block = fn.getDocBlock(lines, line, true);
           // capture route
           if(collected && options.captureRoutes) collected[options.nodeDataKeyName].route = fn.getRoute(collected[options.nodeDataKeyName]);
           if(collected) collected[options.nodeDataKeyName].sindex = sindex;
           // apply filter
           if(collected && typeof options.filter === 'function' && !options.filter({...collected[options.nodeDataKeyName],children:odel(collect,'@')}, attributes.offset, lines, line, this)) collected = null;
          
           
           if(collected != null) {
             // extraNodeAttributes
             if(options.ext) collected['@'].extra = options.ext; 
             // on before store node
             if(typeof options.onBeforeStoreNode === 'function') collected = options.onBeforeStoreNode(collected, attributes.offset, lines, line, this);
             result[collected[options.nodeDataKeyName]['name']] = collected;
             // on before store node
             if(typeof options.onAfterStoreNode === 'function') options.onAfterStoreNode(collected, attributes.offset, lines, line, this);
             if(options.debug) {
               const debug = {
                 time: (new Date().getTime() - output.debug.startTime),
                 code: 'CAPTURE',
                 line: line.index,
                 type: collected[options.nodeDataKeyName].type,
                 name: collected[options.nodeDataKeyName].name
               };
               output.debug.log.push(debug);
               if(options.verbose) console.log(debug)
             }
             sindex++; // increment sibling index
           } else { 
             attributes.offset++;
           }
         }
         return result;
       }

       // run extract 
       return extract(input);
     }
 
   module.exports =parseJSJSON; 