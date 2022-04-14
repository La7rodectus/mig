class CliArgumentsParser {
  #prepArgs(rawArgs) {
    const res = {};
    for (const arg of Object.values(rawArgs)) {
      res[arg.name] = arg;
      res[arg.alias] = arg;
    }
    return res;
  }

  constructor(args) {
    this.args = this.#prepArgs(args);
  }

  parse(argArr) {
    const res = {};
    for (let i = 0; i < argArr.length;) {
      let step = 1;
      const el = argArr[i];

      const prefix = this.#getFlagPrefix(el);
      const flag = el.slice(-prefix);
      const flagConf = this.args[flag];

      if (!flagConf) throw new SyntaxError('Unknown flag!');
      if (!flagConf.arguments) { //bool flag
        res[flagConf.name] = true;
      }

      res[flagConf.name] = [];
      if (flagConf.arguments.strictLen) {
        step = flagConf.arguments.strictLen;
        for (let j = 0; j < step; j++) {
          const arg = argArr[i + j];
          if (arg) new SyntaxError('Invalid number arguments!');
          if (this.#getFlagPrefix(arg)) new SyntaxError('Bad argument!');
          res[flagConf.name].push(arg);
        }
      } else {
        do {
          const nextArg = argArr[i + step];
          if (!nextArg) break;
          if (this.#getFlagPrefix(nextArg)) break;
          res[flagConf.name].push(nextArg);
          step++;
        } while (true);
        if (res[flagConf.name].length < flagConf.arguments.min) new SyntaxError('Not enough arguments!');
      }

      i += step;
    }
    return res;
  }
  /**
 * {
 *  file: [asd, asdasdad, asdasd],
 *  debug: true
 * }
 */


  #getFlagPrefix(str) {
    let prefix = 0;
    if (str[0] === '-') {
      prefix = 1;
      if (str[1] === '-') {
        prefix = 2;
      }
    }
    return prefix;
  }
}

module.exports = CliArgumentsParser;
