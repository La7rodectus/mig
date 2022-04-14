const EventEmitter = require('events');
//const readline = require('readline');

module.exports = class InputParser {
  #buff = '';
  #lines;

  #init() {
    process.stdin.on('data', (data) => {
      this.#buff += data;
      this.#lines = this.#buff.split(/\r\n|\n/);
      this.#buff = this.#lines.pop();
      this.#lines.forEach((line) => this.in.emit('cmd', this.#parseLine(line)));
    }).on('end', () => {
      if (this.#buff.length > 0) this.in.emit('cmd', this.#parseLine(this.#buff));
    });
  }

  constructor() {
    this.in = new EventEmitter();
    this.buff = '';
    this.#init();
  }

  #parseLine(line) {
    return 'ret => ' + line;
  }


};

/**
 * ret {
 *  cmd: "create",
 *  flag: {
 *    a: [...args]
 *  }
 * }
 */
