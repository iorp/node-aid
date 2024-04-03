 
/**
 * FSON (Fake JSON) class for parsing and stringifying custom JSON-like strings.
 */
class FSON {
    /**
     * @constant {string} FSON_OBJECT_O - Opening bracket for FSON objects.
     * @constant {string} FSON_OBJECT_C - Closing bracket for FSON objects.
     * @constant {string} FSON_ARRAY_O - Opening bracket for FSON arrays.
     * @constant {string} FSON_ARRAY_C - Closing bracket for FSON arrays.
     * @constant {string} FSON_ESCAPE_M - Escape marker for special characters in FSON strings.
     * @constant {string} FSON_ELEMENT_SEPARATOR - Separator between elements in FSON arrays or objects.
     * @constant {string} FSON_KEY_SEPARATOR - Separator between keys and values in FSON objects.
     */
    static FSON_OBJECT_O = "(";
    static FSON_OBJECT_C = ")";
    static FSON_ARRAY_O = "[";
    static FSON_ARRAY_C = "]";
    static FSON_ESCAPE_M = "~";
    static FSON_ELEMENT_SEPARATOR = ",";
    static FSON_KEY_SEPARATOR = ":";
   
    static parse(input) {
      let index = 0;
    
      function parseObject() {
        const obj = {};
        while (index < input.length) {
          if (input[index] === FSON.FSON_OBJECT_C) {
            index++;
            return obj;
          } else if (input[index] === FSON.FSON_ELEMENT_SEPARATOR) {
            index++;
          } else {
            const key = parseKey();
            const value = parseValue();
            obj[key] = value;
          }
        }
        return obj;
      }
    
      function parseArray() {
        const arr = [];
        while (index < input.length) {
          if (input[index] === FSON.FSON_ARRAY_C) {
            index++;
            return arr;
          } else if (input[index] === FSON.FSON_ELEMENT_SEPARATOR) {
            index++;
          } else {
            const value = parseValue();
            arr.push(value);
          }
        }
        return arr;
      }
    
      function parseKey() {
        let key = '';
        while (index < input.length && input[index] !== FSON.FSON_KEY_SEPARATOR) {
          key += input[index];
          index++;
        }
        index++; // Move past the key separator
        return key.trim();
      }
    
      function parseValue() {
        if (index < input.length && input[index] === FSON.FSON_OBJECT_O) {
          index++;
          return parseObject();
        } else if (index < input.length && input[index] === FSON.FSON_ARRAY_O) {
          index++;
          return parseArray();
        } else {
          let value = '';
          while (index < input.length && input[index] !== FSON.FSON_ELEMENT_SEPARATOR && input[index] !== FSON.FSON_OBJECT_C && input[index] !== FSON.FSON_ARRAY_C) {
            value += input[index];
            index++;
          }
          return value.trim();
        }
      }
    
      if (input[0] === FSON.FSON_OBJECT_O) {
        index++;
        return parseObject();
      } else {
        return null; // Invalid input
      }
    }
     
 
 
    /**
     * Convert an object into an FSON string.
     * @param {object} value - The input object.
     * @returns {string} - The FSON string.
     */
    static stringify(value) {
      let res = value;
      res = JSON.stringify(res).replace(new RegExp('"', "g"), '');
  
      res = res.replace(new RegExp('{', "g"), FSON.FSON_OBJECT_O);
      res = res.replace(new RegExp('}', "g"), FSON.FSON_OBJECT_C);
      res = res.replace(new RegExp(',', "g"), FSON.FSON_ELEMENT_SEPARATOR);
      res = res.replace(new RegExp('\\[', "g"), FSON.FSON_ARRAY_O);
      res = res.replace(new RegExp('\\]', "g"), FSON.FSON_ARRAY_C);
      res = res.replace(new RegExp(':', "g"), FSON.FSON_KEY_SEPARATOR);
  
      return res;
    }
  }
  
  // Example usage:
  // const parsed = FSON.parse("(key:value, arr:[1,2,3], obj:{nested:true})");
  // const stringified = FSON.stringify({ key: 'value', arr: [1, 2, 3], obj: { nested: true } });
   
 
 module.exports =FSON;