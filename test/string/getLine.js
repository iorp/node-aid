  
const getLine=require('../../src/string/getLine');

// Example usage with a short poetry about dinosaurs
const poetryText = `a
b
c
d
`;


    const lineNumber = 2; // c  
 const line = getLine(poetryText,lineNumber);
 
 console.log(line);  // result should be c