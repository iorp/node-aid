 
const path = require('path');
 
const copy=require('../../src/filesystem/copy');
const generateHierarchy=require('../../src/filesystem/generateHierarchy');

 
// # Create a _temp for tests  
const tempPath =path.join('./test/.temp/copy');  

 (async ()=>{
    var r;
    r =await generateHierarchy(tempPath, [
        { type: 'file', name: 'file.txt', content: 'copiable text' },
        { type: 'dir', name: 'dir', children: [
            { type: 'file', name: 'file.txt', content: 'copiable text' } ,
            { type: 'file', name: 'file1.txt', content: 'copiable text' } 
        ],
        }
    ],{verbose:true,overwrite:null});
 
  
    if(r.error){ console.log(r);  process.exit(1);
    }
 


 
// # Test start
    
  
    r= await copy(
        path.join(tempPath, "/file.txt"),
        path.join(tempPath,"/copied-file.txt"),
        {
            verbose:null,
            overwrite:null
        });
 
     
   // Copy a folder
   r= await copy(
    path.join(tempPath, "/dir"),
    path.join(tempPath,"/copied-dir"),{
            verbose:null,
            overwrite:null
        });
    console.log(r);
})();



 