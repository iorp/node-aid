 

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
 * httpRequest(api, data, 'POST')
 *   .then(response => {
 *      // Handle successful response
*      console.log('Response:', response);
*  })
*   .catch(error => {
*       // Handle error
*       console.error('Error:', error);
*   });
 * 
 */
const OLD_kill_httpRequest = async (api, data, method = 'POST', headers = { 'Content-Type': 'application/json' }) => {
    try {
      const response = await fetch(api, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const textResponse = await response.text();
  
      // Try parsing the text response as JSON
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(textResponse);
      } catch (error) {
        // If parsing fails, it's not a valid JSON
        return { error: 1, code: 'httpRequestError', text: textResponse };
      }
  
      return jsonResponse;
      // Uncaught exception
    } catch (error) {
      return { error: 1, code: 'httpRequestException', exception: error };
    }
  };

  const httpRequest = async (api, data, method = 'POST', headers = { 'Content-Type': 'application/json' }) => {
    try {
      const response = await fetch(api, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // If the response is not OK (status is not in the range 200-299)
        return { error: 1, code: 'httpResponseError', status: response.status, statusText: response.statusText };
      }
  
      const textResponse = await response.text();
  
      // Try parsing the text response as JSON
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(textResponse);
      } catch (error) {
        // If parsing fails, it's not a valid JSON
        return { error: 1, code: 'jsonParseError', text: textResponse };
      }
  
      return jsonResponse;
    } catch (error) {
      // Handle network or other errors
      return { error: 1, code: 'httpRequestException', exception: error.message };
    }
  };
  

  module.exports =httpRequest;