const path = require('path');
const applyMigration = require('./apply');

const MIG_CONFIG_FILE = '.migrc.json';
const DEFAULT_CONFIG = {
  default: 'default'
};

class Mig {
  #init() {
    this.cfg = require(path.resolve(MIG_CONFIG_FILE)) || DEFAULT_CONFIG;
  }

  constructor() {
    this.#init();
  }


  async #apply(migrations) {
    for (const migration of migrations) {
      await applyMigration(migration);
    }
  }

  async do(mig) {
    const migrations = mig.do;
    if (!migrations) throw new Error('Empty migration');
    this.#apply(migrations);
  }

  async undo(mig) {
    const migrations = mig.undo;
    if (!migrations) throw new Error('Empty migration');
    this.#apply(migrations);
  }
}

module.exports = Mig;
