 
 const fs = require('fs');
 const path = require('path');
const hierarchyWalk = require('./../../src/filesystem/hierarchyWalk')



const generateHierarchy=require('../../src/filesystem/generateHierarchy');
  




const exampleHierarchy = [
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
 
const tempPath =path.join('./test/.temp/hierarchyWalk'); 
var r; 
(async ()=>{
    // create files
    r =await generateHierarchy(tempPath, exampleHierarchy,{verbose:false,overwrite:true});
     
 
    if(r.error){   console.log(r);     process.exit(1)    }
 //  console.log('generated',r);

  

 hierarchyWalk(tempPath, { 
    // fileFilter: (filePath) => filePath.endsWith('.txt'), // Only process .txt files
  //   dirFilter: (dirPath) => dirPath !== path.join(folderPath, 'folder2') // Exclude folder2
 }, (filePath, level, isDirectory)=> {
     const type = isDirectory ? 'Folder' : 'File';
     console.log(`${'  '.repeat(level)}${type}: ${filePath} (Level ${level})`);
 });
 


})() 

 
 
