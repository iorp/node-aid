 
const api = 'http://localhost/github/php-ioserver/demo/test';
const data = { key: 'a-dummy-mirror-value-123' };

(async ()=>{
 
   
  try {
         const response = await httpRequest(api, data, 'POST');
         console.log('API Response:', response);
         // Handle the response as needed
       } catch (error) {
         console.error('Error:', error);
         // Handle errors
       }
})();


// or

// httpRequest(api, data, 'POST').then(...).catch(...)
 