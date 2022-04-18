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

function getPathForNewFile(name, relative = ['db', 'mig']) {
  const filename = `${Date.now()}_${name}.mig.js`;
  return path.resolve(...relative, filename);
}

function mkFile(destination, data) {
  const relative = path.relative(process.cwd(), destination).split(path.sep).slice(0, -1);
  if (relative.length) {
    relative.reduce((acc, el) => {
      acc.push(el);
      const fullPath = path.resolve(process.cwd(), ...acc);
      try {
        if (!fs.statSync(fullPath).isDirectory()) {
          throw new Error(`Name *${el}* by path *${fullPath}* taken by non-directory file!`);
        }
      } catch (err) {
        if (err.code === 'ENOENT') fs.mkdirSync(fullPath);
        else throw err;
      }
      return acc;
    }, []);
  }
  fs.appendFileSync(destination, data);

}




module.exports = {
  exportFolder,
  capitalizeFirst,
  isClass,
  getPathForNewFile,
  mkFile
};
