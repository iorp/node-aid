 // old version
// /**
//  * Asynchronously fetches data from the specified API using the provided method and data.
//  *
//  * @param {string} api - The API endpoint to fetch data from.
//  * @param {Object} data - The data to be sent in the request body.
//  * @param {string} [method='POST'] - The HTTP method for the request (default is 'POST').
//  * @param {Object} [headers={'Content-Type': 'application/json'}] - The headers for the request (default is JSON).
//  * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response or rejects with an error object.
//  *
//  * @example
//  * // Example usage:
//  * const api = 'http://localhost/Portfolio/api/ioserver/test';
//  * const data = { key: 'value' };
//  *
//  * try {
//  *   const response = await httpRequest(api, data, 'POST');
//  *   console.log('API Response:', response);
//  *   // Handle the response as needed
//  * } catch (error) {
//  *   console.error('Error:', error);
//  *   // Handle errors
//  * }
//  */
//   const httpRequest = async (api, data, method = 'POST', headers = { 'Content-Type': 'application/json' }) => {
//     try {
//         const response = await fetch(api, {
//             method: method,
//             headers: headers,
//             body: JSON.stringify(data),
//         });

//         const jsonResponse = await response.json();
//         return jsonResponse;
//     } catch (error) {
//         return { error: 1, code: 'ServerError', exception: error.message };
//     }
// };



/**
 * Asynchronously fetches data from the specified API using the provided method and data.
 *
 * @param {string} api - The API endpoint to fetch data from.
 * @param {Object} data - The data to be sent in the request body.
 * @param {string} [method='POST'] - The HTTP method for the request (default is 'POST').
 * @param {Object} [headers={'Content-Type': 'application/json'}] - The headers for the request (default is JSON).
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON response or rejects with an error object.
 *
 * @example
 * // Example usage:
 * const api = 'http://localhost/Portfolio/api/ioserver/test';
 * const data = { key: 'value' };
 *
 * try {
 *   const response = await httpRequest(api, data, 'POST');
 *   console.log('API Response:', response);
 *   // Handle the response as needed
 * } catch (error) {
 *   console.error('Error:', error);
 *   // Handle errors
 * }
 * 
 * 
 * or 
 * httpRequest(api, data, 'POST').then(...).catch(...)
 * 
 */
  const httpRequest = async (api, data, method = 'POST', headers = { 'Content-Type': 'application/json' }) => {
  try {
      const response = await fetch(api, {
          method: method,
          headers: headers,
          body: JSON.stringify(data),
      });

      const jsonResponse = await response.json();
      return jsonResponse;
  } catch (error) {
      return { error: 1, code: 'ServerError', exception: error.message };
  }
};
  module.exports =httpRequest;