const tmplts = require('../../templates');
const mig = require('../../index');

const { enums, utils } = mig;

const flags = {
  entity: {
    name: 'entity',
    alias: 'e',
    required: true,
    usage: '-e <entity name>',
    arguments: {
      oneOf: Object.values(enums.entities),
      len: 1,
      strictLen: true,
      type: 'string'
    },
    desc: 'Parse mig commands from file.',
  },
  file: {
    name: 'file',
    alias: 'f',
    usage: '-f <file name>',
    arguments: {
      strictLen: false,
      min: 1,
      type: 'string'
    },
    desc: 'Parse mig commands from file.',
  },
  name: {
    name: 'name',
    alias: 'n',
    required: true,
    usage: '-n <name>',
    arguments: {
      len: 1,
      strictLen: true,
      type: 'string'
    },
    desc: 'Give a name',
  }
};


function action(appliedFlags) {

  const templateFunction = tmplts.migrations[appliedFlags.entity[0]];

  const text = templateFunction(appliedFlags.name, `actions.CREATE`);

  utils.helpers.mkFile(utils.helpers.getPathForNewFile(appliedFlags.name), text);

  return true;
}

module.exports = {
  flags,
  action
};
