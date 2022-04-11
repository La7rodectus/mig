const { exportFolderSync } = require('../utils').helpers;

exportFolderSync(__dirname, __filename, module);

console.log(module.exports);
