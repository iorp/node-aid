 
 const replaceMultiple=require('../../src/string/replaceMultiple');

 // Example usage:
 const inputString = 'apple banana cherry';
 const replacementPairs = [['apple', 'orange'], ['banana', 'grape'], ['cherry', 'strawberry']];
 
 const result = replaceMultiple(inputString, replacementPairs);
 console.log(result);
 