const { enums } = require('../../index');

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
  return true;
}

module.exports = {
  flags,
  action
};
