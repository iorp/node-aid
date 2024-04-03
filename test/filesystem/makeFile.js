const path = require('path');

const makeFile = require('../../src/filesystem/makeFile');


  const tempPath =path.join('./test/.temp/makeFile/a/b/c/myFile.txt'); 

makeFile(tempPath,'Content',{})