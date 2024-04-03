 
 
 
 const path = require('path');
 
 const generateHierarchy=require('../../../src/filesystem/generateHierarchy'); 
//  const readFile=require('../../../src/filesystem/readFile'); 
//  const writeFile=require('../../../src/filesystem/writeFile'); 

const turbodoc=require('../../../src/plugin/turbodoc/turbodoc');

const extractDoc = require('../../../src/plugin/turbodoc/plugins/extractDoc/extractDoc')
const buildTemplate = require('../../../src/plugin/turbodoc/plugins/buildTemplate/buildTemplate')
const parseJSJSON=require('../../../src/plugin/turbodoc/parsers/JsDocParser/parseJSJSON'); 
 const parseFile=require('../../../src/plugin/turbodoc/plugins/extractDoc/operations/parseFile');
 const makeMap=require('../../../src/plugin/turbodoc/plugins/extractDoc/operations/makeMap');

 const LiteResponsive = require('../../../src/plugin/turbodoc/templates/LiteResponsive')
 const formatHTML = require("../../../src/plugin/turbodoc/formatters/formatHTML");
  

 
//  const ResponsiveLite=require('../../../src/plugin/turbodoc/templates/ResponsiveLite');


 

 const tempPath =path.join('./test/.temp/turbodoc'); 
 const targetPath =path.join(tempPath,'target'); 
 const docPath =path.join(tempPath,'output','doc'); 
 const outputPath =path.join(tempPath,'output'); 
 (async ()=>{
  var r;


  r =await generateHierarchy(tempPath, [ 
    
    { type: 'dir', name: 'target', children: [
          //  { type: 'file', name: 'copy.js', content:readFile( './src/filesystem/copy.js').data} ,
          // { type: 'file', name: 'test.js', content: ` 
          //  /**
          //  * Asynchronously copies files or directories from a source to a destination.
          //  * @name copy
          //  * @async 
          //  * @param {string} source - The source path of the file or directory to be copied.
          //  * @param {string|null} [destination=null] - The destination path where the file or directory will be copied.
          //  *                                    If null, a temporary directory is created, and the file is placed inside it.
          //  * @param {Object} options - Options for the copy operation.
          //  * @param {boolean} [options.verbose=false] - If true, logs detailed information about the copying process. Defaults to false.
          //  * @param {boolean|null} [options.overwrite=false] - If true, overwrites existing files or directories without prompting. If null, prompts for confirmation. Defaults to null.
          //  * @returns {Object} - An object with information about the success of the copy operation.
          //  * @throws {Object} - An object with error information if an exception occurs during the copying process.
          //  * @example 
          //  * // One example
          //  * copy(....)
          //  * ...
          //  * @example 
          //  * // Another example
          //  * copy(....)
          //  * ...
          // */
          // async function copy(source, destination = null, options = {})  { };

          // async function paste(source, destination = null, options = {})  { };

          // var a = 1; 

          // class a extends bdasd{
            
          // }

          // ` } ,

          { type: 'file', name: 'testb.js', content: ` 
          

         class myClass extends WindowsMediaPlayer{

           myFunction(a,b,c){

           }
         }

         ` } ,
         
         { type: 'dir', name: 'c', children: [
        
          { type: 'file', name: 'testc.js', content: ` 
          

         class myClassc extends WindowsMediaPlayer{

           myFunctionc(a,b,c){

           }
         }

         ` } ,
         
      ],
      }
      ],
      },
  ],{verbose:false,overwrite:true});


  if(r.error){ console.log(r);  process.exit(1);   }
 

/// demo !
r = await turbodoc({
 
 plugins:[
  // extract map
  [extractDoc,{
    targetPath,
    outputPath,
    docPath: docPath,
    operations:[ 
      [makeMap,{
        mapKeys:['name','location','uri','route'],
        model:parseJSJSON,
        modelOptions:{   
          // maxDepth:0, // max depth  
          //filter: (node, offset, lines, line, self) => {    return true; }, // filter: if it returns true ,the node will be stored, if not ,the collected object will not be stored.
  
        } 
      }]
    ]
  }],
  // extract content
  [extractDoc,{
    targetPath,
    outputPath,
    docPath: docPath,
    // fileFilter: (filePath) => true,
    // dirFilter: (dirPath) => true,

    // Operations are executed per file 
      operations:[  
        [parseFile,{ 
          maxDepth:1,
          makeLocal:true,
          makeGlobal:true,
          globalMode:'rom', 
          makeMap:false,
         // mapKeys:['name','filePath','route','type'],
           model:parseJSJSON,
          modelOptions:{   
         // maxDepth:0, // max depth 
          // only functions and classes 
          filter: (node, offset, lines, line, self) => {    
          //  return  node.level==0 && (node.datatype =='function' || node.datatype =='class') ;    }, // filter: if it returns true ,the node will be stored, if not ,the collected object will not be stored.
            // return  node.level==0 ;   // another way of maxDepth
          return true; }, // filter: if it returns true ,the node will be stored, if not ,the collected object will not be stored.

        },
        renders:[
          [formatHTML,{
            extension:'html',
            suffix:'.raw'
          }],
          [formatHTML,{
            extension:'html',
            template:LiteResponsive
          }]
        ]
        
      }],  
         
      ],
    onComplete:(data)=>{ console.log('Completed extractDoc.');  }
  }],
 // build from template 
 [buildTemplate,{ 
  outputPath:outputPath,
  template:LiteResponsive
}],
  // [(options)=>{console.log(options);},{message:'hello'}]
  // [composeDoc,{ 
  //   template:ResponsiveLite,
  //   onComplete:(data)=>{ console.log('Completed composeDoc.');  },

  //   // Operations are executed per file 
  //    operations:[    
  //      [composeSinglePage,{
  //       docPath:docPath,
  //       docPath:distPath,
  //       template:ResponsiveLite,
  //       maxDepth:null,
  //       formatter:formatHTML
  //      }] ]
  // }],
 ]
 
});

 console.log(JSON.stringify(r,null,2));
  })();
 

 




 