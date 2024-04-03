 
 
 
const path = require('path'); 
const generateHierarchy=require('../../src/filesystem/generateHierarchy');
 

// Example usage:


 
const itemsArray = [
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
 


const tempPath =path.join('./test/.temp/generateHierarchy');  
(async ()=>{
   // with overwrite
    response =await generateHierarchy(tempPath, itemsArray,{verbose:true,overwrite:null});
    console.log('generated',response);
    
 


// with merge, merge disables overwrite 
    response =await generateHierarchy(tempPath, itemsArray,{verbose:true,merge:true});
    console.log('generated',response);
    
})();

 