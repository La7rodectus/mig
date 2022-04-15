class CliArgumentsParser {
  #prepArgs(rawFlags) {
    const res = {};
    for (const flag of Object.values(rawFlags)) {
      res[flag.name] = flag;
      res[flag.alias] = flag;
    }
    return res;
  }

  constructor(flags) {
    this.flags = this.#prepArgs(flags);
  }

  parse(argArr) {
    const res = {};
    for (let i = 0; i < argArr.length;) {
      let step = 1;
      const el = argArr[i];

      const prefix = this.#getFlagPrefix(el);
      const flag = el.slice(-prefix);
      const flagConf = this.flags[flag];

      if (!flagConf) throw new SyntaxError('Unknown flag!');
      if (!flagConf.arguments) { //bool flag
        res[flagConf.name] = true;
      }

      res[flagConf.name] = [];
      const oneOf = flagConf.arguments.oneOf;

      if (flagConf.arguments.strictLen) {
        step += flagConf.arguments.len;
        for (let j = 1; j < step; j++) {
          const arg = argArr[i + j];
          if (arg) new SyntaxError('Invalid number arguments!');
          if (this.#getFlagPrefix(arg)) throw new SyntaxError('Bad argument!');

          if (oneOf && !oneOf.includes(arg)) throw new SyntaxError(`Should be one of => [${oneOf.join(', ')}]`);
          res[flagConf.name].push(arg);
        }
      } else {
        do {
          const nextArg = argArr[i + step];
          if (!nextArg) break;
          if (this.#getFlagPrefix(nextArg)) break;

          if (oneOf && !oneOf.includes(nextArg)) throw new SyntaxError(`Should be one of => [${oneOf.join(', ')}]`);
          res[flagConf.name].push(nextArg);
          step++;
        } while (true);
        if (res[flagConf.name].length < flagConf.arguments.min) throw new SyntaxError('Not enough arguments!');
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
