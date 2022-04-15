const cmds = require('./commands');

const { CliArgumentsParser } = require('./parsers');

const cmdName = process.argv[2];
console.log('cmd name =>', cmdName);

const cmd = cmds[cmdName];
console.log('command =>', cmd);

if (!cmd) throw new SyntaxError('Unknown command!');

const cliArgP = new CliArgumentsParser(cmd.flags);

console.log('arg array =>', process.argv.slice(3));
const appliedFlags = cliArgP.parse(process.argv.slice(3));

console.log('flags =>', appliedFlags);
