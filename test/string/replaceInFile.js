 

 
 const path = require('path');
 const replaceInFile=require('../../src/string/replaceInFile'); 
 const generateHierarchy=require('../../src/filesystem/generateHierarchy');
 
 
 // # Create a _temp for tests  
 const tempPath =path.join('./test/.temp/replaceInFile');  
 
  (async ()=>{
     var r;
     r =await generateHierarchy(tempPath, [
         { type: 'file', name: 'file.txt', content: 'apple banana cherry' },
         
     ],{verbose:true,overwrite:true});
  
     console.log(r);
     if(r.error)process.exit(1)
  
 
 
  
 // # Test start
       
 // Example usage: 
 const replacementPairs = [['apple', 'orange'], ['banana', 'grape'], ['cherry', 'strawberry']];
 
 const inputPath = path.join(tempPath, "/file.txt"); 
 const outputPath = path.join(tempPath, "/file-mod.txt");
r = replaceInFile(inputPath,  outputPath,replacementPairs);
 console.log(r);
    

 
 })();
 
 
 

 