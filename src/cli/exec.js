const { commands } = require('../index');

const args = require('./arguments');
const { CliArgumentsParser } = require('./parsers');

const cliArgP = new CliArgumentsParser(args);

const cmdName = process.argv[2];
console.log('cmd name =>', cmdName);

console.log('arg array =>', process.argv.slice(3));
const flags = cliArgP.parse(process.argv.slice(3));

const command = commands[cmdName];

console.log('command =>', command);

console.log('flags =>', flags);
