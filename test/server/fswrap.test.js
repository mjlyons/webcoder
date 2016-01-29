const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const proxyquire = require('proxyquire');

// Tests that a function propogates parameters and returns the rseult to/from fs
function testFunctionPassthrough(functionName) {
  // Creates a generic stub for the function to test (for example, readdirSync)
  const fsFunctionStub = sinon.stub().returns('retval');
  const fsMock = { [functionName]: fsFunctionStub };
  const fswrap = proxyquire('js/server/fswrap', { 'fs': fsMock });

  // Executes fswrap's version of the function to test
  const result = fswrap[functionName]('param1', 'param2', 'param3');

  // Checks that the fs stub was called with the right parameters and the result was passed back
  // through correctly
  expect(fsFunctionStub).to.have.been.calledWith('param1', 'param2', 'param3');
  expect(result).to.equal('retval');
}

describe('fswrap', () => {
  it('fs functions pass through', () => {
    testFunctionPassthrough('readdirSync');
    testFunctionPassthrough('existsSync');
    testFunctionPassthrough('statSync');
    testFunctionPassthrough('readFileSync');
    testFunctionPassthrough('writeFileSync');
  });
});
