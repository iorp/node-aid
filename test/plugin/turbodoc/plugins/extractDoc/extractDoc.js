 const fs = require('fs');
 const path = require('path');
 
 const extractDoc=require('../../../../../src/plugin/turbodoc/plugins/extractDoc/extractDoc');
 const generateHierarchy=require('../../../../../src/filesystem/generateHierarchy');

 const parseFile=require('../../../../../src/plugin/turbodoc/plugins/extractDoc/operations/parseFile');
 const parseJSJSON=require('../../../../../src/plugin/turbodoc/parsers/JsDocParser/parseJSJSON'); 
 const renderPrevious=require('../../../../../src/plugin/turbodoc/plugins/extractDoc/operations/renderPrevious');
 const renderJsonDocToHtml=require('../../../../../src/plugin/turbodoc/renderers/JsonDocRenderer/renderJsonDocToHtml'); 



const exampleHierarchy = [
  { type: 'dir', name: 'output'  },
  {
      type: 'dir', name: 'target', children: [
          { type: 'file', name: 'a.js', content: fs.readFileSync('./src/filesystem/copy.js', 'utf-8')},
          // { type: 'file', name: 'b.js', content:   fs.readFileSync('./src/filesystem/copy.js', 'utf-8') },
          // {  type: 'dir', name: 'other-dir', children: [
          //         { type: 'file', name: 'c.txt', content: fs.readFileSync('./src/filesystem/copy.js', 'utf-8') },
          //     ],
          // },
      ],
  },
];
 


const tempPath =path.join('./test/.temp/extractDoc'); 
const targetPath =path.join(tempPath,'target'); 
const outputPath =path.join(tempPath,'output'); 
 
var r; 
(async ()=>{
    // create files
    r =await generateHierarchy(tempPath, exampleHierarchy,{verbose:false,overwrite:true});
     
 
    if(r.error){   console.log(r);     process.exit(1)    }


    r = extractDoc({
      targetPath,
      outputPath,
      // fileFilter: (filePath) => true,
      // dirFilter: (dirPath) => true,
        operations:[
          [parseFile,{model:parseJSJSON,options:{
            debug:true,
            markers:{
            'todo':'@todo',
            'doc':'@doc'
          }}}],
          [renderPrevious,{model:renderJsonDocToHtml,options:{ 
            
          }}]
           
        ]
    });
    console.log(r)

 


})() 
