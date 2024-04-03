

const fs = require('fs');
const path = require('path');
 const hierarchyAsObject=require('../../src/filesystem/hierarchyAsObject'); 

 
const generateHierarchy = require('../../src/filesystem/generateHierarchy'); 
 
 



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
 
const tempPath =path.join('./test/.temp/hierarchyAsObject'); 
var r; 
(async ()=>{
    // create files
    r =await generateHierarchy(tempPath, itemsArrayToGenerate,{verbose:false,overwrite:null});
    
    

 
    if(r.error){
        console.log(r);
        process.exit(1)
    }
    console.log('generated',r);


    // now create a nested object based upon that file structure generated

    
// Example usage:
const hierarchyObject = hierarchyAsObject(tempPath,{ 
   //fileFilter: (filePath) => filePath.endsWith('.js'),
   // dirFilter: (dirPath) => dirPath !== '/path/to/your/folder/excludeThisDirectory', 
    fileKeyValue:(uri,name) => { 
      return {// IMPORTANT: it must return an obect {key:string value:any}  
        key:name+'',
        // the first 10 chars ... for tests
        value:fs.readFileSync(uri, 'utf-8')//.trim().slice(0, 10)
      }
      },
    dirKey:(uri,name) => { 
      return {// IMPORTANT: it must return an obect {key:string }  
        key:name+' ',
      }
      }
  });
  console.log(JSON.stringify(hierarchyObject,null,2));
  
  





})() 

 
 
 