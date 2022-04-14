const args = {
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
  }
};

module.exports = args;
