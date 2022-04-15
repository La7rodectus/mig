const flags = {
  file: {
    name: 'file',
    alias: 'f',
    usage: '-f <file name>',
    arguments: {
      //len: 1,
      strictLen: false,
      min: 1,
      type: 'string'
    },
    desc: 'Parse mig commands from file.',
  },
  name: {
    name: 'name',
    alias: 'n',
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
