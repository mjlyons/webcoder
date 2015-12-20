jest.dontMock('../ls.js')

describe('ls', function desc() {
  it(' disallows using / to break out root path', function tc() {
    let ls = require('../ls');
    expect(ls('/srcdir', '/')).toEqual({error: 'not-authorized'});
  });
  it(' disallows using .. to break out of root path', function tc() {
    let ls = require('../ls');
    expect(ls('/srcdir', '..')).toEqual({error: 'not-authorized'});
  });
  // it(" handles a dir with files and folders", function() {
  //   // TODO: actually implement this.
  //   expect(true).toBe(false);
  // });
  // it(" handles a dir with no files or folders", function() {
  //   // TODO: actually implement this.
  //   expect(true).toBe(false);
  // });
  // it(" handles a non-existent path", function() {
  //   // TODO: actually implement this.
  //   expect(true).toBe(false);
  // });
  // it(" handles a file passed in as the path", function() {
  //   // TODO: actually implement this.
  //   expect(true).toBe(false);
  // });
});
