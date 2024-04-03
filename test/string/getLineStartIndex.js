  
const getLineStartIndex=require('../../src/string/getLineStartIndex');

// Example usage with a short poetry about dinosaurs
const poetryText = `a
b
c
d
`;


 const lineNumber = 2; // c  
 const  lineStartCharIndex = getLineStartIndex(poetryText,lineNumber,true);
 
 console.log(lineStartCharIndex);  // result should be 4