"use strict";
"use strict";

const chai = require('chai');
chai.use(require('..'));
const {expect} = chai;

describe('Hoity chai plugin', function() {
  it('has iterable', function() {
    expect([1,2,3]).to.be.iterable.contents.eql([1,2,3]);
    expect([1,2,3]).to.be.iterable.contents.deep.eq([1,2,3]);
  });

  it('has iterator', function() {
    expect(new Set([1,2,3]).values()).to.be.iterator.contents.eql([1,2,3]);
    expect(new Set([1,2,3]).values()).to.be.iterator.contents.deep.eq([1,2,3]);

    const m = new Map([[1,'1'], [2,'2'], [3,'3']]);
    expect(m.keys()).to.be.iterator.contents.eql([1,2,3]);
    expect(m.values()).to.be.iterator.contents.eql(['1','2','3']);
    expect(m.entries()).to.be.iterator.contents.eql([[1,'1'],[2,'2'],[3,'3']]);
  });

  it('can be directly compared with any iterable', function() {
    expect([1,2,3]).to.be.iterable.eql([1,2,3]);
    expect(new Set([1,2,3])).to.be.iterable.eql([1,2,3]);
    expect(new Set([1,2,3])).to.be.iterable.not.eql([1,2,4]);
  });
});
