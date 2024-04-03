const fs = require('fs').promises;
const path = require('path');
const generateHierarchy = require('../../../src/filesystem/generateHierarchy');
const readEnvFile=require('../../../src/plugin/turbodev/readEnvFile');
const writeEnvFile=require('../../../src/plugin/turbodev/writeEnvFile');

const tempPath =path.join('./test/.temp/writeEnvFile');  

 var r;
(async ()=>{
     r =await generateHierarchy(tempPath, [
        { type: 'file', name: '.env', content: 'a=8\nb=9' }, 
    ],{verbose:true,overwrite:null});
     
    
 
    console.log(r);
    if(r.error)process.exit(1)


 
// # Test start
  
r =  writeEnvFile(path.join(tempPath, "/.env"),{a:2,d:3},true)
if(r.error){console.log(r);return;}
r =  readEnvFile(path.join(tempPath, "/.env"))
 
   console.log(r);
})();



 