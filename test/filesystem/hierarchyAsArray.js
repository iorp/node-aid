const fs = require('fs');
const path = require('path'); 
const fileExists = require('../../src/filesystem/fileExists');
const traverse = require('../../src/filesystem/traverse');
const generateHierarchy = require('../../src/filesystem/generateHierarchy');
 const hierarchyAsArray = require('../../src/filesystem/hierarchyAsArray');
 
  

  



const itemsArrayToGenerate = [
    { type: 'file', name: 'myfile.txt', content: 'filecontents' },
    {
        type: 'dir', name: 'a-dir', children: [
            { type: 'file', name: 'a.txt', content: 'filecontents' },
            { type: 'file', name: 'c.txt', content: 'filecontents' },
            {
                type: 'dir', name: 'other-dir', children: [
                    { type: 'file', name: 'c.txt', content: 'filecontents' },
                ],
            },
        ],
    },
];
 


const tempPath =path.join('./test/.temp/hierarchyAsArray'); 
var r; 
(async ()=>{
    // create files
    r =await generateHierarchy(tempPath, itemsArrayToGenerate,{verbose:false,overwrite:true});
    
    

 
    if(r.error){
        console.log(r);
        process.exit(1)
    }
   console.log('generated',r);


    // now create a nested array based upon that file structure generated

    
// // Example usage:
// const hierarchyArray = hierarchyAsArray(tempPath,{
//     //fileNodeModel:(uri, name) => { return { type: 'file', name , uri, content:'content here...' }; }, // fs.readFileSync(uri, 'utf-8')
//     //directoryModel:(uri, name) => { return { type: 'dir',uri, name, children: [] }; }
//   });
//   console.log(JSON.stringify(hierarchyArray,null,2));
  
  
  
// // Example usage
// const result = hierarchyAsArray(tempPath, {
//     fileNodeModel: ({ uri, name, type }) => ({ type, uri, name, content: `File content for ${name}` }),
//     dirNodeModel: ({ uri, name, type }) => ({ type, uri, name, children: [] }),
// });


// Example usage:
const result = hierarchyAsArray(tempPath,{
   // fileFilter: (filePath) => path.basename(filePath) === 'index.js',
//dirFilter: (dirPath) => dirPath !== '/path/to/your/folder/excludeThisDirectory',
});
console.log(JSON.stringify(result, null, 2));
//   console.log(JSON.stringify(result,null,2));
  
  





})() 

 
 


 