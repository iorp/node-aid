

const renderJsonDocToHtml=require('../../../../../src/plugin/turbodoc/renderers/JsonDocRenderer/renderJsonDocToHtml');

// Example input data
const inputData = {
  "fs": {
    "@": {
      "name": "fs",
      "line": 2,
      "level": 0,
      "type": "vlc-definition",
      "definer": "const",
      "start": 6,
      "end": 31,
      "parent": null,
      "block": null,
      "route": "fs",
      "sindex": 0,
      "extra": {}
    }
  },
  "path": {
    "@": {
      "name": "path",
      "line": 3,
      "level": 0,
      "type": "vlc-definition",
      "definer": "const",
      "start": 33,
      "end": 64,
      "parent": null,
      "block": null,
      "route": "path",
      "sindex": 1,
      "extra": {}
    }
  },
  "pathExists=": {
    "@": {
      "name": "pathExists=",
      "line": 4,
      "level": 0,
      "type": "vlc-definition",
      "definer": "const",
      "start": 66,
      "end": 120,
      "parent": null,
      "block": null,
      "route": "pathExists=",
      "sindex": 2,
      "extra": {}
    }
  },
  "directoryExists=": {
    "@": {
      "name": "directoryExists=",
      "line": 5,
      "level": 0,
      "type": "vlc-definition",
      "definer": "const",
      "start": 122,
      "end": 186,
      "parent": null,
      "block": null,
      "route": "directoryExists=",
      "sindex": 3,
      "extra": {}
    }
  }
};

// Generate HTML
const resultHTML = renderJsonDocToHtml(inputData,{
  maxDepth:null
});

// Print the result in the console
console.log(resultHTML);




 