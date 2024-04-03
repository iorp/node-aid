  
const getLines=require('../../src/string/getLines');

// Example usage with a short poetry about dinosaurs
const poetryText = `a
b
c
d`;
  
console.log(getLines(poetryText));  //a,b,c,d
console.log(getLines(poetryText,1,3));  // b,c,d
console.log(getLines(poetryText,3,99));  //  d