class Range {
  constructor(from, to, strict = false, isInt = false) {
    this.from = from;
    this.to = to;
    this.strict = strict;
    this.isInt = isInt;
  }
  in(val) {
    if (!Number.isFinite(val)) {
      return new Error('Invalid number!');
    }
    if (this.isInt && !Number.isInteger(val)) {
      return new Error('Number should be int!');
    }
    if (!this.strict && (val === this.from || val === this.to)) {
      return true;
    }
    return val > this.from && val < this.to;
  }

}
module.exports = {
  Range,
};
