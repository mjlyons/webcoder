jest.dontMock('../fswrap');
jest.mock('fs');

describe('fswrap', () => {
  it('readdirSync passes through', () => {
    const fswrap = require('../fswrap');
    const fs = require('fs');
    fs.readdirSync.mockReturnValue('retval');
    const retval = fswrap.readdirSync('somepath');
    expect(fs.readdirSync).toBeCalledWith('somepath');
    expect(retval).toEqual('retval');
  });
  it('existsSync passes through', () => {
    const fswrap = require('../fswrap');
    const fs = require('fs');
    fs.existsSync.mockReturnValue('retval');
    const retval = fswrap.existsSync('somepath');
    expect(fs.existsSync).toBeCalledWith('somepath');
    expect(retval).toEqual('retval');
  });
  it('statSync passes through', () => {
    const fswrap = require('../fswrap');
    const fs = require('fs');
    fs.statSync.mockReturnValue('retval');
    const retval = fswrap.statSync('somepath');
    expect(fs.statSync).toBeCalledWith('somepath');
    expect(retval).toEqual('retval');
  });
});
