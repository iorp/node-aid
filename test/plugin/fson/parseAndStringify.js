  const FSON = require('../../../src/plugin/fson');
 
 const parsed = FSON.parse("(a:1,key:value, arr:[1,2,3], obj:(nested:true))");
   const stringified = FSON.stringify({ key: 'value', arr: [1, 2, 3], obj: { nested: true } });
   console.log('parsed',parsed);
 console.log('stringified',stringified);

