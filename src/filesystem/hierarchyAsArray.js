const fs = require('fs');
const path = require('path');

/**
 * Recursively reads the specified directory and constructs a hierarchical array
 * representation of its contents, applying optional file and directory filters.
 *
 * @param {string} directoryPath - The path of the directory to read.
 * @param {Object} options - Optional parameters for file and directory filtering.
 * @param {function} [options.fileFilter] - A function to filter files. Returns true to include the file.
 * @param {function} [options.dirFilter] - A function to filter directories. Returns true to include the directory.
 * @param {function} [options.fileNodeModel] - A function to create the file node model.
 * @param {function} [options.dirNodeModel] - A function to create the directory node model.
 * @returns {Array} An array representing the hierarchy of files and directories.
 */
function hierarchyAsArray(directoryPath, options = {}) {

  options = Object.assign({
    fileFilter :(filePath) => true,
    dirFilter : (dirPath) => true, 
    fileNodeModel:(uri, name,type) => { return {  name , uri, content:fs.readFileSync(uri, 'utf-8') }; }, // fs.readFileSync(uri, 'utf-8')
    dirNodeModel : (uri, name,type,children) => ({ name, uri }),
  },options)
  const { fileFilter,dirFilter,fileNodeModel ,dirNodeModel } = options;

  const stats = fs.statSync(directoryPath);

  if (!stats.isDirectory()) {
    // If it's a file, apply file filter and return an object representing the file
    if (fileFilter(directoryPath)) {
      const content = fs.readFileSync(directoryPath, 'utf-8');
      const fileNode = fileNodeModel(directoryPath, path.basename(directoryPath),'file');
      fileNode.type = 'file';
      return [fileNode];
    }
    return [];
  }

  // If it's a directory, apply directory filter and read its content
  if (!dirFilter(directoryPath)) {
    return [];
  }

  const files = fs.readdirSync(directoryPath);

  console.log(directoryPath,files)
  // Map each file/directory to its object representation
  const children = files.flatMap(file => hierarchyAsArray(path.join(directoryPath, file), options));

  // Create the directory object and add 'type' and 'children' properties
  const dirNode = dirNodeModel(directoryPath, path.basename(directoryPath),'dir',children);
  dirNode.type = 'dir';
  dirNode.children = children;
 

  return [dirNode];
}

module.exports = hierarchyAsArray;


/*
Great test
(async ()=>{
  const hierarchyArray = hierarchyAsArray(input,{
    fileNodeModel:(uri, name) => { return {  name , uri, content:'content here...' }; }, // fs.readFileSync(uri, 'utf-8')
    dirNodeModel:(uri, name) => { return { uri, name }; },
    fileFilter :(filePath) => true,
    dirFilter : (dirPath) => true, 
  });
  //console.log(JSON.stringify(hierarchyArray,null,2));
  
  if(!hierarchyArray) return {error:true,code:'TurbodocGenerateDocsError',exception:'hierarchyArray couldn not be created'}
  
  const generationResponse =  await generateHierarchy(output, hierarchyArray,{verbose:true,overwrite:null});
  
  console.log('generated',generationResponse);
  
  })()
*/  