
 
const searchr=require('../../src/string/searchr');

  // Example usage with a short poetry about dinosaurs
  const poetryText = `
  In the Jurassic, dinosaurs roamed,
  A world of giants, where they called home.
  Velociraptors swift, with claws so sharp,
  Tyrannosaurus rex, the king, ruling the park.
  
  Dinosaurs of all kinds, in shapes so grand,
  In a prehistoric world, on ancient land.
  `;
  
 
  
  // Example with regex pattern as a RegExp object
  const regex = /\b(dinosaur|Jurassic)\b/g;
  const resultObject = searchr( regex,poetryText);
  console.log( resultObject);



   // Example usage with a regular expression for extracting comments
   const inputString = `
   /**
    * This is a multiline comment
    * spanning multiple lines.
    */
   
   // Single-line comment
   
   /* Another multiline comment */
   `;
   
   const result = searchr(/\/\*\*(.*?)\*\//gs, inputString);
   console.log(result);
 
