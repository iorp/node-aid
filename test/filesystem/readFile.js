const fs = require('fs').promises;
const path = require('path');
const generateHierarchy=require('../../src/filesystem/generateHierarchy'); 
const readFile=require('../../src/filesystem/readFile');


// # Create a temp for tests   
const tempPath =path.join('./test/.temp/readFile');  
var r;
(async ()=>{
     r =await generateHierarchy(tempPath, [
        { type: 'file', name: 'file.json', content: '{"a":1,"b":2}' }, 
        { type: 'file', name: 'file.txt', content: 'Any text here...' }, 
    ],{
        verbose:true,
        overwrite:null
    });
    console.log(r)
    if(r.error)  process.exit(1)
 
   
    // test

    console.log('read TEXT file')
    r =  readFile(path.join(tempPath, "file.txt"))
   console.log(r);

    console.log('read JSON file')
   r =  readFile(path.join(tempPath, "file.json"),{datatype:'JSON'})
  console.log(r);



})();



 