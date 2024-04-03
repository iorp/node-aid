  
const getLineEndIndex=require('../../src/string/getLineEndIndex');

// Example usage with a short poetry about dinosaurs
const poetryText = `a
b
c
d
`;


 const lineNumber = 0; // a  
 const lineEndCharIndex = getLineEndIndex(poetryText,lineNumber,true);
 
 console.log(lineEndCharIndex);  // result should be 1