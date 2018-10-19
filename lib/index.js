"use strict";

const {is: hoityIs} = require('@devo/hoity-grasp');

module.exports = function(chai, utils) {
  const Assertion = chai.Assertion;
  const IT_FLAG = "hoity.iterator";

  // utils.addProperty(Assertion.prototype, 'async', function() {
  // });

  utils.addProperty(Assertion.prototype, 'iterable', function() {
    this.assert(
      hoityIs.iterable(this._obj),
      'expected #{this} to be an iterable object',
      'expected #{this} to not be an iterable object');
    this._obj = this._obj[Symbol.iterator]();
    utils.flag(this, IT_FLAG, true);
  });

  utils.addProperty(Assertion.prototype, 'iterator', function() {
    this.assert(
      hoityIs.iterator(this._obj),
      'expected #{this} to be an iterator object',
      'expected #{this} to not be an iterator object');
    utils.flag(this, IT_FLAG, true);
  });

  utils.addProperty(Assertion.prototype, 'contents', function() {
    new Assertion(
      utils.flag(this, IT_FLAG),
      'should be after iterable/iterator assertions')
    .to.be.true;

    utils.flag(this, IT_FLAG, false);
    this._obj = [...this._obj];
  });

  Assertion.overwriteMethod('eql', function(_super) {
    return function assertIteratorEql(x) {
      if (utils.flag(this, IT_FLAG)) {
        const a = [...this._obj];
        const b = Array.isArray(x) ? x : [...x];
        const assert = new Assertion(a);
        utils.transferFlags(this, assert, false);
        utils.flag(assert, IT_FLAG, false);
        assert.to.be.eql(b);
      } else {
        _super.apply(this, arguments);
      }
    };
  });
};
