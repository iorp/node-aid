
const orec=require('../../src/object/orec');


var obj= {
    a:0,
    b:{
        c:1
    }
} 
 
 orec(obj,({nodeKey, node,nodes, currentPath, level, siblingIndex})=>{
    console.log({nodeKey, node,nodes, currentPath, level, siblingIndex});
}); 


// // Example usage with level and siblingIndex
// iterate({ a: 1, b: { c: 2, d: 3 }, e: 4 }, (key, value, level, siblingIndex,parent) => {
//     console.log(`Key: ${key}, Value: ${value}, Level: ${level}, Sibling Index: ${siblingIndex}`);
// });
