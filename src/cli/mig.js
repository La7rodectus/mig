const fs = require('fs');
const path = require('path');
const config = require('./config.js');

function readConfig() {
  console.log(path.resolve(process.cwd(), config.pathToConfig));
  try {
    const cfg = fs.readFileSync(path.resolve(process.cwd(), config.pathToConfig));
  } catch (err) {
    console.log(err);
  }
}

function mig() {
  const cfg = readConfig() || config;

  // fs.readdirSync(dir).forEach((fileName) => {

  // });

}

module.exports = mig;
