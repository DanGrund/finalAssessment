const chai = require('chai');
const chai-jquery = require('chai-jquery')
const expect = chai.expect;
const {sortUp, sortDown} = require('../src/index.js');

chai.use(chai-jquery);


describe('unit tests', () => {

  it('sortUp', () => {
    expect(sortUp()).to.equal('');
  });

  it('sortDown', () => {
    expect(sortDown()).to.equal('');
  })
});
