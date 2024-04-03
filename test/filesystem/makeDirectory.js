const path = require('path');

const makeDirectory = require('../../src/filesystem/makeDirectory');


const tempPath =path.join('./test/.temp/makeDirectory/a/b/c'); 

makeDirectory(tempPath)