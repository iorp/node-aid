
const path = require('path');

const generateHierarchy = require('../../../src/filesystem/generateHierarchy');
const readEnvFile=require('../../../src/plugin/turbodev/readEnvFile');

const tempPath =path.join('./test/.temp/readEnvFile');  
 var r;
(async ()=>{
     r =await generateHierarchy(tempPath, [
        { type: 'file', name: '.env', content: 'a=1\nb=2' }, 
    ],{verbose:true,overwrite:true});
     
    
 
    console.log(r);
    if(r.error)process.exit(1)

 
// # Test start
  
     r =  readEnvFile(path.join(tempPath, ".env"))
 
   console.log(r);
})();



 