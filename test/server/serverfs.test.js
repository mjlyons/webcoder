const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mockfs = require('mock-fs');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const serverfs = require('js/server/serverfs')

describe('serverfs', () => {
    beforeEach(() => {
      mockfs({
        '/rootpath': {
          'subdir': {
            'aDir': {},
            'aFile.txt': 'aFile.txt contents',
          },
          'file.txt': 'fake file contents',
        },
      });
    });

    afterEach(() => {
      mockfs.restore();
    });

  describe('ls', () => {
    it('disallows using / to break out root path', () => {
      expect(serverfs.ls('/rootpath', '/')).to.deep.equal({ error: 'not-authorized' });
    });

    it(' disallows using .. to break out of root path', () => {
      expect(serverfs.ls('/rootpath', '..')).to.deep.equal({ error: 'not-authorized' });
    });

    it(' handles a dir with a file and a folder', () => {
      expect(serverfs.ls('/rootpath', 'subdir')).to.deep.equal({
        'path': '/subdir',
        'contents': {
          'aDir': { 'type': 'dir' },
          'aFile.txt': { 'type': 'file' },
        },
      });
    });

    it(' handles a dir with no files or folders', () => {
      expect(serverfs.ls('/rootpath', 'subdir/aDir')).to.deep.equal({
        'path': '/subdir/aDir',
        'contents': {},
      });
    });

    it(' handles a non-existent path', () => {
      expect(serverfs.ls('/rootpath', 'not-exists')).to.deep.equal({
        'error': 'not-exists',
      });
    });

    it(' handles a file passed in as the path', () => {
      expect(serverfs.ls('/rootpath', 'file.txt')).to.deep.equal({
        'error': 'not-dir',
      });
    });
  });

  describe('readfile', () => {
    it('errors when trying to leave root path', () => {
      const result = serverfs.readfile('/rootpath', '../subdir');
      expect(result).to.be.deep.equal({ error: 'not-authorized' });
    });

    it("errors when the file doesn't exist", () => {
      const result = serverfs.readfile('/rootpath', 'nodir');
      expect(result).to.be.deep.equal({ error: 'not-exists' });
    });

    it('errors when trying to load something other than a file', () => {
      const result = serverfs.readfile('/rootpath', 'subdir');
      expect(result).to.be.deep.equal({ error: 'not-file' });
    });

    it('returns the contents of a file', () => {
      const result = serverfs.readfile('/rootpath', 'file.txt');
      expect(result).to.be.deep.equal({
        path: '/file.txt',
        fileContents: 'fake file contents',
      });
    });
  });
});
