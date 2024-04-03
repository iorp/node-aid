 
const path = require('path');
 
const remove=require('../../src/filesystem/remove');
const generateHierarchy=require('../../src/filesystem/generateHierarchy');


// # Create a temp for tests  
const tempPath =path.join('./test/.temp/remove');  

(async ()=>{
     r =await generateHierarchy(tempPath, [
        { type: 'file', name: 'file.txt', content: 'deleteable text' },
        { type: 'dir', name: 'mydir', children: [
                { type: 'file', name: 'file.txt', content: 'deleteable text' } 
            ],
        }
    ],{verbose:true,overwrite:'y'});
     
    console.log(r);
    if(r.error)process.exit(1)
 


 
// # Test start

// Example usage:
// confirm can be y/n or undefined if its undefined it will ask
    // Delete a file
    var r = await remove(path.join(tempPath,"file.txt"), {confirm:null,verbose:false});
    console.log(r);

    // // Delete a folder
    var r = await remove(path.join(tempPath,"mydir"), {confirm:null,verbose:false});
    console.log(r);
})();



 