const FSON = require('./FSON.js');
module.exports =FSON;
// Set globally
  if (typeof window == 'undefined') { global.FSON=FSON;}else{ window.FSON=FSON;}



//   //
//   module.exports ={
//     parse:FSON.parse,
//     stringify:FSON.stringify,
// } 