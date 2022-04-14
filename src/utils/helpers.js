const fs = require('fs');
const path = require('path');

function exportFolder(dir, file, module) {
  fs.readdirSync(dir).forEach((fileName) => {
    if (fileName === path.basename(file)) return;
    const exported = require(path.resolve(dir, fileName));
    let [key] = fileName.split('.');
    if (isClass(exported)) key = capitalizeFirst(key);
    module.exports[key] = exported;
  });
}

function isClass(T) {
  if (typeof T !== 'function') return false;
  if (T.prototype) {
    const prototypeStr = T.prototype.toString().slice(1, -1).split(' ')[1];
    if (['Generator', 'AsyncGenerator'].includes(prototypeStr)) return false;
  }
  const constructorStr = T.prototype?.constructor?.toString();
  if (!constructorStr) return false;
  return constructorStr.split(' ')[0] === 'class';
}

function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
  exportFolder,
  capitalizeFirst,
  isClass
};
