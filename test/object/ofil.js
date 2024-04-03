




const ofil=require('../../src/object/ofil');
 
  // Example usage:
  const inputObject = { a: 1, b: 2, c: 3, d: 4 };
  const keysToRemove = ['a', 'c'];
  
  /**
   * Filter out keys 'a' and 'c' from the input object.
   * The resulting object should be { b: 2, d: 4 }.
   */
  const filteredObject = ofil(inputObject, keysToRemove);
  console.log(filteredObject);
  