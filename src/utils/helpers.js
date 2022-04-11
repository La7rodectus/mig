const fs = require('fs');
const path = require('path');

function exportFolderSync(dir, file, module) {
  fs.readdirSync(dir).forEach((fileName) => {
    if (fileName === path.basename(file)) return;
    const exported = require(path.resolve(dir, fileName));
    let [key] = fileName.split('.');
    if (typeof exported === 'function') key = capitalizeFirst(key);
    module.exports[key] = exported;
  });
}

function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
  exportFolderSync,
  capitalizeFirst
};
