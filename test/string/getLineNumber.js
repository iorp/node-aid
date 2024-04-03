  
const getLineNumber=require('../../src/string/getLineNumber');

// Example usage with a short poetry about dinosaurs
const poetryText = `a
b
c
d
`;


    const characterIndex = 5; // c  
 const lineNumber = getLineNumber(poetryText, characterIndex);
 
 console.log(lineNumber);  // result should be 2 