jest.dontMock('../ls.js');
jest.dontMock('../fswrap.js');
jest.mock('fs');

const statResultFile = {
  isFile: () => { return true; },
  isDirectory: () => { return false; },
};

const statResultDir = {
  isFile: () => { return false; },
  isDirectory: () => { return true; },
};

describe('ls', function desc() {
  it(' disallows using / to break out root path', () => {
    const ls = require('../ls');
    expect(ls('/srcdir', '/')).toEqual({ error: 'not-authorized' });
  });

  it(' disallows using .. to break out of root path', () => {
    const ls = require('../ls');
    expect(ls('/srcdir', '..')).toEqual({ error: 'not-authorized' });
  });

  it(' handles a dir with a file and a folder', () => {
    const fs = require('fs');
    const ls = require('../ls');
    fs.readdirSync.mockReturnValueOnce(['aDir', 'aFile.txt']);
    fs.existsSync.mockReturnValueOnce(true);
    fs.statSync.mockReturnValueOnce(statResultDir)
      .mockReturnValueOnce(statResultDir)
      .mockReturnValueOnce(statResultFile);
    expect(ls('/srcdir', 'subdir')).toEqual({
      'path': '/subdir',
      'contents': {
        'aDir': { 'type': 'dir' },
        'aFile.txt': { 'type': 'file' },
      },
    });
    expect(fs.readdirSync.mock.calls).toEqual([['/srcdir/subdir']]);
    expect(fs.statSync.mock.calls).toEqual([
      ['/srcdir/subdir'], ['/srcdir/subdir/aDir'], ['/srcdir/subdir/aFile.txt']]);
  });

  it(' handles a dir with no files or folders', () => {
    const ls = require('../ls');
    const fs = require('fs');
    fs.statSync.mockReturnValueOnce(statResultDir);
    fs.readdirSync.mockReturnValueOnce([]);
    fs.existsSync.mockReturnValueOnce(true);
    expect(ls('/srcdir', 'subdir')).toEqual({
      'path': '/subdir',
      'contents': {},
    });
  });

  it(' handles a non-existent path', () => {
    const ls = require('../ls');
    const fs = require('fs');
    fs.existsSync.mockReturnValueOnce(false);
    expect(ls('/srcdir', 'not-exists')).toEqual({
      'error': 'not-exists',
    });
  });

  it(' handles a file passed in as the path', () => {
    const ls = require('../ls');
    const fs = require('fs');
    fs.existsSync.mockReturnValueOnce(true);
    fs.statSync.mockReturnValueOnce(statResultFile);
    expect(ls('/srcdir', 'aFile.txt')).toEqual({
      'error': 'not-dir',
    });
  });
});
