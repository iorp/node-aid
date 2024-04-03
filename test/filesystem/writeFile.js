 
const path = require('path');
 
const generateHierarchy=require('../../src/filesystem/generateHierarchy');
const readFile=require('../../src/filesystem/readFile');
const writeFile=require('../../src/filesystem/writeFile');

const tempPath =path.join('./test/.temp/writeFile'); 

// # Create a temp for tests  
 
(async ()=>{ 
    r =await generateHierarchy(path.join(tempPath), [
        { type: 'file', name: 'file.json', content: '{"a":1,"b":2}' }, 
        { type: 'file', name: 'file.txt', content: 'Any text here...' }, 

    ],{verbose:true,overwrite:null});
     
     
console.log(r);
if(r.error)process.exit(1)
// # Test start
  


console.log('write TEXT file')
r =  readFile(path.join(tempPath,"file.txt")) 
console.log('before',r.data);
r =  writeFile(path.join(tempPath,"file.txt"),"More context",{merge:true});
console.log('write result :',r)
r =  readFile(path.join(tempPath,"file.txt"))
console.log('after',r.data);
console.log()
console.log('write JSON file')
   r =  readFile(path.join(tempPath,"file.json"),{datatype:'JSON'}) 
   console.log('before',r.data);
   r =  writeFile(path.join(tempPath,"file.json"),{a:0,x:1,y:2},{datatype:'JSON',merge:true});
   console.log('write result :',r)
   r =  readFile(path.join(tempPath,"file.json"),{datatype:'JSON'})

   console.log('after',r.data);
})();



 